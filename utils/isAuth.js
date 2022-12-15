const { promisify } = require('util');
//import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import User from '../models/usersModel';

const isAuth = (handler) => {
  return async (req, res) => {
    // Get token and check if it exists
    let token;
    //console.log('1');
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Please log in to get access.',
      });
    }

    const isCustomAuth = token.length < 500;
    try {
      if (token && isCustomAuth) {
        // Verify token
        console.log('if problem occur then promissify is the problem');
        const decoded = await promisify(jwt.verify)(
          token,
          process.env.JWT_SECRET
          );
        

        // Check if user exists with refresh token
        const currentUser = await User.findById(decoded._id);
        if (!currentUser) {
          return res.status(401).json({
            success: false,
            message: 'The user belonging to this token no longer exist.',
          });
        }

        // Grant access to protected route
        req.user = currentUser;
      } else {
        // Verify token
        //const decodedData = await promisify(jwt.decode)(token);
        const decodedData = await jwt.decode(token);
        const user = await User.find({
          googleId: decodedData?.sub,
          email: decodedData?.email,
        });
        
        if (!user) {
          //return next(new ErrorResponse('No user found with this id', 404));
          return res.status(401).json({
            success: false,
            message: 'The user belonging to this token no longer exist.',
          });
        }
        req.user = user[0];
        //console.log(req.user);
      }
      
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Please log in to get access.',
      });
    }
  };
};

export default isAuth;
