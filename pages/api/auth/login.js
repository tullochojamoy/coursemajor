//import connectDB from '../../../../config/db';
import connectDB from '../../../config/db';
const ErrorResponse = require('../../../utils/errorResponse');
import User from '../../../models/usersModel';
import sendToken from '../../../utils/utils';

export default async function handler(req, res) {
  connectDB();
  
  if (req.method === 'POST') {
    const { email, password } = req.body;
    if (!email || !password) {
      //return next(new ErrorResponse('Please provide an email and password', 400));
      return res.status(400).send({ error: 'Please provide an email and password' });
      console.log('1');
    }

    console.log('2-');

    try {

      const user = await User.findOne({ email }).select('+password');
      console.log('3-');
      //console.log(user)
      if (!user) {
        //return next(new ErrorResponse('Invalid Credentials', 401));
        return res.status(401).send({ error: 'Invalid Credentials' });
        //console.log('1')
      }
      console.log('4-');
      const isMatch = await user.matchPassword(password);
      console.log('5-')
      if (!isMatch) {
        //return next(new ErrorResponse('Invalid Credentials', 401));
        return res.status(401).send({ error: 'Invalid Credentials' });
        //console.log('1');
      }
      sendToken(user, 200, res);
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
      console.log("error");
    }
  }
}
