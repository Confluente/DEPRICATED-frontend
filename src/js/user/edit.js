var app = angular.module("confluente");

app.controller("userEditController", ["$scope", "$q", "$routeParams", "users", "groups", function ($scope, $q, $routeParams, user, groups) {
    $q.all([
        groups.getAll().then(function (groups) {
            $scope.groups = groups;
        })
    ]).then(function () {
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

    })
}]);

module.exports = {
    name: "Edit User",
    url: "/manage/user/edit/:userId",
    parent: "/manage/",
    templateUrl: "/www/templates/user/userEdit.html",
    iconUrl: "/img/home-outline.png",
    controller: "userEditController"
};