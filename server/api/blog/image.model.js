// /**
//  * Created by Admin on 11/08/2016.
//  */
'use strict';
import mongoose from 'mongoose';

var ImageSchema = mongoose.Schema({
    url: String
  }, {
    collection : 'images'
  }
);

export default mongoose.model('Image', ImageSchema);
