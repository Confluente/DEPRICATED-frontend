var app = angular.module("confluente");

/**
 * Controller for viewing activity
 */
app.controller("activityViewController", ["$scope", "$routeParams", "activities", "users", function ($scope, $routeParams, activities, user) {
    // get activityId from URL
    var activityId = $routeParams.activityId;
    // get activity from backend based on activityId and set on $scope
    activities.get(activityId).then(function (activity) {
        $scope.activity = activity;
        $scope.user = $scope.$parent.user;
        if (activity.canSubscribe) {
            window.location.href = "/activities/" + activityId + "#signup";
        }
        $scope.answers = [];
        for (var i = 0; i < activity.numberOfQuestions; i++) {
            if (activity.typeOfQuestion[i] === 'checkbox') {
                var list = [];
                for (var j = 0; j < activity.formOptions[i].length; j++) {
                    list.push("");
                }
                $scope.answers.push(list);

            } else {
                $scope.answers.push("");
            }
        }
        console.log($scope);
    });

    $scope.submit = function () {
        $scope.loading = true;
        // Check if all required field are filled in
        var filledIn = true;
        for (var i = 0; i < $scope.activity.numberOfQuestions; i++) {
            if ($scope.activity.required[i] === 'true') {
                if ($scope.activity.typeOfQuestion[i] === 'text' && $scope.answers[i] === "") {
                    filledIn = false;
                } else if ($scope.activity.typeOfQuestion[i] === 'radio' && $scope.answers[i] === "") {
                    filledIn = false;
                } else if ($scope.activity.typeOfQuestion[i] === 'checkbox' && !$scope.answers[i].includes(true)) {
                    filledIn = false
                }
            }
        }
        if (!filledIn) {
            $scope.loading = false;
            return alert("not all required fields were filled in.");
        }

        // Format answer correctly
        for (var i = 0; i < $scope.activity.numberOfQuestions; i++) {
            var answer = "";
            if ($scope.activity.typeOfQuestion[i] === 'checkbox') {
                for (var j = 0; j < $scope.activity.formOptions[i].length; j++) {
                    if ($scope.answers[i][j] === true) {
                        if (answer !== "") answer += " - ";
                        answer += $scope.activity.formOptions[i][j].toString();
                    }
                }
                console.log(answer);
                $scope.answers[i] = answer;
            }
        }

        // create new activity from variables as put on the $scope by the form
        activities.subscribe($scope.answers, activityId).then(function (result) {
            $scope.loading = false;

            // redirect to new activity
            window.location.href = "/activities/" + activityId;
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
