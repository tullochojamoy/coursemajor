//import connectDB from '../../../../config/db';
import connectDB from '../../../config/db';
const ErrorResponse = require('../../../utils/errorResponse');
import User from '../../../models/usersModel';
import {sendToken} from '../../../utils/utils';
//import {test} from '../../../utils/utils';
//import {test2} from '../../../utils/utils';

export default async function handler(req, res) {
  connectDB();

  if (req.method === 'POST') {
      const { username, email, password } = req.body;

      if (!email || !password) {
        //return next(new ErrorResponse('Please provide an email and password', 400));
        return res.status(400).json({ success: false, error: 'Please provide an email and password' });
      }

      try {
        const user = await User.findOne({ email }).select('+password');
        console.log(user)
        if (!user) {
          const user = await User.create({ username, email, password });
          return sendToken(user, 201, res);
        }

        console.log('7-')
        const isMatch = await user.matchPassword(password);
        console.log('8-');
        if (!isMatch) {
          //return next(new ErrorResponse('Invalid Credentials', 401));
          return res.status(401).json({ success: false, error: 'Invalid Credentials' });
        }
        console.log('9-');

        //test()
        test2()
        sendToken(user, 200, res);
        console.log('10-')
      } catch (error) {
        //next(error);
        return res.status(500).json({ success: false, error: error.message });
        //console.log(error);
        console.log('Error in Register')

        //return;
      }
  }

}