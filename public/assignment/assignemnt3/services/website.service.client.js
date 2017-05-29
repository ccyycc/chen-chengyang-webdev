(function () {
    angular
        .module('WebAppMaker')
        .service('websiteService', websiteServiceFunction);

    function websiteServiceFunction() {
        this.createWebsite = createWebsite;
        this.findWebsitesByUser = findWebsitesByUser;
        this.findWebsiteById = findWebsiteById;
        this.updateWebsite = updateWebsite;
        this.deleteWebsite = deleteWebsite;
        var websites = [
            {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem"},
            {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem"},
            {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem"},
            {"_id": "890", "name": "Go", "developerId": "123", "description": "Lorem"},
            {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
            {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem"},
            {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem"}
        ];

        function createWebsite(userId, website) {
            website._id = (new Date()).getTime() + "";
            website.developerId = userId;
            website.createdTime = new Date();
            website.accessedTime = new Date();
            websites.push(cloneWebsite(website));
        }

        function findWebsitesByUser(userId) {
            var result_websites = websites.filter(function (website) {
                return userId === website.developerId;
            });
            if (typeof result_websites === 'undefined')
                return null;
            return result_websites.map(cloneWebsite);

        }

        function findWebsiteById(websiteId) {
            var result_website = websites.find(function (website) {
                return websiteId === website._id;
            });
            if (typeof result_website === 'undefined')
                return null;
            return cloneWebsite(result_website);
        }

        function updateWebsite(websiteId, website) {
            website.accessedTime = new Date();
            for (var w in websites) {
                if (websites[w]._id == websiteId) {
                    websites[w] = cloneWebsite(website);
                    return;
                }
            }
        }

        function deleteWebsite(websiteId) {
            var index = getWebsiteIndex(websiteId);
            websites.splice(index, 1);
        }

        function cloneWebsite(website) {
            // return Object.assign({},website);
            return {
                _id: website._id,
                developerId: website.developerId,
                name: website.name,
                description: website.description,
                createdTime: website.createdTime,
                accessedTime: website.accessedTime,
            };
        }


        function getWebsiteIndex(websiteId) {
            for (var i in websites) {
                if (websites[i]._id == websiteId) {
                    return i;
                }
            }
            return -1;
        }

    }

})();