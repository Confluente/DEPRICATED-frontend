var app = angular.module("confluente");

/**
 * Controller for viewing group
 */
app.controller("groupViewController", ["$scope", "$routeParams", "groups", function ($scope, $routeParams, group) {
    // get groupId from URL
    var groupId = $routeParams.groupId;
    // get group from backend by groupId and set it on the $scope
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
