import nextConnect from 'next-connect';
const { isAuth, isSellerOrAdmin } = require('../../../../utils/utils old');
const { uploadImage, upload } = require('../../../../utils/multer');
import Courses from '../../../../models/coursesModel';
import connectDB from '../../../../config/db';

const { uploadFile, deleteFile, getFileStream } = require('../../../../utils/s3');

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

//Update a course
const UpdateCourse = async (req, res) => {
    const { courseId } = req.query;
    //console.log(req.body)
    //const courseId = req.params.id;
    //console.log(courseId);
    const course = await Courses.findById(courseId);
    
    if (req.user._id.toString !== course.seller.toString) {
        return res.status(404).send({ message: 'You are not the owner of this course' });
    }

    try {
        let result = null;

        if (req.file) {
            const file = req.file;
            result = await uploadFile(file);
            console.log(result);
            await unlinkFile(file.path);
            if (course.imageKey!=='2afc8b6cf9eac4ba672938e7b792ccdc')
            await deleteFile(course.imageKey);
        }
      
      if (course) {
        if (req.body.name) 
        course.title = req.body.name;
        if (req.body.price)
        course.price = parseInt(req.body.price);
        if (req.file && result)
        course.imageKey = result.Key;
        if (req.body.description)
        course.description = req.body.description;
        if (req.body.category)
        course.category = req.body.category;
        if (req.body.subcategory)
            course.subCategory = req.body.subCategory;
            if (req.body.tags)
            course.tags = req.body.tags;
            
        try {
          const updatedCourse = await course.save();
          res.send({ message: 'course Updated', course: updatedCourse });
          //console.log(updatedCourse);
        } catch (error) {
          //res.status(404).send({ message: 'Course Not Found' });
        }
      } else {
        //res.status(404).send({ message: 'Course Not Found' });
      }
    } catch(err) {
        res.json(err);
    }
};


export default nextConnect().put(isAuth, uploadImage.single("image"), UpdateCourse);