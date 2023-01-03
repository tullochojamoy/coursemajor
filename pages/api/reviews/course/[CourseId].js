import connectDB from '../../../../config/db';

import Reviews from '../../../../models/reviewsModel';

connectDB();

export default async function handler(req, res) {
    const { CourseId } = req.query;
    try {
        const reviews = await Reviews.find({ "course": CourseId});
        return res.send({reviews: reviews});
    } catch (err) {
        //return res.send({ message: err });
        return new Error(res.status(404).send({ message: 'No Reviews' }))
        //console.log(err)
        
    }
}
