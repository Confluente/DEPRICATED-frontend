var app = angular.module("confluente");
app.controller("activityCreateController", ["$scope", "activities", function ($scope, activities) {
    $scope.loading = false;
    $scope.submit = function () {
        $scope.loading = true;
        activities.create({
            name: $scope.name,
            description: $scope.description,
            organizer: $scope.organizer,
            date: $scope.date,
            startTime: $scope.startTime,
            endTime: $scope.endTime,
            location: $scope.location,
            approved: true
        }).then(function (result) {
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
        maxDate: new Date(2029, 5, 22),
        minDate: new Date(2019, 1, 1),
        startingDay: 1
    };
}]);

module.exports = {
    name: "New Activity",
    url: "/manage/activities/create",
    parent: "/manage/activities/",
    templateUrl: "/www/templates/activities/activityCreate.html",
    controller: "activityCreateController"
};
