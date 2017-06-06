(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetEditController', widgetEditController);

    function widgetEditController($location, $routeParams, widgetService, $sce) {

        var model = this;

        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;
        model.searchOnFlickr = searchOnFlickr;

        model.trust = trust;
        model.widgetUrl = widgetUrl;
        init();

        function init() {
            model.widths = ["100%","75%","50%","25%","10%"];
            model.sizes = [6,5,4,3,2,1];

            model.userId = $routeParams['uid'];
            model.websiteId = $routeParams['wid'];
            model.pageId = $routeParams['pid'];
            model.widgetId = $routeParams['wgid'];
            model.preSelectedSize = false;
            model.mode = $location.hash();
            var bufferWidget = widgetService.getTmpWidget();

            if (model.mode === "new") {
                model.header = "New ";
                // console.log('backtonew, the buffer widget is ');
                // console.log(bufferWidget);
                if (Object.keys(bufferWidget).length == 0){
                    // console.log('bufferwidget == {}');
                    model.widget = {
                    "widgetType": $routeParams.wgid,
                        "size": 1
                    };
                }else{
                    // console.log('bufferwidget != {}');

                    model.widget = bufferWidget.widget;
                    widgetService.deleteTmpWidget();
                }

                model.header = "New " + getHeader();
                model.preSelectedSize=true;
            } else {
                model.header = "Edit ";

                if (Object.keys(bufferWidget).length == 0){
                    widgetService.findWidgetById(model.widgetId)
                        .then(
                            function (widget) {
                                model.widget = widget;
                                model.header = "Edit " + getHeader();
                            },
                            function () {
                                alert("cannot find widget by id");
                            }
                        );

                }else {
                    model.widget = bufferWidget.widget;
                    widgetService.deleteTmpWidget();

                }
                model.preSelectedSize=false;
            }


            model.back = "#!/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget";
            model.topRightOperationIcon = 'glyphicon glyphicon-ok';
            model.topRightOperation = model.updateWidget;
            // model.check = check;

        }

        function searchOnFlickr(){
            // console.log('searchOnFlickr');
            // console.log(model.widget);
            widgetService.saveTmpWidget($location.url(),model.widget);
            $location.path('/widget/'+model.widget._id+'/search');
        }

        // function check () {
            // console.log(angular.element(document.getElementById('123')));
        // }


        function updateWidget() {

            if (model.widget._id == null) {
                widgetService.createWidget(model.pageId, model.widget)
                    .then(
                        goToWidgetList,
                        function () {
                            alert("create widget fail");
                        }
                    );
            }
            else {
                widgetService.updateWidget(model.widget._id, model.widget)
                    .then(
                        goToWidgetList
                        // alert("update Widget fail")
                    );
            }
        }


        function deleteWidget() {
            if (model.widget._id != null) {
                widgetService.deleteWidget(model.widget._id)
                    .then(
                        goToWidgetList,
                        function () {
                            alert("delete Widget fail")
                        }
                    );
            }
        }

        function getHeader() {
            //header
            switch (model.widget.widgetType) {
                case "HEADING":
                    return "Heading Widget";
                    break;
                case "YOUTUBE":
                    return "Youtube Widget";
                    break;
                case "IMAGE":
                    return "Image Widget";
                    break;
                case "HTML":
                    return "HTML Widget";
                    break;
                default:
                    break;
            }
        }

        function goToWidgetList(data) {
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