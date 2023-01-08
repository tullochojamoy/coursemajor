import User from '../../../models/usersModel';
import { preHandler, sendToken, AppError } from '../../../utils/utils';

async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, email, password } = req.body;

    if (!email || !password) {
      throw new AppError('Please provide an email and password', 400);
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      const user = await User.create({ username, email, password });
      return sendToken(user, 201, res);
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) throw new AppError('Invalid Credentials', 400);

    return sendToken(user, 200, res);
  }
}

export default preHandler(handler);