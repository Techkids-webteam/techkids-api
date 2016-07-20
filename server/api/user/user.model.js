'use strict';
import mongoose from 'mongoose';


var UserSchema = mongoose.Schema({
    username : String,
    password : String
  },
  {
    collection : 'user'
  }
);

export default mongoose.model('User', UserSchema);
