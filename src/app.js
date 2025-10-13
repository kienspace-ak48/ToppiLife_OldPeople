const express = require('express');
const path = require('path');
const app = express();
const Routes = require('./routes')
const session = require('express-session');


const connectDB = require('./config/connectDB');
require('dotenv').config();

// Middleware
app.use(express.json());
// body parser
app.use(express.urlencoded({ extended: true }));

// session
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
     cookie: {
    httpOnly: true,    // ngăn JS truy cập cookie
    // secure: true,      // chỉ hoạt động trên HTTPS
    maxAge: 1000 * 60 * 60 // session sống 1h
  }
}));

//static file
app.use(express.static(path.join(__dirname, './public')));
console.log("AAAAAAAAAAAAA"+path.join(__dirname, '..', 'uploads'))
app.use('/uploads',express.static(path.join(__dirname, '..', 'uploads')));

//cau hinh ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(require('express-ejs-layouts'));
app.set('layout', 'layouts/mainlayout');

// Connect to MongoDB
connectDB();

// Routes
Routes(app);

// Routes test
// app.get('/', (req, res)=>{
//     res.render('home/homepage', {title: "Home Page", layout: 'layouts/mainlayout'});
// })



module.exports = app;