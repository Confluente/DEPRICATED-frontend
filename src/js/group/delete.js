var app = angular.module("confluente");

app.controller("groupDeleteController", ["$scope", "$routeParams", "groups", function ($scope, $routeParams, group) {
    var groupId = $routeParams.groupId;
    group.get(groupId).then(function (group) {
        $scope.group = group;
    });

    $scope.loading = false;
    $scope.submit = function () {
        $scope.loading = true;
        group.delete($scope.group).then(function () {
            $scope.loading = false;
            window.location.href = "/manage";
        });
    };

}]);

module.exports = {
    name: "Delete Group",
    url: "/manage/group/delete/:groupId",
    parent: "/manage/",
    templateUrl: "/www/templates/group/groupDelete.html",
    iconUrl: "/img/home-outline.png",
    controller: "groupDeleteController"
};
