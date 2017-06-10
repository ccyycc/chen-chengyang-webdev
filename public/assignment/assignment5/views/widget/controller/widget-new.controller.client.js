(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetNewController', widgetNewController);

    function widgetNewController($location, $routeParams, $sce) {
        var model = this;

        model.trust = trust;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        model.widgetUrl = widgetUrl;
        model.createWidget = createWidget;

        init();

        function init() {
            model.userId = $routeParams['uid'];
            model.websiteId = $routeParams['wid'];
            model.pageId = $routeParams['pid'];
            model.widgetId = $routeParams['wgid'];

            //header
            model.header = "Choose Widget";
            model.back = "#!/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget";

            model.topRightOperationIcon = '';
            model.topRightOperation = function () {};
        }

        function createWidget(type) {
            model.widget = {"widgetType": type};
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + "/page/" + model.pageId + "/widget/" + type + "#new");
        }

        function widgetUrl(widget) {
            return 'views/widget/templates/' + widget.widgetType.toLowerCase() + '/widget-' + widget.widgetType.toLowerCase() + '.view.client.html';
        }

        function getYouTubeEmbedUrl(linkUrl) {
            var embedUrl = "https://www.youtube.com/embed/";
            var linkUrlParts = linkUrl.split('/');
            embedUrl += linkUrlParts[linkUrlParts.length - 1];
            return $sce.trustAsResourceUrl(embedUrl);
        }


        function trust(html) {
            // scrubbing the html
            return $sce.trustAsHtml(html);
        }
    }
})();