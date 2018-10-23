// importing mongoose module
const mongoose = require('mongoose')
// import schema
const Schema = mongoose.Schema;

let blogSchema = new Schema(


    // json object,where the key will be the field we want to store and value would be the type and the default value
    {
        blogId: {
            type: String,
            // for unique identifier
            unique: true
        },
        title: {
            type: String,
            // default value is empty
            default: ''
        },
        description: {
            type: String,
            default: ''
        },
        bodyHtml: {
            type: String,
            default: ''
        },
        views: {
            type: Number,
            default: 0
        },
        isPublished: {
            type: Boolean,
            default: false
        },
        categories: {
            type: String,
            default: ''
        },
        author: {
            type: String,
            default: ''
        },
        tags: [],
        created: {
            type: Date,
            // current date
            default: Date.now
        },
        lastModified: {
            type: Date,
            default: Date.now
        }
    }
)

// we are telling mongoose we have a model of schema blogSchema so we should follow to store information in the blogSchema format only
// here we don't need to export as mongoose is exporting it here internally
// 'Blog' is the name of the model
mongoose.model('Blog',blogSchema);