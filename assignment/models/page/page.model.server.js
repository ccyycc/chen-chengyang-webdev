var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server');
var pageModel = mongoose.model('PageModel', pageSchema);

var websiteModel = require('../website/website.model.server');

pageModel.createWebsite = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;

module.exports = pageModel;


function createPage(websiteId, page) {
    page._website = websiteId;
    return pageModel
        .create(page)
        .then(function (page) {
            return websiteModel.addPage(websiteId, page._id)
        })
        .then(
            function () {
                return page;
            });

}


function findAllPagesForWebsite(websiteId) {
    return pageModel
        .find({_website: websiteId})
        .exec();
}

function findPageById(pageId) {
    return pageModel.findById(pageId);
}


function updatePage(pageId, page) {
    page.dateAccessed = Date.now();
    return pageModel.update({_id: pageId}, {$set: page});
}

function deletePage(pageId) {
    return pageModel
        .findById(pageId)
        .then(
            function (page) {
                pageModel
                    .remove({_id: pageId})
                    .then(
                        function (status) {
                            return websiteModel.deletePage(page._website, pageId)
                        })
            })


}

