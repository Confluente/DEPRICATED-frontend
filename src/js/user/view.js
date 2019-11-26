var app = angular.module("confluente");

app.controller("userViewController", ["$rootScope", "$scope", "$routeParams", "users", function ($rootScope, $scope, $routeParams, user) {
    var userId = $routeParams.userId;
    if (userId === "profile") {
        var userId = $rootScope.user.id;
    }
    // console.log(userId);
    user.get(userId).then(function (param) {
        $scope.user = param[0];
        $scope.groups = param[1];
    });
}]);

module.exports = {
    name: "User",
    url: "/user/:userId",
    parent: "/user/",
    templateUrl: "/www/templates/user/userDetails.html",
    controller: "userViewController"
};
