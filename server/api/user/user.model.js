// 'use strict';
// var mongoose = require('mongoose');
// var crypto = require('crypto');
// var Schema = mongoose.Schema;
//
// // Define User Schema
// var userSchema = new Schema({
//   username: {
//     type: String,
//     index: true,
//     require: true
//   },
//   email: {
//     type: String,
//     unique: true,
//     require: true,
//     lowercase: true
//   },
//   hashed_password: {
//     type: String,
//     require: true
//   },
//   salt: {
//     type: String
//   }
// });
//
// userSchema.plugin(CreateUpdatedAt);
//
// // Define virtual fullname attribute
// userSchema.virtual('fullname').get(function() {
//   return this.fistname + ' ' + this.lastname;
// });
//
// userSchema.virtual('password')
//   .set(function(password) {
//     this._password = password
//     this.salt = this.makeSalt()
//     this.hashed_password = this.encryptPassword(password)
//   })
//   .get(function() { return this._password })
//
// userSchema.path('username').validate(function (username) {
//   return username.length;
// }, 'Username cannot be blank');
//
// userSchema.path('username').validate(function (username, fn) {
//   var User = mongoose.model('User')
//   // Check only when it is a new user or when email field is modified
//   if (this.isNew || this.isModified('username')) {
//     User.find({ username: username }).exec(function (err, users) {
//       fn(!err && users.length === 0)
//     })
//   } else fn(true)
// }, 'Username already exists');
//
//
// userSchema.path('email').validate(function (email) {
//   return email.length
// }, 'Email cannot be blank');
//
// userSchema.path('email').validate(function (email, fn) {
//   var User = mongoose.model('User');
//   // Check only when it is a new user or when email field is modified
//   if (this.isNew || this.isModified('email')) {
//     User.find({ email: email }).exec(function (err, users) {
//       fn(!err && users.length === 0)
//     })
//   } else fn(true)
// }, 'Email already exists');
//
// userSchema.path('hashed_password').validate(function (password) {
//   return password.length
// }, 'Password cannot be blank');
//
// // Do some thing before saving data
// userSchema.pre('save', function(next) {
//   console.log('userSchema');
//   next();
// });
//
// // Do some thing after saving data
// userSchema.post('save', function(obj, next) {
//   console.log('Finished %s', obj._id.toString());
//   next();
// });
//
// // Define methods for User Model
// userSchema.methods = {
//
//   // Authenticate - check if the passwords are the same
//   authenticate: function (password) {
//     return this.encryptPassword(password) === this.hashed_password
//   },
//
//   // Make salt
//   makeSalt: function () {
//     return Math.round((new Date().valueOf() * Math.random())) + ''
//   },
//
//   // Encrypt password
//   encryptPassword: function (password) {
//     if (!password) return ''
//     var encrypred
//     try {
//       encrypred = crypto.createHmac('sha1', this.salt).update(password).digest('hex')
//       return encrypred
//     } catch (err) {
//       return ''
//     }
//   }
// }
//
// export default mongoose.model('User', userSchema);
