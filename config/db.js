const mongoose = require('mongoose');

const connectDB = async() => {
    await mongoose.connect(process.env.MONGO_URI, {
        keepAlive: true, 
        //useCreateIndex: true, 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        //useFindAndModify: true
    });
    console.log('DB has been started')
};

module.exports = connectDB;