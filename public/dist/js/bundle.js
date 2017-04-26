'use strict';

angular.module('myApp', ['ui.router']).config(function ($urlRouterProvider, $stateProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider.state('home', {
    url: '/',
    templateUrl: "./views/home.html",
    controller: "homeCtrl"
  }).state('sync', {
    url: '/sync',
    templateUrl: "./views/sync.html",
    controller: "syncCtrl"
  }).state('profile', {
    url: '/profile',
    templateUrl: "./views/profile.html",
    controller: "profileCtrl"
  }).state('about', {
    url: '/about',
    templateUrl: "./views/about.html"
  });
});
'use strict';

angular.module('myApp').controller('homeCtrl', function ($scope, weatherService, $state) {
  $scope.getweather = function (location) {
    weatherService.getweather(location).then(function (weather) {
      if (weather) {
        $scope.weather = weather;
        console.log(weather.data);
      } else {
        $scope.weather = 'No CIty!!';
      }
    });
  };
});
'use strict';

angular.module('myApp').controller('profileCtrl', function ($scope, facebookService) {

  facebookService.getfacebook().then(function (result) {
    console.log(result.data);
    $scope.feed = result;
  });
});
'use strict';

angular.module('myApp').service('weatherService', function ($http) {

  this.getweather = function (location) {
    console.log(location);
    return $http({
      method: 'GET',
      url: '/api/weather/data/' + location.city + '/' + location.country,
      data: location
    });
  };
});
//# sourceMappingURL=bundle.js.map
