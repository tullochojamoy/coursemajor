const mongoose = require('mongoose');

const connectDB = async() => {
    await mongoose.connect('mongodb://0.0.0.0:27017', {
        keepAlive: true, 
        //useCreateIndex: true, 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        //useFindAndModify: true
    });
    console.log('DB has been started')
};

module.exports = connectDB;