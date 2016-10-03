'use strict';
var passport = require('../../config/passport');
import Team from './hackathon.model'

export function getData(req, res) {
  Team.find(function (err, data) {
    if(err) {
      res.send(err);
    }
    res.json(data);
  });
}

