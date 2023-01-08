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

//Move Videos in playlist up and down
async function handler(req, res) {
  if (req.method === 'PUT') {
    const { courseId } = req.query;
    const {up,down,numToUpdate} = req.body;

    const playlist = await Playlist.findOne({ Course: courseId });
    if (!playlist) return res.status(404).send({ message: 'Playlist Not Found' });

    if (numToUpdate === 1 && up)
      return res
        .status(404)
        .send({ message: 'This is the First Video in the playlist' });

    else if (numToUpdate === playlist.videoplaylist.length && down)
        return res
          .status(404)
          .send({ message: 'This is the Last Video in the playlist' });

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

    else if (down) {
      let numToUpdateIndex = await playlist.videoplaylist.findIndex(
        (item) => item.Number == numToUpdate
      );

      let secondNumToUpdateIndex = await playlist.videoplaylist.findIndex(
        (item) => item.Number == numToUpdate + 1
      );
  
      if (playlist.videoplaylist[numToUpdateIndex].Number)
        playlist.videoplaylist[numToUpdateIndex].Number += 1;

      if (playlist.videoplaylist[secondNumToUpdateIndex].Number)
        playlist.videoplaylist[secondNumToUpdateIndex].Number -= 1;
      }

      const updatedPlaylist = await playlist.save();
      updatedPlaylist.videoplaylist = updatedPlaylist.videoplaylist.sort(compare);
    
      return res.status(200).send({ message: 'Playlist Updated', playlist: updatedPlaylist });
    }
  }

export default preHandler(isAuth(handler));