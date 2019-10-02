var app = angular.module("confluente");

var routes = require("./../routes");
var tabs = routes.filter(function (element, index, array) {
    return element.id !== undefined;
});

app.controller("controllerNavbar", ["serviceAuth", "$rootScope", "$scope", "$location", function (auth, $rootScope, $scope, $location) {
    console.log("controllerNavbar called");
    $scope.tabs = tabs;
    $rootScope.$on("$routeChangeSuccess", function (event, current, previous) {
        var route = current.$$route || {title: "Home"};
        $rootScope.title = route.title;
        $rootScope.back = route.parent;
        $scope.currentUrl = route.originalPath;
    });

    $scope.login = function (email, password) {
        auth.login(email, password);
    };

    $scope.logout = auth.logout;
    $scope.report = console.log;
}]);
