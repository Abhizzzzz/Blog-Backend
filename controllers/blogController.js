// this is needed to importing expressjs into our application.
const express = require('express')
// importing mongoose
const mongoose = require('mongoose')
// Need to import the model here
const BlogModel = mongoose.model('Blog')
// importing shortid
const shortid = require('shortid')
// importing libs/response
const response = require('./../libs/response')
// importing libs/time
const time = require('./../libs/timeLib')
// importing checkLib
const check = require('./../libs/checkLib')
// importing LoggerLib
const logger = require('./../libs/loggerLib')


let helloWorld = (req,res) =>{
    // shows the output on the api
    res.send('Hello World!');
}
let printExample = (req,res) =>{
    // shows the output on the api
    res.send('Print examples!');
}

// callback function for route parameter
let testRoute = (req,res) =>{
    console.log(req.params);
    // shows the output on the api
    res.send(req.params);
}

// callback function for query parameter
let testQuery = (req,res) =>{
    console.log(req.query);
    // shows the output on the api
    res.send(req.query);
}

// callback function for body parameter
let testBody = (req,res) =>{
    console.log(req.body);
    // shows the output on the api
    res.send(req.body);
}


// to see all blogs
let allBlogs = (req,res) =>{
    // taking mongoose object model
    BlogModel.find()
    // we are deselecting the __v and _id by providing minus infront  of it,mongodb has a field of _id and __v which we dont want to show to users thats why we are deselcting it here
    .select('-__v -_id')
    // lean is used to make it a plain javascript object instead of mongoose object,where we can't use mongoose methods to it anymore like save,find,remove etc
    .lean()
    .exec((err,result)=>{
        if(err){
            logger.error(err.message,'Blog Controller->allBlogs',10)
            let apiResponse = response.generate(true,'Failed to find blog details',500,null);
            res.send(apiResponse);
        }
        else if(check.isEmpty(result)){
            logger.info('No blogs found!','Blog Controller->allBlogs');
            let apiResponse = response.generate(true,'No blogs found!',400,null);
            res.send(apiResponse);
        }
        else{
            logger.info('All blogs details found','Blog Controller->allBlogs',5);
            let apiResponse = response.generate(false,'All blogs details found',200,result);
            res.send(apiResponse);
        }
    })
}

// to see one blog by blogId
// let viewByBlogId = (req,res) =>{
//     BlogModel.findOne({'blogId':req.params.blogId})
//     .exec((err,result) =>{
//         if(err){
//             console.log(err);
//             res.send(err);
//         }
//         else if(result == undefined || result == null || result == ''){
//             console.log("No blog found!");
//             res.send("No blog found!");
//         }
//         else{
//             res.send(result);
//         }
//     })
// }
// .exec is optional here we can do it through like below code as well

let viewByBlogId = (req,res) =>{
    // accessing the modified req
    console.log(req.user);
    BlogModel.findOne({'blogId':req.params.blogId},(err,result) =>{
        if(err){
            logger.error(err.message,'Blog Controller->viewByBlogId',10)
            let apiResponse = response.generate(true,'Error occured',500,null);
            res.send(apiResponse);
        }
        else if(check.isEmpty(result)){
            logger.info('No blogs found!','Blog Controller->viewByBlogId');
            let apiResponse = response.generate(true,'No blog found!',400,null);
            res.send(apiResponse);
        }
        else{
            logger.info('Blog found','Blog Controller->viewByBlogId',5);
            let apiResponse = response.generate(false,'Blog found',200,result);
            res.send(apiResponse);
        }
    })
}

// to see one blog by author
let viewByAuthor = (req,res) =>{
    BlogModel.findOne({'author':req.params.author})
    .exec((err,result) =>{
        if(err){
            logger.error(err.message,'Blog Controller->viewByAuthor',10)
            let apiResponse = response.generate(true,'Error occured',500,null);
            res.send(apiResponse);
        }
        else if(check.isEmpty(result)){
            logger.info('No blogs found!','Blog Controller->viewByAuthor');
            let apiResponse = response.generate(true,'No blog found!',400,null);
            res.send(apiResponse);
        }
        else{
            logger.info('Blog found','Blog Controller->viewByAuthor',5);
            let apiResponse = response.generate(false,'Blog found',200,result);
            res.send(apiResponse);
        }
    })
}

// to see one blog by category
let viewByCategory = (req,res) =>{
    BlogModel.findOne({'category':req.params.category})
    .exec((err,result) =>{
        if(err){
            logger.error(err.message,'Blog Controller->viewByCategory',10)
            let apiResponse = response.generate(true,'Error occured',500,null);
            res.send(apiResponse);
        }
        else if(check.isEmpty(result)){
            logger.info('No blogs found!','Blog Controller->viewByCategory');
            let apiResponse = response.generate(true,'No blog found!',400,null);
            res.send(apiResponse);
        }
        else{
            logger.info('Blog found','Blog Controller->viewByCategory',5);
            let apiResponse = response.generate(false,'Blog found',200,result);
            res.send(apiResponse);
        }
    })
}

