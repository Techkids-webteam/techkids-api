//a
'use strict';
import mongoose from 'mongoose';

var CourseSchema = mongoose.Schema({
    course_title: String,
    type : String,
    description : String,
    next_class : {},
    content : {},
    instructor_ids: []
  },
  {
    collection : 'course'
  }
);

export default mongoose.model('Course', CourseSchema);
