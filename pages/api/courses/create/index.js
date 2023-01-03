import Courses from '../../../../models/coursesModel';

import connectDB from '../../../../config/db';

import isAuth from '../../../../utils/isAuth';
//const isAuth = Auth;

async function handler(req, res) {
  //const { courseID } = req.query;
  connectDB();
  
  //Create a courseghrfgjj[h4f gb]
  if (req.method === 'POST') {
    console.log('Create Course');
    console.log(req.user._id);

    const course = new Courses({
      title: 'Your Favourite Course',
      imageKey: '2afc8b6cf9eac4ba672938e7b792ccdc',
      description: 'Sample Description',
      price: 997,
      star: 0,
      seller: req.user._id,
    });
    //Save to DB and respond with data (Testing) or errr
    try {
      const savedCourse = await course.save();
      res.json(savedCourse);
      console.log(savedCourse);
    } catch (err) {
      res.json({ message: err });
      console.log(err);
    }
  };
}

export default isAuth(handler);