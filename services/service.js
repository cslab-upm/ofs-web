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
            $location.path("/perfil");
        },
        register: function(name) {
          var expires = new Date();
          expires.setMinutes(expires.getMinutes() + 59);//cookie expira en 59 min
          $cookies.put('name', name, {'expires' : expires});

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

// app.run(function($http) {
//   $http.defaults.headers.common.Authorization = 'Basic YWRtaW5pc3RyYXRvcjoxMjM0NTY3OA==';
// });

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
      }).then(function successCallback(response) {
        return response;
      }, function errorCallback(response) {
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
//Usuario
app.factory('reservaFactory', function() {
    //  var user = is logged username rol
    var reserva = {};
    reserva.experimento = null;//solar-nocturno
    reserva.usuario = null;
    reserva.inicio = null;
    reserva.fin = null;
    reserva.dia = null;

    reserva.setExperimento = function(experimento){
      this.experimento = experimento;
    }
    reserva.getExperimento = function(){
      return this.experimento;
    }
    reserva.setUsuario = function(usuario){
      this.usuario = usuario;
    }
    reserva.getUsuario = function(){
      return this.usuario;
    }
    reserva.setInicio = function(inicio){
      this.inicio = inicio;
    }
    reserva.getInicio = function(){
      return this.inicio;
    }
    reserva.setFin = function(fin){
      this.fin = fin;
    }
    reserva.getFin = function(){
      return this.fin;
    }
    reserva.setDia = function(dia){
      this.dia = dia;
    }
    reserva.getDia = function(){
      return this.dia;
    }

    return recerva;
});


app.factory('Base64', function() {
    var keyStr = 'ABCDEFGHIJKLMNOP' +
            'QRSTUVWXYZabcdef' +
            'ghijklmnopqrstuv' +
            'wxyz0123456789+/' +
            '=';
    return {
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                        keyStr.charAt(enc1) +
                        keyStr.charAt(enc2) +
                        keyStr.charAt(enc3) +
                        keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);

            return output;
        },

        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                alert("There were invalid base64 characters in the input text.\n" +
                        "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                        "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            do {
                enc1 = keyStr.indexOf(input.charAt(i++));
                enc2 = keyStr.indexOf(input.charAt(i++));
                enc3 = keyStr.indexOf(input.charAt(i++));
                enc4 = keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }

                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";

            } while (i < input.length);

            return output;
        }
    };
});
