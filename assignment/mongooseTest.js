//
// // for assignment 5
//
// var mongoose = require('mongoose');
// mongoose.Promise = require('q').Promise;
// mongoose.connect('mongodb:/localhost/chen-chengyang-webdev');
//
// var blogPostSchema = mongoose.Schema({
//     tiitle: String,
//     body: String,
//     postDate: {type: Date, default: Date.now},
//     thumbsUp: {typle: Number, default: 0}
// }, {collection: 'blogpost'});
//
// var blogModel = mongoose.model("BlogPost", blogPostSchema);
//
//
// createBlogPost({title: "mytitle", contect: "mycontent"})
//     .then(
//         function (doc) {
//
//         },
//         function (err) {
//
//         });
//
// findAllBlogPosts()
//     .then(function (posts) {
//
//     });
//
// findBlogPostById(123)
//     .then(function (blogPost) {
//         console.log(blogPost);
//     });
//
//
// updateBlogPost("_id", {bodu: "somebody"})
//     .then(function (status) {
//         console.log(status);
//     });
//
// function delteBlogPost(postId){
//     return blogModel.remove({_id:postId});
// }
//
// function updateBlogPost(postId, newPost) {
//     blogModel
//         .update({_id: postId}, {
//             // $set: {
//             //     title:newPost.title,
//             //     body:newPost.body,
//             //
//             // }
//             $set:newPost // merge the content
//         })
// }
// function findBlogPostById(postId) {
//     // return blogModel.findOne({_id:postId});
//     return blogModel.findById(postId); //default find _id
// }
//
//
// function findAllBlogPosts() {
//     return blogModel.find();
// }
//
//
// function createBlogPost(blogPost) {
//     return blogModel
//         .create(blogPost)
//
// }
// // function createBlogPost(blogPost){
// //     blogModel.create(blogPost,function(err,doc){
// //         console.log(doc)
// //     });
// // }
//
//
//
