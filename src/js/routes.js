var app = angular.module("confluente");

// storing of all routes in list
var routes = [
    require("./home/view"),
    require("./user/create"),
    require("./user/view"),
    require("./user/edit"),
    require("./user/delete"),
    require("./user/changePassword"),
    require("./magazine"),
    require("./activities/"),
    require("./activities/view"),
    require("./activities/create"),
    require("./activities/edit"),
    require("./activities/delete"),
    require("./committees/"),
    require("./group/create"),
    require("./group/edit"),
    require("./group/view"),
    require("./group/delete"),
    require("./page/view"),
    require("./manage"),
    require("./page/manage"),
    require("./page/create"),
    require("./page/edit"),
    require("./notifications/portraitRight")
];

module.exports = routes;
