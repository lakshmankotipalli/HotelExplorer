hotelExplorerApp.controller('searchHotelsCtrl', ['$scope', '$location', 'apifactory', '$rootScope', function ($scope, $location, apifactory, $rootScope) {
    $scope.guestCount = function (count) {
        $scope.guestCountNum = count;
    };
    // Hardcoding the Locations, these will match the original lat long values
    $scope.locationList = [{city: 'Mumbai', lat: 49.0097, lng: 2.5479}, 
    {city: 'Kakinada, Andhra Pradesh, India', lat: 16.989065, lng: 82.247467}, 
    {city: 'Hyderabad, Telangana, India', lat: 17.387140, lng: 78.491684}, 
    {city: 'Pune, Maharashtra, India', lat: 18.516726, lng: 73.856255}, 
    {city: 'Las Vegas, NV, USA', lat: 36.114647, lng: -115.172813}];
    $scope.currLocation='SearchInit';


    $scope.searchHotels = function () {
        angular.element('#loader').show();
        var fromDate, fromMonth, toDate, toMonth;
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

        var infoObj = {location: $scope.selected, from: $scope.from, to: $scope.to};

         $scope.searchData = {locationList:$scope.locationList,location: $scope.selected, from: $scope.fromDate, to: $scope.toDate};
         apifactory.setSearchData($scope.searchData);
         $scope.successCall = function (result) {
            $scope.sessionId = result.data.sessionId;
            $scope.statusReq();
        };

        $scope.failureCall = function (err) {
            if(err.data.code == '55') {
                swal({
                    type: 'error',
                    title: 'Oops...',
                    text: err.data.info[0].message
                  });
            } else {
                swal({
                    type: 'error',
                    title: 'Oops...',
                    text: err.data.message
                  });
            }
        };
        apifactory.apiRequest(infoObj, 'INIT', $scope.successCall, $scope.failureCall);
    };

    
    $scope.statusSuccess = function (result) {
        console.log(result);
        if(result.status == 200 && result.statusText == 'OK') {
            //$location.path('/searchResults');
            var obj = {
                sessionId: apifactory.getSessionId().sessionId
            }
    
            apifactory.apiRequest(obj, 'RESULTS', $scope.resultSuccess, $scope.resultFailure);


        }
    };

    $scope.statusFailure = function (err) {
        angular.element('#loader').fadeOut();
        console.log(err);
    };

    $scope.resultSuccess = function (res) {
        if(res.status == 200 && res.statusText == 'OK') {
            angular.element('#loader').fadeOut();
            console.log(res.data);
            $location.path('/searchResults');
        }
    };

    $scope.resultFailure = function (err) {
        angular.element('#loader').fadeOut();
        swal({
            type: 'error',
            title: 'Oops...',
            text: err.data.message
          });
        $scope.noResults = true;
        console.log(err);
    };

    $scope.statusReq = function () {
        var obj = {"sessionId": $scope.sessionId};
        apifactory.setSessionId(obj);
        apifactory.apiRequest(obj, 'STATUS', $scope.statusSuccess, $scope.statusFailure);
    };

}]);