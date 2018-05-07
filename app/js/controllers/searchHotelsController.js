hotelExplorerApp.controller('searchHotelsCtrl', ['$scope', '$location', function ($scope, $location) {
    $scope.msg = "I love Bharat";
    document.getElementById('fromDate').valueAsDate = new Date();
    document.getElementById('toDate').valueAsDate = new Date();
    // document.onkeydown = function(e) {
    //     if(e.keyCode === 13) { // The Enter/Return key
    //         document.activeElement.onclick(e);
    //     }
    // };

    $scope.search = function () {
        $location.path('/searchResults');
    };

    $scope.guestCount = function (count) {
        $scope.guestCountNum = count;
    };

}]);