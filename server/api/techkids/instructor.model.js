'use strict'
import mongoose from 'mongoose'

var InstructorSchema = mongoose.Schema({
    name : String,
    imgSrc : String,
    course_type : [],
    content : String
  },
  {
    collection : 'instructor'
  }
);

export default mongoose.model('Instructor', InstructorSchema);
