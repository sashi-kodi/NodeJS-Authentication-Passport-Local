var express = require('express');
var path= require('path');
var ejs= require('ejs');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var session = require('express-session');
var mongoose = require('mongoose');
var config = require('./config/config');
var flash= require('connect-flash');
var passport = require('passport');
var cookieParser = require('cookie-parser');

var app=express();
require('./config/passport')(passport);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(session({
    secret: 'secretkey',
    saveUninitialized:true,
    resave:true
}));
app.set('view engine' ,'ejs');
app.use(passport.initialize());
app.use(passport.session()); 

app.use(flash());



mongoose.connect(config.url);
var db=mongoose.connection;
db.on('error', console.error.bind(console,'connection error'));
db.once('open', function(){
    console.log('database connection to Mongoose has been established');
});

require('./routes')(app,passport);


app.listen(3000);
console.log('Server is running at port 3000');