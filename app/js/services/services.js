hotelExplorerApp.service('apifactory',['$http', function ($http) {
    var baseURL = 'https://public-be.oski.io/hotel/v1.0/search';
    var serviceEndPoints = {
        INIT: '/init',
        STATUS: '/status',
        RESULTS: '/results'
    }
    var headers = {
        'oski-tenantId': 'Demo',
        'Content-Type': 'application/json'
    }
    var sessionId = {};
    var searchData = {};
    var hotels = [];

    this.setHotels = function(data){
        hotels = data;
    };

    this.getHotels = function(){
        return hotels;
    };
    
    this.apiRequest = function (data, url, success, failure) {
        $http({
            method: 'POST',
            url: baseURL+serviceEndPoints[url],
            data: data,
            headers: headers
        }).then(function (resp) {
            success(resp);
        }).catch(function (err) {
            failure(err);
        });
    };

    this.setSessionId = function (id) {
        sessionId = id;
    };

    this.getSessionId = function () {
        return sessionId;
    };

    this.setSearchData = function (data) {
        searchData = data;
    };
    this.getSearchData = function () {
        return searchData;
    }
}]);