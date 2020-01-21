var app = angular.module("confluente");
var TableExport = require("tableexport");

/**
 * Controller for viewing activity
 */
app.controller("activityViewController", ["$scope", "$routeParams", "activities", "users", function ($scope, $routeParams, activities, user) {
    // get activityId from URL
    var activityId = $routeParams.activityId;

    $scope.isUserOrganizing = false;
    $scope.clickedExport = false;
    $scope.subscribed = false;
    $scope.deadlinePassed = false;

    // get activity from backend based on activityId and set on $scope
    activities.get(activityId).then(function (activity) {
        $scope.activity = activity;
        $scope.user = $scope.$parent.user;
        if (activity.canSubscribe) {
            window.location.href = "/activities/" + activityId + "#signup";
        }
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

        for (var i = 0; i < $scope.user.groups.length; i++) {
            if ($scope.user.groups[i].id === $scope.activity.OrganizerId) {
                $scope.isUserOrganizing = true;
            }
        }

        for (var i = 0; i < $scope.activity.participants.length; i++) {
            if ($scope.activity.participants[i].id === $scope.user.id) {
                $scope.subscribed = true;
            }
        }

        var now = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
        if (now > $scope.activity.subscriptionDeadline) $scope.deadlinePassed = true;
        console.log($scope)
    });

    $scope.login = function() {
        window.location.href = "/login";
    };

    $scope.exportTable = function() {
        $scope.clickedExport = true;
        TableExport(document.getElementsByTagName("table"));
        TableExport.prototype.typeConfig.date.assert = function(value) { return false; };
    };

    $scope.remove = function () {
        $scope.loading = true;
        activities.deleteSubscription(activityId).then(function (result) {
            $scope.loading = false;
            window.history.go();
        })
    };

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
        if (!filledIn) {
            $scope.loading = false;
            return alert("not all required fields were filled in.");
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

            // redirect to new activity
            window.history.go();
        });
    }
}]);

module.exports = {
    name: "Activity",
    url: "/activities/:activityId",
    parent: "/activities/",
    templateUrl: "/www/templates/activities/activityDetails.html",
    controller: "activityViewController"
};
