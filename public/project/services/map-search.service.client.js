(function () {
    angular
        .module('WebAppMaker')
        .service('mapSearchService', mapSearchService);

    function mapSearchService($http) {

        this.searchStore = searchStore;

        var key = "AIzaSyDWDGBQg0OOggV3glE5wcNcFOXhSntbj1Y";
        var urlBase = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&keyword=cruise&key=YOUR_API_KEY"

        // var urlBase = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&keyword=cruise&key=AIzaSyDWDGBQg0OOggV3glE5wcNcFOXhSntbj1Y"

        function searchStore() {

            var url = urlBase
                .replace("YOUR_API_KEY", key);


            var map;
            var infowindow;

            function initMap() {
                var pyrmont = {lat: 42.3383522, lng: -71.0877508};

                map = new google.maps.Map(document.getElementById('map'), {
                    center: pyrmont,
                    zoom: 15
                });

                infowindow = new google.maps.InfoWindow();
                var service = new google.maps.places.PlacesService(map);
                service.nearbySearch({
                    location: pyrmont,
                    radius: 500,
                    keyword:"grocery store",
                    type: ['store']
                }, callback);
            }

            function callback(results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    for (var i = 0; i < results.length; i++) {
                        createMarker(results[i]);
                    }
                }
            }

            function createMarker(place) {
                console.log(place);
                var placeLoc = place.geometry.location;
                var marker = new google.maps.Marker({
                    map: map,
                    position: place.geometry.location
                });

                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.setContent(place.name);
                    infowindow.open(map, this);
                });
            }

        }
    }
})();
