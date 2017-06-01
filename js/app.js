var app = angular.module('observatorioapp', ['ngRoute', 'ngSanitize','ngCookies']);

// URL prefix
app.config(['$locationProvider', function($locationProvider) {
  // $locationProvider.hashPrefix('');
  $locationProvider.html5Mode(true);
}]);

// URL WhiteList
// app.config(['$sceDelegateProvider',function($sceDelegateProvider){
//   $sceDelegateProvider.resourceUrlWhitelist([
//     'self',
//     'https://www.youtube.com/**'
//   ]);
// }]);

// Routing
app.config(function($routeProvider) {
    $routeProvider
        // .when('/', {
        //   redirectTo: '/bienvenido'
        // })
        .when('/inicio', {
            templateUrl: 'views/inicio.html',
            controller: 'inicioController'
        })
        .when('/equipamiento', {
          templateUrl: 'views/equipment.html',
          controller: 'equipamientoController'
        })
        .when('/acerca', {
          templateUrl: 'views/about.html',
          controller: 'acercaController'
        })
        .when('/contacto', {
          templateUrl: 'views/contact.html',
          controller: 'contactoController'
        })
        .when('/registrar', {
          templateUrl: 'views/register.html',
          controller: 'registrarController'
        })
        .when('/iniciarsesion', {
          templateUrl: 'views/register.html',
          controller: 'loginController'
        })
        .when('/experimento', {
          templateUrl: 'views/experiment.html',
          controller: 'experimentoController'
        })
        .when('/perfil', {
          templateUrl: 'views/profile.html',
          controller: 'perfilController'
        })
        .when('/observacion', {
          templateUrl: 'views/observation.html',
          controller: 'observacionController'
        })
        .otherwise({
            redirectTo: function(){
              return  '/inicio'
            }
        })
        // .when('/experimento/nocturno', {
        //     templateUrl: 'views/night-exp.html',
        //     controller: ''
        // })
        // .when('/experimento/solar', {
        //     templateUrl: 'views/solar-exp.html',
        //     controller: ''
        // })
        // .when('/reservas', {
        //   templateUrl: 'views/reservations.html',
        //   controller: ''
        // })
        // .when('/galeria', {
        //   templateUrl: 'views/gallery.html',
        //   controller: ''
        // })
        // .when('/perfil', {
        //   templateUrl: 'views/profile.html',
        //   controller: ''
        // })
})
