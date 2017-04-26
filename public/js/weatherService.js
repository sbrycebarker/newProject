angular.module('myApp').service('weatherService', function($http) {

  this.getweather = function(location) {
    console.log(location);
    return $http({
      method: 'GET',
      url: `/api/weather/data/${location.city}/${location.country}`,
      data: location
      })

  }

})
