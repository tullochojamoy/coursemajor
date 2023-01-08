const ErrorResponse = require('../../../utils/errorResponse');
import User from '../../../models/usersModel';
import { sendToken } from '../../../utils/utils';
import { preHandler } from '../../../utils/utils';


async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, email, password } = req.body;

    if (!email || !password) {
      throw new Error('Please provide an email and password');
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      const user = await User.create({ username, email, password });
      return sendToken(user, 201, res);
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) throw new Error('Invalid Credentials');

    sendToken(user, 200, res);
  }
}

export default preHandler(handler);