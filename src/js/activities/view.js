var app = angular.module("confluente");
var TableExport = require("tableexport");

/**`
 * Controller for viewing activity
 */
app.controller("activityViewController", ["$scope", "$routeParams", "activities", "users", function ($scope, $routeParams, activities, user) {
    // get activityId from URL
    var activityId = $routeParams.activityId;

    // to store the different paragraphs of the activity
    $scope.activityDescription = [];

    // true if user is part of committee that is organizing the activity
    $scope.isUserOrganizing = false;

    // true if the user has clicked the export button
    $scope.clickedExport = false;

    // true if user is already subscribed to the activity
    $scope.subscribed = false;

    // true if the subscription deadline has passed
    $scope.deadlinePassed = false;

    // get activity from backend based on activityId and set on $scope
    activities.get(activityId).then(function (activity) {
        $scope.activity = activity;
        $scope.user = $scope.$parent.user;
        if (activity.canSubscribe) window.location.href = "/activities/" + activityId + "#signup";

        // To split the description up into paragraphs
        $scope.activityDescription = activity.description.replace(/\r/g, "").split(/\n/);

        // format the subscriptions
        $scope.answers = [];
        for (var i = 0; i < activity.numberOfQuestions; i++) {
            if (activity.typeOfQuestion[i] === '☑ checkboxes') {
                var list = [];
                for (var j = 0; j < activity.formOptions[i].length; j++) {
                    list.push("");
                }
                $scope.answers.push(list);
            } else {
                $scope.answers.push("");
            }
        }

        // check whether the logged in user is part of the group that is organizing the event
        for (var i = 0; i < $scope.user.groups.length; i++) {
            if ($scope.user.groups[i].id === $scope.activity.OrganizerId) {
                $scope.isUserOrganizing = true;
            }
        }

        // check whether the user that is logged in is already subscribed to the activity
        for (var i = 0; i < $scope.activity.participants.length; i++) {
            if ($scope.activity.participants[i].id === $scope.user.id) {
                $scope.subscribed = true;
            }
        }

        // check if the current date is passed the subscription deadline
        var now = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
        if (now > $scope.activity.subscriptionDeadline) $scope.deadlinePassed = true;
    });

    // redirects user to login page
    $scope.login = function() {
        window.location.href = "/login";
    };

    // generates three buttons with which you can export the table
    $scope.exportTable = function() {
        $scope.clickedExport = true;
        TableExport(document.getElementsByTagName("table"));
        TableExport.prototype.typeConfig.date.assert = function(value) { return false; };
    };

    // unsubscribes the user from the activity
    $scope.remove = function () {
        $scope.loading = true;
        activities.deleteSubscription(activityId).then(function (result) {
            $scope.loading = false;

            // reloads page to show deletion
            window.location.reload();
        })
    };

    // submits the form
    $scope.submit = function () {
        $scope.loading = true;
        // Check if all required field are filled in
        var filledIn = true;
        for (var i = 0; i < $scope.activity.numberOfQuestions; i++) {
            if ($scope.activity.required[i] === 'true') {
                if ($scope.activity.typeOfQuestion[i] === '☰ text' && $scope.answers[i] === "") {
                    filledIn = false;
                } else if ($scope.activity.typeOfQuestion[i] === '◉ multiple choice' && $scope.answers[i] === "") {
                    filledIn = false;
                } else if ($scope.activity.typeOfQuestion[i] === '☑ checkboxes' && !$scope.answers[i].includes(true)) {
                    filledIn = false
                }
            }
        }

        // rejects submission if form is not completely filled in
        if (!filledIn) {
            $scope.loading = false;
            return alert("Not all required fields were filled in.");
        }

        // Format answer correctly
        $scope.answers[0] = $scope.user.displayName;
        $scope.answers[1] = $scope.user.email;
        for (var i = 2; i < $scope.activity.numberOfQuestions; i++) {
            var answer = "";
            if ($scope.activity.typeOfQuestion[i] === '☑ checkboxes') {
                for (var j = 0; j < $scope.activity.formOptions[i].length; j++) {
                    if ($scope.answers[i][j] === true) {
                        if (answer !== "") answer += " - ";
                        answer += $scope.activity.formOptions[i][j].toString();
                    }
                }
                $scope.answers[i] = answer;
            }
        }

        // create new activity from variables as put on the $scope by the form
        activities.subscribe($scope.answers, activityId).then(function (result) {
            $scope.loading = false;

            // reload page to show submission
            window.location.reload();
        });
    }

    // Allow setting the 'published' attribute of activities to true
    $scope.publishActivity = function(activityToBePublished) {
        activityToBePublished.published = true;
        // Set organizer to displayName of Organizer (required for API)
        activityToBePublished.organizer = activityToBePublished.Organizer.displayName;
        activities.edit(activityToBePublished);
        window.location.reload();
    };

    // Allow setting the 'published' attribute of activities to false
    $scope.unpublishActivity = function(activityToBeUnpublished) {
        activityToBeUnpublished.published = false;
        // Set organizer to displayName of Organizer (required for API)
        activityToBeUnpublished.organizer = activityToBeUnpublished.Organizer.displayName;
        activities.edit(activityToBeUnpublished);
        window.location.reload();
    };
}]);

module.exports = {
    name: "Activity",
    url: "/activities/:activityId",
    parent: "/activities/",
    templateUrl: "/www/templates/activities/activityDetails.html",
    controller: "activityViewController"
};
