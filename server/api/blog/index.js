'use strict';

var express = require('express'),
    controller = require('./blog.controller'),
    config = require('../../config/environment/development'),
    uploadImage = require('./upload'),
    jwt = require('jsonwebtoken'),
    superSecret = config.secret;

var router = express.Router();
//get all
router.get('/getBlogs', controller.getBlogs);
router.get('/getCategories', controller.getCategories);

//get three most view blog

// router.get('/getTrendingBlog', controller.getTrendingBlog);

//get one
router.get('/getBlog/:id', controller.getBlogById);
router.get('/getCategory/:id', controller.getCategoryById);

//create
router.post('/postBlog', function(req, res){
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, superSecret, function(err, decoded) {

      if (err) {
        res.status(403).send({
          success: false,
          message: 'Failed to authenticate token.'
        });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        controller.postBlog(req, res);
      }
    });

  }
});

router.post('/postCategory', function(req, res){
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, superSecret, function(err, decoded) {

      if (err) {
        res.status(403).send({
          success: false,
          message: 'Failed to authenticate token.'
        });
      } else {
        req.decoded = decoded;
        controller.postCategory(req, res);
      }
    });

  }
});

router.post('/editCategory', function(req, res){
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, superSecret, function(err, decoded) {

      if (err) {
        res.status(403).send({
          success: false,
          message: 'Failed to authenticate token.'
        });
      } else {
        req.decoded = decoded;
        controller.editCategory(req, res);
      }
    });

  }
});

router.post('/editBlog', function(req, res){
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, superSecret, function(err, decoded) {

      if (err) {
        res.status(403).send({
          success: false,
          message: 'Failed to authenticate token.'
        });
      } else {
        req.decoded = decoded;
        controller.editBlog(req, res);
      }
    });

  }
});

//delete
router.post('/deleteBlog', function(req, res){
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, superSecret, function(err, decoded) {

      if (err) {
        res.status(403).send({
          success: false,
          message: 'Failed to authenticate token.'
        });
      } else {
        req.decoded = decoded;
        controller.deleteBlog(req, res);
      }
    });

  }
});

router.post('/deleteCategory', function(req, res){
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, superSecret, function(err, decoded) {

      if (err) {
        res.status(403).send({
          success: false,
          message: 'Failed to authenticate token.'
        });
      } else {
        req.decoded = decoded;
        controller.deleteCategory(req, res);
      }
    });

  }
});

//image
router.get('/images/:name', uploadImage.showImage);
router.post('/uploadImage', uploadImage.uploadImage);


module.exports = router;

