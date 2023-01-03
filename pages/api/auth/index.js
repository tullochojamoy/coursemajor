import connectDB from '../../../config/db';
const ErrorResponse = require('../../../utils/errorResponse');
import User from '../../../models/usersModel';
//import sendToken from '../../../utils/utils';

const { isAuth } = require('../../../utils/utils.js');

async function handler(req, res) {
  connectDB();
  
  if (req.method === 'GET') {
    const userId = req.user._id;

    try {
      const user = await User.findOne({ _id: userId });

      if (!user) {
        return next(new ErrorResponse('User Not Found!', 404));
      }

      res.send(user);
    } catch (error) {
      next(error);
    }
  };
}

export default isAuth(handler);