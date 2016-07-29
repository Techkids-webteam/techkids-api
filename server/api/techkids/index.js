'use strict';

var express = require('express');
var controller = require('./techkids.controller.js');
var jwt = require('jsonwebtoken');
var config =require('../../config/environment/development');

var superSecret = config.secret;

var router = express.Router();

// get all
router.get('/course',controller.getCourse);
router.get('/event', controller.getEvent);
router.get('/instructor', controller.getInstructor);

//get one
router.get('/course/:type', controller.getCourseByType);
router.get('/event/:id', controller.getEventById);
router.get('/instructor/:id', controller.getInstructorById);

//post
router.post('/post-course',  function(req, res){
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
            controller.postCourse(req, res);
	        // next(); // make sure we go to the next routes and don't stop here
	      }
	    });
    }
});
router.post('/post-event',  function(req, res){
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
            controller.postEvent(req, res);
	        // next(); // make sure we go to the next routes and don't stop here
	      }
	    });

    }
});

router.post('/post-instructor',   function(req, res){
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
            controller.postInstructor(req, res);
	        // next(); // make sure we go to the next routes and don't stop here
	      }
	    });
    }
});

//delete

router.post('/delete-course',  function(req, res){
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
            controller.deleteCourse(req, res);
	        // next(); // make sure we go to the next routes and don't stop here
	      }
	    });

    }
});

router.post('/delete-event', function(req, res){
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
            controller.deleteEvent(req, res);
	        // next(); // make sure we go to the next routes and don't stop here
	      }
	    });

    }
});

router.post('/delete-instructor', function(req, res){
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
            controller.deleteInstructor(req, res);
	        // next(); // make sure we go to the next routes and don't stop here
	      }
	    });

    }
});

//edit
router.post('/edit-course', function(req, res){
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    console.log(req.headers['x-access-token']);
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
            controller.editCourse(req, res);
	        // next(); // make sure we go to the next routes and don't stop here
	      }
	    });

    }
});



router.post('/edit-instructor', function(req, res){
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
            controller.editInstructor(req, res);
	        // next(); // make sure we go to the next routes and don't stop here
	      }
	    });
    }
});


module.exports = router;
