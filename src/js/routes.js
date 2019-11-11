var app = angular.module("confluente");

var routes = [
    require("./home/view"),
    require("./user/create"),
    require("./user/edit"),
    require("./activities/"),
    require("./activities/view"),
    require("./activities/create"),
    require("./activities/edit"),
    require("./page/view"),
    require("./manage"),
    require("./page/manage"),
    require("./page/create"),
    require("./page/edit")
];

module.exports = routes;
