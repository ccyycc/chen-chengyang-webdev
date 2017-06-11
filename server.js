var app = require('./express');


//body-parser for  parse json object from res.body
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// configure a public directory to host static content
app.use(app.express.static(__dirname + '/public'));


// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', "*");
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// })
//
// app.all('*', function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'accept, content-type, x-parse-application-id, x-parse-rest-api-key, x-parse-session-token');
//     // intercept OPTIONS method
//     if ('OPTIONS' == req.method) {
//         res.send(200);
//     }
//     else {
//         next();
//     }
// });


// database test module.
require("./test/app.js");

// // server side module for assignment 4
// require('./assignment/app.js');

var port = process.env.PORT || 3000;

app.listen(port);