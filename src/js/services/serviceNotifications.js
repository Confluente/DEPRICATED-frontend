const app = angular.module("confluente");

/**
 * Factory for notifications
 */
app.factory("notifications", ["$http", "$timeout", function ($http) {
    return {
        /**
         * sets portrait right consent for userId to answer in database
         */
        portraitRight: function(userId, answer) {
            return $http.put("/api/notifications/portraitRight/" + userId, {answer: answer}).then(function (result) {
                return result.data;
            })
        }
    }
}]);