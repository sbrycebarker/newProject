"use strict";

$('#add-todo').click(function () {
    TweenMax.to(".add-todo-button", .5, { x: -345, ease: Power1.easeInOut });
    TweenMax.to(".bottom-form-container", .5, { y: -350, ease: Power1.easeInOut });
});

$('#saveNewItem').click(function () {
    TweenMax.to(".add-todo-button", .5, { x: 0, ease: Power1.easeInOut });
    TweenMax.to(".bottom-form-container", .5, { y: 345, ease: Power1.easeInOut });
});

$('#cancel').click(function () {
    TweenMax.to(".add-todo-button", .5, { x: 0, ease: Power1.easeInOut });
    TweenMax.to(".bottom-form-container", .5, { y: 345, ease: Power1.easeInOut });
});
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

$(document).ready(function () {

  var advanceTask = function advanceTask(task) {
    var modified = task.innerText.trim();
    for (var i = 0; i < listo.length; i++) {
      if (listo[i].task === modified) {
        if (listo[i].id === 'new') {
          listo[i].id = 'inProgress';
        } else if (listo[i].id === 'inProgress') {
          listo[i].id = 'archived';
        } else {
          listo.splice(i, 1);
        }
        break;
      }
    }
    task.remove();
  };
  $('#newTaskForm').hide();

  var listo = [];

  var Task = function Task(task) {
    this.task = task;
    this.id = 'new';
  };

  var addTask = function addTask(task) {
    if (task) {
      task = new Task(task);
      listo.push(task);

      $('#newItemInput').val('');

      $('#newList').append('<a href="#finish" class="" id="item">' + '<li class="list-group-item">' + '<h3>' + task.task + '</h3>' + '<span class="arrow pull-right">' + '<i class="glyphicon glyphicon-arrow-right">' + '</span>' + '</li>' + '</a>');
    }
    $('#newTaskForm').slideToggle('fast', 'linear');
  };

  $('#saveNewItem').on('click', function (e) {
    e.preventDefault();
    var task = $('#newItemInput').val().trim();
    addTask(task);
  });

  $('#add-todo').on('click', function () {
    $('#newTaskForm').fadeToggle('fast', 'linear');
  });
  //closes form
  $('#cancel').on('click', function (e) {
    e.preventDefault();
    $('#newTaskForm').fadeToggle('fast', 'linear');
  });

  $(document).on('click', '#item', function (e) {
    e.preventDefault();
    var task = this;
    advanceTask(task);
    this.id = 'inProgress';
    $('#currentList').append(this.outerHTML);
  });

  $(document).on('click', '#inProgress', function (e) {
    e.preventDefault();
    var task = this;
    task.id = "archived";
    var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
    advanceTask(task);
    $('#archivedList').append(changeIcon);
  });

  $(document).on('click', '#archived', function (e) {
    e.preventDefault();
    var task = this;
    advanceTask(task);
  });
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
