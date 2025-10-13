const multer = require('multer');
const path = require('path');
const fs= require('fs')

// Lùi 2 cấp: từ config/ -> gốc dự án -> cha của dự án
const uploadDir = path.join(__dirname, '..', '..', 'uploads');

// Tạo folder nếu chưa có
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storageImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // thư mục lưu ảnh
  },
  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() +
      '-' +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

// chỉ cho phép file ảnh
function fileFilter(req, file, cb) {
  const allowed = /jpeg|jpg|png|gif/; // regex
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowed.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Chỉ được upload ảnh (jpeg|jpg|png|gif)!'), false);
  }
}

const upload = multer({ storage: storageImage, fileFilter });

module.exports = upload;
