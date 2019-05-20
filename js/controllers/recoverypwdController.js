app.controller('recoverypasswordController', ['$rootScope','$scope', function($rootScope, $scope) {

    $('#form-login').hide();
    $('#form-register').hide();
    $('#h2_log').hide();
    $('#h2_reg').hide();

    $scope.user = {};
    $scope.user.nameRecoveryPassword = null;
    $scope.user.emailRecoveryPassword = null;

    $scope.recoveryPassword = {};
    $scope.recoveryPassword.error = false;

    $scope.toRecoveryPassword = function(){

        // Peticion REST comprobar el email.
        // to-do
        $('#recoveryPassword').show();
        $('#form-recoveryPassword').hide();
    }

}]);