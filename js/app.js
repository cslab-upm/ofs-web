var app = angular.module('observatorioapp', ['ngRoute', 'ngSanitize']);

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
        .when('/', {
          redirectTo: '/bienvenido'
        })
        .when('/bienvenido', {
            templateUrl: 'views/inicio.html',
            controller: 'inicioController'
        })
        .when('/equipamiento', {
          templateUrl: 'views/equipment.html',
          controller: ''
        })
        .when('/acerca', {
          templateUrl: 'views/about.html',
          controller: ''
        })
        .when('/contacto', {
          templateUrl: 'views/contact.html',
          controller: ''
        })
        .when('/inicio', {
            templateUrl: 'views/inicio.html',
            controller: 'inicioController'
        })
        .otherwise({
            redirectTo: function(){
              return  '/'
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


        // $locationProvider.html5Mode(true);
})
