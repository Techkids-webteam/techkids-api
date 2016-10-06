'use strict';

var express = require('express');
var controller = require('./hackathon.controller.js');

var router = express.Router();

router.get('/data', controller.getData);
router.post('/like', controller.like);


module.exports = router;
