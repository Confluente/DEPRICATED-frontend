const app = angular.module("confluente");

/**
 * Controller for editing activities
 */
app.controller("activityEditController", ["$scope", "$routeParams", "activities", function ($scope, $routeParams, activities) {
    // get activityId from URL
    const activityId = $routeParams.activityId;
    $scope.inputs = [];

    $scope.uploadme = "Did not change image";
    $scope.keepCurrent = false;

    $scope.userGroups = [];

    // setting standard deadline for subscription deadline field
    $scope.deadline = {
        subscriptionDeadline: new Date()
    };

    //options for question types
    $scope.types = ["☰ text", "◉ multiple choice", "☑ checkboxes"];

    // get activity from backend by activityId and put it on the $scope
    activities.get(activityId).then(function (activity) {
        $scope.activity = activity;
        $scope.activity.organizer = activity.Organizer.displayName;

        for (let i = 0; i < $scope.$parent.user.groups.length; i++) {
            $scope.userGroups.push($scope.$parent.user.groups[i].displayName);
        }

        // formatting the form to inputs such that it can be interactive with angular
        if (activity.canSubscribe) {
            for (var i = 0; i < activity.numberOfQuestions; i++) {
                var options = [];
                for (var j = 0; j < activity.formOptions[i].length; j++) {
                    options.push(activity.formOptions[i][j]);
                }
                $scope.inputs.push({
                    fullQuestion: activity.questionDescriptions[i],
                    type: activity.typeOfQuestion[i],
                    options: options,
                    required: (activity.required[i] === 'true'),
                    privacyOfQuestion: (activity.privacyOfQuestions[i] === 'true')
                });
            }
            $scope.deadline.subscriptionDeadline = activity.subscriptionDeadline;
        }

        // If not subscription form was submitted initially then add the standard two questions to input
        if ($scope.inputs.length === 0) {
            $scope.inputs = [
                {fullQuestion: 'Name', type: "name", options: [''], required: 'true', privacyOfQuestion: 'false'},
                {fullQuestion: 'TU/e email', type: "TU/e email", options: [''], required: 'true', privacyOfQuestion: 'false'}
            ];
        }

        if (activity.hasCoverImage) {
            $scope.keepCurrent = true;
        }
    });

    // adds an element to the inputs variable
    $scope.add = function () {
        var dataObj = {fullQuestion: '', type: "☰ text", options: ['option 1'], required: '', privacyOfQuestion: ''};
        $scope.inputs.push(dataObj);
    };

    // Removes specific question
    $scope.removeInput = function (index) {
        if (index > 1 && index < $scope.inputs.length)
            $scope.inputs.splice(index, 1);
    };

    // Adds an option to a multiple choice question
    $scope.addOption = function (input) {
        var option = 'option ' + (input.options.length + 1).toString();
        input.options.push(option);
    };

    // Remove specific option from a multiple choice question
    $scope.removeOption = function(inputIndex, optionIndex) {
        $scope.inputs[inputIndex].options.splice(optionIndex, 1);
    };

    // Toggles the canSubscribe variable
    $scope.toggleSubscribe = function() {
        $scope.activity.canSubscribe = !$scope.activity.canSubscribe;
    };

    // Toggles the keepCurrent variable
    $scope.toggleKeepCurrent = function() {
        $scope.keepCurrent = !$scope.keepCurrent;
    }

    // Given an array, it moves the element from fromIndex to toIndex
    $scope.arrayMove = function(arr, fromIndex, toIndex) {
        if (Math.abs(fromIndex - toIndex) <= 1 && fromIndex > 1 && toIndex < arr.length) {
            var element = arr[fromIndex];
            arr.splice(fromIndex, 1);
            arr.splice(toIndex, 0, element);
        }
    };

    $scope.loading = false;

    // function called when edit of activity is submitted
    $scope.submit = function () {
        $scope.loading = true;

        var changedCoverImage = false;
        if ($scope.uploadme !== "Did not change image") {
            $scope.activity.hasCoverImage = true;
            changedCoverImage = true;
        }

        var fd = new FormData();
        if (changedCoverImage) {
            var file = $('#activityEdit-cover')[0].files[0];
            if (!file.type.startsWith('image/')) {
                return wrongInput('Non-image formats are not supported as pictures for activities!');
            }

            if (file.size - 1000000 > 0) {
                return wrongInput('Image size is larger than 1MB')
            }

            var img = new Image();
            img.src = window.URL.createObjectURL(file);
            img.onload = function() {
                if (img.width < img.height) {
                    return wrongInput('Image width should be greater than or equal to image height!');
                }
            }

            fd.append('image', file);
        }

        // Checks whether required fields are empty
        $scope.empty = !$scope.activity.name || !$scope.activity.description || !$scope.activity.Organizer;

        $scope.wrongCharacters = false;

        if ($scope.activity.canSubscribe) {
            // format form correctly
            var allDescriptions = [];
            var allTypes = [];
            var allOptions = [];
            var allRequired = [];
            var allPrivacyOfQuestion = [];

            $scope.inputs.forEach(function (dataObj) {
                allDescriptions.push(dataObj.fullQuestion);
                allTypes.push(dataObj.type);
                var optionString = "";
                for (let i = 0; i < dataObj.options.length; i++) {
                    if (i !== 0) optionString += "#;#";
                    optionString += dataObj.options[i];
                    if (dataObj.options[i].includes("#;#")) $scope.wrongCharacters = true;
                    if (dataObj.options[i].includes("#,#")) $scope.wrongCharacters = true;
                }
                allOptions.push(optionString);

                allRequired.push(dataObj.required.toString());

                allPrivacyOfQuestion.push(dataObj.privacyOfQuestion.toString());

                // Checks whether questions are empty
                if (!dataObj.fullQuestion || dataObj.fullQuestion === "") {
                    $scope.empty = true;
                }
                if (dataObj.fullQuestion.includes("#,#")) $scope.wrongCharacters = true;
                if (dataObj.fullQuestion.includes("#;#")) $scope.wrongCharacters = true;

                // Checks whether options of multiple choice questions are empty
                if (dataObj.type !== "☰ text" && dataObj.type !== "name" && dataObj.type !== "TU/e email") {
                    for (let i = 0; i < dataObj.options.length; i++) {
                        if (dataObj.options[i] === "" || !dataObj.options) $scope.empty = true;
                    }
                }
            });

            $scope.activity.typeOfQuestion = allTypes;
            $scope.activity.questionDescriptions = allDescriptions;
            $scope.activity.formOptions = allOptions;
            $scope.activity.required = allRequired;
            $scope.activity.privacyOfQuestions = allPrivacyOfQuestion;
            $scope.activity.numberOfQuestions = allDescriptions.length;
            $scope.activity.subscriptionDeadline = $scope.deadline.subscriptionDeadline;
        }

        // If required field are empty, do not accept activity
        if ($scope.empty) {
            return wrongInput("Not all required fields have been filled in.")
        }

        // If problematic fields contain #,# or #;# reject form
        if ($scope.wrongCharacters) {
            return wrongInput("Character combinations #,# and #;# are not allowed.")
        }

        if ($scope.activity.hasCoverImage && !changedCoverImage && !$scope.keepCurrent)
            $scope.activity.hasCoverImage = false;

        // submit edit of activity to backend
        activities.edit($scope.activity, $scope.keepCurrent, fd).then(function (result) {
            $scope.loading = false;

            console.log(result.id)

            // redirect to edited activity
            window.location.href = "/activities/" + result.id + "#signup";
        });
    };

    // function for using datepicker in form for editing activity
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
    }
}]);

module.exports = {
    name: "Edit Activity",
    url: "/manage/activities/:activityId",
    parent: "/manage/activities",
    templateUrl: "/www/templates/activities/activityEdit.html",
    iconUrl: "/img/home-outline.png",
    controller: "activityEditController"
};
