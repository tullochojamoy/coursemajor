import nextConnect from 'next-connect';

//const Playlist = require('../models/playlistModel');
import Playlist from '../../../../models/playlistModel';

import connectDB from '../../../../config/db';

import { uploadFile, deleteFile, getFileStream } from '../../../../utils/s3';

//import isAuth from '../../../../utils/isAuth';
//import withRoles from '../../../../utils/withRoles';

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
  console.log(req.file);
  try {
    const playlist = await Playlist.findOne({ Course: req.query.courseId });
    //console.log('play',playlist);
    if (playlist) {
      try {
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
        updatedPlaylist.videoplaylist =
          updatedPlaylist.videoplaylist.sort(compare);
        return res.send({ message: 'Playlist Updated', playlist: updatedPlaylist });
      } catch (error) {
        console.log(error);
      }
    } else {
      return res.status(404).send({ message: 'Playlist Not Found' });
    }

  } catch (error) {
    console.log(error)
  }
};

export default nextConnect().put(
  isAuth,
  isSellerOrAdmin,
  upload.single('video'),
  addVideo
);