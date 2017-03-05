var app = angular.module('observatorioapp', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/inicio', {
            templateUrl: 'templates/register.html',
            controller: ''
        })
        .otherwise({
            redirectTo: '/inicio'
        });
})
