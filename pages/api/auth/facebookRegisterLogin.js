import connectDB from '../../../config/db';
//import connectDB from '../../../'
import axios from 'axios';
//const User = require('../models/usersModel');
const ErrorResponse = require('../../../utils/errorResponse');
import User from '../../../models/usersModel';
import sendToken from '../../../utils/utils';

export default async function handler(req, res) {
  connectDB();

  if (req.method === 'POST') {
      const { userID, accessToken } = req.body.response;

      if (!userID || !accessToken) {
        return next(
          new ErrorResponse('Please Try to Login to Facebook Again', 400)
        );
      }

      let urlGraphFacebook = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`;

      const response = await axios.get(urlGraphFacebook);

      const { id, name, email } = response.data;

      try {
        const user = await User.findOne({ email }).select('+facebookId');

        const username = name;
        const facebookId = id;
        const imageUrl = response.data.picture.data.url;

        if (!user) {
          const user = await User.create({
            username,
            email,
            facebookId,
            imageUrl,
            verified: true,
          });
          return sendToken(user, 201, res);
        }

        if (!user.facebookId) {
          user.facebookId = facebookId;
          user.verified = true;
        } else if (user.facebookId !== facebookId) {
          return next(new ErrorResponse('Invalid Credentials', 401));
        }

        if (!user.username) {
          user.username = name;
        }

        if (!user.imageUrl) {
          user.imageUrl = imageUrl;
        }

        //console.log(user);

        await user.save();
        sendToken(user, 200, res);
      } catch (error) {
        next(error);
      }
  }
}
