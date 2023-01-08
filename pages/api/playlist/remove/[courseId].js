import nextConnect from 'next-connect';
import { preHandler } from '../../../../utils/utils';
import { isAuth, isSellerOrAdmin } from '../../../../utils/utils old';
import Playlist from '../../../../models/playlistModel';
import { uploadFile, deleteFile, getFileStream } from '../../../../utils/s3';
const { uploadImage, upload } = require('../../../../utils/multer');

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

//Remove a video
const removeVideo = async (req, res) => {
    const NumberToRemove = parseInt(req.body.numberToRemove);

    const playlist = await Playlist.findOne({ Course: req.query.courseId });
    if (!playlist) throw new Error ('Playlist Not Found');

    let numToDeleteIndex = playlist.videoplaylist.findIndex(
      (item) => item.Number == NumberToRemove
    );

    await deleteFile(playlist.videoplaylist[numToDeleteIndex].Key);

    playlist.videoplaylist = playlist.videoplaylist.filter((item) => {
      return item.Number !== NumberToRemove;
    });

    //Find the largest
    let largest = -1;
    for (let c = 0; c < playlist.videoplaylist.length; c++) {
      if (largest < playlist.videoplaylist[c].Number) {
        largest = playlist.videoplaylist[c].Number;
      }
    }

    //Array from Smallest to largest and copy the index
    let arrayToUpdate = new Array();
    let currentSmallest = { num: largest };
    let previousSmallest = -1;

    for (let e = 0; e < playlist.videoplaylist.length; e++) {
      currentSmallest.num = largest + 1;
      for (let d = 0; d < playlist.videoplaylist.length; d++) {
        if (
            playlist.videoplaylist[d].Number > previousSmallest &&
            playlist.videoplaylist[d].Number < currentSmallest.num
        ) {
          currentSmallest.num = playlist.videoplaylist[d].Number;
          currentSmallest.index = await playlist.videoplaylist.findIndex(
            (item) => item.Number == currentSmallest.num
          );
        }
      }
      previousSmallest = currentSmallest.num;
      if (!arrayToUpdate[e]) arrayToUpdate[e] = { ...arrayToUpdate[e], ...currentSmallest };
    } //End For

    //Set Playlist to correct values
    for (
      let numIndex = 0;
      numIndex < playlist.videoplaylist.length;
      numIndex++
    ) {
      playlist.videoplaylist[arrayToUpdate[numIndex].index].Number =
        numIndex + 1;
    }

    const updatedPlaylist = await playlist.save();
    updatedPlaylist.videoplaylist = updatedPlaylist.videoplaylist.sort(compare);
    return res.status(200).send({ message: 'Playlist Updated', playlist: updatedPlaylist });
};

export default nextConnect().patch(
  isAuth,
  isSellerOrAdmin,
  upload.single('video'),
  preHandler(removeVideo)
);
