'use strict';
import mongoose from 'mongoose';

var EventSchema = mongoose.Schema({
    event_title : String,
    imgSrc : String,
    content : String
  },
  {
    collection : 'event'
  }
);

export default mongoose.model('Event', EventSchema);
