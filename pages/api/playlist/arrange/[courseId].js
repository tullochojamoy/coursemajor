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

//Move Videos in playlist up and down
async function handler(req, res) {
  const { courseId } = req.query;

  if (req.method === 'PUT') {

      const up = req.body.up;
      const down = req.body.down;
      const numToUpdate = req.body.numToUpdate;
      console.log('up is' + up);
      console.log('down is' + down);
      console.log('num is' + numToUpdate);

      const playlist = await Playlist.findOne({ Course: courseId });

      if (!playlist) return res.status(404).send({ message: 'Playlist Not Found' });

      if (numToUpdate === 1 && up)
        return res
          .status(404)
          .send({ message: 'This is the First Video in the playlist' });

      if (numToUpdate === playlist.videoplaylist.length && down)
        return res
          .status(404)
          .send({ message: 'This is the Last Video in the playlist' });

      try {
        if (up) {
          let numToUpdateIndex = playlist.videoplaylist.findIndex(
            (item) => item.Number === numToUpdate
          );
          let secondNumToUpdateIndex = playlist.videoplaylist.findIndex(
            (item) => item.Number === numToUpdate - 1
          );

          if (playlist.videoplaylist[numToUpdateIndex].Number)
            playlist.videoplaylist[numToUpdateIndex].Number -= 1;
          
          if (playlist.videoplaylist[secondNumToUpdateIndex].Number)
            playlist.videoplaylist[secondNumToUpdateIndex].Number += 1;
        }

        if (down) {
          let numToUpdateIndex = await playlist.videoplaylist.findIndex(
            (item) => item.Number == numToUpdate
          );

          console.log('num ' + numToUpdate);
          console.log('First index' + numToUpdateIndex);

          let secondNumToUpdateIndex = await playlist.videoplaylist.findIndex(
            (item) => item.Number == numToUpdate + 1
          );

          console.log(secondNumToUpdateIndex);
          
          if (playlist.videoplaylist[numToUpdateIndex].Number)
            playlist.videoplaylist[numToUpdateIndex].Number += 1;

          if (playlist.videoplaylist[secondNumToUpdateIndex].Number)
            playlist.videoplaylist[secondNumToUpdateIndex].Number -= 1;
        }
      } catch (error) {
        console.log(error);
      }

      const updatedPlaylist = await playlist.save();
      updatedPlaylist.videoplaylist = updatedPlaylist.videoplaylist.sort(compare);
      console.log(updatedPlaylist.videoplaylist);
      res.send({ message: 'Playlist Updated', playlist: updatedPlaylist });
    }
  }

export default isAuth(handler);