var app = angular.module("confluente");

app.controller("userChangePasswordController", ["$rootScope", "$scope", "$routeParams", "users", function ($rootScope, $scope, $routeParams, user) {
    var userId = $routeParams.userId;
    user.get(userId).then(function (user) {
        $scope.user = user[0];
        console.log($scope);
    });

    $scope.submit = function () {
        $scope.loading = true;
        console.log($scope);
        user.changePassword($scope.user).then(function (result) {
            $scope.loading = false;
            // window.location.href = "/manage";
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
