var app = angular.module("confluente");

/**
 * Controller for creating activities
 */
app.controller("activityCreateController", ["$scope", "activities", function ($scope, activities) {
    $scope.loading = false;

    // setting standard deadline for subscription deadline field
    $scope.deadline = {
        subscriptionDeadline: new Date()
    };

    // setting standard inputs for subscription form (first two questions are mandatory)
    $scope.inputs = [
        {fullQuestion: 'Name', type: "name", options: [''], required: 'true'},
        {fullQuestion: 'TU/e email', type: "TU/e email", options: [''], required: 'true'}
    ];

    // boolean for whether members can subscribe to the event and therefore whether to show the subscription form possibilities
    $scope.canSubscribe = false;

    // options for question types
    $scope.types = ["☰ text", "◉ multiple choice", "☑ checkboxes"];

    // Each time a question is added, this creates a new empty object in the inputs variable
    $scope.add = function () {
        var dataObj = {fullQuestion: '', type: "☰ text", options: ['option 1'], required: ''};
        $scope.inputs.push(dataObj);
    };

    // Removes specific question
    $scope.removeInput = function (index) {
        if (index > 1 && index < $scope.inputs.length)
            $scope.inputs.splice(index, 1);
    };

    // Adds option for multiple choice questions
    $scope.addOption = function (input) {
        var option = 'option ' + (input.options.length + 1).toString();
        input.options.push(option);
    };

    // Remove specific option from a multiple choice question
    $scope.removeOption = function (inputIndex, optionIndex) {
        $scope.inputs[inputIndex].options.splice(optionIndex, 1);
    };

    // Function to toggle the canSubscribe variable
    $scope.toggleSubscribe = function () {
        $scope.canSubscribe = !$scope.canSubscribe;
    };

    // Given an array, it moves the element from fromIndex to toIndex
    $scope.arrayMove = function (arr, fromIndex, toIndex) {
        if (Math.abs(fromIndex - toIndex) <= 1 && fromIndex > 1 && toIndex < arr.length) {
            var element = arr[fromIndex];
            arr.splice(fromIndex, 1);
            arr.splice(toIndex, 0, element);
        }
    };

    // function called when new activity is submitted
    $scope.submit = function () {
        $scope.loading = true;
        // constructing standard activity object
        var act = {
            name: $scope.name,
            description: $scope.description,
            organizer: $scope.organizer,
            date: $scope.date,
            startTime: $scope.startTime,
            endTime: $scope.endTime,
            location: $scope.location,
            participationFee: $scope.participationFee,
            canSubscribe: $scope.canSubscribe,
            previewImage: $scope.PreviewImage,
            approved: true
        };

        // Checking required fields
        $scope.empty = !$scope.name || !$scope.description || !$scope.organizer;
        $scope.wrongCharacters = false;

        // Adding form to activity object if members can subscribe
        if ($scope.canSubscribe) {
            // Format output correctly
            var allDescriptions = [];
            var allTypes = [];
            var allOptions = [];
            var allRequired = [];

            $scope.inputs.forEach(function (dataObj) {
                allDescriptions.push(dataObj.fullQuestion);
                allTypes.push(dataObj.type);

                // SQlite database can't handle strings therefore lists are stored as , seperated lists and ; seperated lists
                var optionString = dataObj.options[0];
                for (var i = 1; i < dataObj.options.length; i++) {
                    optionString += "#;#" + dataObj.options[i];
                    if (dataObj.options[i].includes("#;#")) $scope.wrongCharacters = true;
                    if (dataObj.options[i].includes("#,#")) $scope.wrongCharacters = true;
                }
                allOptions.push(optionString);

                // check whether the question actually has a question
                allRequired.push(dataObj.required);
                if (!dataObj.fullQuestion || dataObj.fullQuestion === "") {
                    $scope.empty = true;
                }
                if (dataObj.fullQuestion.includes("#,#")) $scope.wrongCharacters = true;
                if (dataObj.fullQuestion.includes("#;#")) $scope.wrongCharacters = true;

                // Check whether choices of multiple choice questions are empty
                if (dataObj.type !== "☰ text" && dataObj.type !== "name" && dataObj.type !== "TU/e email") {
                    for (var i = 0; i < dataObj.options.length; i++) {
                        if (dataObj.options[i] === "" || !dataObj.options) $scope.empty = true;
                    }
                }
            });

            act.numberOfQuestions = allDescriptions.length;
            act.typeOfQuestion = allTypes;
            act.questionDescriptions = allDescriptions;
            act.options = allOptions;
            act.required = allRequired;
            act.subscriptionDeadline = $scope.deadline.subscriptionDeadline;
        }

        // If any required field is empty than do not accept the activity
        if ($scope.empty) {
            $scope.loading = false;
            return alert("Not all required fields have been filled in.");
        }

        if ($scope.wrongCharacters) {
            $scope.loading = false;
            return alert("Character combinations #,# and #;# are not allowed.")
        }

        // create new activity from variables as put on the $scope by the form
        activities.create(act).then(function (result) {
            $scope.loading = false;

            // redirect to new activity
            // window.location.href = "/activities/" + result.id + "#signup";
            console.log("This is a test" + $scope.PreviewImage);
        });
    };

    // function for using datepicker in form for creating activities
    $scope.datepicker = {open: false};
    $scope.openDatePicker = function () {
        $scope.datepicker.open = true;
    };

    $scope.SelectFile = function (e) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $scope.PreviewImage = e.target.result;
            $scope.$apply();
        };

        reader.readAsDataURL(e.target.files[0]);
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
