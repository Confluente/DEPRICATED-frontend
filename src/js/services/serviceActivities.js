var app = angular.module("confluente");
app.factory("activities", ["$http", "$timeout", function ($http, $timeout) {

    return {
        getAll: function () {
            return $http.get("/api/activities").then(function (result) {
                // console.log(result);
                var activities = result.data;
                return activities.map(function (activity) {
                    activity.date = !isNaN(Date.parse(activity.date)) ? new Date(activity.date) : null;
                    return activity;
                });
            });
        },
        get: function (id) {
            return $http.get("/api/activities/" + id).then(function (result) {
                var activity = result.data;
                activity.date = !isNaN(Date.parse(activity.date)) ? new Date(activity.date) : null;
                return activity;
            });
        },
        create: function (activity) {
            // console.log(activity);
            return $http.post("/api/activities", activity).then(function (result) {
                // console.log(result.data);
                return result.data;
            }, function (err) {
                console.error(err);
            });
        },
        edit: function (activity) {
            return $http.put("/api/activities/" + activity.id, activity).then(function (result) {
                // console.log(result.data);
                return result.data;
            });
        },
        delete: function (id) {
            return $http.delete("/api/activities/" + id, id);
        }
    };
}]);
