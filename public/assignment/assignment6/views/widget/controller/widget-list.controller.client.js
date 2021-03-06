(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetListController', widgetListController);

    function widgetListController($location, $routeParams, widgetService, $sce,currentUser) {
        var model = this;


        model.trust = trust;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        model.widgetUrl = widgetUrl;
        model.editWidget = editWidget;

        init();


        function init() {
            model.userId = currentUser._id;
            model.websiteId = $routeParams['wid'];
            model.pageId = $routeParams['pid'];
            widgetService.findWidgetsByPageId(model.pageId)
                .then(
                    function (widgets) {
                        model.widgets = widgets;
                    },
                    function () {
                        alert("cound not find widgets with page id");
                        navToPage();
                    }
                );

            //header
            model.header = "Widget List";
            model.back = "#!/website/" + model.websiteId + "/page";
            model.topRightOperationIcon = 'glyphicon glyphicon-plus';
            model.topRightOperation = newWidget;
        }


        function editWidget(widget) {
            $location.url('/website/' + model.websiteId + "/page/" + model.pageId + "/widget/" + widget._id);
        }


        function widgetUrl(widget) {
            var url = 'views/widget/templates/' + widget.type.toLowerCase() + '/widget-' + widget.type.toLowerCase() + '.view.client.html';
            return url;
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


        function newWidget() {
            $location.url('/website/' + model.websiteId + "/page/" + model.pageId + "/widget/new");
        }

        function navToPage() {
            $location.url("/website/" + model.websiteId + "/page");
        }

        function navToWebsite() {
            $location.url("/website/");
        }

    }
})();