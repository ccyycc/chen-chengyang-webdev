var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    username: {type:String,unique:true},
    password: String,
    fisrtname: String,
    lastname: String,
    email: String,
    websites: [{type: mongoose.Schema.ObjectId, ref: "WebsiteModel"}],
    dateCreate: {type: Date, default: Date.now}
}, {conllection: "user"});

module.exports = userSchema;