var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('WidgetModel', widgetSchema);

var pageModel = require('../page/page.model.server');

//widget CRUD
widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
//widget delete call from page
widgetModel.deleteWidgetsForPage = deleteWidgetsForPage;

module.exports = widgetModel;

function deleteWidgetsForPage(pageId){
    return pageModel
        .find({_page:pageId})
        .then(function () {
            return widgetModel.deleteMany({_page:pageId});
        });

}

function createWidget(pageId, widget) {
    widget._page = pageId;

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


function findAllWidgetsForPage(pageId) {

    return pageModel
        .findPageById(pageId)
        .populate('widgets')
        .exec()
        .then(function (page) {
            return page.widgets;
        })

    // return widgetModel
    //     .find({_page: pageId})
    //     .exec();
}

function findWidgetById(widgetId) {
    return widgetModel.findById(widgetId);
}


function updateWidget(widgetId, widget) {
    widget.dateAccessed = Date.now();

    return widgetModel.update({_id: widgetId}, {$set: widget});
}

function deleteWidget(widgetId) {
    return widgetModel
        .findById(widgetId)
        .then(
            function (widget) {
                //delete current widget document
                return widgetModel
                    .remove({_id: widgetId})
                    .then(
                        function (status) {
                            //delete current widget document reference in page
                            return pageModel.deleteWidget(widget._page, widgetId)
                        })
            })


}


