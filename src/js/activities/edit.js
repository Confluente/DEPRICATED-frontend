var app = angular.module("confluente");

/**
 * Controller for editing activities
 */
app.controller("activityEditController", ["$scope", "$routeParams", "activities", function ($scope, $routeParams, activities) {
    // get activityId from URL
    var activityId = $routeParams.activityId;
    $scope.inputs = [];

    //options for question types
    $scope.types = ["☰ text", "◉ multiple choice", "☑ checkboxes"];
    // get activity from backend by activityId and put it on the $scope
    activities.get(activityId).then(function (activity) {
        $scope.activity = activity;
        for (var i = 0; i < activity.numberOfQuestions; i++) {
            var options = [];
            for (var j = 0; j < activity.formOptions[i].length; j++) {
                options.push(activity.formOptions[i][j]);
            }
            $scope.inputs.push({
                fullQuestion: activity.questionDescriptions[i],
                type: activity.typeOfQuestion[i],
                options: options,
                required: activity.required[i]
            });
        }
        console.log($scope);
    });

    // adds an element to the inputs variable
    $scope.add = function () {
        var dataObj = {fullQuestion: '', type: "☰ text", options: ['option 1'], required: ''};
        $scope.inputs.push(dataObj);
    };

    // removes last element from inputs variable
    $scope.remove = function () {
        if ($scope.inputs.length > 2) {
            $scope.inputs.pop();
        }
    };

    $scope.addOption = function (input) {
        var option = 'option ' + (input.options.length + 1).toString();
        console.log(input);
        input.options.push(option);
    };

    $scope.removeOption = function (input) {
        input.options.pop();
    };

    $scope.toggleSubscribe = function() {
        if ($scope.activity.canSubscribe) {
            $scope.activity.canSubscribe = false;
        } else {
            $scope.activity.canSubscribe = true;
        }
    };

    $scope.loading = false;
    // function called when edit of activity is submitted
    $scope.submit = function () {
        $scope.loading = true;

        $scope.empty = !$scope.activity.name || !$scope.activity.description || !$scope.activity.organizer;

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
                    if (i !== 0) optionString += ";";
                    optionString += dataObj.options[i];
                }
                allOptions.push(optionString);
                allRequired.push(dataObj.required);
                if (!dataObj.fullQuestion) {
                    $scope.empty = true;
                }
                if (dataObj.type !== "☰ text" && (dataObj.options === "" || !dataObj.options)) {
                    $scope.empty = true;
                }
            });

            $scope.activity.typeOfQuestion = allTypes;
            $scope.activity.questionDescriptions = allDescriptions;
            $scope.activity.formOptions = allOptions;
            $scope.activity.required = allRequired;
            $scope.activity.numberOfQuestions = allDescriptions.length;
        }

        if ($scope.empty) {
            $scope.loading = false;
            return alert("One of your fields is still empty!");
        }

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
