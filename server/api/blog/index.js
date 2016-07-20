'use strict';

var express = require('express'),
    controller = require('./blog.controller'),
    config = require('../../config/environment/development'),
    superSecret = config.secret;

var router = express.Router();



module.exports = router;
