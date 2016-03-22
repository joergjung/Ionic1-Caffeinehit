var app = angular.module('caffeinehit.services', []);

app.service("YelpService", function($q, $http, $cordovaGeolocation, $ionicPopup) {
	var self = {
		'page': 1,
		'isLoading': false,
		'hasMore': true,
		'results': [],
        // Hamburg
		'lat': 53.549518,
		'lon': 9.962401,
		'refresh': function() {
			self.page = 1;
			self.isLoading = false;
			self.hasMore = true;
			self.results = [];
			return self.load();
		},
		'next': function() {
			self.page += 1;
			return self.load();
		},
		'load': function() {
			self.isLoading = true;
			var deferred = $q.defer();
            
            // first check if device has fully loaded and if the plugins are available 
            ionic.Platform.ready(function() {
                $cordovaGeolocation
                    .getCurrentPosition({ timeout: 10000, enableHighAccuracy: false })
                    .then(function(position) {
                        self.lat = position.coords.latitude;
                        self.lon = position.coords.longitude;
                        
                        var params = {
                            page: self.page,
                            lat: self.lat,
                            lon: self.lon
                        };
                        // use the codecraftpro service wrapper 
                        $http.get('https://codecraftpro.com/api/samples/v1/coffee/', {params: params})
                            .success(function (data) {
                                self.isLoading = false;
                                console.log(data);
                                if (data.businesses.length === 0) {
                                    self.hasMore = false;
                                } else {
                                    angular.forEach(data.businesses, function(business) {
                                        self.results.push(business);
                                    });
                                }
                                deferred.resolve();
                            })
                            .error(function(data, status, headers, config) {
                                self.isLoading = false;
                                deferred.reject(data);
                            });
                    }, function(err) {
                        console.error("Error getting position");
                        console.error(err);   
                        $ionicPopup.alert({
                            'title':'Geolocation disabled!',
                            'template':'Seems like you switched off geolocation for caffeinehit, please switch it on by going to your application settings. Thanks!'
                        });                      
                    });
            });
			return deferred.promise;
		}
	};
	self.load();
	return self;
});
