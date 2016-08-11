  /**
 * Created by Admin on 19/07/2016.
 */
'use strict';
import mongoose from 'mongoose';

var BlogSchema = mongoose.Schema({
  title: String,
  author: String,
  category: String,
  content: String,
  view: Number,
  image_url: String
},{
  timestamps: true
}, {
  collection : 'Blog'
  },
  {

  }
);

export default mongoose.model('Blog', BlogSchema);

