//const Playlist = require('../models/playlistModel');
import Playlist from '../../../../models/playlistModel';

import connectDB from '../../../../config/db';

//import { uploadFile, deleteFile, getFileStream } from '../../../../utils/s3';

import isAuth from '../../../../utils/isAuth';

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

async function handler(req, res) {
  const { courseId } = req.query;
  connectDB();

  //Return specific playlist
  if (req.method === 'GET') {
      try {
        const playlist = await Playlist.findOne({ Course: courseId });
        playlist.videoplaylist = playlist.videoplaylist.sort(compare);
        res.json(playlist);
      } catch (err) {
        res.json({ message: err });
      }
  }
  
}

export default isAuth(handler);