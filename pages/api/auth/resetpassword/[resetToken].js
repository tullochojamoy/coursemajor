import { preHandler } from '../../../../utils/utils';
import User from '../../../../models/usersModel';
const ErrorResponse = require('../../../../utils/errorResponse');

async function handler(req, next, res) {
  if (req.method === 'PUT') {
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.resetToken)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        throw new Error('Invalid Reset Token');
        //return next(new ErrorResponse('Invalid Reset Token', 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return res.status(201).json({
      success: true,
      data: 'Password Reset Success',
    });
  };
}

export default preHandler(handler);