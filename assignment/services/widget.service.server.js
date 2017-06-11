var app = require('../../express');

// multer: support upload image.
var multer = require('multer'); // npm install multer --save
var upload = multer({dest: __dirname + "/../../public/assignment/assignment5/uploads"});


var widgetModel = require('../models/widget/widget.model.server');
var pageModel = require('../models/page/page.model.server');



app.post('/api/page/:pid/widget', createWidget);
app.get('/api/page/:pid/widget', findAllWidgetForPage);
app.get('/api/widget/:wgid', findWidgetById);
app.put('/api/widget/:wgid', updateWidget);
app.delete('/api/widget/:wgid', deleteWidget);
// update file.
app.post("/api/upload", upload.single('myFile'), uploadImage);
// for re-arrange widgets.
app.put('/page/:pid/widget', reArrangeWidgets);

function reArrangeWidgets(req, res) {
    var pid = req.params.pid;
    var initial = parseInt(req.query.initial);
    var final = parseInt(req.query.final);
    return pageModel
        .reArrangeWidgets(pid,initial,final)
        .then(
            function(){
                return res.sendStatus(200);
            },
            function () {
                return res.sendStatus(500);
            }
        );

}

function uploadImage(req, res) {
    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;
    var widgetId = req.body.widgetId;
    var width = req.body.width;
    var myFile = req.file;

    var callbackUrl = "../assignment/assignment5/index.html#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/";

    if (req.file === undefined) {
        res.status(404).redirect(callbackUrl);
        return;
    }

    var originalname = myFile.originalname; // file name on user's computer
    var filename = myFile.filename;     // new file name in upload folder
    var path = myFile.path;         // full path of uploaded file
    var destination = myFile.destination;  // folder where file is saved to
    var size = myFile.size;
    var mimetype = myFile.mimetype;


    var widget = {};
    widget.url = '/assignment/assignment5/uploads/' + filename;

    if (widgetId === "") {
        widget.type = "IMAGE";
        widgetModel.createWidget(pageId,widget);
    } else {
        widgetModel.updateWidget(widgetId, widget)
    }

    if (originalname === undefined) {
        return;
    }
    res.redirect(callbackUrl);
}


function createWidget(req, res) {
    var widget = req.body;
    var pageId = req.params.pid;
    widgetModel
        .createWidget(pageId, widget)
        .then(
            function (widget) {
                res.status(200).json(widget);
            },
            function () {
                res.sendStatus(500);
            }
        )
}

function findAllWidgetForPage(req, res) {
    var pageId = req.params.pid + "";

    widgetModel
        .findAllWidgetsForPage(pageId)
        .then(
            function (widgets) {
                res.status(200).send(widgets);
            },
            function () {
                res.sendStatus(500);
            }
        )
}

function findWidgetById(req, res) {
    var widgetId = req.params.wgid + "";

    widgetModel
        .findWidgetById(widgetId)
        .then(
            function (widget) {
                res.status(200).send(widget);
            }
        )
}

function updateWidget(req, res) {
    var widgetId = req.params.wgid + "";
    var widget = req.body;

    widgetModel
        .updateWidget(widgetId, widget)
        .then(
            function (widget) {
                res.status(200).send(widget);
            },
            function () {
                res.sendStatus(500);
            }
        )
}
function deleteWidget(req, res) {
    var widgetId = req.params.wgid + "";
    widgetModel
        .deleteWidget(widgetId)
        .then(
            function () {
                res.sendStatus(200);
            },
            function () {
                res.sendStatus(500);
            });
}


// function (widget) {
//     widget._id = (new Date()).getTime() + "";
//     widget.createdTime = new Date();
//     widget.accessedTime = new Date();
//     widgets.push(widget);
// }

function localUpdateWidgetWithId(wgid, widget) {
    widget.accessedTime = new Date();
    for (var i in widgets) {
        if (widgets[i]._id === wgid) {
            Object.assign(widgets[i], widget);
            return;
        }
    }
}
