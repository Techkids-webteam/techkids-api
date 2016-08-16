/**
 * Created by Admin on 25/07/2016.
 */
'use strict';

import Image from './image.model';

var multer  =   require('multer');
var file_name = "";
var path = require('path');
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './api/blog/images');
  },
  filename: function (req, file, callback) {
    file_name = file.originalname.slice(0, file.originalname.indexOf('.')) + '_' +  Date.now() + file.originalname.slice(file.originalname.indexOf('.'), file.originalname.length);
    callback(null, file_name);
  },
  limits: {
    fieldNameSize: 100,
    files: 1,
    fields: 5
  }

});
var upload = multer({ storage : storage}).single('userPhoto');

export function uploadImage(req, res){
  upload(req,res,function(err) {
    if(err) {
      return res.json({mess: err});
    }
    else {
      var response = "techkids.vn:9196/api/blog/images/" + file_name;
      var newImg = {
        url : response
      };
      Image.create(newImg, function (err, data) {
        console.log(data);
      });
      res.json({url:  response});
    }
  });
}

export function showImage(req, res) {
  res.sendFile(__dirname + "/images/" + req.params.name);
}

export function getAllImages(req, res) {
  Image.find().sort('-createdAt').exec(function (err, data) {
    if(err){
      res.send(err);
    }
    else res.json(data);
  })
}
