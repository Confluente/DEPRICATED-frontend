var app = angular.module("confluente");

app.controller("userCreateController", ["$scope", "users", function ($scope, user) {
    $scope.loading = false;
    $scope.submit = function () {
        $scope.loading = true;
        user.create({
            displayName: $scope.name,
            email: $scope.email,
            password: $scope.password,
            isAdmin: false
        })
            .then(function (result) {
                $scope.loading = false;
                window.location.href = "/manage/";
            });
    };
}]);

module.exports = {
    name: "New User",
    url: "/manage/user/create",
    parent: "/manage/",
    templateUrl: "userCreate.html",
    controller: "userCreateController"
};
