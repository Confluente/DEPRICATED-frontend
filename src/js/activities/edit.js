var app = angular.module("confluente");

app.controller("activityEditController", ["$scope", "$routeParams", "activities", function ($scope, $routeParams, activities) {
    var activityId = $routeParams.activityId;
    activities.get(activityId).then(function (activity) {
        $scope.activity = activity;
    });

    $scope.loading = false;
    $scope.submit = function () {
        $scope.loading = true;
        activities.edit($scope.activity).then(function (result) {
            $scope.loading = false;
            window.location.href = "/activities/" + result.id;
        });
    };

    $scope.datepicker = {open: false};
    $scope.openDatePicker = function () {
        $scope.datepicker.open = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(2000, 1, 1),
        startingDay: 1
    };
}]);

////

module.exports = {
    name: "Edit Activity",
    url: "/manage/activities/:activityId",
    parent: "/manage/activities",
    templateUrl: "/www/templates/activities/activityEdit.html",
    iconUrl: "/img/home-outline.png",
    controller: "activityEditController"
};
