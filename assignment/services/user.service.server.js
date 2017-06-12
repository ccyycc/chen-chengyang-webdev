var app = require('../../express');
var userModel = require('../models/user/user.model.server');

app.post('/api/user', createUser);
app.get('/api/user', findAllUsers);
// the following routes are integrated with findAllUsers.
// app.get('/api/user',findUserByUserName);
// app.get('/api/user',findUserByCredentials);
app.get('/api/user/:uid', findUserById);
app.put('/api/user/:uid', updateUser);
app.delete('/api/user/:uid', deleteUser);


function createUser(req, res) {
    userModel
        .createUser(req.body)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.send(err);
        })
}

function findUserByUserName(req, res) {
    var username = req.query.username;
    userModel
        .findUserByUsername(username)
        .then(
            function (user) {
                if (user) {
                    res.status(200).json(user);
                } else {
                    res.status(404).send("cannot find user with provided username.");
                }
            }, function (err) {
                res.send(err);

            });
}


function findUserByCredentials(req, res) {
    var username = req.query.username;
    var password = req.query.password;
    userModel
        .findUserByCredentials(username, password)
        .then(
            function (user) {
                if (user) {
                    res.status(200).json(user);
                } else {
                    res.status(404).send("Could not find user by credential");
                }
            }, function (err) {
                res.send(err);
            });
}


function findUserById(req, res) {
    var userId = req.params.uid;

    userModel
        .findUserById(userId)
        .then(
            function (user) {
                if (user) {
                    res.status(200).json(user);
                } else {
                    res.status(404).send('404 - user id is not found');
                }

            }, function (err) {
                res.send(err);
            });
}


function updateUser(req, res) {
    var user = req.body;
    var uid = req.params.uid + "";

    userModel
        .updateUser(uid, user)
        .then(function (status) {
            res.send(status);
        });
}

function deleteUser(req, res) {
    var uid = req.params.uid;
    userModel
        .deleteUser(uid)
        .then(function (status) {
            res.send(status);
        });
}

function findAllUsers(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];

    if (password) {
        findUserByCredentials(req, res);
    } else {
        findUserByUserName(req, res);
    }
}
