import Courses from '../../../../models/coursesModel';
import Playlist from '../../../../models/playlistModel';
import connectDB from '../../../../config/db';
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
  connectDB();

  //Delete a course
  if (req.method === 'DELETE') {
      const courses = await Courses.findById(courseID);
      if (courses.seller != req.user.id || !req.user.isAdmin) return;

      try {
        await deleteFile(courses.imageKey);
        const removedCourse = await Courses.remove({ _id: courseID });
        res.json(removedCourse);
      } catch (err) {
        res.json({ message: err });
      }


  }

}

//export default isAuth(withhandler);
export default isAuth(withRoles(handler,'seller'));