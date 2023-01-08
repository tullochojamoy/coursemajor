import { preHandler } from '../../../../utils/utils';
import { uploadFile, deleteFile, getFileStream } from '../../../../utils/s3';

async function handler(req, res) {
  if (req.method === 'GET') {
    const { key } = req.query;

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
  }
}

export default preHandler(handler);