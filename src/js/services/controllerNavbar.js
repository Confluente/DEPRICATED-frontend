var app = angular.module("confluente");

// import routes
var routes = require("./../routes");

// todo add comment once know what it does
var tabs = routes.filter(function (element, index, array) {
    return element.id !== undefined;
});

/**
 * Controller for the navbar
 */
app.controller("controllerNavbar", ["serviceAuth", "$rootScope", "$scope", "$location", function (auth, $rootScope, $scope, $location) {
    $scope.tabs = tabs;
    // function called if route is changed
    $rootScope.$on("$routeChangeSuccess", function (event, current, previous) {
        // get route as variable
        var route = current.$$route || {title: "Home"};
        // set important aspects of route in $rootScope and $scope
        $rootScope.title = route.title;
        $rootScope.back = route.parent;
        $scope.currentUrl = route.originalPath;
    });

    // function for passing login to backend and set on $scope
    $scope.login = function (email, password) {
        auth.login(email, password);
    };

    // call logout
    $scope.logout = auth.logout;
}]);
