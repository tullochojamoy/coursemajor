import Reviews from '../../../../models/reviewsModel';
import { isAuth } from '../../../../utils/utils';
import { preHandler } from '../../../../utils/utils';

//Edit a review
async function handler(req, res) {
  const review = await Reviews.find({ "course": req.query.CourseId, "user": req.user._id  });
  if (!review) throw new Error('Review Not Found');
  
  const { name, star, description } = req.body;
  review.title = name;
  review.star = parseInt(star);
  review.description = description;
    
  const updatedReview = await review.save();
  return res.status(200).send({ message: 'review Updated', review: updatedReview });
}

export default preHandler(isAuth(handler));