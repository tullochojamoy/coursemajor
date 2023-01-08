import { preHandler } from '../../../utils/utils';
import ErrorResponse from '../../../utils/utils';
import User from '../../../models/usersModel';
import sendToken from '../../../utils/utils';

async function handler(req, res) {
  connectDB();

  if (req.method === 'POST') {
    const { username, email, googleId, imageUrl } = req.body;

    if (!email || !googleId) {
      ErrorResponse('Please provide an email and password', 400)
    }

    const user = await User.findOne({ email }).select('+googleId');
    if (!user) {
      const user = await User.create({username,email,
          googleId,imageUrl,verified: true,});
      return sendToken(user, 201, res);
    }

    if (!user.googleId) {
      user.googleId = googleId;
      user.verified = true;
    } else if (user.googleId !== googleId) {
      return new ErrorResponse('Invalid Credentials', 401);
    }

    if (!user.username) {
      user.username = username;
    }

    if (!user.imageUrl) {
      user.imageUrl = imageUrl;
    }

    await user.save();
    sendToken(user, 200, res);
  };
}

export default preHandler(handler);