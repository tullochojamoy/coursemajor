import { preHandler } from '../../../../utils/utils';
import Courses from '../../../../models/coursesModel';

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}


async function handler(req, res) {
  if (req.method === 'GET') {
    const { searchTerm } = req.query;
    if (!searchTerm) throw new Error('Please Enter a Search Term');
    
    const regex = new RegExp(escapeRegex(searchTerm), 'gi');
    const foundCourses = await Courses.find({ published: true, title: regex, });

    let noMatch;
    if (foundCourses.length < 1) {
      noMatch ='No Results for your Search, Try again with a different term :-)';
    }
      
    return res.status(200).json({ message: noMatch, foundCourses });
  }
}

export default preHandler(handler);