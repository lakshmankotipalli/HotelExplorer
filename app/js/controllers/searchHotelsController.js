hotelExplorerApp.controller('searchHotelsCtrl', ['$scope', '$location', function ($scope, $location) {
    $scope.msg = "I love Bharat";
    document.getElementById('fromDate').valueAsDate = new Date();
    document.getElementById('toDate').valueAsDate = new Date();


    $scope.search = function () {
        $location.path('/searchResults');
    };

}]);