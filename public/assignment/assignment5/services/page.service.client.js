(function () {
    angular
        .module('WebAppMaker')
        .service('pageService', pageServiceFunction);

    function pageServiceFunction($http) {

        this.createPage = createPage;
        this.findPageByWebsiteId = findPageByWebsiteId;
        this.findPageById = findPageById;
        this.updatePage = updatePage;
        this.deletePage = deletePage;
        function createPage(wid, page) {
            var url = "/api/website/" + wid + "/page";
            return $http.post(url,page)
                .then(returnData);
        }

        function findPageByWebsiteId(wid) {
            var url = "/api/website/" + wid + "/page";
            return $http.get(url)
                .then(returnData);
        }

        function findPageById(pid) {
            var url = "/api/page/"+pid;
            return $http.get(url)
                .then(returnData);
        }

        function updatePage(pid, page) {
            var url = "/api/page/"+pid;
            return $http.put(url,page)
                .then(returnData);
        }

        function deletePage(pid) {
            var url = "/api/page/"+pid;
            return $http.delete(url)
                .then(returnData);
        }

        function returnData(response) {
            return response.data;
        }
    }
})();