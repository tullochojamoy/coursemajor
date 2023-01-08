import nextConnect from 'next-connect';

import Playlist from '../../../../models/playlistModel';

import { preHandler } from '../../../../utils/utils';

import { uploadFile, deleteFile, getFileStream } from '../../../../utils/s3';

const { isAuth, isSellerOrAdmin } = require('../../../../utils/utils old');
const { uploadImage, upload } = require('../../../../utils/multer');
const path = require('path');

export const config = {
  api: {
    bodyParser: false,
  },
};

//Global Compare Sort Function
function compare(a, b) {
  const bandA = a.Number;
  const bandB = b.Number;

  let comparison = 0;
  if (bandA > bandB) {
    comparison = 1;
  } else if (bandA < bandB) {
    comparison = -1;
  }
  return comparison;
}

connectDB();

//Add Video to Playlist
const addVideo = async (req, res) => {
  const playlist = await Playlist.findOne({ Course: req.query.courseId });
  if(!playlist) throw new Error('Playlist Not Found');

  const file = req.file;
  const result = await uploadFile(file);

  playlist.videoplaylist = [
    ...playlist.videoplaylist,
    {
      Number: playlist.videoplaylist.length + 1,
      Title: req.body.Title,
      Description: req.body.Description,
      Key: result.Key,
    },
  ];
    
  playlist.Thumbnail = req.body.Thumbnail;
  const updatedPlaylist = await playlist.save();
  updatedPlaylist.videoplaylist = updatedPlaylist.videoplaylist.sort(compare);
  return res.send({ message: 'Playlist Updated', playlist: updatedPlaylist });
};

export default nextConnect().put(
  isAuth,
  isSellerOrAdmin,
  upload.single('video'),
  preHandler(addVideo)
);