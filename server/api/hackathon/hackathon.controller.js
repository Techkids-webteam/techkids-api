'use strict';
var passport = require('../../config/passport');
import Team from './hackathon.model'
import User from './user.model'
var request = require('request');

function isInArray(list, string) {
  return list.indexOf(string.toLowerCase()) > -1;
}

function isEmpty(obj) {
  for(var prop in obj) {
    if(obj.hasOwnProperty(prop))
      return false;
  }

  return true && JSON.stringify(obj) === JSON.stringify({});
}


export function getData(req, res) {
  console.log(req.body);
  var user ;
  if(!isEmpty(req.body)){
      var fbRes = req.body;
      console.log(req.body)
      console.log(fbRes);
      user = fbRes.facebook_id;
      Team.find().sort('-like').exec(function (err, data) {
          if(err) {
            res.send(err);
          }
          else {

            data.forEach(function (team) {
              if(isInArray(team.usr, user)) team.is_like = true;
              else team.is_like = false;
            });
            res.json({items: data, mess: "da login"});
          }
        });
  }
  else {
    Team.find(function (err, data) {
      res.json({items: data, mess:"chua co access_token"});
    })
  }
}

export function like(req, res) {
  var access_token = req.body.access_token;
  var user ;
  if(access_token){
    request("https://graph.facebook.com/debug_token?input_token="+access_token+"&access_token=522462741276677|LvD7fxEAHguUoFwTdPOHgW38ye4", function(error, response, body) {
      var fbRes = JSON.parse(body);
      if(fbRes.data.is_valid && req.body.id){
        Team.findById(req.body.id, function (err, data) {
          console.log("err: "+ err);
          if(err) res.json({code: 0, mess: err});
          else{
            console.log(data.usr);
            if(!isInArray(data.usr, fbRes.data.user_id)) {
              data.usr.push(fbRes.data.user_id);
              data.like += 1;
              data.save(function (err, data) {
                if(err) res.json({code: 0, mess: err});
                else res.json({code : 1, mess: "ok"});
              })
            } else {
              res.json({code : 0, mess: "da like roi"});
            }
          }
        })
      }
    });
  }
}
