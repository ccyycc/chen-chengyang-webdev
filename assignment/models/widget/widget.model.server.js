var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('WidgetModel', widgetSchema);

var pageModel = require('../page/page.model.server');

widgetModel.createWidget = createWidget;
widgetModel.findAllPagesForWebsite = findAllPagesForWebsite;
widgetModel.findPageById = findPageById;
widgetModel.updatePage = updatePage;
widgetModel.deletePage = deletePage;

module.exports = widgetModel;


function createWidget(pageId, widget) {
    widget._website = pageId;
    return widgetModel
        .create(widget)
        .then(function (widget) {
            return pageModel.addWidget(pageId, widget._id)
        })
        .then(
            function () {
                return widget;
            });

}


function findAllPagesForWebsite(websiteId) {
    return widgetModel
        .find({_website: websiteId})
        .exec();
}

function findPageById(pageId) {
    return widgetModel.findById(pageId);
}


function updatePage(pageId, page) {
    page.dateAccessed = Date.now();
    return widgetModel.update({_id: pageId}, {$set: page});
}

function deletePage(pageId) {
    return widgetModel
        .findById(pageId)
        .then(
            function (page) {
                widgetModel
                    .remove({_id: pageId})
                    .then(
                        function (status) {
                            return pageModel.deletePage(page._website, pageId)
                        })
            })


}

