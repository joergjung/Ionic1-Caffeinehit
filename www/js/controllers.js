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
    
    $scope.loadMore = function() {
        console.log("Load more");
         if (!$scope.yelp.isLoading && $scope.yelp.hasMore) {
            $scope.yelp.next().then(function() {
                // when more data has benn received then broadcast this event to hide spinner icon
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        }        
    };
    
    $scope.getDirections = function(cafe) {
        console.log("get directions");
        var destination = [
            cafe.location.coordinate.latitude,
            cafe.location.coordinate.longitude
        ];
        var source = [
            $scope.yelp.lat,
            $scope.yelp.lon
        ];
        // launch the plugin
        launchnavigator.navigate(destination, source);   
    };
    
    $scope.openMap = function(cafe) {
        console.log("open map");    
    };
});
