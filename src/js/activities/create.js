var app = angular.module("confluente");

/**
 * Controller for creating activities
 */
app.controller("activityCreateController", ["$scope", "activities", function ($scope, activities) {
    $scope.loading = false;

    $scope.deadline = {
        subscriptionDeadline: new Date()
    };

    $scope.inputs = [
        {fullQuestion: 'Name', type: "name", options: [''], required: 'true'},
        {fullQuestion: 'TU/e email', type: "TU/e email", options: [''], required: 'true'}
        ];
    $scope.canSubscribe = false;

    // options for question types
    $scope.types = ["☰ text", "◉ multiple choice", "☑ checkboxes"];

    // Each time a question is added, this creates a new empty object in the inputs variable
    $scope.add = function () {
        var dataObj = {fullQuestion: '', type: "☰ text", options: ['option 1'], required: ''};
        $scope.inputs.push(dataObj);
    };

    // Removes specific question
    $scope.removeInput = function(index) {
        $scope.inputs.splice(index, 1);
    };

    // Adds option for multiple choice questions
    $scope.addOption = function (input) {
        var option = 'option ' + (input.options.length + 1).toString();
        console.log(input);
        input.options.push(option);
    };

    $scope.removeOption = function (input) {
        input.options.pop();
    };

    $scope.toggleSubscribe = function() {
        if ($scope.canSubscribe) {
            $scope.canSubscribe = false;
        } else {
            $scope.canSubscribe = true;
        }
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
        
        $scope.empty = !$scope.name || !$scope.description || !$scope.organizer;

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
                if (!dataObj.fullQuestion || dataObj.fullQuestion === "") {
                    $scope.empty = true;
                }

                if (dataObj.type !== "☰ text" && (dataObj.options === "" || !dataObj.options)) {
                    $scope.empty = true;
                }
            });

            act.numberOfQuestions = allDescriptions.length;
            act.typeOfQuestion = allTypes;
            act.questionDescriptions = allDescriptions;
            act.options = allOptions;
            act.required = allRequired;
            act.subscriptionDeadline = $scope.deadline.subscriptionDeadline;
        }

        if ($scope.empty) {
            $scope.loading = false;
            return alert("One of your field is empty!");
        }

        // create new activity from variables as put on the $scope by the form
        activities.create(act).then(function (result) {
            $scope.loading = false;

            // redirect to new activity
            window.location.href = "/activities/" + result.id + "#signup";
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
