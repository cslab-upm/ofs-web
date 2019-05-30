var app = angular.module('observatorioapp', ['ngRoute', 'ngSanitize','ngCookies']);

// URL prefix
app.config(['$locationProvider', function($locationProvider) {
  $locationProvider.html5Mode(true);
}]);

// Routing
app.config(function($routeProvider) {
    $routeProvider
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
        .when('/recuperarcontrasena', {
          templateUrl: 'views/register.html',
          controller: 'recoverypasswordController'
        })
        .when('/galeria', {
            templateUrl: 'views/galeria.html',
            controller: 'galeriaController',
            resolve: {
              photos: function(){
                var urlGetInfoUser = "https://ofs.fi.upm.es/api/users/loged";
                $http.get(urlGetInfoUser).then(function(userInfo){
                  $http({
                    method: 'GET',
                    url: 'http://192.168.43.23:1723' + '/Task/' + userInfo.data.username,
                    }).then(function successCallback(response){
                      return response.data;
                    }), function errorCallback(response){
                      console.log(response.statusText);
                    }
                })
            }
          }
        })
        .when('/video', {
            templateUrl: 'views/video.html',
            controller: 'videoController'
        })
        .otherwise({
            redirectTo: function(){
              return  '/inicio'
            }
  })
})
