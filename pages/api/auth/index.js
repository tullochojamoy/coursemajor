import { preHandler } from '../../../utils/utils';
import User from '../../../models/usersModel';
const ErrorResponse = require('../../../utils/errorResponse');
const { isAuth } = require('../../../utils/utils');

async function handler(req, res) {
  if (req.method === 'GET') {
    const userId = req.user._id;

    const user = await User.findOne({ _id: userId });

    if (!user) {
      return next(new ErrorResponse('User Not Found!', 404));
    }

    return res.send(user);
  };
}

export default preHandler(isAuth(handler));