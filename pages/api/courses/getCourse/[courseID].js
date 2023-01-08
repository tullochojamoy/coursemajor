import Courses from '../../../../models/coursesModel';
import Playlist from '../../../../models/playlistModel';
import { preHandler } from '../../../../utils/utils';
import isAuth from '../../../../utils/isAuth';
import withRoles from '../../../../utils/withRoles';

//For File Deletion after upload
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

import { uploadImage, upload } from '../../../../utils/s3';
import { uploadFile, deleteFile, getFileStream } from '../../../../utils/s3';

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

async function handler(req, res) {
  const { courseID } = req.query;

  //Return specific course
  if (req.method === 'GET') {
    let courses = await Courses.findById(courseID);
    if (!courses) throw new Error('Course Not Found');

    const playlist = await Playlist.findOne({ Course: courseID });
    if (!playlist) throw new Error('Playlist Not Found');

    let vidPlaylist = playlist.videoplaylist[0];
    const course = { ...courses._doc, Key: vidPlaylist };

    let noMatch;
    let regex;

    if (courses.tags) {
      regex = new RegExp(escapeRegex(courses.tags), 'gi');
    } else if (courses.category) {
      regex = new RegExp(escapeRegex(courses.category), 'gi');
    } else if (courses.subCategory) {
      regex = new RegExp(escapeRegex(courses.subCategory), 'gi');
    } else {
      regex = new RegExp(escapeRegex(courses.title), 'gi');
    }
    
    const relatedCourses = await Courses.find({
      published: true,
      $or: [
        { tags: regex },
        { category: courses.category },
        { subCategory: courses.subCategory },
        { title: regex },
      ],
    });

    if (relatedCourses.length < 1) {
      noMatch = 'No Results for your Search, Try again with a different term :-)';
    }
    
    return res.status(200).send({ course, relatedCourses, message: noMatch });
  }
}

export default preHandler(handler);