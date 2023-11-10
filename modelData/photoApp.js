"use strict";
/* jshint node: true */
/*
 * Model data for Project #5 - the photo sharing site.
 * This module returns an object called Models with the following functions:
 *
 * Models.userListModel - A function that returns the list of users on the system. The
 * list is returned as an array of objects containing:
 *   _id  (string) - The ID of the user.
 *   name (string) - The name of the user.
 *   location (string) - The location of the user.
 *
 * Models.userModel - A function that returns the info of the specified user. Called
 * with an user ID (id), the function returns n object containing:
 *   _id  (string) - The ID of the user.
 *   name (string) - The name of the user.
 *   location (string) - The location of the user.
 *
 * Models.photoOfUserModel - A function that returns the photos belong to
 * the specified user. Called  with an user ID (id), the function returns an object containing:
 *   _id  (string) - The ID of the photo
 *   date_time (date) - he date and time the picture was taken in ISO format.
 *   file_name (string) - The file name in the image directory of the picture.
 *   user_id (string) - The user id of the picture's owner.
 *   comments: {array of objects} - An array of comment objects containing the properties:
 *        _id  (string) - The ID of the comment.
 *        date_time (date) - The date the comment was made in ISO format.
 *        comment (string) - The text of the comment.
 *        user: {object} The user info (see userMode for format) who made the comment
 *        photo_id: (string) - The ID of the photo the comment belongs to.
 *
 * Models.schemaModel - A function that returns the test info from the fake schema.
 *                           The function returns an object containing:
 *   _id (string) - The ID of the schema
 *   __v (number) - The version number
 *   load_date_time (date) - The date the schema was made in ISO format.
 *
 * 
 */
(function() {
   // Create fake test Schema
   var schemaInfo = {
      load_date_time: "Fri Apr 29 2016 01:45:15 GMT-0700 (PDT)",
      __v: 0,
      _id: "57231f1b30e4351f4e9f4bf6"
   };

   // Create init users.

   var tugou = {_id: "57231f1a30e4351f4e9f4bd7", name: "Tugou", 
             location: "China"};
   var sharpei = {_id: "57231f1a30e4351f4e9f4bd8", name: "Shar Pei", 
             location: "China"};
   var chongqing = {_id: "57231f1a30e4351f4e9f4bd9", name: "Chongqing dog", 
             location: "China"};
   var tang = {_id: "57231f1a30e4351f4e9f4bda", name: "Tang dog", 
             location: "China"};

   var users = [tugou, sharpei, chongqing, tang];

   // Create initial photos.
   var photo1 = {_id: "57231f1a30e4351f4e9f4bdd", date_time: "2012-08-30 10:44:23", file_name: "tugou1.jpg", user_id: tugou._id};
   var photo2 = {_id: "57231f1a30e4351f4e9f4bde", date_time: "2009-09-13 20:00:00", file_name: "tugou2.jpg", user_id: tugou._id};
   var photo3 = {_id: "57231f1a30e4351f4e9f4bdf", date_time: "2009-09-13 20:05:03", file_name: "tugou3.jpg", user_id: tugou._id};
   var photo4 = {_id: "57231f1a30e4351f4e9f4be0", date_time: "2013-11-18 18:02:00", file_name: "sharpei.jpg", user_id: sharpei._id};
   var photo5 = {_id: "57231f1a30e4351f4e9f4be1", date_time: "2013-09-20 17:30:00", file_name: "chongqing.jpg", user_id: chongqing._id};
   var photo6 = {_id: "57231f1a30e4351f4e9f4be2", date_time: "2009-07-10 16:02:49", file_name: "tang.jpg", user_id: tang._id};

   var photos = [photo1, photo2, photo3, photo4, photo5, photo6];

   // Create initial comments.
   var comment1 = {
      _id: "57231f1a30e4351f4e9f4be9",
      date_time: "2012-09-02 14:01:00",
      comment: "Tugou are believed to have evolved from wolves, following their migration and distributes widely across China.", 
      user: tugou, photo_id: photo1._id
   };

   var comment2 = {
      _id: "57231f1a30e4351f4e9f4bea",
      date_time: "2013-09-06 14:02:00",
      comment: "A dog breed from southern China. Traditionally kept as a property guardian," + 
      "the Shar Pei was driven to the brink of extinction in the 20th century.", 
      user: sharpei, photo_id: photo4._id
   };

   var comment3 = {
      _id: "57231f1a30e4351f4e9f4beb",
      date_time: "2013-09-08 14:06:00",
      comment: "An ancient mastiff Tugou historically used for hunting and guarding in Chongqing. " + 
      "Today this breed is prized as a fearless and tough protector of their family and home.", 
      user: chongqing, photo_id: photo5._id
   };

   var comment4 = {
      _id: "57231f1a30e4351f4e9f4bec",
      date_time: "2009-09-14 18:07:00",
      comment: "An ancient medium-sized dog breed indigenous to southern China. " + 
      "Tang dogs are prized as a companion and watch dog but are also occasionally used for hunting and as meat dogs", 
      user: tang, photo_id: photo6._id
   };

   var comments = [comment1, comment2, comment3, comment4];

   comments.forEach(function (comment) {
      var photo = photos.filter(function (photo) {
         return (photo._id === comment.photo_id);
      })[0]; //only one match. return the content of the match inside the array

      if (!photo.comments) {
         photo.comments = [];
      }
      photo.comments.push(comment);
   });

   var userListModel = function() {
      return users;
   };

   var userModel = function(userId) {
      for (var i = 0; i < users.length; i++) {
         if (users[i]._id === userId) {
            return users[i];
         }
      }
      return null;
   };

   var photoOfUserModel = function(userId) {
      return photos.filter(function (photo) {
         return (photo.user_id === userId);
      });
   };

   var schemaModel = function() {
      return schemaInfo;
   };

   var models =  {
      userListModel: userListModel,
      userModel: userModel,
      photoOfUserModel: photoOfUserModel,
      schemaInfo: schemaModel
   };

   if( typeof exports !== 'undefined' ) {
      // We're being loaded by the Node.js module loader ('require') so we use its
      // conventions of returning the object in exports.
      exports.models = models;
   } else {
      // We're not in the Note.js module loader so we assume we're being loaded
      // by the browser into the DOM.
      window.models = models;
   }
})();
