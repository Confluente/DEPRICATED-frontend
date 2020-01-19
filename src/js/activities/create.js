var app = angular.module("confluente");

/**
 * Controller for creating activities
 */
app.controller("activityCreateController", ["$scope", "activities", function ($scope, activities) {
    $scope.loading = false;
    $scope.inputs = [];

    // options for question types
    $scope.types = ["☰ text", "◉ multiple choice", "☑ checkboxes"];

    // Each time a question is added, this creates a new empty object in the inputs variable
    $scope.add = function () {
        var dataObj = {fullQuestion: '', type: "☰ text", options: ['option 1'], required: ''};
        $scope.inputs.push(dataObj);
    };

    // Removes last element (last question) from inputs variable
    $scope.remove = function () {
        $scope.inputs.pop();
    };

    $scope.addOption = function (input) {
        var option = 'option ' + (input.options.length + 1).toString();
        console.log(input);
        input.options.push(option);
    };

    $scope.removeOption = function (input) {
        input.options.pop();
    };

    // function called when new activity is submitted
    $scope.submit = function () {
        $scope.loading = true;
        var act = {
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
        };

        if ($scope.canSubscribe) {
            // Format output correctly
            var allDescriptions = [];
            var allTypes = [];
            var allOptions = [];
            var allRequired = [];

            $scope.inputs.forEach(function (dataObj) {
                allDescriptions.push(dataObj.fullQuestion);
                allTypes.push(dataObj.type);
                var optionString = dataObj.options[0];
                for (var i = 1; i < dataObj.options.length; i++) {
                    optionString += ";" + dataObj.options[i];
                }
                allOptions.push(optionString);
                allRequired.push(dataObj.required);
                if (dataObj.fullQuestion === "") {
                    $scope.loading = false;
                    return alert("One of your fields is empty!");
                }

                if (dataObj.type !== "☰ text" && dataObj.options === "") {
                    $scope.loading = false;
                    return alert("One of your multiple choice questions does not have any options!")
                }
            });

            act.numberOfQuestions = allDescriptions.length;
            act.typeOfQuestion = allTypes;
            act.questionDescriptions = allDescriptions;
            act.options = allOptions;
            act.required = allRequired;
        }

        // create new activity from variables as put on the $scope by the form
        activities.create(act).then(function (result) {
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
