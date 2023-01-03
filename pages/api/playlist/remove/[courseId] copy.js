import Playlist from '../../../../models/playlistModel';
import connectDB from '../../../../config/db';

import { uploadFile, deleteFile, getFileStream } from '../../../../utils/s3';

const { isAuth, isSellerOrAdmin } = require('../../../../utils/isAuth');

async function handler(req, res) {
  const { courseId } = req.query;
  connectDB();
  
  //Remove a video
  if (req.method === 'PATCH') {
      const NumberToRemove = parseInt(req.body.numberToRemove);

      const playlist = await Playlist.findOne({ Course: courseId });

      if (!playlist)
        return res.status(404).send({ message: 'Playlist Not Found' });

      try {
        let numToDeleteIndex = playlist.videoplaylist.findIndex(
          (item) => item.Number == NumberToRemove
        );

        await deleteFile(playlist.videoplaylist[numToDeleteIndex].Key);

        playlist.videoplaylist = playlist.videoplaylist.filter((item) => {
          return item.Number !== NumberToRemove;
        });
      

    //Find the largest
    let largest=-1;
    for (let c=0; c<playlist.videoplaylist.length; c++){
      if (largest<playlist.videoplaylist[c].Number){
        largest=playlist.videoplaylist[c].Number
      }
    }
    
    //Array from Smallest to largest and copy the index
    let arrayToUpdate=new Array();
    let currentSmallest={num:largest};
    let previousSmallest=-1;

    for (let e=0; e<playlist.videoplaylist.length; e++){
      currentSmallest.num = largest+1;
      for (let d=0; d<playlist.videoplaylist.length; d++){
        if (playlist.videoplaylist[d].Number>previousSmallest && playlist.videoplaylist[d].Number<currentSmallest.num){
          currentSmallest.num=playlist.videoplaylist[d].Number;
          currentSmallest.index= await playlist.videoplaylist.findIndex(
            (item) => item.Number == currentSmallest.num
          );
        }
      }
      previousSmallest=currentSmallest.num;
      if(!arrayToUpdate[e])
        arrayToUpdate[e]={...arrayToUpdate[e], ...currentSmallest};
      }  //End For

      //Set Playlist to correct values
      for (let numIndex = 0; numIndex < playlist.videoplaylist.length; numIndex++){
        playlist.videoplaylist[ arrayToUpdate[numIndex].index ].Number=numIndex+1;
      }

        
        const updatedPlaylist = await playlist.save();
        updatedPlaylist.videoplaylist = updatedPlaylist.videoplaylist.sort(compare);
        res.send({ message: 'Playlist Updated', playlist: updatedPlaylist });
      } catch (error) {
        console.log(error);
      }
  }

}

//export default isAuth(isSellerOrAdmin(handler));
export default isAuth(withRoles(handler,'seller'));