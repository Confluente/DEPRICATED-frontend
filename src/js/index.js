const angular = require("angular");
const ngRoute = require("angular-route");
const ngCookies = require("angular-cookies");

require("angular-ui-bootstrap");
const app = angular.module("confluente", ["ngRoute", "ngCookies", "ui.bootstrap", require('angular-sanitize')]);

const routes = require("./routes");
require("./services/serviceAuth");
require("./services/serviceActivities");
require("./services/servicePages");
require("./services/serviceUsers");
require("./services/serviceGroups");
require("./services/serviceNotifications");
require("./services/controllerNavbar");
require("./responseObserver");

app.config(["$routeProvider", "$locationProvider", "$httpProvider", function ($routeProvider, $locationProvider, $httpProvider) {
    // declare all routes in $routeProvider
    for (var n = 0; n < routes.length; n++) {
        const route = routes[n];
        $routeProvider.when(route.url, {
            title: route.name,
            parent: route.parent,
            controller: route.controller,
            templateUrl: route.templateUrl,
            template: route.template
        });
    }

    // declare default route if no proper route found
    $routeProvider.otherwise({
        templateUrl: "/www/404.html"
    });

    $httpProvider.interceptors.push('responseObserver');

    $locationProvider.html5Mode(true);
}]);
