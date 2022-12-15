
//const Courses = require('../models/coursesModel');
//const Courses = require('../../../models/coursesModel');
import connectDB from '../../../config/db';

import Courses from '../../../models/coursesModel';

export default async function handler(req, res) {
  console.log(1)  
  console.log(2)
  if (req.method === 'GET') {
    try {
      connectDB();
      console.log(3)
      const courses = await Courses.find({ published: true });
      console.log(4)
      res.json(courses);
    } catch (err) {
      console.log(5)
      res.json({ message: err, lol: 'lol' });
    }
  }


}
