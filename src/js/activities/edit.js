var app = angular.module("confluente");

/**
 * Controller for editing activities
 */
app.controller("activityEditController", ["$scope", "$routeParams", "activities", function ($scope, $routeParams, activities) {
    // get activityId from URL
    var activityId = $routeParams.activityId;
    // get activity from backend by activityId and put it on the $scope
    activities.get(activityId).then(function (activity) {
        $scope.activity = activity;
    });

    $scope.loading = false;
    // function called when edit of activity is submitted
    $scope.submit = function () {
        $scope.loading = true;
        // submit edit of activity to backend
        activities.edit($scope.activity).then(function (result) {
            $scope.loading = false;
            // redirect to edited activity
            window.location.href = "/activities/" + result.id;
        });
    };

    // function for using datepicker in form for editing activity
    $scope.datepicker = {open: false};
    $scope.openDatePicker = function () {
        $scope.datepicker.open = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22), // maximum date for datepicker
        minDate: new Date(2000, 1, 1), // minimum date for datepicker
        startingDay: 1
    };
}]);

module.exports = {
    name: "Edit Activity",
    url: "/manage/activities/:activityId",
    parent: "/manage/activities",
    templateUrl: "/www/templates/activities/activityEdit.html",
    iconUrl: "/img/home-outline.png",
    controller: "activityEditController"
};
