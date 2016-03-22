var app = angular.module('caffeinehit.controllers', []);

app.controller("YelpController", function($scope, YelpService) {
	$scope.yelp = YelpService;
    
    $scope.doRefresh = function() {
        if (!$scope.yelp.isLoading) {
            $scope.yelp.refresh().then(function() {
                // when refreshed then broadcast this event hide spinner icon
                $scope.$broadcast('scroll.refreshComplete');
            });
        }        
    };
});
