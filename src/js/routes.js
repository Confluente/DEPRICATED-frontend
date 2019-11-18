var app = angular.module("confluente");

var routes = [
    require("./home/view"),
    require("./user/create"),
    require("./user/view"),
    require("./user/edit"),
    require("./user/delete"),
    require("./activities/"),
    require("./activities/view"),
    require("./activities/create"),
    require("./activities/edit"),
    require("./group/create"),
    // require("./group/edit"),
    require("./group/view"),
    require("./page/view"),
    require("./manage"),
    require("./page/manage"),
    require("./page/create"),
    require("./page/edit")
];

module.exports = routes;
