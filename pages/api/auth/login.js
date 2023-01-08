import User from '../../../models/usersModel';
import { preHandler, sendToken, AppError } from '../../../utils/utils';

async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new AppError('Please provide an email and password', 400);
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      throw new AppError('Invalid Email', 401);
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      throw new AppError('Invalid Password', 401);
    }

    return sendToken(user, 200, res);
  }
}

export default preHandler(handler);