var app = require('../../express');
var pageModel = require('../models/page/page.model.server');



app.post('/api/website/:wid/page', createPage);
app.get('/api/website/:wid/page', findAllPagesForWebsite);
app.get('/api/page/:pid', findPageById);
app.put('/api/page/:pid', updatePage);
app.delete('/api/page/:pid', deletePage);

function createPage(req, res) {
    var page = req.body;
    var websiteId = req.params.wid;
    pageModel
        .createWebsite(websiteId, page)
        .then(function (page) {
                res.status(200).json(page);
            },
            function () {
                res.sendStatus(500);
            }
        )

}

function findAllPagesForWebsite(req, res) {
    var wid = req.params.wid + "";

    pageModel
        .findAllPagesForWebsite(wid)
        .then(function (pages) {
                res.status(200).send(pages);

            },
            function () {
                res.sendStatus(500);
            });
}

function findPageById(req, res) {
    var pid = req.params.pid + "";
    pageModel
        .findPageById(pid)
        .then(
            function (page) {
                res.status(200).send(page);
            },
            function () {
                res.sendStatus(500);
            }
        )
}

function updatePage(req, res) {
    var pid = req.params.pid + "";
    var page = req.body;
    pageModel
        .updatePage(pid, page)
        .then(
            function (page) {
                res.status(200).send(page);
            },
            function () {
                res.sendStatus(500);
            }
        )

}
function deletePage(req, res) {
    var pid = req.params.pid + "";
    pageModel
        .deletePage(pid)
        .then(
            function () {
                res.status(200).send("page delete successfully");
            },
            function () {
                res.sendStatus(500);
            }
        )
}


