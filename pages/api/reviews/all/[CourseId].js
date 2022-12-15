// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
      try {
        const reviews = await Reviews.find({ "course": req.params.CourseId });
        res.json(reviews.sort(reviews.star));
    } catch (err) {
        res.json({ message: err });
    }
}
