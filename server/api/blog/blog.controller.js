/**
 * Created by Admin on 19/07/2016.
 */
'use strict';

import Blog from './blog.model';
import Category from './category.model'


//get all
export function getBlogs(req, res) {
  Blog.find(function (err, blog) {
    if(err){
      res.json(err);
    }
    else res.json(blog);
  });
}

export function getCategories(req, res) {
  Category.find(function (err, category) {
    if(err){
      res.json(err);
    }
    else res.json(category);
  });
}

// export function getTrendingBlog(req, res) {
//   Blog.find({
//       skip:0, // Starting Row
//       limit:3, // Ending Row
//       sort:{
//         view: -1 //Sort by Date Added DESC
//       }
//     }
//     ,function (err, data) {
//     if(err) {
//       console.log(err);
//       res.send(err);
//     } else {
//       res.json({data});
//     }
//   });
// }

//get by id
export function getBlogById(req, res){
  Blog.findById(req.params.id, function(err,blog){
    if(err){
      res.json(err);
    }
    else{
      blog.view += 1;
      blog.save();
      res.json(blog);
    }
  })
}

export function getCategoryById(req, res){
  Category.findById(req.params.id, function(err,category){
    if(err){
      res.json(err);
    }
    else{
      res.json(category);
    }
  })
}

//post
export function postBlog(req, res) {
  var newBLog = {
    title: req.body.title,
    author: req.body.author,
    category: req.body.category,
    date: req.body.date,
    content: req.body.content,
    view: 0,
    image_url: req.body.image_url
  };
  Blog.create(newBLog, function(err,data) {
    if (err) return res.send(err);
    else {
      Category.findOne({title: req.body.category}, function (err, category) {
        if(!err) {
          console.log(category);
          console.log("Cant find category");
        }
        else{
          category.countPost +=1;
          category.save();
        }
      });
      res.json({data});
    }
  });
}

export function postCategory(req, res) {
  var newCategory = {
    title: req.body.title,
    description: req.body.description,
    countPost: 0
  };
  Category.create(newCategory, function (err, data) {
    if(err) res.send(err);
    else res.json({data});
  })
}

//edit
export function editCategory(req, res) {
  Category.findById(req.body._id, function (err, data) {
    if (err) res.send(err);
    else {
        data.title = req.body.title;
        data.description= req.body.description;
        data.save();
        res.json(data);
    }
  });
}

export function editBlog(req, res) {
  Blog.findById(req.body._id, function (err, data) {
    if (err) res.send(err);
    else {
      Category.findOne({title: req.body.category}, function (err, category) {
        if(!err) console.log(category);
        else{
          category.countPost +=1;
          category.save();
        }
      });
      Category.findOne({title: data.category}, function (err, category) {
        if(!err) console.log(category);
        else{
          category.countPost -=1;
          category.save();
        }
      });

      //edit
      data.title = req.body.title;
      data.author = req.body.author;
      data.category = req.body.category;
      data.date = req.body.date;
      data.content = req.body.content;
      data.image_url = req.body.image_url;
      data.save();
      res.json(data);
    }
  });
}

//delete
export function deleteBlog(req, res) {
  Blog.findById(req.body._id, function (err, data) {
    if (err) res.send(err);
    else {
      Category.findOne({title: data.category}, function (err, category) {
        if(!err) console.log(category);
        else{
          category.countPost -=1;
          category.save();
        }
      });
      data.remove(function (err, blog) {
        res.json(blog);
      });
    }
  });
}

export function deleteCategory(req, res) {
  Category.findById(req.body._id, function (err, data) {
    if (err) res.send(err);
    else {
      data.remove(function (err, category) {
        res.json(category);
      });
    }
  });
}
