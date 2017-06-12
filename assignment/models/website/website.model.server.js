var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server');
var websiteModel = mongoose.model('WebsiteModel', websiteSchema);

var userModel = require('../user/user.model.server');

websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;

websiteModel.addPage = addPage;
websiteModel.deletePage = deletePage;

websiteModel.deleteWebsiteForUser = deleteWebsiteForUser;


module.exports = websiteModel;

function deleteWebsiteForUser(userId) {
    var pageModel = require("../page/page.model.server");
    return websiteModel
        .find({_user:userId})
        .then(function(websites){
            websites.forEach(
                function(website){
                    return pageModel.deletePagesForWebsite(website._id)
                }
            )
        })
        .then(function () {
            return websiteModel
                .deleteMany({_user: userId})
        });
}

function addPage(websiteId, pageId) {
    return websiteModel
        .findById(websiteId)
        .then(
            function (website) {
                website.pages.push(pageId);
                return website.save();
            });
}

function deletePage(websiteId, pageId) {
    return websiteModel
        .findById(websiteId)
        .then(
            function (website) {
                var index = website.pages.indexOf(pageId);
                website.pages.splice(index, 1);
                return website.save();
            });
}

function createWebsiteForUser(userId, website) {
    website._user = userId;
    return websiteModel
        .create(website)
        .then(function (website) {
            return userModel.addWebsite(userId, website._id);
        })
        .then(
            function () {
                return website;
            });

}


function findAllWebsitesForUser(userId) {
    return websiteModel
        .find({_user: userId})
        .populate('_user')
        .exec();
}

function findWebsiteById(websiteId) {
    return websiteModel.findById(websiteId);
}


function updateWebsite(websiteId, website) {
    website.dateAccessed = Date.now();
    return websiteModel.update({_id: websiteId}, {$set: website});
}

function deleteWebsite(websiteId) {
    var pageModel = require("../page/page.model.server");
    pageModel.deletePagesForWebsite(websiteId);
    return websiteModel
        .findOne({_id: websiteId})
        .then(
            function (website) {
                return websiteModel
                    .remove({_id: websiteId})
                    .then(
                        function (status) {
                            return userModel.deleteWebsite(website._user, websiteId)
                        })
            })


}

