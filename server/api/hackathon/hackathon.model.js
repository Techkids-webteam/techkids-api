'use strict';
import mongoose from 'mongoose';

var TeamSchema = mongoose.Schema({
    name: String,
    member: [],
    content: String,
    group_img: [],
    point: {
      like: Number,
      share: Number,
      sum: Numer,
      user_like: []
    } 
  },
  {
    collection : 'hackathon-team'
  }
);

export default mongoose.model('Team', TeamSchema);
