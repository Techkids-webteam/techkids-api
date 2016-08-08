/**
 * Created by Admin on 25/07/2016.
 */
'use strict';
var multer  =   require('multer');
var file_name = "";
var path = require('path');
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './server/api/blog/images');
  },
  filename: function (req, file, callback) {
    file_name = file.originalname.slice(0, file.originalname.indexOf('.')) + '_' +  Date.now() + file.originalname.slice(file.originalname.indexOf('.'), file.originalname.length);
    callback(null, file_name);
  },
  limits: {
    fieldNameSize: 100,
    files: 2,
    fields: 5
  }

});
var upload = multer({ storage : storage}).single('userPhoto');

export function uploadImage(req, res){
  upload(req,res,function(err, file) {
    if(err) {
      return res.json({mess: err});
    }
    res.json({url: __dirname + "/images/"+file_name});
    console.log(upload);
  });
}

export function showImage(req, res) {
  res.sendFile(__dirname + "/images/" + req.params.name);
}
