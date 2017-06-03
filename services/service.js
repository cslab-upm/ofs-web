//Factoria que controla la autenticación y devuelve un objeto
app.factory("authFactory", function($cookies, $location, $rootScope, userFactory) {
    return {
        toLogin: function(name) {

            //Llamada API login
            // to do
            var expires = new Date();
            expires.setMinutes(expires.getMinutes() + 59);//cookie expira en 59 minutos


            $cookies.put('name', name, {'expires' : expires});
            // $cookies.put('password', password);

            //comprobacion ROLE admin
            // if (name == 'admin@admin.com' && password == 'admin') {
            //     //mandamos a la home
            //     $location.path("/inicio");
            // }
            $location.path("/inicio");
        },
        register: function(name) {
          var expires = new Date();
          expires.setMinutes(expires.getMinutes() + 59);//cookie expira en 59 min
          $cookies.put('name', name, {'expires' : expires});
          $location.path("/perfil");
        },
        toLogout: function() {
            $cookies.remove('name');
            // $cookies.remove('password');

            $location.path('/inicio')
        },
        checkStatus: function() {
            var privateRoutes = ['/perfil', '/experimento', '/observacion'];

            // console.log($location.path());
            // console.log($rootScope.isLogged);
            if(this.in_array($location.path(), privateRoutes) && !$rootScope.isLogged){
              $location.path('/iniciarsesion');
            }
            if ($location.path() == '/iniciarsesion' && typeof($cookies.get('name')) != "undefined") {
                // $location.path("/inicio");
            }
            // console.log('name : ' + $cookies.get('name'));
            if (this.in_array($location.path(), privateRoutes) && typeof($cookies.get('name')) == 'undefined') {

                $location.path('/iniciarsesion');
            }
            if(typeof($cookies.get('name')) == 'undefined'){
              userFactory.setIsLogged(false);
              $rootScope.isLogged = userFactory.getIsLogged();
            }
            // if(this.in_array($location.path(), privateRoutes) && typeof($cookies.get('name')) != "undefined"){
            //
            //     $location.path('/acerca');
            //     //  window.location.href='./iniciarsesion';
            //     // $location.path("inicio");
            // }

        },
        in_array: function(needle, haystack) {
            // console.log(needle);
            var key = '';
            for (key in haystack) {

                if (haystack[key] == needle) {

                    return true;
                }
            }
            return false;
        }
    }
});


//mientras corre la aplicación, comprobamos si el usuario tiene acceso a la ruta a la que está accediendo
app.run(function($rootScope, authFactory) {
    //al cambiar de rutas
    $rootScope.$on('$routeChangeStart', function() {
        //llamamos a checkStatus, el cual lo hemos definido en la factoria authFactory
        //la cuál hemos inyectado en la acción run de la aplicación
        authFactory.checkStatus();
    })
});

//Factoria operaciones GET estacion meteorologica
// app.factory('weatherStationFactory', function($http) {
//     return {
//         async: function(url) {
//             // $http returns a promise, which has a then function, which also returns a promise
//             var promise = $http.get(url)
//                 .then(function(response) {
//                     return response.data;
//                 }, function(response) {
//                     console.log('No Weather...')
//                 });
//             // Return the promise to the controller
//             return promise;
//         }
//     };
// });

// Factoria peticiones http
app.factory('httpFactory', function($http) {
  return {
    async: function(url,method,params) {
      var promise = $http({
        url: url,
        method: method,
        params: params
      }).then(function(response) {
        return response.data;
      }, function (response) {
        console.log('error');
        return response;
      });

      return promise;
    }
  };
});

//Usuario
app.factory('userFactory', function() {
    //  var user = is logged username rol
    var user = {};
    user.name = null;
    user.email = null;
    user.password = null;
    user.isLogged = false;
    user.rol = null;
    user.token = null;

    user.setName = function(name) {
        this.name = name;
    };
    user.getName = function() {
        return this.name;
    };
    user.setEmail = function(email) {
        this.email = email;
    };
    user.getEmail = function() {
        return this.email;
    };
    user.setPassword = function(password) {
        this.password = password;
    };
    user.getPassword = function() {
        return this.password;
    };
    user.setIsLogged = function(isLogged) {
        this.isLogged = isLogged;
    };
    user.getIsLogged = function() {
        return this.isLogged;
    };
    user.setRol = function(rol) {
        this.rol = rol;
    };
    user.getRol = function() {
        return this.rol;
    };
    user.setToken = function(token){
        this.token = token;
    }
    user.getToken = function(){
      return this.token;
    }

    return user;
});
