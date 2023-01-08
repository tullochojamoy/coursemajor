const jwt = require('jsonwebtoken');
const User = require('../models/usersModel');
const ErrorResponse = require("./errorResponse");
import connectDB from '../config/db';
import mongoose from 'mongoose';
import nextConnect from 'next-connect';

class AppError extends Error{
  constructor(message, statusCode, errorCode) {
    super(message);
    this.errorCode = errorCode;
    this.statusCode = statusCode;
  }
}

const sendToken = (user, statusCode, res) => {
  console.log('Send Token');

  const token = user.getSignedJwtToken();
  return res.status(statusCode).json({
    success: true,
    _id: user._id,
    username: user.username,
    email: user.email,
    isSeller: user.isSeller,
    isAdmin: user.isAdmin,
    token,
  });
};

const preHandler = (controller) => async(req,res) =>{
  try{
    if (mongoose.connections[0].readyState) {
      return await controller(req, res);
    }

    await mongoose.connect('mongodb://0.0.0.0:27017', {
      keepAlive: true,  
      useNewUrlParser: true, 
      useUnifiedTopology: true,
    }).then(async() => {
      return await controller(req, res);
    }).catch(()=>{
      throw new Error('Database did not start correctly')
    });
  } catch(error){
    if(error instanceof AppError){
      return res.status(error.statusCode).json({ 
        message: error.message, 
        error: error.message ,
        success: false, 
      });
    }

    return res.status(500).json({ 
      message: error.message || 'Something went wrong', 
      error: error.message || 'Something went wrong',
      success: false, 
    });
  }
}

const middleware = nextConnect();
middleware.use(connectDB);


module.exports = { preHandler, middleware, sendToken, AppError };