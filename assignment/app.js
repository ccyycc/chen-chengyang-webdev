
var mongoose = require('mongoose');

if(process.env.MLAB_USERNAME) {
    var connectionString = 'mongodb://' +
        process.env.MLAB_USERNAME + ":" +
        process.env.MLAB_PASSWORD + "@ds137281.mlab.com:37281/heroku_2m54jxsb";
}

mongoose.connect(connectionString);
mongoose.Promise = require('q').Promise;




// // var connectionString = 'mongodb://127.0.0.1:27017/test';
// // var connectionString = 'mongodb://localhost/chen-chengyang-webdev';
// if(process.env.MLAB_USERNAME) {
//     var connectionString = 'mongodb://'+ process.env.MLAB_USERNAME + ":" +
//         process.env.MLAB_PASSWORD + "@ds137281.mlab.com:37281/heroku_2m54jxsb";
// }

require('./services/user.service.server');
require('./services/website.service.server');
require('./services/page.service.server');
require('./services/widget.service.server');
require('./services/map.service.server');

