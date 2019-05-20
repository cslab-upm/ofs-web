app.controller('loginController', ['$rootScope', '$scope', '$sce', '$http', '$location', 'authFactory','userFactory','Base64','httpFactory',
    function($rootScope, $scope, $sce, $http, $location, authFactory,userFactory, Base64, httpFactory) {

        $('.nav').find('.active').removeClass('active');
        $('#form-register').hide();
        $('#form-recoveryPassword').hide();
        $('#h2_reg').hide();
        $('#h2_repass').hide();



        $rootScope.user = {};
        $rootScope.isLogged = userFactory.getIsLogged();

        $scope.user = {};
        $scope.user.nameLogin = null;
        $scope.user.passwordLogin = null;
        $scope.user.isLogged = false;
        $scope.user.email = null;
        $scope.user.rol = null;
        $scope.user.token = null;

        $scope.login = {};
        $scope.login.errorName = false;
        $scope.login.errorPassword = false;
        $scope.login.errorEnvio = false;

        // app.run(function($http) {
        //   $http.defaults.headers.common.Authorization = 'Basic YWRtaW5pc3RyYXRvcjoxMjM0NTY3OA==';
        // });

        //funcion para conectar
        // TO DO
        $scope.toLogin = function() {
            if ($scope.user.nameLogin != null & $scope.user.passwordLogin != null) {
                userFactory.setName($scope.user.nameLogin);
                userFactory.setPassword($scope.user.passwordLogin);
                $('#form-submit-log').hide();
                $('#login-gif').show();

                var auth64 = Base64.encode($scope.user.nameLogin + ':' + $scope.user.passwordLogin);
                var basic = 'Basic ' + auth64;


                // $http.defaults.headers.common.Authorization = basic;
                // $http.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
                // $http.defaults.headers.common['Access-Control-Allow-Methods'] = "GET,PUT,POST,DELETE,OPTIONS";
                // $http.defaults.headers.common['Access-Control-Allow-Headers'] = "Content-Type, Authorization, Content-Length, X-Requested-With";

                $http({
                    url: 'api/login',
                    method: 'POST',
                    data: {
                        username: $scope.user.nameLogin,
                        password: $scope.user.passwordLogin
                    }
                }).then(function successCallback(response) {
                    // console.log(response);
                    if (response.status == 200) {
                        // console.log(response.data);
                        userFactory.setToken(response.data.token);
                        authFactory.toLogin(userFactory.getToken()); //cokiee
                        $rootScope.user.isLogged = true;
                        $scope.user.isLogged = true;
                        userFactory.setIsLogged(true);

                        // una vez hecho login recuperamos los datos del usuario
                        httpFactory.auth('api/users/logged', 'GET')
                            .then(function success(response) {
                                userFactory.setEmail(response.data.email);
                                userFactory.setName(response.data.username);
                                $location.path("/perfil");
                            });
                    }
                }).catch(p => {
                    $('#form-submit-log').show();
                    $('#login-gif').hide();
                    $scope.login.errorEnvio = true;
                })
            }
        }
    }]);