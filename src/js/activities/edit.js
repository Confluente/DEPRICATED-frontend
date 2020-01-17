var app = angular.module("confluente");

/**
 * Controller for editing activities
 */
app.controller("activityEditController", ["$scope", "$routeParams", "activities", function ($scope, $routeParams, activities) {
    // get activityId from URL
    var activityId = $routeParams.activityId;
    $scope.inputs = [];

    //options for question types
    $scope.types = ["text", "radio", "checkbox"];
    // get activity from backend by activityId and put it on the $scope
    activities.get(activityId).then(function (activity) {
        $scope.activity = activity;
        for (var i = 2; i < activity.numberOfQuestions; i++) {
            $scope.inputs.push({
                fullQuestion: activity.questionDescriptions[i],
                type: activity.typeOfQuestion[i],
                options: activity.formOptions[i],
                required: activity.required[i]
            })
        }
        console.log($scope);
    });

    // adds an element to the inputs variable
    $scope.add = function () {
        var dataObj = {fullQuestion: '', type: "text", options: '', required: ''};
        $scope.inputs.push(dataObj);
    };

    // removes last element from inputs variable
    $scope.remove = function () {
        $scope.inputs.pop();
    };

    $scope.loading = false;
    // function called when edit of activity is submitted
    $scope.submit = function () {
        $scope.loading = true;

        if ($scope.activity.canSubscribe) {
            // format form correctly
            var allDescriptions = [];
            var allTypes = [];
            var allOptions = [];
            var allRequired = [];

            $scope.inputs.forEach(function (dataObj) {
                allDescriptions.push(dataObj.fullQuestion);
                allTypes.push(dataObj.type);
                var optionString = "";
                for (var i = 0; i < dataObj.options.length; i++) {
                    if (optionString !== "") optionString += ";";
                    optionString += dataObj.options[i];
                }
                allOptions.push(optionString);
                allRequired.push(dataObj.required);
                if (dataObj.fullQuestion === "") {
                    $scope.loading = false;
                    return alert("One of your questions is empty!");
                }
                if (dataObj.type !== "text" && dataObj.options === "") {
                    $scope.loading = false;
                    return alert("One of your multiple choice questions does not have any options!")
                }
            });

            $scope.activity.typeOfQuestion = allTypes;
            $scope.activity.questionDescriptions = allDescriptions;
            $scope.activity.formOptions = allOptions;
            $scope.activity.required = allRequired;
            $scope.activity.numberOfQuestions = allDescriptions.length;
        }
        // submit edit of activity to backend
        console.log($scope);
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
        maxDate: new Date(2029, 5, 22), // maximum date for datepicker
        minDate: new Date(2019, 1, 1), // minimum date for datepicker
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
