// https://developer.oxforddictionaries.com/documentation

var q = require('q');
const app = require('../../express');
const https = require('https');

app.get('/api/map', searchQuery);

var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&keyword=cruise&key=AIzaSyDWDGBQg0OOggV3glE5wcNcFOXhSntbj1Y";

function searchQuery(req, res) {
    oxfordSearchQuery()
        .then(function(response){
            res.json(response);
        }, function (error) {
            res.sendStatus(404).send(error);
        });
}

function oxfordSearchQuery() {
    var deferred = q.defer();
    https.get({
        host: 'maps.googleapis.com',
        path: "/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&keyword=cruise&key=AIzaSyDWDGBQg0OOggV3glE5wcNcFOXhSntbj1Y",
        headers: {
            "Accept": "application/json"
        }
    }, function(response) {
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {
            try {
                body = JSON.parse(body);
                deferred.resolve(body);
            } catch(e) {
                deferred.reject({error: e});
            }
        });
    });
    return deferred.promise;
}