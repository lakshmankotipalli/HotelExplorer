hotelExplorerApp.service('apifactory',['$http', '$q', function ($http, $q) {
    var baseURL = 'https://public-be.oski.io/hotel/v1.0/search',
    initURL = '/init',
    statusURL = '/status',
    resultsURL = '/results';

    var headers = {
        'oski-tenantId': 'Demo',
        'Content-Type': 'application/json'
    }
    var def = $q.defer();
    var sessionId = {};

    
    return {
        callInit: function (data) {
            $http({
                method: 'POST',
                url: baseURL+initURL,
                data: data,
                headers: headers
            }).then(function (resp) {
                console.log(resp);
                def.resolve(resp);
            }).catch(function (err) {
                console.log(err);
                def.reject(err);
            }).finally(function() {
                console.log("finally finished");
              });
            return def.promise;
        },
        callStatus: function (data) {
            $http({
                method: 'POST',
                url: baseURL+statusURL,
                data: data,
                headers: headers
            }).then(function (resp) {
                console.log(resp);
                def.resolve(resp);
            }).catch(function (err) {
                console.log(err);
                def.reject(err);
            }).finally(function() {
                console.log("finally finished");
              });
            return def.promise;
        },
        callResults: function (data) {
            $http({
                method: 'POST',
                url: baseURL+resultsURL,
                data: data,
                headers: headers
            }).then(function (resp) {
                console.log(resp);
                def.resolve(resp);
            }).catch(function (err) {
                console.log(err);
                def.reject(err);
            }).finally(function() {
                console.log("finally finished");
              });
            return def.promise;
        },
        setSessionId: function (data) {
            sessionId = data;
        },
        getSessionId: function () {
            return sessionId;
        }
    };
}]);