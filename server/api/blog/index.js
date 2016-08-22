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
router.get('/getBlogsByPage/:page', controller.getBlogsByPage);
router.get('/getBlogsByCategory/:category', controller.getBlogsByCategory);

router.get('/getCategories', controller.getCategories);

//get three most view blog
router.get('/getTrendingBlog', controller.getTrendingBlog);

//get one
router.get('/getBlog/:id', controller.getBlogById);
router.get('/getCategory/:id', controller.getCategoryById);

//create
router.post('/postBlog', controller.postBlog);

router.post('/postCategory', controller.postCategory);

router.post('/editCategory', controller.editCategory);

router.post('/editBlog', controller.editBlog);

//delete
router.post('/deleteBlog', controller.deleteBlog);

router.post('/deleteCategory', controller.deleteCategory);

//image
router.get('/images/:name', uploadImage.showImage);
router.post('/uploadImage', uploadImage.uploadImage);
router.get('/getAllImages', uploadImage.getAllImages);

module.exports = router;

