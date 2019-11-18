var app = angular.module("confluente");

app.controller("groupViewController", ["$scope", "$routeParams", "groups", function ($scope, $routeParams, group) {
    var groupId = $routeParams.groupId;
    console.log(groupId);
    group.get(groupId).then(function (group) {
        $scope.group = group;
    });
}]);

module.exports = {
    name: "Group",
    url: "/group/:groupId",
    parent: "/group/",
    templateUrl: "/www/templates/group/groupDetails.html",
    controller: "groupViewController"
};
