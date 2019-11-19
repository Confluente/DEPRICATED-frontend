var app = angular.module("confluente");

app.controller("userEditController", ["$scope", "$routeParams", "users", function ($scope, $routeParams, user) {
    var userId = $routeParams.userId;
    user.get(userId).then(function (user) {
        $scope.user = user;
    });

    $scope.loading = false;
    $scope.submit = function () {
        $scope.loading = true;
        user.edit($scope.user).then(function (result) {
            $scope.loading = false;
            window.location.href = "/manage";
        });
    };

}]);

module.exports = {
    name: "Edit User",
    url: "/manage/user/edit/:userId",
    parent: "/manage/",
    templateUrl: "/www/templates/user/userEdit.html",
    iconUrl: "/img/home-outline.png",
    controller: "userEditController"
};