import Courses from '../../../models/coursesModel';
import { preHandler } from '../../../utils/utils';

async function handler(req, res) {
  if (req.method === 'GET') {
      const courses = await Courses.find({ published: true });
      return res.status(200).json(courses);
  }
}

export default preHandler(handler);