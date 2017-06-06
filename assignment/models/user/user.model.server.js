var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel',userSchema);

userModel.createUser=createuser;
userModel.finduwerById=finduwerById;
userModel.finduserByUsername=finduserByUsername;
userModel.findUserByCredentials=findUserByCredentials;
userModel.updateUser=updateUser;
userModel.deleteUser=deleteUser;

module.exports=usermodel;



function createuser(user){
    return userModel.create(user);
}

function finduwerById(userId){
    return userModel.findById(userId);
}
function findAllUser(){
    return userModel.find();
}


function finduserByUsername(username){
    return userModel.findOne({username:username});
}

function findUserByCredentials(username,password){
    return userModel.findOne({username:username,password:password});
}

function updateUser(userId,newUser){
    delete newUser.username;
    delete newUser.password;
    return userModel.update({_id:userId},{$set:newuser});
}
function deleteUser(userId){
    return userModel.delete({_id:userId});
}