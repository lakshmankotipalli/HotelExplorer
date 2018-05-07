var hotelExplorerApp = angular.module('hotelExplorer', ["ngRoute", "ui.bootstrap"]);

hotelExplorerApp.config(function ($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "./views/searchHotels.html",
        controller: "searchHotelsCtrl"
    })
    .when("/searchResults", {
        templateUrl : "views/searchResults.html",
        controller: "searchResultsCtrl"
    });
});