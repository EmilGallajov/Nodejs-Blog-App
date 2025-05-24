const Blog = require('../models/blogs')

const blog_index = (req, res) => {
    Blog.find()
        .then((result) => {
            res.render('index', {title: 'Home Page', blogs: result})
        })
        .catch((err) => {
            console.log(err);
        })
}

const blog_id = (req, res) => {
    const id = req.params.id
    Blog.findById(id)
        .then((result) => {
            res.render('blog', {blog: result, title:'Detail'})
        })
        .catch((err) => {
            res.render('404', {title: 404})
        })
}

module.exports = {
    blog_index,
    blog_id
} 