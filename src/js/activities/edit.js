var app = angular.module("confluente");

/**
 * Controller for editing activities
 */
app.controller("activityEditController", ["$scope", "$routeParams", "activities", function ($scope, $routeParams, activities) {
    // get activityId from URL
    var activityId = $routeParams.activityId;
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

        for (var i = 0; i < $scope.$parent.user.groups.length; i++) {
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
                    required: (activity.required[i] === 'true')
                });
            }
            $scope.deadline.subscriptionDeadline = activity.subscriptionDeadline;
        }

        // If not subscription form was submitted initially then add the standard two questions to input
        if ($scope.inputs.length === 0) {
            $scope.inputs = [
                {fullQuestion: 'Name', type: "name", options: [''], required: 'true'},
                {fullQuestion: 'TU/e email', type: "TU/e email", options: [''], required: 'true'}
            ];
        }

        if (activity.hasCoverImage) {
            $scope.keepCurrent = true;
        }
    });

    // adds an element to the inputs variable
    $scope.add = function () {
        var dataObj = {fullQuestion: '', type: "☰ text", options: ['option 1'], required: ''};
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
            var photo = $('#activityEdit-cover')[0].files[0];
            fd.append('image', photo);
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

            $scope.inputs.forEach(function (dataObj) {
                allDescriptions.push(dataObj.fullQuestion);
                allTypes.push(dataObj.type);
                var optionString = "";
                for (var i = 0; i < dataObj.options.length; i++) {
                    if (i !== 0) optionString += "#;#";
                    optionString += dataObj.options[i];
                    if (dataObj.options[i].includes("#;#")) $scope.wrongCharacters = true;
                    if (dataObj.options[i].includes("#,#")) $scope.wrongCharacters = true;
                }
                allOptions.push(optionString);
                allRequired.push(dataObj.required);

                // Checks whether questions are empty
                if (!dataObj.fullQuestion || dataObj.fullQuestion === "") {
                    $scope.empty = true;
                }
                if (dataObj.fullQuestion.includes("#,#")) $scope.wrongCharacters = true;
                if (dataObj.fullQuestion.includes("#;#")) $scope.wrongCharacters = true;

                // Checks whether options of multiple choice questions are empty
                if (dataObj.type !== "☰ text" && dataObj.type !== "name" && dataObj.type !== "TU/e email") {
                    for (var i = 0; i < dataObj.options.length; i++) {
                        if (dataObj.options[i] === "" || !dataObj.options) $scope.empty = true;
                    }
                }
            });

            $scope.activity.typeOfQuestion = allTypes;
            $scope.activity.questionDescriptions = allDescriptions;
            $scope.activity.formOptions = allOptions;
            $scope.activity.required = allRequired;
            $scope.activity.numberOfQuestions = allDescriptions.length;
            $scope.activity.subscriptionDeadline = $scope.deadline.subscriptionDeadline;
        }

        // If required field are empty, do not accept activity
        if ($scope.empty) {
            $scope.loading = false;
            return alert("One of your fields is still empty!");
        }

        // If problematic fields contain #,# or #;# reject form
        if ($scope.wrongCharacters) {
            $scope.loading = false;
            return alert("Character combinations #,# and #;# are not allowed.")
        }

        if ($scope.activity.hasCoverImage && !changedCoverImage && !$scope.keepCurrent)
            $scope.activity.hasCoverImage = false;

        // submit edit of activity to backend
        activities.edit($scope.activity, $scope.keepCurrent, fd).then(function (result) {
            $scope.loading = false;
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

    var wrongInput = function(ErrorMessage) {
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
