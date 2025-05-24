const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const Blog = require('./models/blogs')
const adminRoutes = require('./routes/adminRoutes')
const blogRoutes = require('./routes/blogRoutes')
const authRoutes = require('./routes/authRoutes')
const { requireAuth, checkUser } = require('./middlewares/authMiddleware') 

const app = express()

const dbUrl = 'mongodb+srv://egsec:egsec123@node-blog.hgazn2y.mongodb.net/?retryWrites=true&w=majority&appName=node-blog';

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
  // ssl: true,   
  // sslValidate: false
})
    .then((result) => {
        console.log('connected!')
    })
    .catch((err) => {
        console.log(err)
    })

app.set('view engine', 'ejs') // template engine

app.listen(3000)

//middleware 1
app.use(express.static('public')) // for static files
app.use(express.urlencoded({ extended: true })) // true -> nested object; false -> disabled nested object

// middleware 2
app.use(morgan('tiny'))

// middleware 3
app.use(cookieParser())

// middleware 4
app.use(checkUser)

app.get('/', (req, res) => {
    res.redirect('/blog')
})

app.use('/', authRoutes)
app.use('/blog',blogRoutes)
app.use('/admin', requireAuth, adminRoutes)

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'})
})

app.get('/about-us', (req, res) => {
    res.redirect('/about')
})

// it works like sync, not async
app.use((req, res) => {
    res.status(404).render('404', {title: '404'})
})

