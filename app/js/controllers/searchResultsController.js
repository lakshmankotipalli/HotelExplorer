hotelExplorerApp.controller('searchResultsCtrl', ['$scope', 'apifactory', function ($scope, apifactory) {
    $scope.guestCount = function (count) {
        $scope.guestCountNum = count;
    };

    var sessionId = apifactory.getSessionId();
    var obj = {
        "sessionId": sessionId,
        "paging": {
           "pageNo": 1,
           "pageSize": 1,
           "orderBy": "price asc, rating desc"
        },
        "optionalDataPrefs": [
           "All"
        ],
        "currency": "USD",
        "contentPrefs": [
           "Basic",
           "Activities",
           "Amenities",
           "Policies",
           "AreaAttractions",
           "Descriptions",
           "Images",
           "CheckinCheckoutPolicy",
           "All"
        ],
        "filters": {
           "minHotelPrice": 1,
           "maxHotelPrice": 10000,
           "minHotelRating": 1,
           "maxHotelRating": 5,
           "hotelChains": [
              "Novotel",
              "Marriott",
              "Hilton",
              "Accor"
           ],
           "allowedCountry": "FR"
        }
     }
     
    $scope.init = function () {
        apifactory.callResults(obj).then(function (res) {
            if(res.status == 200 && res.statusText == 'OK') {
                console.log(res);
            }
        }, function (err) {
            console.log(err);
        });
    };






    $scope.init();
}]);