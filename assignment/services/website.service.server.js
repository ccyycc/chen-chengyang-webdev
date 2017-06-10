var app = require('../../express');
var websiteModel = require('../models/website/website.model.server')

app.post('/api/user/:uid/website', createWebsite);
app.get('/api/user/:uid/website', findAllWebsitesForUser);
app.get('/api/website/:wid', findWebsiteById);
app.put('/api/website/:wid', updateWebsite);
app.delete('/api/website/:wid', deleteWebsite);

function createWebsite(req, res) {
    var website = req.body;
    var userId = req.params.uid;
    websiteModel
        .createWebsiteForUser(userId, website)
        .then(
            function (website) {
                res.status(200).json(website);
            },
            function () {
                res.sendStatus(500);
            }
        )

}

function findAllWebsitesForUser(req, res) {
    var userId = req.params.uid + "";

    websiteModel
        .findAllWebsitesForUser(userId)
        .then(
            function (websites) {
                res.status(200).json(websites);
            },
            function () {
                res.sendStatus(500);
            });
}

function findWebsiteById(req, res) {
    var wid = req.params.wid + "";
    websiteModel
        .findWebsiteById(wid)
        .then(
            function (website) {
                res.status(200).json(website);
            },
            function () {
                res.sendStatus(500);
            }
        )
}
function updateWebsite(req, res) {
    var wid = req.params.wid + "";
    var website = req.body;
    websiteModel
        .updateWebsite(wid, website)
        .then(
            function (website) {
                res.status(200).json(website);
            },
            function () {
                res.sendStatus(500);
            }
        )
}
function deleteWebsite(req, res) {
    var wid = req.params.wid + "";
    websiteModel
        .deleteWebsite(wid)
        .then(
            function () {
                res.sendStatus(200);
            },
            function () {
                res.sendStatus(500);
            }
        )

}

