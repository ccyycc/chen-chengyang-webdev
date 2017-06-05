// (function () {
//     angular
//         .module("WebAppMaker")
//         .directive('wdDraggable', wdDraggable);
//
//     function wdDraggable($http,$routeParams) {
//
//         function linkFunction(scope, element) {
//             $(element).sortable(
//                 {
//                     start: function (event, ui) {
//                         scope.initial = ui.item.index()
//                     },
//                     stop: function (event, ui) {
//                         scope.final = ui.item.index()
//                         scope.pageId = $routeParams.pid;
//                         var url = "/page/" + scope.pageId + "/widget?initial=" + scope.initial + "&final=" + scope.final;
//                         return $http.post(url);
//                     }
//                 }
//             );
//
//             // var sortedIDs = $(element).sortable( "toArray" );
//         }
//         // function () {
//         //
//         // }
//
//         return {
//             // template: "123"
//             link: linkFunction,
//             // controller: controller
//         }
//     }
// })();
