const multer = require('multer');
const path = require('path');
const fs = require('fs');
const myPath = require('./myPath');

//
const uploadDir = path.join(myPath.root, '/www/vids'); 
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage configuration
const storege = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, uploadDir);
    },
    filename: (req, file, cb)=>{
        console.log(file)
        cb(null, Date.now()+'-'+file.originalname.toLowerCase());
    }
});
// File filter to accept only video files
const fileFilter  = (req, file, cb)=>{
    const allowedTypes = /mp4|mov|avi|mkv/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if(mimetype && extname){
        return cb(null, true);
    } else {
        cb(new Error('Only video files are allowed!'));
    }   
};
// Multer upload configuration
const uploadVideo = multer({
    storage: storege,
    limits: {fileSize: 100*1024*1024}, // 100 MB limit
    fileFilter: fileFilter
});
module.exports = uploadVideo;