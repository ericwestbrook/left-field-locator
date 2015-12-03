angular.module('leftFieldLocator', ['google.places'])
  .controller('locatorCtrl', ['$scope', function ( $scope ) {

    $scope.homeLocation = '510 Victoria Ave, Venice, CA 90291, USA';

    $scope.compareLocations = [
      'Times Square, Manhattan, NY 10036, USA',
      '13000 S Dakota 244, Keystone, SD 57751, USA',
      '1600 Pennsylvania Ave NW, Washington, DC 20500, USA',
      'Golden Gate Bridge, San Francisco, CA 94129, USA',
      'Stonehenge, A344, Amesbury, Wiltshire SP4 7DE, United Kingdom',
      'Great Wall of China',
      'Hollywood Sign, Los Angeles, CA, USA'
    ];

    $scope.sortedLocations = [];

    $scope.searchAndSort = function() {

    };

    $scope.reset = function() {
      $scope.homeLocation = '510 Victoria Ave, Venice, CA 90291, USA';
    };

  }]);