hotelExplorerApp.controller('searchResultsCtrl', ['$scope', function ($scope) {
    $scope.guestCount = function (count) {
        $scope.guestCountNum = count;
    };
}]);