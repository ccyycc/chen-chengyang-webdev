var app = require('./express');

//body-parser for  parse json object from res.body
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(app.express.static(__dirname + '/public'));

// database test module.
require ("./test/app.js");
// server side module for assignment 4
require('./assignment/app.js');

var port = process.env.PORT || 3000;

app.listen(port);