var app = angular.module("confluente");

/**
 * Controller for editing user
 */
app.controller("userEditController", ["$scope", "$q", "$routeParams", "users", "groups", function ($scope, $q, $routeParams, user, groups) {
    // get userId from URL
    var userId = $routeParams.userId;

    $scope.tracks = ["Artificial intelligence", "Competitive Programming and Problem Solving",
        "Empowerement for Healthcare and Wellbeing", "Energy Transition", "High Tech Systems", "SensUs Organization",
        "Smart Cities", "Smart Mobility"];

    $scope.generations = [2018, 2019];

    $q.all([
        // retrieve all groups from backend
        groups.getAll().then(function (groups) {
            $scope.groups = groups;
        }),
        // retrieve user from backend by userId
        user.get(userId).then(function (param) {
            $scope.user = param[0];
            $scope.member = param[1];
            console.log($scope);
        })
    ]).then(function () {
        var member_groups = [];
        var i;
        // get indices of groups of which user is member
        for (i = 0; i < $scope.member.length; i++) {
            member_groups.push($scope.member[i].id);
        }

        // get attributes of groups of which user is member
        $scope.groupSelection = [];
        for (i = 0; i < $scope.groups.length; i++) {
            if (member_groups.includes($scope.groups[i].id)) {
                $scope.groupSelection.push({fullName: $scope.groups[i].fullName, id: $scope.groups[i].id, selected: true})
            } else {
                $scope.groupSelection.push({fullName: $scope.groups[i].fullName, id: $scope.groups[i].id, selected: false})
            }
        }

        // Helper method
        $scope.selectedGroups = function selectedGroups() {
            return filterFilter($scope.groupSelection, {selected: true});
        };

        $scope.loading = false;
        // function called when edit of user is submitted
        $scope.submit = function () {
            $scope.user.displayName = $scope.user.firstName + " " + $scope.user.lastName;
            $scope.loading = true;
            user.edit($scope.user, $scope.groupSelection).then(function (result) {
                $scope.loading = false;
                // redirect to '/manage'
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