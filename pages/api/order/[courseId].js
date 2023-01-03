//import Courses from '../../../models/coursesModel';
import Order from '../../../models/orderModel';

import connectDB from '../../../config/db';

import isAuth from '../../../utils/isAuth';

async function handler(req, res) {
   //const courseId = req.params.courseId;
  const { courseId } = req.query;
  connectDB();
  if (req.method === 'GET') {
      try {
        const Orders = await Order.find({ user: req.user._id });
        let courseId=[];
        Orders.forEach(item => { 
          courseId.push(item.orderItems[0].course);
        });
        
        let pos = function(element, index, theArray){
          //console.log(element + " - " + index);
          return element == courseId;
        }

        const courseIndex = courseId.findIndex(pos);
        if (courseIndex>=0) {
          res.json(Orders[courseIndex]);
        } else {
          res.send(false);
        }
        
      } catch (err) {
        res.json({ message: err });
      }
  }
}


export default isAuth(handler);