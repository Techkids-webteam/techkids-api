/**
 * Created by Admin on 19/07/2016.
 */
'use strict';

import Blog from './blog.model';
import Category from './category.model'


//get all
export function getBlogs(req, res) {
  Blog.find().sort('-createdAt').exec(function (err, blog) {
    if(err){
      res.json(err);
    }
    else res.json(blog);
  });
}

export function getBlogsByPage(req, res) {
  Blog.find().sort('-createdAt').limit(8).skip((req.params.page-1)*8).exec(function (err, blog) {
    if(err){
      res.send(err);
    }
    else res.json(blog);
  });
}

export function getPage(req, res) {
  Blog.count(function (err, number) {
    var page = 0;
    if(number/8 - Math.floor(number/8) == 0) page = number / 8;
    else page =  Math.floor( number / 8) + 1;
    console.log(page);
    var listpage = [];
    for(var i=1; i<= page; i++){
      listpage.push(i);
    }
    res.json(listpage);
  })
}

export function getBlogsByCategory(req, res) {
  Blog.find({'category' : req.params.category}).sort('-createdAt').exec(function (err, blog) {
    if(err){
      res.send(err);
    }
    else res.json(blog);
  })
}
//
// var addFunc = function add(a, b, callback){
//   var c = a + b;
//   callback(c);
// }
// addFunc(3,4, function(c){
//   console.log(c);
// })


export function getBlogsByCategoryAndPage(req, res) {
  var page = 0;
  var findBlog = function (page) {
    Blog.find({'category' : req.params.category}).sort('-createdAt').limit(8).skip((req.params.page-1)*8).exec(function (err, blog) {
      if(err){
        res.send(err);
      }
      else {
        res.json({
          Page: req.params.page,
          TotalPage: page,
          items: blog
        });
      }
    })
  };
  var count = function(findBlog){
    Blog.count(function (err, number) {
      if(number/8 - Math.floor(number/8) == 0) page = number / 8;
      else page =  Math.floor( number / 8) + 1;
      findBlog(page);
    });
  };
  count(findBlog);
}

export function getCategories(req, res) {
  Category.find(function (err, category) {
    if(err){
      res.json(err);
    }
    else res.json(category);
  });
}

export function getTrendingBlog(req, res) {
  Blog.find().limit(3).sort('-view').exec(function (err, blog) {
      if(err) {
        console.log(err);
        res.send(err);
      }
      else res.json({blog});
    });
}

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
