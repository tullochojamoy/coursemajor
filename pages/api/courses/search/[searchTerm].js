//const Courses = require('../models/coursesModel');
//import connectDB from '../../../config/db';
//import Courses from '../../../models/coursesModel';

import connectDB from '../../../../config/db';

import Courses from '../../../../models/coursesModel';

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}


export default async function handler(req, res) {
  connectDB();
  const { searchTerm } = req.query;

  if (req.method === 'GET') {
    try {
        if (searchTerm) {
          const regex = new RegExp(escapeRegex(searchTerm), 'gi');
          const foundCourses = await Courses.find({ published: true, title: regex, });

          let noMatch;
          if (foundCourses.length < 1) {
            noMatch =
              'No Results for your Search, Try again with a different term :-)';
          }
          return res.status(200).json({ message: noMatch, foundCourses });
        }
    } catch (err) {
        res.json({ message: err });
    }
  }
}
