/**
 * Created by Admin on 04/10/2016.
 */
'use strict';
import mongoose from 'mongoose';

var UserSchema = mongoose.Schema({
    facebook_id : {
      type: String
    },
    like: []
  },
  {
    collection : 'facebook_user'
  }
);

export default mongoose.model('User', UserSchema);
