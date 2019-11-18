var app = angular.module("confluente");

app.controller("userViewController", ["$scope", "$routeParams", "users", function ($scope, $routeParams, user) {
    var userId = $routeParams.userId;
    console.log(userId);
    user.get(userId).then(function (user) {
        $scope.user = user;
    });
}]);

module.exports = {
    name: "User",
    url: "/user/:userId",
    parent: "/user/",
    templateUrl: "/www/templates/user/userDetails.html",
    controller: "userViewController"
};
