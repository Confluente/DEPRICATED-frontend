var app = angular.module("confluente");

app.controller("userDeleteController", ["$scope", "$routeParams", "users", function ($scope, $routeParams, user) {
    var userId = $routeParams.userId;
    user.get(userId).then(function (user) {
        $scope.user = user;
    });

    $scope.loading = false;
    $scope.submit = function () {
        $scope.loading = true;
        user.delete($scope.user).then(function () {
            $scope.loading = false;
            window.location.href = "/manage";
        });
    };

}]);

module.exports = {
    name: "Delete User",
    url: "/manage/user/delete/:userId",
    parent: "/manage/",
    templateUrl: "/www/templates/user/userDelete.html",
    iconUrl: "/img/home-outline.png",
    controller: "userDeleteController"
};
