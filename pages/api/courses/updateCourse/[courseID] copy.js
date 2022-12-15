import formidable from 'formidable';
import Courses from '../../../../models/coursesModel';
import { uploadImage } from '../../../../utils/s3';
import isAuth from '../../../../utils/isAuth';
import connectDB from '../../../../config/db';
import { uploadFile, deleteFile, getFileStream } from '../../../../utils/s3';

//For File Deletion after upload
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

export const config = {
  api: {
    bodyParser: false,
  },
};

connectDB();

async function handler (req, res) {
  const form = new formidable.IncomingForm();
  form.uploadDir = './';
  form.keepExtensions = true;
  
  const { courseID } = req.query;
  
  //Update a course
  const course = await Courses.findById(courseID);
  
  if (req.user._id.toString !== course.seller.toString) {
    return res
    .status(404)
    .send({ error: 'You are not the owner of this course' });
  }
  
  try {
    await new Promise(function (resolve, reject) {
     form.parse(req, async function (err, fields, files) {
      //console.log('reach');
      
      let result = null;
      let hasCourseUpdated=false;
      
      if (!(files = {} || files == undefined)) {
        try{
          result = await uploadFile(files);
          await unlinkFile(files.path);
          if (course.imageKey !== '2afc8b6cf9eac4ba672938e7b792ccdc')
          await deleteFile(course.imageKey);
        } catch (error) {
          //console.log(error);
          return res.send({ message: 'Error uploading file' });
        }
      } else {
        //console.log('Lol');
      }

      /*
      if (files != {}) {
        result = await uploadFile(files);
        await unlinkFile(files.path);
        if (course.imageKey !== '2afc8b6cf9eac4ba672938e7b792ccdc')
        await deleteFile(course.imageKey);
      }
      */

      

     if (course) {
        if (fields.name !== '' && fields.name !==undefined && course.title!==fields.name) {course.title = fields.name; hasCourseUpdated = true;};
        if (!(files = {}) && result) {course.imageKey = result.Key; hasCourseUpdated = true;}
        if (fields.price !== '' && fields.price !==undefined && course.price!==fields.price) {course.price = fields.price; hasCourseUpdated = true;};
        if (fields.description != '' && fields.description !==undefined && course.description!==fields.description) {course.description = fields.description; hasCourseUpdated = true;};
        if (fields.category != '' && fields.category !==undefined && course.category!==fields.category) {course.category = fields.category; hasCourseUpdated = true;};
        if (fields.subCategory != '' && fields.subCategory !==undefined && fields.subCategory!==course.subCategory) {course.subCategory = fields.subCategory; hasCourseUpdated = true;};
        if (fields.tags != '' && fields.tags !==undefined && course.tags!==fields.tags) {course.tags = fields.tags; hasCourseUpdated = true;};

        if(hasCourseUpdated) {
          try {
            const updatedCourse = await course.save();
            res.send({ message: 'course Updated', course: updatedCourse });
            resolve(fields);
            return; 
          } catch (error) {
            console.log(error);
            res.status(404).send({ message: 'Error updating saving updated Course' });
            reject(error);
            return;
          }
        } else {
          res.send({ message: 'Course Already Updated'});
          resolve(fields);
          return;
        }
      } else {
        res.status(404).send({ message: 'Course Not Found' });
        resolve(fields);
        return;
      }

      
    });
    });
  } catch (err) {
    console.log(err);
    return res.send({ message: 'Error Parsing Form Data' });
  }


};

export default isAuth(handler);