var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server');
var pageModel = mongoose.model('PageModel', pageSchema);

var websiteModel = require('../website/website.model.server');

//page CRUD
pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
//page delete call from website.
pageModel.deletePagesForWebsite = deletePagesForWebsite;

//page._widgets CUD
pageModel.addWidget = addWidget;
pageModel.deleteWidget = deleteWidget;
pageModel.reArrangeWidgets = reArrangeWidgets;

module.exports = pageModel;


function deletePagesForWebsite (websiteId){
    var widgetModel = require("../widget/widget.model.server");

    return pageModel
        .find({_website:websiteId})
        .then(function(pages){
            //delete all widgets in each page.
            pages.forEach(
                function(page){
                    return widgetModel.deleteWidgetsForPage(page._id)
                }
            )
        })
        .then(function () {
            //delete all pages for the website
            return pageModel
                .deleteMany({_website: websiteId})
        });
}
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
    var widgetModel = require("../widget/widget.model.server");
    widgetModel.deleteWidgetsForPage(pageId);

    return pageModel
        .findById(pageId)
        .then(
            function (page) {
                //delete current page document.
                pageModel
                    .remove({_id: pageId})
                    .then(
                        function (status) {
                            //delete current page reference in website.
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
                //re-arrange widgets reference in the page._widgets.
                var widgetBuffer = page.widgets[initial];
                page.widgets.splice(initial, 1);
                page.widgets.splice(final, 0, widgetBuffer);
                return page.save();
            }
        )
}

