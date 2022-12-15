const { isAuth } = require('../../../../utils/utils.js')

export default async function handler(req, res) {
   try{
        const existingReview = await Reviews.find({ "course": req.params.CourseId, "user": req.user._id  });

        if (existingReview) {
            existingReview.title = req.body.reviewTitle;
            existingReview.star = parseInt(req.body.review);
            existingReview.message = req.body.reviewMessage;
            const updatedReview = await existingReview.save();
            return res.send({ message: 'review Updated', review: updatedReview });
        }

        const review = new Reviews({
            title: req.body.reviewTitle,
            message: req.body.reviewMessage,
            star: req.body.review,
            course: req.params.CourseId,
            user: req.user._id,
            time: new Date(),
        });

    //Save to DB and respond with data (Testing) or errr
        const savedReview = await review.save();
        res.json(savedReview);
    } catch (err) {
        res.json({ message: err });
    }
}
