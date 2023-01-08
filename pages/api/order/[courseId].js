import Order from '../../../models/orderModel';
import { preHandler } from '../../../utils/utils';
import isAuth from '../../../utils/isAuth';

async function handler(req, res) {
  const { courseId } = req.query;
  if (req.method === 'GET') {
    const Orders = await Order.find({ user: req.user._id });
    let courseId=[];
    Orders.forEach(item => { 
      courseId.push(item.orderItems[0].course);
    });
        
    let pos = function(element, index, theArray){
      return element == courseId;
    }

    const courseIndex = courseId.findIndex(pos);
    if (courseIndex>=0) {
      return res.status(200).json(Orders[courseIndex]);
    } else {
      return res.send(false);
    }

  }
}


export default preHandler(isAuth(handler));