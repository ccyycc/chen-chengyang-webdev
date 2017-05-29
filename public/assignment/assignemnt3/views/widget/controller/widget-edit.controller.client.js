(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetEditController', widgetEditController);

    function widgetEditController($location, $routeParams,
                                  pageService, userService, widgetService, $sce) {
        var model = this;

        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;

        model.trust = trust;
        model.widgetUrl = widgetUrl;

        init();

        function init() {
            model.userId = $routeParams['uid'];
            model.websiteId = $routeParams['wid'];
            model.pageId = $routeParams['pid'];
            model.widgetId = $routeParams['wgid'];

            model.widgets = widgetService.findWidgetsByPageId(model.pageId);
            model.widget = widgetService.findWidgetById(model.widgetId);
            if (model.widget == null) {
                model.widget = {"widgetType": $routeParams.wgid};
            }


            model.back = "#!/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget";
            model.topRightOperationIcon = 'glyphicon glyphicon-ok'
            model.topRightOperation = model.updateWidget;
            model.mode = $location.hash();
            //header
            switch (model.widget.widgetType) {
                case "HEADING":
                    model.header = "Heading Widget";
                    break;
                case "YOUTUBE":
                    model.header = "Youtube Widget";
                    break;
                case "IMAGE":
                    model.header = "Image Widget";
                    break;
                case "HTML":
                    model.header = "HTML Widget";
                    break;
                default:
                    break;
            }

            if (model.mode === "new") {
                model.header = "New " + model.header;
            } else {
                model.header = "Edit " + model.header;
            }


        }

        function deleteWidget() {
            if (model.widget._id != null) {
                widgetService.deleteWidget(model.widget._id);
            }
            goToWidgetList();
        }

        function updateWidget() {
            console.log("entering update widget");
            console.log(model.widget);
            if (model.widget._id == null) {
                widgetService.createWidget(model.pageId, model.widget);
            }
            else {
                widgetService.updateWidget(model.widget._id, model.widget);
            }
            goToWidgetList();
        }

        function goToWidgetList() {
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + "/page/" + model.pageId + "/widget");
        }


        function widgetUrl(widget) {
            var url = 'views/widget/templates/' + widget.widgetType.toLowerCase() + '/widget-' + widget.widgetType.toLowerCase() + '.view.client.html';
            return url;
        }


        function trust(html) {
            // scrubbing the html
            return $sce.trustAsHtml(html);
        }

    }
})();