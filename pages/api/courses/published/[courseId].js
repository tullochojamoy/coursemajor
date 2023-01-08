import Courses from '../../../../models/coursesModel';
import Playlist from '../../../../models/playlistModel';
import { preHandler } from '../../../../utils/utils';

import isAuth from '../../../../utils/isAuth';

async function handler(req, res) {
  const { courseId } = req.query;

  if (req.method === 'PUT') {
    const course = await Courses.findOne({ _id: courseId }); 
    if (!course) throw new Error('Course Not Found');

    if (req.user._id.toString() != course.seller.toString()) {
        throw new Error('You are not the owner of this course');
    }

    const playlist = await Playlist.findOne({ Course: courseId }); 
    if (!playlist) throw new Error('Playlist Not Found');
                    
    if (playlist.videoplaylist.length === 0) {
        throw new Error('Please Add A Video')
    } 

    course.published = !course.published;
    
    const updatedCourse = await course.save();
    return res.status(200).send({ message: 'Playlist Updated', course: updatedCourse });

    }
}



export default preHandler(isAuth(handler));