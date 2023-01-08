import Reviews from '../../../models/reviewsModel';
import isAuth from '../../../utils/utils';
import { preHandler } from '../../../utils/utils';

//Delete a Review
async function handler(req, res) {
  const { CourseId } = req.query;

  const reviews = Reviews.find({ course: CourseId, user: req.user._id,});
  if (!reviews) throw new Error('No Reviews Found');

  const removedReview = await Reviews.remove({course: CourseId, user: req.user._id,});
  if (!removedReview) throw new Error('Unable to remove Review');

  return res.status(200).json(removedReview);
}

export default preHandler(isAuth(handler));