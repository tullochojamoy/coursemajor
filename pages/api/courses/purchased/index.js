import { preHandler } from '../../../../utils/utils';
import Order from '../../../../models/orderModel';
import Courses from '../../../../models/coursesModel';
import isAuth from '../../../../utils/isAuth';


async function handler(req, res) {
  if (req.method === 'GET') {
    const Orders = await Order.find({ user: req.user._id });
    
    if (!Orders)
    return  res.status(404).json({ success: true, data: "No Courses"});
    
    let courseId=[];
    Orders.forEach(item => { 
        courseId.push({_id: item.orderItems[0].course});
    });
      
    if (courseId.length !== 0) {
        const orderedCourses=await Courses.find({$or: courseId});
        return res.status(200).json(orderedCourses);
    } else {
        return res.status(404).json({ success: true, data: "Email Sent"});
    }
  }
}

export default preHandler(isAuth(handler));
