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
        var tmpWidget = {};

        function deleteTmpWidget(){
            tmpWidget={};
        }
        function getTmpWidget(){
            // console.log('getTmpWidget');
            // console.log(tmpWidget);
            return tmpWidget;
        }

        function saveTmpWidget(path, widget){
            tmpWidget.path = path;
            tmpWidget.widget = widget;
            // console.log(tmpWidget);
        }

        function updateTmpWidgetUrl(url){
            if(tmpWidget){
                // console.log(tmpWidget);
                tmpWidget.widget.url=url;
            }
        }

        function createWidget(pid, widget) {
            var url = "/api/page/" + pid + "/widget";
            return $http.post(url, widget)
                .then(returnData);
        }

        function findWidgetsByPageId(pid) {
            var url = "/api/page/" + pid + "/widget";
            return $http.get(url)
                .then(returnData);
        }

        function findWidgetById(wgid) {
            var url = "/api/widget/" + wgid;
            return $http.get(url)
                .then(returnData);
        }

        function updateWidget(wgid, widget) {
            var url = "/api/widget/" + wgid;
            return $http.put(url, widget)
                .then(returnData);
        }

        function deleteWidget(wgid) {
            var url = "/api/widget/" + wgid;
            return $http.delete(url)
                .then(returnData);
        }

        function returnData(response) {
            return response.data;
        }
    }
})();