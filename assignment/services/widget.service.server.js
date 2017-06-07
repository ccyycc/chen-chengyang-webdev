var app = require('../../express');

// multer: support upload image.
var multer = require('multer'); // npm install multer --save
var upload = multer({dest: __dirname + "/../../public/assignment/assignment4/uploads"});

var widgets = [
    {"_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "1"},
    {"_id": "1230", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "2"},
    {"_id": "12300", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "3"},
    {"_id": "123000", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "4"},
    {"_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    {"_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    {
        "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"
    },
    {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    {"_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    {
        "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E"
    },
    {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
];


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

    if (initial === final ){
        res.status(200).send("rearrange successfully");
        return;
    }

    var count = -1;
    for (var w in widgets) {
        if (widgets[w].pageId === pid) {
            count ++;
            if (count === initial) {
                initial = w;
            }
            if (count === final) {
                final = w;
            }
        }
    }

    var widgetToPush = widgets[initial];
    widgets.splice(initial, 1);
    widgets.splice(final, 0, widgetToPush);
    res.status(200).send("rearrange successfully");

}

function uploadImage(req, res) {



    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;
    var widgetId = req.body.widgetId;
    var width = req.body.width;
    var myFile = req.file;

    var callbackUrl = "../assignment/assignment4/index.html#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/";

    if (req.file === undefined) {
        res.status(404).send("image does not exit").redirect(callbackUrl);
        return;
    }



    var originalname = myFile.originalname; // file name on user's computer
    var filename = myFile.filename;     // new file name in upload folder
    var path = myFile.path;         // full path of uploaded file
    var destination = myFile.destination;  // folder where file is saved to
    var size = myFile.size;
    var mimetype = myFile.mimetype;


    var widget = {};
    widget.url = '/assignment/assignment4/uploads/' + filename;

    if (widgetId === "") {
        widget.pageId = pageId;
        widget.widgetType = "IMAGE";
        localCreateWidget(widget);
    } else {
        localUpdateWidgetWithId(widgetId, widget)
    }


    // if (widget.wgid === undefined) {
    //     createWidgetWithNoRes(widget)
    // }
    if (originalname === undefined) {
        return;
    }
    res.redirect(callbackUrl);
}


function createWidget(req, res) {
    var widget = req.body;
    widget._id = (new Date()).getTime() + "";
    widget.pageId = req.params.pid;
    widget.createdTime = new Date();
    widget.accessedTime = new Date();
    widgets.push(widget);
    res.status(200).json(widget);
}

function findAllWidgetForPage(req, res) {
    var pid = req.params.pid + "";
    var result_widgets = widgets.filter(function (widget) {
        return pid === widget.pageId;
    });
    if (typeof result_widgets === 'undefined') {
        res.status(404).send("not widget found");
        return;
    }
    res.status(200).send(result_widgets);
}

function findWidgetById(req, res) {
    var wgid = req.params.wgid + "";

    var result_page = widgets.find(function (widget) {
        return wgid === widget._id;
    });
    if (typeof result_page === 'undefined') {
        res.status(404).send("not page found by page ID ");
        return;
    }
    res.status(200).send(result_page);
}
function updateWidget(req, res) {
    var wgid = req.params.wgid + "";
    var widget = req.body;
    widget.accessedTime = new Date();
    for (var i in widgets) {
        if (widgets[i]._id === wgid) {
            widgets[i] = widget;
            res.status(200).send(widgets[i]);
            return;
        }
    }
    res.status(404).send("update fail");

}
function deleteWidget(req, res) {
    var wgid = req.params.wgid + "";
    var index = getWidgetIndex(wgid);
    if (index < 0) {
        res.status(404).send("delete fail");
        return;
    }
    widgets.splice(index, 1);
    res.status(200).send("");

}

function getWidgetIndex(wgid) {
    for (var i in widgets) {
        if (widgets[i]._id === wgid) {
            return i;
        }
    }
    return -1;
}

function localCreateWidget(widget) {
    widget._id = (new Date()).getTime() + "";
    widget.createdTime = new Date();
    widget.accessedTime = new Date();
    widgets.push(widget);
}

function localUpdateWidgetWithId(wgid, widget) {
    widget.accessedTime = new Date();
    for (var i in widgets) {
        if (widgets[i]._id === wgid) {
            Object.assign(widgets[i], widget);
            return;
        }
    }
}
