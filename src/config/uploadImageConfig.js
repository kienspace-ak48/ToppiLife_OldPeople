const multer = require('multer');
const path = require('path');
const myPath = require('./myPath.js')
const fs = require('fs')

const uploadDir = path.join(myPath.root,'src/public/uploads');

if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

const storageImage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, uploadDir)
    },
    filename: function(req, file, cb){
        const uniqueName = Date.now()+'-'+Math.round(Math.random()*1e9)+path.extname(file.originalname);
        cb(null, uniqueName);
    }
});
//chi cho phep upload file anh
function fileFilter (req, file, cb){
    const allowed = /jpeg|jpg|png|gif/; // regex
      const ext = path.extname(file.originalname).toLowerCase();
    
      if (allowed.test(ext)) {
        cb(null, true);
      } else {
        cb(new Error('Chỉ được upload ảnh (jpeg|jpg|png|gif)!'), false);
      }
}

const upload = multer({storage: storageImage, fileFilter});
module.exports = upload;