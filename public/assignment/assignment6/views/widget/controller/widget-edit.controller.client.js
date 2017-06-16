(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetEditController', widgetEditController);

    function widgetEditController($location, $routeParams, widgetService, $sce, currentUser) {
        var model = this;

        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;
        model.searchOnFlickr = searchOnFlickr;

        model.trust = trust;
        model.widgetUrl = widgetUrl;

        init();

        function init() {

            model.widths = ["100%", "75%", "50%", "25%", "10%"];
            model.sizes = [6, 5, 4, 3, 2, 1];

            model.userId = currentUser._id;
            model.websiteId = $routeParams['wid'];
            model.pageId = $routeParams['pid'];
            model.widgetId = $routeParams['wgid'];
            model.preSelectedSize = false;
            model.mode = $location.hash();
            var bufferWidget = widgetService.getTmpWidget();

            if (model.mode === "new") {
                model.header = "New ";
                if (Object.keys(bufferWidget).length === 0) {
                    model.widget = {
                        "type": $routeParams.wgid,
                        "size": 1
                    };
                } else {
                    model.widget = bufferWidget.widget;
                    widgetService.deleteTmpWidget();
                }

                model.header = "New " + getHeader();
                model.preSelectedSize = true;
            } else {
                model.header = "Edit ";

                if (Object.keys(bufferWidget).length === 0) {
                    widgetService.findWidgetById(model.widgetId)
                        .then(
                            function (widget) {
                                model.widget = widget;
                                model.header = "Edit " + getHeader();
                            },
                            function () {
                                alert("cannot find widget by id")
                            }
                        );
                } else {
                    model.widget = bufferWidget.widget;
                    widgetService.deleteTmpWidget();

                }
                model.preSelectedSize = false;
            }


            model.back = "#!/website/" + model.websiteId + "/page/" + model.pageId + "/widget";
            model.topRightOperationIcon = 'glyphicon glyphicon-ok';
            model.topRightOperation = model.updateWidget;

        }

        function searchOnFlickr() {
            widgetService.saveTmpWidget($location.url(), model.widget);
            $location.path('/widget/' + model.widget._id + '/search');
        }

        function updateWidget() {

            if (model.widget && model.widget.name) {
                console.log('valid name');
                if (model.widget._id == null) {
                    widgetService.createWidget(model.pageId, model.widget)
                        .then(
                            function () {
                                $location.url('/website/' + model.websiteId + "/page/" + model.pageId + "/widget");
                            },
                            function () {
                                alert("create widget fail")
                            }
                            //             goToWidgetList,
                            //             sendAlert("create widget fail !!!!!!")
                        );
                }
                else {
                    widgetService.updateWidget(model.widget._id, model.widget)
                        .then(
                            function () {
                                $location.url('/website/' + model.websiteId + "/page/" + model.pageId + "/widget");
                            },
                            function () {
                                alert("update widget fail")
                            }
                            // goToWidgetList,
                            // sendAlert("update Widget fail")
                        );
                }
            } else {
                model.errorMessage = "widget name is require";
            }
        }


        function deleteWidget() {
            if (model.widget._id != null) {
                widgetService.deleteWidget(model.widget._id)
                    .then(
                        function () {
                            $location.url('/website/' + model.websiteId + "/page/" + model.pageId + "/widget");
                        },
                        function () {
                            alert("delete widget fail")
                        }
                        // goToWidgetList,
                        // sendAlert("delete Widget fail"));
                    );
            }
        }

        function getHeader() {
            //header
            switch (model.widget.type) {
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
                case "TEXT":
                    return "TEXT";
                    break;
                default:
                    break;
            }
        }


        function widgetUrl(widget) {
            return 'views/widget/templates/' + widget.type.toLowerCase() + '/widget-' + widget.type.toLowerCase() + '.view.client.html';
        }


        function trust(html) {
            // scrubbing the html
            return $sce.trustAsHtml(html);
        }


        function goToWidgetList(data) {
            $location.url('/website/' + model.websiteId + "/page/" + model.pageId + "/widget");
        }

        function sendAlert(message) {
            alert(message)
        }

    }
})();