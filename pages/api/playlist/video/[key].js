//const { uploadFile, deleteFile, getFileStream } = require('../utils/s3');

import { uploadFile, deleteFile, getFileStream } from '../../../../utils/s3';

export default async function handler(req, res) {
  //connectDB();
  const { key } = req.query;

  if (req.method === 'GET') {

    try {
      //const key = req.params.key;

      if (
        key!==undefined && 
        key!=="undefined" && 
        key && 
        key!=="jquery.js" && 
        key!=="nicepage.js" && 
        key!=="nicepage.css"
      ) {
        const readStream = await getFileStream(key);
        readStream.pipe(res);
      } else {
        console.log('No Key');
      }
    } catch (err) {
      console.log(err);
    }

  }
}
