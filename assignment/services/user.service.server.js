var app = require('../../express');
var userModel = require('../models/user/user.model.server');

var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.post('/api/user', createUser);
app.get('/api/user', findAllUsers);
// the following routes are integrated with findAllUsers.
// app.get('/api/user',findUserByUserName);
// app.get('/api/user',findUserByCredentials);
app.get('/api/user/:uid', findUserById);
app.put('/api/user/:uid', updateUser);
app.delete('/api/user/:uid', deleteUser);

app.post  ('/api/assignment/login', passport.authenticate('local'), login);
app.get   ('/api/assignment/isLoggedIn', isLoggedIn);
app.post  ('/api/assignment/logout', logout);
app.post  ('/api/assignment/register', register);



function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}

function register(req, res) {
    var userObj = req.body;
    userModel
        .createUser(userObj)
        .then(function (user) {
            req.login(user, function (status) {
                    res.status(200).send("register successful and login");
                });
        });
}

function logout(req, res) {
    req.logout();
    res.sendStatus(200);
}

function isLoggedIn(req, res) {
    if(req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}


function localStrategy(username, password, done) {
    userModel
        .findUserByCredentials(username, password)
        .then(function (user) {
            if(user) {
                done(null, user);
            } else {
                done(null, false);
            }
        }, function (error) {
            done(error, false);
        });
}

function login(req, res) {
    res.json(req.user);
}



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
