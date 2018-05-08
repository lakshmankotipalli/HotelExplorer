hotelExplorerApp.controller('searchHotelsCtrl', ['$scope', '$location', 'apifactory', function ($scope, $location, apifactory) {
    $scope.guestCount = function (count) {
        $scope.guestCountNum = count;
    };
    // Hardcoding the Locations, these will match the original lat long values
    $scope.locationList = ['Kakinada, Andhra Pradesh, India', 'Hyderabad, Telangana, India', 'Pune, Maharashtra, India', 'Las Vegas, NV, USA'];

    $scope.searchHotels = function () {
        var fromDate, fromMonth, toDate, toMonth;
        switch ($scope.selected) {
            case $scope.locationList[0]:
                $scope.lat = 16.989065;
                $scope.long = 82.247467;
            break;
            case $scope.locationList[1]:
                $scope.lat = 17.387140;
                $scope.long = 78.491684;
            break;
            case $scope.locationList[2]:
                $scope.lat = 18.516726;
                $scope.long = 73.856255;
            break;
            case $scope.locationList[3]:
                $scope.lat = 36.114647;
                $scope.long = -115.172813;
            break;
            default:
            $scope.lat = '';
            $scope.long = '';
        }

        if($scope.fromDate.getDate() < 10) {
            fromDate = '0'+ $scope.fromDate.getDate();
        } else {
            fromDate = $scope.fromDate.getDate();
        }
        if(($scope.fromDate.getMonth()+1) < 10) {
            fromMonth = '0'+ ($scope.fromDate.getMonth()+1);
        } else {
            fromMonth = ($scope.fromDate.getMonth()+1);
        }
        if($scope.toDate.getDate() < 10) {
            toDate = '0'+ $scope.toDate.getDate();
        } else {
            toDate = $scope.toDate.getDate();
        }
        if(($scope.toDate.getMonth() + 1) < 10) {
            toMonth = '0'+ ($scope.toDate.getMonth()+1);
        } else {
            toMonth = ($scope.toDate.getMonth()+1);
        }

        $scope.from = fromMonth + '/' + fromDate + '/' + $scope.fromDate.getFullYear();
        $scope.to = toMonth + '/' + toDate + '/' + $scope.toDate.getFullYear();

        var info = {
            "currency": "USD",
            "posId": "hbg3h7rf28",
            "orderBy": "price asc, rating desc",
            "roomOccupancies": [
               {
                  "occupants": [
                     {
                        "type": "Adult",
                        "age": 25
                     }
                  ]
               }
            ],
            "stayPeriod": {
               "start": $scope.from,
               "end": $scope.to
            },
            "bounds": {
               "circle": {
                  "center": {
                     "lat": $scope.lat,
                     "long": $scope.long
                },
                "radiusKm": 50.5
               }
            }
         };
        apifactory.callInit(info).then(function(resp) {
            console.log('ctrl resp', resp.data.sessionId);
            $scope.sessionId = resp.data.sessionId;
            $scope.statusReq();
        }, function (err) {
            if(err.data.code == '55') {
                alert(err.data.info[0].message);
            } else {
                alert(err.data.message);
            }
        });

        $scope.statusReq = function () {
            var obj = {sessionId: $scope.sessionId};
            //apifactory.setSessionId(obj);
            apifactory.callStatus(obj).then(function (res) {
                console.log(res);
                if(res.status == 200 && res.statusText == 'OK') {
                    $location.path('/searchResults');
                }
            }, function (err) {
                console.log(err);
            });
        };
        
    };

}]);