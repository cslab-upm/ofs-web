app.controller('registrarController', ['$rootScope', '$scope', '$sce', '$http', 'authFactory', 'userFactory',
    function ($rootScope, $scope, $sce, $http, authFactory, userFactory) {

    $('.nav').find('.active').removeClass('active');
    $('#form-login').hide();
    $('#form-recoveryPassword').hide();
    $('#h2_log').hide();
    $('#h2_repass').hide();

    // $rootScope.user = {};
    // $rootScope.isLogged = userFactory.getIsLogged();

    $scope.user = {};
    $scope.user.nameRegister = null;
    $scope.user.emailRegister = null;
    $scope.user.passwordRegister1 = null;
    $scope.user.passwordRegister2 = null;
    $scope.user.isLogged = false;

    $scope.register = {};
    $scope.register.errorName = false;
    $scope.register.errorEmail = false;
    $scope.register.errorPassword = false;
    $scope.register.errorEnvio = false;

    $scope.toRegister = function () {
        //validar entradas
        if ($scope.user.passwordRegister1 !== $scope.user.passwordRegister2) {
            $scope.register.errorPassword = true;

        } else {

            $scope.register.errorPassword = false;
            userFactory.setName($scope.user.nameRegister);
            userFactory.setEmail($scope.user.emailRegister);
            userFactory.setPassword($scope.user.passwordRegister1);
            $('#form-submit-reg').hide();
            $('#register-gif').show();


            $http({
                url: 'api/register',
                method: 'POST',
                data: {
                    username: $scope.user.nameRegister,
                    email: $scope.user.emailRegister,
                    password: $scope.user.passwordRegister1
                },
            }).then(function successCallback(response) {


                if (response.status === 201) {
                    // Si registro correcto, mostar mensaje
                    $('#login-gif').hide();
                    $('#form-register').hide();
                    $('#confirmEmail').show();
                }
                // return response;
            }, function errorCallback(response) {
                $('#register-gif').hide();
                $('#form-submit-reg').show();
                $scope.register.errorEnvio = true;

            });
        }
    }
}]);