const mongoose = require('mongoose');

async function connectDB(){
    try{
        if (mongoose.connections[0].readyState) {
            return true;
        }

        await mongoose.connect('mongodb://0.0.0.0:27017', {
            keepAlive: true,  
            useNewUrlParser: true, 
            useUnifiedTopology: true,
        }, (err)=>{if(err) throw new Error('Error Connecting DB')})

        mongoose.connection.on('open',()=>{
            return true;
        })
        mongoose.connection.on('error',()=>{
            return false;
        })
        mongoose.connection.on('connected',()=>{
            return true;
        })
        mongoose.connection.on('disconnected',()=>{
            return false;
        })

        console.log('DB has been started')
        //return true;
    } catch(error){
        console.log("Database has crashed")
        return false;
    }
};

module.exports = connectDB;