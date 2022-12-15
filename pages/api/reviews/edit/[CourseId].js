import Reviews from '../../../../models/reviewsModel';
import isAuth from '../../../../utils/isAuth';

//Edit a review
async function handler(req, res) {
  const { courseID } = req.query;

    const review = await Reviews.find({ "course": CourseId, "user": req.user._id  });
    if (review) {
      review.title = req.body.name;
      review.star = parseInt(req.body.star);
      review.description = req.body.description;
      const updatedReview = await review.save();
      res.send({ message: 'review Updated', review: updatedReview });
    } else {
      res.status(404).send({ message: 'Review Not Found' });
    }
}

export default isAuth(handler);