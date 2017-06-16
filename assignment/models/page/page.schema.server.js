var mongoose = require('mongoose');
var pageSchema = mongoose.Schema({
    _website: {type:mongoose.Schema.ObjectId,ref:"WebsiteModel"},
    name:{type:String,required:true},
    description:String,
    widgets: [{type: mongoose.Schema.ObjectId, ref: "WidgetModel"}],
    dateCreated: {type: Date, default: Date.now},
    dateAccessed: {type: Date, default: Date.now}
}, {collection: "page"});

module.exports = pageSchema;