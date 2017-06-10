(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetNewController', widgetNewController);

    function widgetNewController($location, $routeParams,
                                 pageService, userService, widgetService, $sce) {
        var model = this;
        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];
        model.pageId = $routeParams['pid'];
        model.widgetId = $routeParams['wgid'];

        console.log("edit widget" + model.widgetId);

        //header
        model.header = "Choose Widget";
        model.back = "#!/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget";

        model.topRightOperationIcon = '';
        model.topRightOperation = function () {
        };

        model.getSize = getSize;
        model.trust = trust;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        model.widgetUrl = widgetUrl;
        model.createWidget = createWidget;


        function widgetUrl(widget) {
            var url = 'views/widget/templates/' + widget.widgetType.toLowerCase() + '/widget-' + widget.widgetType.toLowerCase() + '.view.client.html';
            return url;
        }

        function getYouTubeEmbedUrl(linkUrl) {
            var embedUrl = "https://www.youtube.com/embed/";
            var linkUrlParts = linkUrl.split('/');
            embedUrl += linkUrlParts[linkUrlParts.length - 1];
            return $sce.trustAsResourceUrl(embedUrl);
        }

        function getSize(widget) {
            return {'width': '50%'}
        }

        function trust(html) {
            // scrubbing the html
            return $sce.trustAsHtml(html);
        }


        function createWidget(type) {
            model.widget = {"widgetType": type};
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + "/page/" + model.pageId + "/widget/" + type + "#new");
        }

        function init() {
            model.widgets = widgetService.findWidgetsByPageId(model.pageId);
            model.widget = widgetService.findWidgetById(model.widgetId);
            console.log(model.widget);
            console.log(model.widgets);
        }

        init();
    }
})();