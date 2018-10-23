// this is needed to importing expressjs into our application.
const express = require('express')
// we require controllers
const blogController = require('./../controllers/blogController')
// importing appCongig
const appConfig = require('./../config/appConfig')
// importing middlewares
const middlewares = require('./../middlewares/example')
// importing auth
const auth = require('./../middlewares/auth')

let setRouter = (app) => {

    // after , it is a callback function we can acheive it by seperating it as well for eg look at next app.get
    // app.get('/hello-world', (req, res) => res.send('Hello World!'))


    // seprating the function and calling it in app.get()
    // ideal way is to put the function in controllers(bifurcating the logics) and calling in the app.get
    // let printExample = (req,res) =>{res.send('Print examples!');}
    // app.get('/example', printExample)

    
    app.get('/hello-world',blogController.hello)
    app.get('/example', blogController.print)

    // route parameter
    app.get('/test/route/:firstName/:lastName',blogController.routeParameter)
    // query parameter
    app.get('/test/query', blogController.queryParameter)
    // body parameter
    app.post('/test/body', blogController.bodyParameter)

    // baseUrl
    let baseUrl = appConfig.appVersion+'/blogs';
    // for displaying all blogs
    app.get(baseUrl+'/all',auth.isAuthenticated,blogController.getAllBlogs);
    /**
	 * @api {get} /api/v1/blogs/all Get all blogs
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *{
	    "error": false,
	    "message": "All blogs details found",
	    "status": 200,
	    "data": [
			         {
						blogId: "string",
						title: "string",
						description: "string",
						bodyHtml: "string",
						views: number,
						isPublished: boolean,
						category: "string",
						author: "string",
						tags: object(type = array),
						created: "date",
						lastModified: "date"
			         }
	    ]
*}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed to find blog details",
	    "status": 500,
	    "data": null
	   }
	 */

    // for displaying one blog by blogId
    // using middleware which has next() will shift to next function in queue that is blogController.getBlogById
    app.get(baseUrl+'/view/:blogId',auth.isAuthenticated,middlewares.egMiddlewares,blogController.getBlogById);
    /**
	 * @api {get} /api/v1/blogs/view/:blogId Get a single blog
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} blogId The blogId should be passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *{
	    "error": false,
	    "message": "Blog found",
	    "status": 200,
	    "data": {
                         _id: "string",
                         __v: number
		         blogId: "string",
                         title: "string",
			 description: "string",
			 bodyHtml: "string",
		         views: number,
		         isPublished: boolean,
			 category: "string",
			 author: "string",
			 tags: object(type = array),
			 created: "date",
			 lastModified: "date"
	     }
*}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500,
	    "data": null
	   }
	 */


     // for displaying one blog by author
     app.get(baseUrl+'/view/by/author/:author',auth.isAuthenticated,blogController.getBlogByAuthor);
     /**
	 * @api {get} /api/v1/blogs/view/by/author/:author Get blogs by author
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} author author of the blog passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *{
	    "error": false,
	    "message": "Blog found",
	    "status": 200,
	    "data": [
					{
						blogId: "string",
						title: "string",
						description: "string",
						bodyHtml: "string",
						views: number,
						isPublished: boolean,
						category: "string",
						author: "string",
						tags: object(type = array),
						created: "date",
						lastModified: "date"
					}
	     ]
*}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500,
	    "data": null
	   }
	 */

     // for displaying one blog by category
     app.get(baseUrl+'/view/by/category/:category',auth.isAuthenticated,blogController.getBlogByCategory);
     /**
	 * @api {get} /api/v1/blogs/view/by/category/:category Get blogs by category
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} category category of the blog passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *{
	    "error": false,
	    "message": "Blog found",
	    "status": 200,
	    "data": [
					{
						blogId: "string",
						title: "string",
						description: "string",
						bodyHtml: "string",
						views: number,
						isPublished: boolean,
						category: "string",
						author: "string",
						tags: object(type = array),
						created: "date",
						lastModified: "date"
					}
	     ]
*}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500,
	    "data": null
	   }
	 */



    // for creating a blog
    app.post(baseUrl+'/create',auth.isAuthenticated,blogController.createABlog)
    /**
	 * @api {post} /api/v1/blogs/create Create blog
	 * @apiVersion 0.0.1
	 * @apiGroup create
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} title title of the blog passed as a body parameter
	 * @apiParam {String} description description of the blog passed as a body parameter
	 * @apiParam {String} blogBody blogBody of the blog passed as a body parameter
	 * @apiParam {String} category category of the blog passed as a body parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *{
	    "error": false,
	    "message": "Blog created successfully",
	    "status": 200,
	    "data": [
					{
						blogId: "string",
						title: "string",
						description: "string",
						bodyHtml: "string",
						views: number,
						isPublished: boolean,
						category: "string",
						author: "string",
						tags: object(type = array),
						created: "date",
						lastModified: "date"
					}
	     ]
*}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500,
	    "data": null
	   }
	 */



    // for editing a blog
    app.put(baseUrl+'/:blogId/edit',auth.isAuthenticated,blogController.editBlog)
    /**
	 * @api {put} /api/v1/blogs/:blogId/edit Edit blog by blogId
	 * @apiVersion 0.0.1
	 * @apiGroup edit
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} blogId blogId of the blog passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *{
	    "error": false,
	    "message": "Blog edited successfully.",
	    "status": 200,
	    "data": [
					{
						blogId: "string",
						title: "string",
						description: "string",
						bodyHtml: "string",
						views: number,
						isPublished: boolean,
						category: "string",
						author: "string",
						tags: object(type = array),
						created: "date",
						lastModified: "date"
					}
	     ]
*}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500,
	    "data": null
	   }
	 */



    // another way to update,to find and the save
    app.get(baseUrl+'/:blogId/count/view',auth.isAuthenticated,blogController.increaseBlogView);
    /**
	 * @api {get} /api/v1/blogs/:blogId/count/view Increase Blogs Count
	 * @apiVersion 0.0.1
	 * @apiGroup update
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} blogId blogId of the blog passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *{
	    "error": false,
	    "message": "Blog updated successfully",
	    "status": 200,
	    "data": [
					{
						blogId: "string",
						title: "string",
						description: "string",
						bodyHtml: "string",
						views: number,
						isPublished: boolean,
						category: "string",
						author: "string",
						tags: object(type = array),
						created: "date",
						lastModified: "date"
					}
	     ]
*}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500,
	    "data": null
	   }
	 */


    // for deleting blog
    app.post(baseUrl+'/:blogId/delete',auth.isAuthenticated,blogController.deleteBlog);
    /**
	 * @api {post} /api/v1/blogs/:blogId/delete Delete blog by blogId
	 * @apiVersion 0.0.1
	 * @apiGroup delete
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} blogId blogId of the blog passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *{
	    "error": false,
	    "message": "Blog Deleted Successfully",
	    "status": 200,
	    "data": []
*}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500,
	    "data": null
	   }
	 */




}

module.exports = {
    setRouter : setRouter
}