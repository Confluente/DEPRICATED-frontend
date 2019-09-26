var app = angular.module("confluente");

var routes = [
    require("./home"),
    require("./user/create"),
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
