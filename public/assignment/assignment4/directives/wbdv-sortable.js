(function () {
    angular
        .module("WDSortable", [])
        .directive('wdDraggable', wdDraggable);

    function wdDraggable($http, $routeParams) {

        function linkFunction(scope, element) {
            $(element).sortable(
                {
                    start: function (event, ui) {
                        scope.initial = ui.item.index()
                    },
                    stop: function (event, ui) {
                        scope.final = ui.item.index();
                        scope.pageId = $routeParams.pid;
                        var url = "/page/" + scope.pageId + "/widget?initial=" + scope.initial + "&final=" + scope.final;
                        return $http.post(url);
                    }
                }
            );
        }

        return {
            link: linkFunction,
        }
    }
})();
