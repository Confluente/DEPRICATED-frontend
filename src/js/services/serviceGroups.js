const app = angular.module("confluente");

/**
 * Factory for groups
 */
app.factory("groups", ["$http", function ($http) {
    return {
        /**
         * Function for retrieving all groups from backend
         * @returns groups
         */
        getAll: function () {
            return $http.get("/api/group").then(function (result) {
                return result.data;
            });
        },
        /**
         * Function for retrieving all groups from backend of a certain type
         * @param type
         * @returns groups
         */
        getAllOfType: function(type) {
            return $http.get("/api/group/type/" + type).then(function (result) {
                return result.data
            });
        },
        /**
         * Function for retrieving group based on id
         * @param id
         * @returns group
         */
        get: function (id) {
            return $http.get("/api/group/" + id).then(function (result) {
                return result.data;
            });
        },
        /**
         * Function for submitting created group to backend
         * @param group
         * @returns submitted group
         */
        create: function (group) {
            return $http.post("/api/group", group).then(function (result) {
                return result.data;
            }, function (err) {
                return err;
            });
        },
        /**
         * Function for submitting edited group to backend
         * @param group
         * @param user_group
         * @returns submitted edited group
         */
        edit: function (group, user_group) {
            return $http.put("/api/group/" + group.id, [group, user_group]).then(function (result) {
                return result.data;
            });
        },
        /**
         * Function for deleting group in backend
         * @param group
         */
        delete: function (group) {
            return $http.delete("/api/group/" + group.id);
        }
    };
}]);
