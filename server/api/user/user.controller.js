'use strict';

import User from './user.model';

var config =require('../../config/environment/development');
var jwt = require('jsonwebtoken');
var md5 = require('js-md5');


var superSecret = config.secret;


export function login(req, res){
    var isLogin = false;
    User.findOne({user : req.username}, function(err, data){
        if(data.password == md5(req.body.password) ){
            isLogin = true;
        }

        if(isLogin == true){
            console.log(data.username);
            var token = jwt.sign({
                username: data.username
                }, superSecret, {
                  expiresIn: '24h' // expires in 24 hours
            });
            res.json({
                mess: "success!",
                token : token
            });
        } else {
            res.json({mess: "login fail!"})
        }
    });

}
