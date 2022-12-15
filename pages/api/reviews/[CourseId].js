import connectDB from '../../../config/db';
import Reviews from '../../../models/reviewsModel';
import isAuth from '../../../utils/utils';

//Delete a Review
async function handler(req, res) {
  const { CourseId } = req.query;
  connectDB();
    console.log(CourseId)
  const reviews = Reviews.find({
    course: CourseId,
    user: req.user._id,
  });
  if (reviews) {
    try {
      const removedReview = Reviews.remove({
        course: CourseId,
        user: req.user._id,
      });
      res.json(removedReview);
    } catch (err) {
      res.json({ message: err });
    }
  } else {
    console.log('Unable to delelte review');
  }
}

export default isAuth(handler);