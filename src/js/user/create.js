var app = angular.module("confluente");

app.controller("userCreateController", ["$scope", "user", function ($scope, user) {
    $scope.loading = false;
    $scope.submit = function () {
        $scope.loading = true;
        user.create({
            displayName: $scope.name,
            email: $scope.email,
            password: $scope.password,
            isAdmin: false})
            .then(function (result) {
            $scope.loading = false;
            window.location.href = "/user/" + result.id;});};
}]);

module.exports = {
    name: "New User",
    url: "/manage/user/create",
    parent: "/manage/user/",
    templateUrl: "/userCreate.html",
    controller: "userCreateController"
};
