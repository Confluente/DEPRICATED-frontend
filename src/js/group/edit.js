var app = angular.module("confluente");

app.controller("groupEditController", ["$scope", "$routeParams", "groups", function ($scope, $routeParams, groups) {
    // routeparams stores the groupId (but as 'userId')
    var groupId = $routeParams.userId;
    groups.get(groupId).then(function (group) {
        $scope.group = group;
    });

    console.log($scope);
    $scope.loading = false;
    $scope.submit = function () {
        $scope.loading = true;
        groups.edit($scope.group).then(function (result) {
            $scope.loading = false;
            window.location.href = "/manage";
        });
    };

}]);

module.exports = {
    name: "Edit Group",
    url: "/manage/group/edit/:userId",
    parent: "/manage/",
    templateUrl: "/www/templates/group/groupEdit.html",
    iconUrl: "/img/home-outline.png",
    controller: "groupEditController"
};
