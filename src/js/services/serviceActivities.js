var app = angular.module("confluente");

/**
 * Factory for activities
 */
app.factory("activities", ["$http", "$timeout", function ($http, $timeout) {
    return {
        /**
         * Function for retrieving all activities from the backend
         * @returns activities
         */
        getAll: function () {
            return $http.get("/api/activities").then(function (result) {
                var activities = result.data;
                return activities.map(function (activity) {
                    // set correct date format (or null if not defined)
                    activity.date = !isNaN(Date.parse(activity.date)) ? new Date(activity.date) : null;
                    activity.subscriptionDeadline = !isNaN(Date.parse(activity.subscriptionDeadline)) ? new Date(activity.subscriptionDeadline) : null;
                    return activity;
                });
            });
        },

        /**
         * Function for retrieving all activities from the backend
         * @returns activities
         */
        getAllManage: function () {
            return $http.get("/api/activities/" + "manage").then(function (result) {
                var activities = result.data;
                return activities.map(function (activity) {
                    // set correct date format (or null if not defined)
                    activity.date = !isNaN(Date.parse(activity.date)) ? new Date(activity.date) : null;
                    activity.subscriptionDeadline = !isNaN(Date.parse(activity.subscriptionDeadline)) ? new Date(activity.subscriptionDeadline) : null;
                    return activity;
                });
            });
        },
        /**
         * Function for retrieving a single activity from the backend based on id
         * @param id
         * @returns activity
         */
        get: function (id) {
            return $http.get("/api/activities/" + id).then(function (result) {
                var activity = result.data;
                // set correct date format (or null if not defined)
                activity.date = !isNaN(Date.parse(activity.date)) ? new Date(activity.date) : null;
                activity.subscriptionDeadline = !isNaN(Date.parse(activity.subscriptionDeadline)) ? new Date(activity.subscriptionDeadline) : null;
                return activity;
            });
        },
        /**
         * Function for submitting created activity to backend
         * @param activity
         * @returns submitted activity
         */
        create: function (coverImage, activity) {
            return $http.post("/api/activities", activity).then(function (result) {
                if (activity.hasCoverImage) {
                    $http.post("/api/activities/postPicture/" + result.data.id, coverImage, {
                        transformRequest: angular.identity,
                        headers: {
                            'Content-Type': undefined
                        }
                    });
                }
                return result.data;
            }, function (err) {
                // currently error not handled
            });
        },
        /**
         * Function for submitting edited activities to backend
         * @param activity
         * @param keepCurrent whether to keep the current picture
         * @param coverImage the new cover image
         * @returns submitted edited activity (except the picture)
         */
        edit: function (activity, keepCurrent, coverImage) {
            return $http.put("/api/activities/" + activity.id, activity).then(function (result) {
                if (!keepCurrent) {
                    $http.put("/api/activities/postPicture/" + activity.id, coverImage, {
                        transformRequest: angular.identity,
                        headers: {
                            'Content-Type': undefined
                        }
                    });
                }
                return result.data;
            });
        },

        /**
         * Function for submitting subscription to backend
         * @param subscription
         * @param activityId
         */
        subscribe: function (subscription, activityId) {
            return $http.post("/api/activities/subscriptions/" + activityId, subscription).then(function (result) {
                return result.data;
            });
        },

        /**
         * Function for submitting a deletion of subscription request to backend
         * @param activityId
         */
        deleteSubscription: function (activityId) {
            return $http.delete("/api/activities/subscriptions/" + activityId).then(function (result) {
                return result.data;
            })
        },

        /**
         * Function for deleting activity in backend based on id
         * @param id
         */
        delete: function (id) {
            return $http.delete("/api/activities/" + id, id);
        }
    };
}]);
app.directive("fileread", [
    function() {
        return {
            scope: {
                fileread: "="
            },
            link: function(scope, element, attributes) {
                element.bind("change", function(changeEvent) {
                    var reader = new FileReader();
                    reader.onload = function(loadEvent) {
                        scope.$apply(function() {
                            scope.fileread = loadEvent.target.result;
                        });
                    }
                    reader.readAsDataURL(changeEvent.target.files[0]);
                });
            }
        }
    }
]);
