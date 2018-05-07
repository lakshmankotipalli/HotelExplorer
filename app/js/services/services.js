hotelExplorerApp.service('apifactory',['$http', function ($http) {
    var baseURL = 'https://public-be.oski.io/hotel/v1.0/search',
    initURL = '/init',
    statusURL = '/status',
    resultsURL = '/results';

    var headers = {
        'oski-tenantId': 'Demo',
        'Content-Type': 'application/json'
    }
    

    return {
        callInit: function (data) {
            $http({
                method: 'POST',
                url: baseURL+initURL,
                data: data,
                headers: headers
            }).then(function(response) {
                console.log(response);
                if(response.status == 200 && response.statusText == 'OK') {
                    console.log(response.data);
                }
            });
        }
    };
}]);