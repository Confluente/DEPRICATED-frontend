var app = angular.module("confluente");

/**
 * Controller for viewing users
 */
app.controller("userViewController", ["$rootScope", "$scope", "$routeParams", "users", function ($rootScope, $scope, $routeParams, user) {
    // get userId from URL
    var userId = $routeParams.userId;
    // if requested user equals profile, get userId of logged in user
    if (userId === "profile") {
        userId = $rootScope.user.id;
    }

    // retrieve user from backend based on userId
    user.get(userId).then(function (param) {
        $scope.user = param[0];
        $scope.groups = param[1];
        delete $scope.user.isAdmin;
    });
}]);

module.exports = {
    name: "User",
    url: "/user/:userId",
    parent: "/user/",
    templateUrl: "/www/templates/user/userDetails.html",
    controller: "userViewController"
};
