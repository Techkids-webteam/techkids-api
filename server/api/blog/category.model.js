/**
 * Created by Admin on 19/07/2016.
 */
'use strict';
import mongoose from 'mongoose';

var CategorySchema = mongoose.Schema({
    title: String,
    description: String,
    countPost: Number
  },
  {
    timestamps: true
  },
  {
    collection : 'category'
  }
);

export default mongoose.model('Category', CategorySchema);

