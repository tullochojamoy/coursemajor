const mongoose = require('mongoose');
const Q = require('q');

async function connectDB(){
    try{
        if (mongoose.connections[0].readyState) {
            return true;
        }
        var deferred = Q.defer();
        await mongoose.connect('mongodb://0.0.0.0:270179', {
            keepAlive: true,  
            useNewUrlParser: true, 
            useUnifiedTopology: true,
        }, (err)=>{
            if(err) deferred.reject(false);
            else {
                console.log('DB has been started')
                deferred.resolve(true);
            }
        })
        return deferred.promise;
    } catch(error){
        console.log("Database has crashed");
        return false;
    }
};

module.exports = connectDB;