import Playlist from '../../../../models/playlistModel';
import { preHandler } from '../../../../utils/utils';
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
  //Update a video
  if (req.method === 'PUT') {
  const { courseId } = req.query;
    const numToUpdate = req.body.numToUpdate;

    const playlist = await Playlist.findOne({ Course: courseId });
    if (!playlist) throw new Error('Playlist Not Found');

    let numToUpdateIndex = await playlist.videoplaylist.findIndex(
      (item) => item.Number == numToUpdate
    );
    playlist.videoplaylist[numToUpdateIndex].Title = req.body.title;
    playlist.videoplaylist[numToUpdateIndex].Description = req.body.description;
    playlist.Thumbnail = req.body.Thumbnail;

    const updatedPlaylist = await playlist.save();
    updatedPlaylist.videoplaylist = updatedPlaylist.videoplaylist.sort(compare);
    return res.status(200).send({ message: 'Playlist Updated', playlist: updatedPlaylist });
  }
}

export default preHandler(isAuth(handler));