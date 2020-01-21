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
                // console.log(result);
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
        create: function (activity) {
            return $http.post("/api/activities", activity).then(function (result) {
                return result.data;
            }, function (err) {
                // currently error not handled
            });
        },
        /**
         * Function for submitting edited activities to backend
         * @param activity
         * @returns submitted edited activity
         */
        edit: function (activity) {
            return $http.put("/api/activities/" + activity.id, activity).then(function (result) {
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
