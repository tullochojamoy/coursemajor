//import jwt from 'jsonwebtoken';
const jwt = require('jsonwebtoken');
const User = require('../models/usersModel');
const ErrorResponse = require("../utils/errorResponse");

exports.isAuth = async (req, res, next) => {
    let token;
    //let decodedData;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return next(new ErrorResponse("Not authorized to access this route", 401));
    }

    const isCustomAuth = token.length < 500;

    try {

      if (token && isCustomAuth) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded._id);
        if (!user) {
            return next(new ErrorResponse("No user found with this id", 404));
        }
        req.user = user;
      } else {
        const decodedData = jwt.decode(token);
        const user = await User.find({googleId: decodedData?.sub, email: decodedData?.email});

        //console.log(user[0]);
        if (!user) {
            return next(new ErrorResponse("No user found with this id", 404));
        }

        req.user = user[0];
      }

        next();
    } catch (error) {
        return next(new ErrorResponse("Not authorized to access this route", 401))
    }
};

  
/*
  exports.isAuth = async(req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    console.log(token);
    jwt.verify(
      token,
      process.env.JWT_SECRET,
      (err, decode) => {
        if (err) {
          res.status(401).send({ message: 'Invalid Token' });
          console.log("Not work")
        } else {
          req.user = decode;
          console.log(`This is decode ${decode}`);
          console.log(`This is req.user ${req.user}`);
          console.log(req.user);
          next();
        }
      }
      );
    } else {
      console.log("No Token");
      res.status(401).send({ message: 'No Token' });
    }
  };
*/

  exports.isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(401).send({ message: 'Invalid Admin Token' });
    }
  };
  
  exports.isSeller = (req, res, next) => {
  if (req.user && req.user.isSeller) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Seller Token' });
  }
};

exports.isSellerOrAdmin = (req, res, next) => {
  if (req.user && (req.user.isSeller || req.user.isAdmin)) {

    next();
  } else {
    res.status(401).send({ message: 'Invalid Admin/Seller Token' });
  }
};