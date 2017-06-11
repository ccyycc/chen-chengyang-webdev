var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server');
var pageModel = mongoose.model('PageModel', pageSchema);

var websiteModel = require('../website/website.model.server');

pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;

pageModel.addWidget = addWidget;
pageModel.deleteWidget = deleteWidget;
pageModel.reArrangeWidgets = reArrangeWidgets;


module.exports = pageModel;

function addWidget(pageId, widgetId) {
    return pageModel
        .findById(pageId)
        .then(
            function (page) {
                page.widgets.push(widgetId);
                return page.save();
            });
}

function deleteWidget(pageId, widgetId) {
    return pageModel
        .findById(pageId)
        .then(
            function (page) {
                var index = page.widgets.indexOf(widgetId);
                page.widgets.splice(index, 1);
                return page.save();
            });
}

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

function reArrangeWidgets(pageId, initial,final) {

    return pageModel
        .findPageById(pageId)
        .then(
            function(page){
                if (initial === final) {
                    return page;
                }
                var widgetBuffer = page.widgets[initial];
                page.widgets.splice(initial, 1);
                page.widgets.splice(final, 0, widgetBuffer);
                return page.save();
            }
        )
}

