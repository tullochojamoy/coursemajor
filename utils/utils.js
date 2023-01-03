const jwt = require('jsonwebtoken');
const User = require('../models/usersModel');
const ErrorResponse = require("./errorResponse");

/*
exports.sendToken = (user, statusCode, res) => {
  console.log('Send Token');

  const token = user.getSignedJwtToken();
  res.status(statusCode).json({
    success: true,
    _id: user._id,
    username: user.username,
    email: user.email,
    isSeller: user.isSeller,
    isAdmin: user.isAdmin,
    token,
  });
};
*/

exports.sendToken = (user, statusCode, res) => {
  console.log('Send Token');

  const token = user.getSignedJwtToken();
  res.status(statusCode).json({
    success: true,
    _id: user._id,
    username: user.username,
    email: user.email,
    isSeller: user.isSeller,
    isAdmin: user.isAdmin,
    token,
  });
};



/*
exports.test2 = () => {
  console.log('route hit 2');
}

export function test(){
  console.log('route hit')
}
*/