import { preHandler } from '../../../../utils/utils';

import Playlist from '../../../../models/playlistModel';

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

  //Return specific playlist
  if (req.method === 'GET') {
    const playlist = await Playlist.findOne({ Course: courseId });
    if(!playlist) throw new Error('Playlist Not Found');

    playlist.videoplaylist = playlist.videoplaylist.sort(compare);
    return res.status(200).json(playlist);
  }
  
}

export default preHandler(isAuth(handler));