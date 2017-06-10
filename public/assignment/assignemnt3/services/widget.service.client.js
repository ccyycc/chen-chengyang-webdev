(function () {
    angular
        .module('WebAppMaker')
        .service('widgetService', widgetServiceFunction);

    function widgetServiceFunction() {
        this.createWidget = createWidget;
        this.findWidgetsByPageId = findWidgetsByPageId;
        this.findWidgetById = findWidgetById;
        this.updateWidget = updateWidget;
        this.deleteWidget = deleteWidget;

        var widgets = [
            {"_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            {"_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {
                "_id": "345", "widgetType": "IMAGE",
                "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"
            },
            {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            {"_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {"_id": "678", "widgetType": "YOUTUBE",
                "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E"
            },
            {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];


        function createWidget(pageId, widget) {
            widget._id = (new Date()).getTime() + "";
            widget.pageId = pageId;
            widgets.push(cloneWidget(widget));
            return widgets[widgets.length - 1];
        }

        function findWidgetsByPageId(pageId) {
            var result_widgets = widgets.filter(function (widget) {
                return pageId === widget.pageId;
            });
            if (typeof result_widgets === 'undefined')
                return null;
            return result_widgets.map(cloneWidget);
        }

        function findWidgetById(widgetId) {
            var result_widget = widgets.find(function (widget) {
                return widgetId === widget._id;
            });
            if (typeof result_widget === 'undefined')
                return null;
            return cloneWidget(result_widget);
        }

        function updateWidget(widgetId, widget) {
            for (var w in widgets) {
                if (widgets[w]._id === widgetId) {
                    console.log("before updating widget");
                    console.log(widgets[w]);
                    widgets[w] = cloneWidget(widget);
                    console.log(" updating widget");
                    console.log(widgets[w]);
                    return;
                }
            }
        }

        function deleteWidget(widgetId) {
            var index = getWidgetIndex(widgetId);
            widgets.splice(index, 1);
            console.log(widgets);
        }

        function cloneWidget(widget) {
            return Object.assign({}, widget);
            // return angular.copy(widget, {});
        }

        function getWidgetIndex(widgetId) {
            for (var i in widgets) {
                if (widgets[i]._id == widgetId) {
                    return i;
                }
            }
            return -1;
        }
    }
})();