const multer = require("multer");
const path = require("path");

// Multer config
module.exports.uploadImage = multer({
    dest: 'uploads/'
    //storage: multer.diskStorage({}),
    /*
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        //if (ext !== "jpg" && ext !== ".jpeg" && ext !== ".png") {
        //    cb(new Error("File type is not supported"), false);
        //    return;
        //}
        cb(null, true);
    },
    */
});

// Multer config
module.exports.upload = multer({ dest: 'uploads/' });

// Multer Video config
module.exports.uploadVideo = multer({
    storage: multer.diskStorage({}),
    destination: './uploads',
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        //if (ext !== "jpg" && ext !== ".jpeg" && ext !== ".png") {
        //    cb(new Error("File type is not supported"), false);
        //    return;
        //}
        cb(null, true);
    },
});