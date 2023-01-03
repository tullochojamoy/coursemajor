import connectDB from '../../../../config/db';

//const { uploadFile, deleteFile, getFileStream } = require('../utils/s3');
const { uploadFile, deleteFile, getFileStream } = require('../../../../utils/s3');

export default async function handler(req, res) {
    connectDB();
    const { key } = req.query;
      if (req.method === 'GET') {
      try {
        //const key = String(req.query.key);
        if (key!==undefined && key!=="undefined" && key && key!=="jquery.js" && key!=="nicepage.js" && key!=="nicepage.css") {
          const readStream = await getFileStream(key);
          readStream.pipe(res);
          //console.log('The key is',readStream);
        } else {
            console.log('No Key');
        }
      } catch (err) {
        console.log(err)
      }
    }
}
