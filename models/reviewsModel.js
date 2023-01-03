const mongoose = require('mongoose');

const ReviewsSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a title"],
    },
    message: {
        type: String,
        //required: [true, "Please provide a title"],
    },
    star: {
        type: Number,
        required: [true, "Please click a star"],
    },
    course: { 
        type: mongoose.Schema.Types.ObjectID, 
        ref: 'Courses',
        required: [true, "No courses found for this review"],
    },
    user: { 
        type: mongoose.Schema.Types.ObjectID, 
        ref: 'User',
        required: [true, "Please ensure you are logged in"],
    },
    time: { 
        type: Date,
        required: true
    },
});

/*
module.exports = mongoose.model('Reviews', ReviewsSchema);
*/
module.exports =
  mongoose.models.Reviews || mongoose.model('Reviews', ReviewsSchema);