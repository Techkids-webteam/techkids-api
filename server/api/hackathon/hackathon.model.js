'use strict';
import mongoose from 'mongoose';

var TeamSchema = mongoose.Schema({
    name: String,
    member: [],
    content: String,
    group_img: [],
    like: {type: Number, default: 0},
    usr: [],
    is_like: {
      type: Boolean
    },
    video : String,
    team_name: String
  },
  {
    collection : 'hackathon-team'
  }
);

export default mongoose.model('Team', TeamSchema);
