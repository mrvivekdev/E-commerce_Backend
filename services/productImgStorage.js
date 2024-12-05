const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, '../public/homepageServe/productImage'));
    },
    filename: function (req, file, cb) {
      cb(null, `${file.originalname}`);
    }
  })
  
   //${req.user._id}

  const productImg = multer({ storage: storage });
  module.exports = productImg;