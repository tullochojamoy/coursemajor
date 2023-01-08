import nextConnect from 'next-connect';
const { isAuth, isSellerOrAdmin } = require('../../../../utils/utils old');
const { uploadImage, upload } = require('../../../../utils/multer');
import Courses from '../../../../models/coursesModel';
import { preHandler } from '../../../../utils/utils';

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
  const {name,price,description,category,subcategory,tags} = req.body;
  const { courseId } = req.query;

  const course = await Courses.findById(courseId);
  if(!course) throw new Error('Course Not Found');

  if (req.user._id.toString !== course.seller.toString) {
    throw new Error('You are not the owner of this course');
  }

  let result = null;

  if (req.file) {
    const file = req.file;
    result = await uploadFile(file);
    await unlinkFile(file.path);
    if (course.imageKey!=='2afc8b6cf9eac4ba672938e7b792ccdc'){
      await deleteFile(course.imageKey);
    }
  }
      
  if (name) course.title = name;
  if (price) course.price = parseInt(price);
  if (req.file && result) course.imageKey = result.Key;
  if (description) course.description = description;
  if (category) course.category = category;
  if (subcategory) course.subCategory = subCategory;
  if (tags) course.tags = req.body.tags;
            
  const updatedCourse = await course.save();
  return res.status(200).send({ message: 'course Updated', course: updatedCourse });
};


export default nextConnect().put(isAuth, uploadImage.single("image"), preHandler(UpdateCourse));