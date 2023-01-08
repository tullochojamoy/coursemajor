import { preHandler } from '../../../../utils/utils';
import Playlist from '../../../../models/playlistModel';

import { uploadFile, deleteFile, getFileStream } from '../../../../utils/s3';


async function handler(req, res) {
  const { courseId } = req.query;
  if (req.method === 'POST') {
    const playlist = new Playlist({ Course: courseId });

    const savedPlaylist = await playlist.save();
    savedPlaylist.videoplaylist = savedPlaylist.videoplaylist.sort(compare);
    return res.status(200).json(savedPlaylist);
  }
}

export default preHandler(handler);