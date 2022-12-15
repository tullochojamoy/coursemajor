const mongoose = require('mongoose');

const CoursesSchema = new mongoose.Schema({
    imageKey: {
        type: String,
        required: [true, "Please upload a picture"],
    },
    title: {
        type: String,
        required: [true, "Please provide a title"],
    },
    description: {
        type: String,
        required: [true, "Please provide a description"],
    },
    price: {
        type: Number,
        required: [true, "Please enter a price"],
    },
    published: {
        type: Boolean,
        required: true,
        default: false
    },
    star: {
        type: Number,
    },
    seller: { 
        type: mongoose.Schema.Types.ObjectID, 
        ref: 'User',
        required: [true, "Please ensure your logged in"] 
    },
    category: {
        type: String,
        //required: true
    },
    subCategory: {
        type: String,
        //required: true
    },
    tags: {
        type: String,
        //required: true
    },
});

//module.exports = mongoose.model('Courses', CoursesSchema);
module.exports = mongoose.models.Courses || mongoose.model('Courses', CoursesSchema);