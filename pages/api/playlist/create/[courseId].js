//const Playlist = require('../models/playlistModel');
import Playlist from '../../../../models/playlistModel';
import connectDB from '../../../../config/db';

import { uploadFile, deleteFile, getFileStream } from '../../../../utils/s3';


export default async function handler(req, res) {
  //const courseId = req.params.courseId;
  connectDB();

  const { courseId } = req.query;
  if (req.method === 'POST') {
    const playlist = new Playlist({
      Course: courseId,
    });
    try {
      const savedPlaylist = await playlist.save();
      savedPlaylist.videoplaylist = savedPlaylist.videoplaylist.sort(compare);
      res.json(savedPlaylist);
    } catch (err) {
      res.json({ message: err });
    }
  }
}