// create a blog
let createBlog = (req,res) =>{
    var today = time.now();   //Date.now();    
    let blogId = shortid.generate();

    let newBlog = new BlogModel(
        // here the key is the BlogModel schema we created in Blog.js
        {
            blogId: blogId,
            title: req.body.title,
            description: req.body.description,
            bodyHtml: req.body.blogBody,
            isPublished: true,
            category: req.body.category,
            author: req.body.fullName,
            created: today,
            lastModified: today
        }
    )
    // splitting the tags in comma and storing it in newBlogs.tags
    let tags = (req.body.tags != undefined || req.body.tags != null || req.body.tags != '') ? req.body.tags.split(',')  : [];
    newBlog.tags = tags;
    // storing newBlog through mongoose function save
    newBlog.save((err,result) =>{
        if(err){
            logger.error(err.message,'Blog Controller->createBlog',10)
            let apiResponse = response.generate(true,'Error occured',500,null);
            res.send(apiResponse);
        }
        else{
            
            let apiResponse = response.generate(false,'Blog created successfully',200,result);
            logger.info('Blog created successfully','Blog Controller->createBlog',5);
            res.send(apiResponse);
        }
    })

}


// edit blog
let editBlog = (req,res) =>{
    let options = req.body;
    // body parameter which we pass for editing
    console.log(options);
    // we are passing the whole body parameter which is to be edited and setting multi: true helps us to edit multiple records
    BlogModel.update({'blogId': req.params.blogId}, options, {multi: true}).exec((err,result) =>{
        if(err){
            logger.error(err.message,'Blog Controller->editBlog',10)
            let apiResponse = response.generate(true,'Error occured',500,null);
            res.send(apiResponse);
        }
        else if(check.isEmpty(result)){
            logger.info('No blogs found!','Blog Controller->editBlog');
            let apiResponse = response.generate(true,'No blog found!',400,null);
            res.send(apiResponse);
        }
        else{
            logger.info('Blog edited successfully','Blog Controller->editBlog',5);
            let apiResponse = response.generate(false,'Blog edited successfully',200,result);
            res.send(apiResponse);
        }
    })
}


// another way to edit blog,find then save
let increaseBlogView = (req,res) =>{
    // first we are finding the blog
    BlogModel.findOne({'blogId': req.params.blogId}).exec((err,result) =>{
        if(err){
            logger.error(err.message,'Blog Controller->increaseBlogView',10)
            let apiResponse = response.generate(true,'Error occured',500,null);
            res.send(apiResponse);
        }
        else if(check.isEmpty(result)){
            logger.info('No blogs found!','Blog Controller->increaseBlogView');
            let apiResponse = response.generate(true,'No blog found!',400,null);
            res.send(apiResponse);
        }
        else{
            // and if found we are saving it
            // increasing the views by one
            result.views += 1;
            // result has all the data which we create at the starting point to save()
            console.log(result);
            // saving the view
            // if we would have used lean we could'not be able to use save() on plain javascript object,now it is mongoose object
            result.save(function (err, result) {
                if(err){
                    logger.error(err.message,'Blog Controller->increaseBlogView',10)
                    let apiResponse = response.generate(true,'Error occured',500,null);
                    res.send(apiResponse);
                }
                else{
                    let apiResponse = response.generate(false,'Blog updated successfully',200,result);
                    logger.info('Blog edited successfully','Blog Controller->increaseBlogView',5);
                    res.send(apiResponse);
                }
            });
        }
    })
}

// deleteBlog
let deleteBlog = (req,res) =>{
    BlogModel.remove({'blogId': req.params.blogId}).exec((err,result)=>{
        if(err){
            logger.error(err.message,'Blog Controller->deleteBlog',10)
            let apiResponse = response.generate(true,'Error occured',500,null);
            res.send(apiResponse);
        }
        else if(check.isEmpty(result)){
            logger.info('No blogs found!','Blog Controller->deleteBlog');
            let apiResponse = response.generate(true,'No blog found!',400,null);
            res.send(apiResponse);
        }
        else{
            let apiResponse = response.generate(false,'Blog deleted successfully',200,result);
            logger.info('Blog deleted successfully','Blog Controller->deleteBlog',5);
            res.send(apiResponse);
        }
    })
}

module.exports = {
    hello: helloWorld,
    print: printExample,
    routeParameter: testRoute,
    queryParameter: testQuery,
    bodyParameter: testBody,
    getAllBlogs: allBlogs,
    createABlog: createBlog,
    getBlogById: viewByBlogId,
    getBlogByAuthor: viewByAuthor,
    getBlogByCategory: viewByCategory,
    editBlog: editBlog,
    increaseBlogView: increaseBlogView,
    deleteBlog: deleteBlog
}