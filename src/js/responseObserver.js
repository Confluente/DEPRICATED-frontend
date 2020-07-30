const app = angular.module("confluente");

/**
 * Factory for observing response & catching error codes
 */
app.factory('responseObserver', ['$q', '$location', function responseObserver($q, $location) {
    return {
        responseError: function (errorResponse) {
            switch (errorResponse.status) {
                case 403: // Forbidden
                    $location.path("/403");
                    break;
                case 404: // Not found
                    $location.path("/404");
                    break;
            }
            return $q.reject(errorResponse);
        }
    };
}]);