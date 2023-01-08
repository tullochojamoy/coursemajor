import { preHandler } from '../../../utils/utils';
const ErrorResponse = require('../../../utils/errorResponse');
import User from '../../../models/usersModel';
import sendToken from '../../../utils/utils';

async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorResponse('Email could not be sent', 404));
    }
    const resetToken = user.getResetPasswordToken();
    await user.save();

    //EMAIL CONTENT
    const resetUrl = `https://coursemajor.vercel.app/passwordreset/${resetToken}`;

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

        return res.status(200).json({ success: true, data: 'Email Sent' });
      } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();
        return next(new ErrorResponse('Email could not be sent', 500));
      }
  }
}

export default preHandler(handler);