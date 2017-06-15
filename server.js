var app = require('./express');

var cookieParser = require('cookie-parser');
var session      = require('express-session');
var passport = require('passport');

//body-parser for  parse json object from res.body
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// configure a public directory to host static content
app.use(app.express.static(__dirname + '/public'));

//security
app.use(cookieParser());
app.use(session({ secret: "put some text here" }));
app.use(passport.initialize());
app.use(passport.session());


// database test module.
require("./test/app.js");

// server side module for assignment 4
require('./assignment/app.js');

var port = process.env.PORT || 3000;

app.listen(port);