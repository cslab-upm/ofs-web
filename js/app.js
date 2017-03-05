var app = angular.module('observatorioapp', ['ngRoute']);
app.config(['$locationProvider', function($locationProvider) {
  $locationProvider.hashPrefix('');
}]);
app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'templates/register.html',
            controller: ''
        })
        .when('/inicio', {
            templateUrl: 'templates/inicio.html',
            controller: ''
        })
        .when('/experimento/nocturno', {
            templateUrl: 'templates/night-exp.html',
            controller: ''
        })
        .when('/experimento/solar', {
            templateUrl: 'templates/solar-exp.html',
            controller: ''
        })
        .when('/reservas', {
          templateUrl: 'templates/reservations.html',
          controller: ''
        })
        .when('/galeria', {
          templateUrl: 'templates/gallery.html',
          controller: ''
        })
        .when('/perfil', {
          templateUrl: 'templates/profile.html',
          controller: ''
        })
        .otherwise({
            redirectTo: '/bienvenido'
        });

        // $locationProvider.html5Mode(true);
})
