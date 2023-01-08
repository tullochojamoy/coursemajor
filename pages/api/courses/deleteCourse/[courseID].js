import Courses from '../../../../models/coursesModel';
import Playlist from '../../../../models/playlistModel';
import { preHandler } from '../../../../utils/utils';
import isAuth from '../../../../utils/isAuth';
import withRoles from '../../../../utils/withRoles';

//For File Deletion after upload
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

//const { uploadImage, upload } = require('../utils/multer');
import { uploadImage, upload } from '../../../../utils/s3';

//const { uploadFile, deleteFile, getFileStream } = require('../utils/s3');
import { uploadFile, deleteFile, getFileStream } from '../../../../utils/s3';

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

async function handler(req, res) {
  const { courseID } = req.query;
  if (req.method === 'DELETE') {
    const course = await Courses.findById(courseID);
    if(!course) throw new Error('Course Not Found');

    if (courses.seller != req.user.id || !req.user.isAdmin){
      throw new Error('Please Login to Delete this Course');
    }

    
    await deleteFile(course.imageKey);
    const removedCourse = await Courses.remove({ _id: courseID });
    if (!removedCourse) throw new Error('Unable to Delete Course');

    return res.status(201).json(removedCourse);
  }
}

export default preHandler(isAuth(withRoles(handler,'seller')));