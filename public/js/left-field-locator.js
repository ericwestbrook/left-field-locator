angular.module('leftFieldLocator', ['google.places'])


  // API Service - injectable service to manage back-end requests
  .factory('apiSrv', ['$http', function($http){
    var apiSrv = {};

     apiSrv.postRequest = function( reqUrl, args, successFn, errorFn ){
            return $http({
                method: 'POST',
                url: '/api/' + reqUrl,
                data: JSON.stringify(args)
            }).success(successFn);
        };

    return apiSrv;
  }])

  .controller('locatorCtrl', ['$scope', 'apiSrv', function ( $scope, api ) {

    // Setup initial vars & list to compare
    $scope.homeLocation = '510 Victoria Ave, Venice, CA 90291, USA'; // Address to search
    $scope.homeGeo = ''; // Geolocation of searched address
    $scope.compareLocations = [ // List of locations to compare
      'Times Square, Manhattan, NY 10036, USA',
      '13000 S Dakota 244, Keystone, SD 57751, USA',
      '1600 Pennsylvania Ave NW, Washington, DC 20500, USA',
      'Golden Gate Bridge, San Francisco, CA 94129, USA',
      'Stonehenge, A344, Amesbury, Wiltshire SP4 7DE, United Kingdom',
      'Great Wall of China',
      'Hollywood Sign, Los Angeles, CA, USA'
    ];
    $scope.geoLocations = []; // Geolocations of locations to compare
    $scope.sortedLocations = []; // Sorted locations by distance

    // uses Haversine formula for calculating distance on spherical points
    // returns value in Miles
    $scope.calcDistance = function(locA, locB) {
      var radlat1 = Math.PI * locA.latitude/180;
      var radlat2 = Math.PI * locB.latitude/180;
      var radlon1 = Math.PI * locA.longitude/180;
      var radlon2 = Math.PI * locB.longitude/180;
      var theta = locA.longitude-locB.longitude;
      var radtheta = Math.PI * theta/180
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      dist = Math.acos(dist)
      dist = dist * 180/Math.PI
      dist = dist * 60 * 1.1515
      return dist;
    }

    // Function for sorting locations
    // should only be called after geolocations are retrieved.
    $scope.sortLocations = function() {
      for (var i=0; i < $scope.geoLocations.length; i++) {
        //first find the distances of each location
        $scope.geoLocations[i].distance = $scope.calcDistance($scope.geoLocations[i], $scope.homeGeo);
      }
      $scope.sortedLocations = angular.copy($scope.geoLocations);
      $scope.sortedLocations.sort(function(a, b) {
        if (a.distance === b.distance) {
          return 0;
        }
        else {
          return (a.distance < b.distance) ? -1 : 1;
        }
      });
      console.log('all sorted...', $scope.sortedLocations);
    };

    // Make the API call to get geolocations from locations and then call the sort function
    $scope.searchAndSort = function() {
      api.postRequest('locations-from-addresses', {
        home: $scope.homeLocation.formatted_address ? $scope.homeLocation.formatted_address : $scope.homeLocation,
        compare: $scope.compareLocations
      }, function(data) {
        $scope.homeGeo = data.home;
        $scope.geoLocations = data.compare;
        $scope.sortLocations();
      }, function(error) {
        console.log('unable to retrieve geolocations');
      })
    };

    $scope.reset = function() {
      $scope.homeLocation = '510 Victoria Ave, Venice, CA 90291, USA';
      $scope.geoLocations = [];
      $scope.sortedLocations = [];
      $scope.searchAndSort();
    };

    $scope.searchAndSort();

  }]);