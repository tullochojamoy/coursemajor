import { preHandler } from '../../../../utils/utils';

async function handler(req, res) {
    const reviews = await Reviews.find({ "course": req.params.CourseId });
    if(!reviews) throw new Error('No Reviews Found');

    return res.status(200).json(reviews.sort(reviews.star));
}

export default preHandler(handler);