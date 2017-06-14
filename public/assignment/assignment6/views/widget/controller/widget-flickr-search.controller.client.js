(function () {
    angular
        .module('WebAppMaker')
        .controller('flickrController', flickrController);

    function flickrController($location, flickrService, widgetService) {
        var model = this;

        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;

        init();

        function init(){
            model.back = '#!'+getBackToImageWidget();
            model.header = "Search Flickr";
        }




        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            widgetService.updateTmpWidgetUrl(url);
            backToImageWidget();
        }

        function backToImageWidget(){
            var callbackUrl = widgetService.getTmpWidget().url;
            $location.path(callbackUrl);
        }

        function getBackToImageWidget(){
            return widgetService.getTmpWidget().url;
        }

        function searchPhotos(searchTerm) {
            flickrService
                .searchPhotos(searchTerm)
                .then(function (response) {
                    data = response.data.replace("jsonFlickrApi(", "");
                    data = data.substring(0, data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                }, function () {
                    alert('error,please try again.')
                });
        }
    }
})();