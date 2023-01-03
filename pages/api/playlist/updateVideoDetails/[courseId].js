import Playlist from '../../../../models/playlistModel';
import connectDB from '../../../../config/db';

import isAuth from '../../../../utils/isAuth';

connectDB();

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

  //Update a video
  if (req.method === 'PUT') {
    const numToUpdate = req.body.numToUpdate;

    const playlist = await Playlist.findOne({ Course: courseId });

    if (!playlist)
      return res.status(404).send({ message: 'Playlist Not Found' });

    try {
      let numToUpdateIndex = await playlist.videoplaylist.findIndex(
        (item) => item.Number == numToUpdate
      );
      playlist.videoplaylist[numToUpdateIndex].Title = req.body.title;
      playlist.videoplaylist[numToUpdateIndex].Description = req.body.description;
      playlist.Thumbnail = req.body.Thumbnail;
    } catch (error) {
      console.log(error);
    }

    const updatedPlaylist = await playlist.save();
    updatedPlaylist.videoplaylist = updatedPlaylist.videoplaylist.sort(compare);
    res.send({ message: 'Playlist Updated', playlist: updatedPlaylist });
  }
}

export default isAuth(handler);