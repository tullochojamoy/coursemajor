import { preHandler } from '../../../../utils/utils';
const { uploadFile, deleteFile, getFileStream } = require('../../../../utils/s3');

async function handler(req, res) {
  const { key } = req.query;
  if (req.method === 'GET') {
    if (key===undefined && key==="undefined" && !key && key==="nicepage.css") {
      throw new Error('No Key Found') ;
    }
    
    const readStream = await getFileStream(key);
    return readStream.pipe(res);
  }
}

export default preHandler(handler);