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
  console.log(newBLog);
  Blog.create(newBLog, function(err,data) {
    if (err) return res.json(err);
    Category.findOne({title: req.body.category}, function (err, category) {
      if(!err) console.log(category);
      else{
        category.countPost +=1;
        category.save();
      }
    });
    res.json({data});
  })
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
