'use strict';
import Course from './course.model';
import Event from './event.model';
import Instructor from './instructor.model';

//get all
export function getCourse(req, res) {
  Course.find(function (err, course) {
    res.json({course});
  });
}

export function getEvent(req, res){
    Event.find(function(err,event){
        res.json({event});
    });
}

export function getInstructor(req, res){
    Instructor.find(function(err,instructor){
        res.json({instructor})
    });
}

// get one
export function getCourseByType(req, res){
    Course.find({type : req.params.type}, function(err, data){
        if(err){
            res.send(404);
        }else{
            res.json({data});
        }
    });
}

export function getEventById(req, res){
    Event.findById(req.params.id, function(err,data){
        if(err){
            res.send(404);
        }else{
            res.json({data});
        }
    })
}

export function getInstructorById(req, res){
    Instructor.findById(req.params.id,function(err,data){
        if(err){
            res.send(404);
        }else{
            res.json({data});
        }
    })
}

//post

export function postCourse(req, res) {
  var newCourse = {
      course_title: req.body.course_title,
      type : req.body.type,
      description : req.body.description,
      next_class : req.body.next_class,
      content : req.body.content,
      instructor_ids : req.body.instructor_ids
  };
    Course.create(newCourse, function(err,data) {
        return res.json({data});
  })
}

export function postEvent(req, res){
    var newEvent = {
        event_title : req.body.event_title,
        imgSrc : req.body.imgSrc,
        content : req.body.content
    };
    Event.create(newEvent,function(err,data){
        return res.json({data});
    })
}

export function postInstructor(req, res){
    var newInstructor = {
        name : req.body.name,
        imgSrc : req.body.imgSrc,
        course_type : req.body.course_type,
        content : req.body.content
    };
    Instructor.create(newInstructor,function(err,data){
        return res.json({data});
    })
}

//delete

export function deleteCourse(req, res) {
    Course.findById(req.body._id, function (err, data) {
        if(err){
            res.send(404);
        }else{
            data.remove(function (err, data) {
                res.json({data});
            });
        }
    })
}

export function deleteEvent(req, res){
    Event.findById(req.body._id, function(err, data){
        if(err){
            res.send(404);
        }else{
            data.remove(function(err, data){
                res.json({data})
            });
        }
    })
}

export function deleteInstructor(req, res){
    Instructor.findById(req.body._id,function(err,data){
        if(err){
            res.send(404);
        }else{
            data.remove(function(err,data){
                res.json({err,data})
            });
        }
    })
}


//edit

export function editCourse(req, res) {
    Course.findById(req.body._id, function (err,product) {
        if(err){
            res.send(404);
        }else{
            product.course_title = req.body.course_title,
            product.type = req.body.type,
            product.next_class = req.body.next_class,
            product.content = req.body.content,
            product.instructors_ids = req.body.instructors_ids
            product.save(function(err,product){
                res.json({err,product})
            });
        }
    })
}

export function editEvent(req, res){
    Event.findById(req.body._id,function(err,data){
        if(err){
            res.send(404);
        }else{
            data.event_title = req.body.event_title,
            data.imgSrc = req.body.imgSrc,
            data.content = req.body.content
            data.save(function(err,data){
                res.json({data});
            });
        }
    })
}

export function editInstructor(req, res){
    Instructor.findById(req.body._id,function(err,data){
        if(err){
            res.send(404);
        }else{
            data.name = req.body.name,
            data.imgSrc = req.body.imgSrc,
            data.course_type = req.body.course_type,
            data.content = req.body.content
            data.save(function(err,data){
                res.json({data});
            });
        }
    })
}
