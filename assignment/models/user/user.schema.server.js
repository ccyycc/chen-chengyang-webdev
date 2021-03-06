var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    username: {type:String,unique:true ,required:true},
    password: {type:String},
    firstName: String,
    lastName: String,
    email: String,
    phone:String,
    websites: [{type: mongoose.Schema.ObjectId, ref: "WebsiteModel"}],
    dateCreated: {type: Date, default: Date.now},
    facebook: {
        id:    String,
        token: String
    }
}, {collection: "user"});

module.exports = userSchema;