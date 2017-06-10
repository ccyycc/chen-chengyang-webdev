(function () {
    angular
        .module('WebAppMaker')
        .service('websiteService', websiteServiceFunction);

    function websiteServiceFunction($http) {
        this.createWebsite = createWebsite;
        this.findWebsitesByUser = findWebsitesByUser;
        this.findWebsiteById = findWebsiteById;
        this.updateWebsite = updateWebsite;
        this.deleteWebsite = deleteWebsite;

        function createWebsite(userId, website) {
            var url = "/api/user/" + userId + "/website";
            return $http.post(url, website)
                .then(extractData);
        }

        function findWebsitesByUser(userId) {
            var url = "/api/user/" + userId + "/website";
            return $http.get(url)
                .then(extractData);
        }

        function findWebsiteById(websiteId) {
            var url = "/api/website/" + websiteId;
            return $http.get(url)
                .then(extractData);
        }

        function updateWebsite(websiteId, website) {
            var url = "/api/website/" + websiteId;
            return $http.put(url, website)
                .then(extractData);
        }

        function deleteWebsite(websiteId) {
            var url = "/api/website/" + websiteId;
            return $http.delete(url)
                .then(extractData);
        }

        function extractData(response) {
            return response.data;
        }

    }

})();