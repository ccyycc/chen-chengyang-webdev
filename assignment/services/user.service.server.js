var app = require('../../express');
// const app = express();

var users = [
    {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
    {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
    {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
    {_id: "456", username: "a", password: "a", firstName: "Jose", lastName: "Annunzi"}
];


app.post('/api/user', createUser);
app.get('/api/user', findAllUsers);
// app.get('/api/user',findUserByUserName);
// app.get('/api/user',findUserByCredentials);
app.get('/api/user/:uid', findUserById);
app.put('/api/user/:uid', updateUser);
app.delete('/api/user/:uid', deleteUser);




/**
 * create a user.
 * @param req user object.
 * @param res user object.
 */
function createUser(req,res){
//    TODO update the way to check if user is exist.
    var user = req.body;
    user._id= (new Date()).getTime()+"";
    users.push(user);
    res.send(user);
}

/**
 * find user by username
 * @param req ?username
 * @param res User
 */
function findUserByUserName(req,res){
    var username = req.query.username;
    for(var i in users){
        if (users[i].username === username){
            res.status(200).json(users[i]);
            return;
        }
    }
    res.status(404).send( "cannot find user with provided username.");
}

/**
 * find user by credentials
 * @param req ?username & password
 * @param res User
 */
function findUserByCredentials(req,res){
    var username = req.query.username;
    var password = req.query.password;
    for(var i in users) {
        if (users[i].username === username && users[i].password === password){
             res.status(200).json(users[i]);
             return;
        }
    }
    return res.status(404).send("Could not find user by credential");
}
/**
 *find user by id
 * @param req /:uid
 * @param res return with status and user
 */
function findUserById(req, res) {
    var userId = req.params.uid;
    for(var u in users) {
        if(users[u]._id === userId) {
            res.status(200).json(users[u]);
            return;
        }
    }
    res.status(404).send('404 - user id is not found');
}

/**
 * update user
 * @param req User
 * @param res Status
 */
function updateUser(req,res){
    var user = req.body;
    var uid = req.params.uid+"";
    for (var i in users){
        if (users[i]._id === uid){
            users[i] = user;
            res.status(200).send("");
            return;
        }
    }
    res.status(404).send("user does not exist");
}
/**
 * delete user
 * @param req /:uid
 * @param res Status
 */
function deleteUser(req,res){
    var uid = req.params.uid;
    for(var i in users){
        if (users[i]._id === uid){
            users.splice(i,1);
            res.status(200).send("");
            return;
        }
    }
    res.status(404).send("user does not found");

}

function findAllUsers(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];
    console.log(password);
    if(password){
        findUserByCredentials(req,res);
    }else{
        findUserByUserName(req,res);
    }




    // var username = req.query['username'];
    // var password = req.query['password'];
    // if(username && password) {
    //     for (var i in users) {
    //         var userI = users[i];
    //         if (userI.username === username && userI.password === password) {
    //             res.send(userI);
    //         } else if (userI.username === username && userI.password !== password) {
    //             return "incorrect password";
    //         } else if (userI.username !== username && userI.password === password) {
    //             return "incorrect username";
    //         }
    //     }
    //     return null;
    // } else {
    //     res.status(200).send(users);
    //
    // }
}

