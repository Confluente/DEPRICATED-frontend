var app = angular.module("confluente");

app.factory("activities", ["$http", "$timeout", function ($http, $timeout) {
  var activities = [];

  function give(value) {
    return function () {
      return value;
    };
  }

  return {
    getAll: function () {
      return $http.get("/api/activities").then(function (result) {
        //console.log(result);
        activities = result.data;
        return result.data;
      });
    },
    get: function (id) {
      return $http.get("/api/activities/" + id).then(function (result) {
        return result.data;
      });
    },
    create: function (activity) {
      //console.log(activity);
      return $http.post("/api/activities", activity).then(function (result) {
        console.log(result.data);
        return result.data;
      }, function (err) {
        console.error(err);
      });
    },
    edit: function (activity) {
      return $http.put("/api/activities/" + activity.id, activity).then(function (result) {
        console.log(result.data);
        return result.data;
      });
    }
  };
}]);
