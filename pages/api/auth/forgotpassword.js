import connectDB from '../../../config/db';
const ErrorResponse = require('../../../utils/errorResponse');
import User from '../../../models/usersModel';
import sendToken from '../../../utils/utils';

export default async function handler(req, res) {
  connectDB();

  if (req.method === 'POST') {
    const { email } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return next(new ErrorResponse('Email could not be sent', 404));
      }
      const resetToken = user.getResetPasswordToken();
      await user.save();

      //EMAIL CONTENT
      // http://localhost:3000
      const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

      const message = `
            <h1>You have requested a password reset</h1>
            <p>Please go to this link to reset your password</p>
            <Link to=${resetUrl} clicktracking=off>${resetUrl}</Link>
        `;
      try {
        await sendEmail({
          to: user.email,
          subject: 'Password Reset Request',
          text: message,
        });

        res.status(200).json({ success: true, data: 'Email Sent' });
      } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();
        return next(new ErrorResponse('Email could not be sent', 500));
      }
    } catch (error) {
      next(error);
    }
  }
}
