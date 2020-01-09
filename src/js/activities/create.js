var app = angular.module("confluente");

/**
 * Controller for creating activities
 */
app.controller("activityCreateController", ["$scope", "activities", function ($scope, activities) {
    $scope.loading = false;
    $scope.inputs = [];

    $scope.types = ["text", "radio", "checkbox"];

    $scope.add = function () {
        var dataObj = {fullQuestion: '', type: "text", options: '', required: ''};
        $scope.inputs.push(dataObj);
    };

    $scope.remove = function () {
        $scope.inputs.pop();
    };

    // function called when new activity is submitted
    $scope.submit = function () {
        $scope.loading = true;

        var allDescriptions = [];
        var allTypes = [];
        var allOptions = [];
        var allRequired = [];

        $scope.inputs.forEach(function (dataObj) {
            allDescriptions.push(dataObj.fullQuestion);
            allTypes.push(dataObj.type);
            allOptions.push(dataObj.options);
            allRequired.push(dataObj.required);
        });

        // create new activity from variables as put on the $scope by the form
        activities.create({
            name: $scope.name,
            description: $scope.description,
            organizer: $scope.organizer,
            date: $scope.date,
            startTime: $scope.startTime,
            endTime: $scope.endTime,
            location: $scope.location,
            participationFee: $scope.participationFee,
            approved: true,
            canSubscribe: $scope.canSubscribe,
            numberOfQuestions: allDescriptions.length,
            typeOfQuestion: allTypes,
            questionDescriptions: allDescriptions,
            options: allOptions,
            required: allRequired
        }).then(function (result) {
            $scope.loading = false;

            // redirect to new activity
            window.location.href = "/activities/" + result.id;
        });
    };

    // function for using datepicker in form for creating activities
    $scope.datepicker = {open: false};
    $scope.openDatePicker = function () {
        $scope.datepicker.open = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        maxDate: new Date(2029, 5, 22), // maximum date for datepicker
        minDate: new Date(), // minimum date for datepicker
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
