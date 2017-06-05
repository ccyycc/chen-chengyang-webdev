

var app = require('../../express');
// const app = express();

var pages = [
    {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
    {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
    {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
];


app.post('/api/website/:wid/page', createPage);
app.get('/api/website/:wid/page', findAllPagesForWebsite);
app.get('/api/page/:pid', findPageById);
app.put('/api/page/:pid', updatePage);
app.delete('/api/page/:pid', deletePage);

function createPage(req, res) {
    var page = req.body;
    page._id = (new Date()).getTime() + "";
    page.websiteId = req.params.wid;
    page.createdTime = new Date();
    page.accessedTime = new Date();
    pages.push(page);
    res.status(200).json(page);
}

function findAllPagesForWebsite(req, res) {
    var wid = req.params.wid + "";
    var result_pages = pages.filter(function (page) {
        return wid === page.websiteId;
    });
    if (typeof result_pages === 'undefined') {
        res.status(404).send("not page found");
        return;
    }
    res.status(200).send(result_pages);
}

function findPageById(req, res) {
    var pid = req.params.pid + "";

    var result_page = pages.find(function (page) {
        return pid === page._id;
    });
    if (typeof result_page === 'undefined') {
        res.status(404).send("not page found by page ID ");
        return;
    }
    res.status(200).send(result_page);
}
function updatePage(req, res) {
    var pid = req.params.pid + "";
    var page = req.body;
    page.accessedTime = new Date();
    for (var i in pages) {
        if (pages[i]._id === pid) {
            pages[i] = page;
            res.status(200).send(pages[i]);
            return;
        }
    }
    res.status(404).send("update fail");

}
function deletePage(req, res) {
    var pid = req.params.pid + "";
    var index = getPageIndex(pid);
    if (index < 0) {
        res.status(404).send("delete fail");
        return;
    }
    pages.splice(index, 1);
    res.status(200).send("");

}

function getPageIndex(pid) {
    for (var i in pages) {
        if (pages[i]._id === pid) {
            return i;
        }
    }
    return -1;
}
