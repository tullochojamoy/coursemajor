import Courses from '../../../../models/coursesModel';
import { preHandler } from '../../../../utils/utils';
import isAuth from '../../../../utils/isAuth';

async function handler(req, res) {
  if (req.method === 'POST') {
    const course = new Courses({
      title: 'Your Favourite Course',
      imageKey: '2afc8b6cf9eac4ba672938e7b792ccdc',
      description: 'Sample Description',
      price: 997,
      star: 0,
      seller: req.user._id,
    });

    //Save to DB and respond with data (Testing) or errr
    const savedCourse = await course.save();
    return res.json(savedCourse);
  };
}

export default preHandler(isAuth(handler));