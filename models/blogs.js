const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogsSchema = new Schema({
    title: {
        type: String, 
        require: true
    },
    short: {
        type: String,
        require: true
    },
    long: {
        type: String,
        require: true
    }
}, { timestamps: true })

const Blog = mongoose.model('Blog', blogsSchema)
module.exports = Blog