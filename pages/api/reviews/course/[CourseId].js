import { preHandler } from '../../../../utils/utils';
import Reviews from '../../../../models/reviewsModel';

async function handler(req, res) {
    const { CourseId } = req.query;

    const reviews = await Reviews.find({ "course": CourseId});
    if(!reviews) throw new Error('No Reviews Found');

    return res.status(200).send({reviews: reviews});
}

export default preHandler(handler)