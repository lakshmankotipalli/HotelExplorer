hotelExplorerApp.controller('searchHotelsCtrl', ['$scope', '$location', function ($scope, $location) {
    $scope.guestCount = function (count) {
        $scope.guestCountNum = count;
    };
    // Hardcoding the Locations, these will match the original lat long values
    $scope.locationList = ['Kakinada, Andhra Pradesh, India', 'Hyderabad, Telangana, India', 'Pune, Maharashtra, India', 'Las Vegas, NV, USA'];
    document.getElementById('fromDate').valueAsDate = new Date();
    document.getElementById('toDate').valueAsDate = new Date();
    // document.onkeydown = function(e) {
    //     if(e.keyCode === 13) { // The Enter/Return key
    //         document.activeElement.onclick(e);
    //     }
    // };

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
        }
        if(($scope.fromDate.getMonth()+1) < 10) {
            fromMonth = '0'+ ($scope.fromDate.getMonth()+1);
        }
        if($scope.toDate.getDate() < 10) {
            toDate = '0'+ $scope.toDate.getDate();
        }
        if(($scope.toDate.getMonth() + 1) < 10) {
            toMonth = '0'+ ($scope.toDate.getMonth()+1);
        }

        $scope.from = fromMonth + '/' + fromDate + '/' + $scope.fromDate.getFullYear();
        $scope.to = toMonth + '/' + toDate + '/' + $scope.toDate.getFullYear();

        var data = [$scope.selected, $scope.lat, $scope.long, $scope.from, $scope.to, $scope.guestCountNum];
        console.log(data);
        $location.path('/searchResults');
    };

}]);