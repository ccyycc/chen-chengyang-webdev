(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetListController', widgetListController);

    function widgetListController($location, $routeParams,
                                  pageService, userService, widgetService, $sce) {
        var model = this;
        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];
        model.pageId = $routeParams['pid'];


        //header
        model.header = "Widget List";
        model.back = "#!/user/" + model.userId + "/website/" + model.websiteId + "/page";
        model.topRightOperationIcon = 'glyphicon glyphicon-plus'
        model.topRightOperation = newWidget;

        model.getSize = getSize;
        model.trust = trust;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        model.widgetUrl = widgetUrl;
        model.editWidget = editWidget;


        function editWidget(widget) {
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + "/page/" + model.pageId + "/widget/" + widget._id);
            // $location.url('views/widget/templates/'+widget.widgetType.toLowerCase()+'/widget-'+widget.widgetType.toLowerCase()+'-edit.view.client.html');
        }


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


        function newWidget() {
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + "/page/" + model.pageId + "/widget/new");
        }

        function init() {
            model.widgets = widgetService.findWidgetsByPageId(model.pageId);
            console.log(model.widgets);
        }

        init();
    }
})();