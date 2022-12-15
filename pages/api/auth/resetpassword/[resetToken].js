import connectDB from '../../../../config/db';
const ErrorResponse = require('../../../../utils/errorResponse');
import User from '../../../../models/usersModel';
//import sendToken from '../../../../utils/utils';

export default async function handler(req, next, res) {
  connectDB();

  if (req.method === 'PUT') {
    //res.send('Reset Password Route');
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.resetToken)
      .digest('hex');

    try {
      const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
      });

      if (!user) {
        return next(new ErrorResponse('Invalid Reset Token', 400));
      }

      user.password = req.body.password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      res.status(201).json({
        success: true,
        data: 'Password Reset Success',
      });
    } catch (error) {
      next(error);
    }
  };
}
