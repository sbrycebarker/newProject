angular.module('myApp')
.controller('homeCtrl', function($scope, weatherService, $state ) {
  $scope.getweather = function(location) {
    weatherService.getweather(location).then(function(weather){
      if (weather) { $scope.weather = weather;
      console.log(weather.data)
    }
      else{
        $scope.weather = 'No CIty!!'
      }
    })
  }


})
