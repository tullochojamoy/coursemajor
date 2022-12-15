import Courses from '../../../../models/coursesModel';
import Playlist from '../../../../models/playlistModel';

import connectDB from '../../../../config/db';

import isAuth from '../../../../utils/isAuth';

connectDB();

async function handler(req, res) {

  const { courseId } = req.query;

  if (req.method === 'PUT') {
    try{
            //console.log(req.params.courseId);
                const course = await Courses.findOne({ _id: courseId }); 

                //console.log(req.user._id)

                if (req.user._id.toString() != course.seller.toString()) {
                    return res.status(404).send({ message: 'You are not the owner of this course' });
                }

                if (!course)
                    return res.status(404).send({ message: 'Course Not Found' });

                const playlist = await Playlist.findOne({ Course: courseId }); 

                if (!playlist)
                    return res.status(404).send({ message: 'Playlist Not Found' });
                    
                if (playlist.videoplaylist.length !== 0) {
                    try{
                        if (course.published == true)
                            course.published = false;
                        else if (course.published == false)
                            course.published = true;
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    return res.status(404).send({ message: 'Please Add A Video' });
                }   

                const updatedCourse = await course.save();
                res.send({ message: 'Playlist Updated', course: updatedCourse });
            
            } catch (error) {
                console.log(error);
            }

        }

}



export default isAuth(handler);