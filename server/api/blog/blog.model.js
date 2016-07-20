/**
 * Created by Admin on 19/07/2016.
 */
'use strict';
import mongoose from 'mongoose';

var BlogSchema = mongoose.Schema({
  title: String,
  author: String,
  category: String,
  date: String,
  content: String,
  view: Float64Array,
});
