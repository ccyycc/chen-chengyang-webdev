(function () {
    angular
        .module('WebAppMaker')
        .service('pageService', pageServiceFunction);

    function pageServiceFunction() {
        var pages = [
            {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
            {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
            {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
        ];
        this.createPage = createPage;
        this.findPageByWebsiteId = findPageByWebsiteId;
        this.findPageById = findPageById;
        this.updatePage = updatePage;
        this.deletePage = deletePage;
        function createPage(websiteId, page) {
            page._id = (new Date()).getTime() + "";
            page.websiteId = websiteId;
            page.createdTime = new Date();
            page.accessedTime = new Date();
            pages.push(clonePage(page));
        }

        function findPageByWebsiteId(websiteId) {
            var result_pages = pages.filter(function (page) {
                return websiteId === page.websiteId;
            });
            if (typeof result_pages === 'undefined')
                return null;
            return result_pages.map(clonePage);
        }

        function findPageById(pageId) {
            var result_page = pages.find(function (page) {
                return pageId === page._id;
            });
            if (typeof result_page === 'undefined')
                return null;
            return clonePage(result_page);
        }

        function updatePage(pageId, page) {
            page.accessedTime = new Date();
            for (var p in pages) {
                if (pages[p]._id == pageId) {
                    pages[p] = clonePage(page);
                    return;
                }
            }
        }

        function deletePage(pageId) {
            var target_page = findPageById(pageId);
            var index = pages.indexOf(target_page);
            pages.splice(index, 1);
            console.log(pages);
        }


        function clonePage(page) {
            return {
                _id: page._id,
                websiteId: page.websiteId,
                developerId: page.developerId,
                name: page.name,
                description: page.description,
                createdTime: page.createdTime,
                accessedTime: page.accessedTime,
            };
        }
    }
})();