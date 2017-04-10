var angular = require("angular");
var ngRoute = require("angular-route");
var ngCookies = require("angular-cookies");
require("angular-ui-bootstrap");

var app = angular.module("confluente", ["ngRoute", "ngCookies", "ui.bootstrap", require('angular-sanitize')]);
var routes = require("./routes");

require("./authService");
require("./activitiesService");
require("./pagesService");
require("./usersService");
require("./groupsService");
require("./navbarController");

app.config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
  for (var n = 0; n < routes.length; n++) {
    var route = routes[n];
    $routeProvider.when(route.url, {
      title: route.name,
      parent: route.parent,
      controller: route.controller,
      templateUrl: route.templateUrl,
      template: route.template
    });
  }

  $routeProvider.otherwise({
    templateUrl: "/404.html"
  });

  $locationProvider.html5Mode(true);
}]);

//return app;
