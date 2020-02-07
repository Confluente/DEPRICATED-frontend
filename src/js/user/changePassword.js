var app = angular.module("confluente");

/**
 * Controller for changing password of user
 */
app.controller("userChangePasswordController", ["$rootScope", "$scope", "$routeParams", "users", function ($rootScope, $scope, $routeParams, user) {
    // get userId from URL
    var userId = $routeParams.userId;
    // retrieve user from backend by userId and set on $scope
    user.get(userId).then(function (user) {
        $scope.user = user[0];
    });

    // function called when password change is submitted
    $scope.submit = function () {
        $scope.loading = true;
        user.changePassword($scope.user).then(function (result) {
            $scope.loading = false;
        });
    };
}]);

module.exports = {
    name: "User",
    url: "/user/changePassword/:userId",
    parent: "/user/",
    templateUrl: "/www/templates/user/changePassword.html",
    controller: "userChangePasswordController"
};
