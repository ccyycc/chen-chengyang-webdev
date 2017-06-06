var app = require('../../express');

var websites = [
    {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem"},
    {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem"},
    {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem"},
    {"_id": "890", "name": "Go", "developerId": "123", "description": "Lorem"},
    {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
    {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem"},
    {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem"}
];

app.post('/api/user/:uid/website', createWebsite);
app.get('/api/user/:uid/website', findAllWebsitesForUser);
app.get('/api/website/:wid', findWebsiteById);
app.put('/api/website/:wid', updateWebsite);
app.delete('/api/website/:wid', deleteWebsite);

function createWebsite(req, res) {
    var website = req.body;
    website._id = (new Date()).getTime() + "";
    website.developerId = req.params.uid;
    website.createdTime = new Date();
    website.accessedTime = new Date();
    websites.push(website);
    res.status(200).json(website);
}

function findAllWebsitesForUser(req, res) {
    var userId = req.params.uid + "";
    var result_websites = websites.filter(function (website) {
        return userId === website.developerId;
    });
    if (typeof result_websites === 'undefined') {
        res.status(404).send("not website found");
        return;
    }
    res.status(200).send(result_websites);
}

function findWebsiteById(req, res) {
    var wid = req.params.wid + "";

    var result_website = websites.find(function (website) {
        return wid === website._id;
    });
    if (typeof result_website === 'undefined') {
        res.status(404).send("not website found by website ID ");
        return;
    }
    res.status(200).send(result_website);
}
function updateWebsite(req, res) {
    var wid = req.params.wid + "";
    var website = req.body;
    website.accessedTime = new Date();
    for (var w in websites) {
        if (websites[w]._id === wid) {
            websites[w] = website;
            res.status(200).send(websites[w]);
            return;
        }
    }
    res.status(404).send("update fail");

}
function deleteWebsite(req, res) {
    var wid = req.params.wid + "";
    var index = getWebsiteIndex(wid);
    if (index < 0) {
        res.status(404).send("delete fail");
        return;
    }
    websites.splice(index, 1);
    res.status(200).send("");

}

function getWebsiteIndex(websiteId) {
    for (var i in websites) {
        if (websites[i]._id === websiteId) {
            return i;
        }
    }
    return -1;
}
