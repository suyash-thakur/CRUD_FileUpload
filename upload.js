const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const dotenv = require('dotenv');
const path = require('path');
const Employee = require('./Models/Employee');
   dotenv.config();

   aws.config.update({
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    accessKeyId: process.env.ACCESS_KEY_ID,
    region: 'ap-south-1'
   });

   const s3 = new aws.S3();

   async function uploadFilter(req, file, cb){
       const fileName = path.parse(file.originalname).name;
       await Employee.findOne({ _id: fileName }).then(emp => {
           console.log(emp);
           if (!emp) {
               cb(new Error('Wrong file name. No Employee found of this file Name'),
                   false);
           } else { 
            cb(null, true);
           }
       });
    
};
const upload = multer({
    fileFilter: uploadFilter,
    storage: multerS3({
    acl: 'public-read',
    s3,
       bucket: 'profile-picture-project',
       onError : function(err, next) {
        console.log('error', err);
        res.render('error');
       },
    key:  function(req, file, cb) {
      req.file = file.originalname;
      cb(null, 'profilepicture/' + file.originalname);
     }
    })
   });

   module.exports = upload;
