const app = angular.module("confluente");

/**
 * Controller for creating activities
 */
app.controller("activityCreateController", ["$scope", "activities", function ($scope, activities) {
    $scope.loading = false;

    $scope.uploadme = "No Image";

    // setting standard deadline for subscription deadline field
    $scope.deadline = {
        subscriptionDeadline: new Date()
    };

    // setting standard inputs for subscription form (first two questions are mandatory)
    $scope.inputs = [
        {fullQuestion: 'Name', type: "name", options: [''], required: 'true', privacyOfQuestion: 'false'},
        {fullQuestion: 'TU/e email', type: "TU/e email", options: [''], required: 'true', privacyOfQuestion: 'false'}
    ];

    // boolean for whether members can subscribe to the event and therefore whether to show the subscription form possibilities
    $scope.canSubscribe = false;

    // options for question types
    $scope.types = ["☰ text", "◉ multiple choice", "☑ checkboxes"];

    // Each time a question is added, this creates a new empty object in the inputs variable
    $scope.add = function () {
        let dataObj = {fullQuestion: '', type: "☰ text", options: ['option 1'], required: '', privacyOfQuestion: ''};
        $scope.inputs.push(dataObj);
    };

    // Removes specific question
    $scope.removeInput = function (index) {
        if (index > 1 && index < $scope.inputs.length)
            $scope.inputs.splice(index, 1);
    };

    // Adds option for multiple choice questions
    $scope.addOption = function (input) {
        const option = 'option ' + (input.options.length + 1).toString();
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
            const element = arr[fromIndex];
            arr.splice(fromIndex, 1);
            arr.splice(toIndex, 0, element);
        }
    };

    // function called when new activity is submitted
    $scope.submit = function () {
        $scope.loading = true;

        let hasCoverImage = false;
        if ($scope.uploadme !== "No Image") {
            hasCoverImage = true;
        }

        let fd = new FormData();
        if (hasCoverImage) {
            const file = $('#activityCreate-cover')[0].files[0];
            if (!file.type.startsWith('image/')) {
                return wrongInput('Non-image formats are not supported as pictures for activities!');
            }

            if (file.size - 1000000 > 0) {
                return wrongInput('Image size is larger than 1MB')
            }

            let img = new Image();
            img.src = window.URL.createObjectURL(file);
            img.onload = function() {
                if (img.width < img.height) {
                    return wrongInput('Image width should be greater than or equal to image height!');
                }
            }

            fd.append('image', file);
        }

        // constructing standard activity object
        let act = {
            name: $scope.name,
            description: $scope.description,
            organizer: $scope.organizer,
            date: $scope.date,
            startTime: $scope.startTime,
            endTime: $scope.endTime,
            location: $scope.location,
            participationFee: $scope.participationFee,
            published: $scope.published,
            canSubscribe: $scope.canSubscribe,
            hasCoverImage: hasCoverImage,
        };

        // Checking required fields
        $scope.empty = !$scope.name || !$scope.description || !$scope.organizer;
        $scope.wrongCharacters = false;

        // Adding form to activity object if members can subscribe
        if ($scope.canSubscribe) {
            // Format output correctly
            let allDescriptions = [];
            let allTypes = [];
            let allOptions = [];
            let allRequired = [];
            let allPrivacyOfQuestion = [];

            $scope.inputs.forEach(function (dataObj) {
                allDescriptions.push(dataObj.fullQuestion);
                allTypes.push(dataObj.type);

                // SQlite database can't handle strings therefore lists are stored as , seperated lists and ; seperated lists
                let optionString = dataObj.options[0];
                for (let i = 1; i < dataObj.options.length; i++) {
                    optionString += "#;#" + dataObj.options[i];
                    if (dataObj.options[i].includes("#;#")) $scope.wrongCharacters = true;
                    if (dataObj.options[i].includes("#,#")) $scope.wrongCharacters = true;
                }
                allOptions.push(optionString);

                allRequired.push(dataObj.required);

                allPrivacyOfQuestion.push(dataObj.privacyOfQuestion);

                // check whether the question actually has a question
                if (!dataObj.fullQuestion || dataObj.fullQuestion === "") {
                    $scope.empty = true;
                }
                if (dataObj.fullQuestion.includes("#,#")) $scope.wrongCharacters = true;
                if (dataObj.fullQuestion.includes("#;#")) $scope.wrongCharacters = true;

                // Check whether choices of multiple choice questions are empty
                if (dataObj.type !== "☰ text" && dataObj.type !== "name" && dataObj.type !== "TU/e email") {
                    for (let i = 0; i < dataObj.options.length; i++) {
                        if (dataObj.options[i] === "" || !dataObj.options) $scope.empty = true;
                    }
                }
            });

            act.numberOfQuestions = allDescriptions.length;
            act.typeOfQuestion = allTypes;
            act.questionDescriptions = allDescriptions;
            act.options = allOptions;
            act.required = allRequired;
            act.privacyOfQuestions = allPrivacyOfQuestion;
            act.subscriptionDeadline = $scope.deadline.subscriptionDeadline;
        }

        // If any required field is empty than do not accept the activity
        if ($scope.empty) {
            return wrongInput("Not all required fields have been filled in.");
        }

        if ($scope.wrongCharacters) {
            return wrongInput("Character combinations #,# and #;# are not allowed.");
        }

        // create new activity from variables as put on the $scope by the form
        activities.create(fd, act).then(function (result) {
            $scope.loading = false;

            console.log(result.id)

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
        maxDate: new Date().setFullYear(new Date().getFullYear() + 10), // maximum date for datepicker
        minDate: new Date(), // minimum date for datepicker
        startingDay: 1
    };

    const wrongInput = function(ErrorMessage) {
        $scope.loading = false;
        return alert(ErrorMessage);
    };
}]);

module.exports = {
    name: "New Activity",
    url: "/manage/activities/create",
    parent: "/manage/activities/",
    templateUrl: "/www/templates/activities/activityCreate.html",
    controller: "activityCreateController"
};
