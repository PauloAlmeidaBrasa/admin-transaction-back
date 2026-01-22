const multer = require('multer');

const storage = multer.memoryStorage();

const uploadExcel = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(xlsx|xls)$/)) {
      return cb(new Error('Only Excel files are allowed'));
    }
    cb(null, true);
  }
});

module.exports = uploadExcel;
