(function () {
    angular
        .module('WebAppMaker')
        .service('widgetService', widgetServiceFunction);

    function widgetServiceFunction($http) {
        this.createWidget = createWidget;
        this.findWidgetsByPageId = findWidgetsByPageId;
        this.findWidgetById = findWidgetById;
        this.updateWidget = updateWidget;
        this.deleteWidget = deleteWidget;

        // tmpWidgetApi
        this.saveTmpWidget = saveTmpWidget;
        this.updateTmpWidgetUrl = updateTmpWidgetUrl;
        this.getTmpWidget = getTmpWidget;
        this.deleteTmpWidget = deleteTmpWidget;
        //local buffer of editing widget.
        var tmpWidget = {};


        // widget server function
        function createWidget(pid, widget) {
            var url = "/api/page/" + pid + "/widget";
            return $http.post(url, widget)
                .then(extractData);
        }

        function findWidgetsByPageId(pid) {
            var url = "/api/page/" + pid + "/widget";
            return $http.get(url)
                .then(extractData);
        }

        function findWidgetById(wgid) {
            var url = "/api/widget/" + wgid;
            return $http.get(url)
                .then(extractData);
        }

        function updateWidget(wgid, widget) {
            var url = "/api/widget/" + wgid;
            return $http.put(url, widget)
                .then(extractData);
        }

        function deleteWidget(wgid) {
            var url = "/api/widget/" + wgid;
            return $http.delete(url)
                .then(extractData);
        }

        function extractData(response) {
            return response.data;
        }

        // tmpWidget function
        function saveTmpWidget(url, widget) {
            tmpWidget.url = url;
            tmpWidget.widget = widget;
        }

        function getTmpWidget() {
            return tmpWidget;
        }

        function updateTmpWidgetUrl(url) {
            if (tmpWidget) {
                tmpWidget.widget.url = url;
            }
        }

        function deleteTmpWidget() {
            tmpWidget = {};
        }
    }
})();