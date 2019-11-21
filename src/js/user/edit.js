var app = angular.module("confluente");

app.controller("userEditController", ["$scope", "$q", "$routeParams", "users", "groups", function ($scope, $q, $routeParams, user, groups) {
    var userId = $routeParams.userId;
    $q.all([
        groups.getAll().then(function (groups) {
            $scope.groups = groups;
        }),
        user.get(userId).then(function (param) {
            $scope.user = param[0];
            $scope.member = param[1];
        })
    ]).then(function () {
        let member_groups = [];
        let i;
        for (i = 0; i < $scope.member.length; i++) {
            member_groups.push($scope.member[i].id);
        }

        $scope.groupSelection = [];
        for (i = 0; i < $scope.groups.length; i++) {
            if (member_groups.includes($scope.groups[i].id)) {
                $scope.groupSelection.push({fullName: $scope.groups[i].fullName, selected: true})
            } else {
                $scope.groupSelection.push({fullName: $scope.groups[i].fullName, selected: false})
            }
        }

        // Helper method
        $scope.selectedGroups = function selectedGroups() {
            return filterFilter($scope.groupSelection, {selected: true});
        };

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