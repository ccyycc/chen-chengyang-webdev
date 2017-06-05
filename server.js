var app = require('./express');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(app.express.static(__dirname + '/public'));

// require ("./test/app.js");
require('./assignment/app.js');


var port = process.env.PORT || 3000;

app.listen(port);
// var app = require('./express');
//
// var bodyParser = require('body-parser');
//
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
//
// // configure a public directory to host static content
// app.use(app.express.static(__dirname + '/public'));
//
// //require ("./test/app.js");
//
//
// var mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
//
// require('./assignment/app');
//
// var port = process.env.PORT || 3000;
//
//
// app.listen(port);

// var express = require('express');
// var app = express();
//
// var bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
//
// // configure a public directory to host static content
// app.use(express.static(__dirname + '/public'));
//
// // require ("./test/app.js");
// require('./assignment/app.js');
//
//
// var port = process.env.PORT || 3000;
//
// app.listen(port);