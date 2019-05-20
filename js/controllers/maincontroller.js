app.controller('mainController', function($rootScope, $scope, $location, authFactory, userFactory) {

    var path = window.location.pathname;
    var dir = path.slice(1); //poner a 1 al subir a venus
    var selected; //clase activa navbar

    // Ajuste path - navbar
    if (dir == 'contacto') {
        $('.nav').find('.active').removeClass('active');
        $('#contact').addClass('active');
    } else if (dir == 'acerca') {
        $('.nav').find('.active').removeClass('active');
        $('#about').addClass('active');
    } else if (dir == 'equipamiento') {
        $('.nav').find('.active').removeClass('active');
        $('#equip').addClass('active');
    } else if (dir == 'inicio') {
        $('.nav').find('.active').removeClass('active');
        $('#init').addClass('active');
    }else if (dir == 'galeria') {
        $('.nav').find('.active').removeClass('active');
        $('#gallery').addClass('active');
    }else if (dir == 'video') {
        $('.nav').find('.active').removeClass('active');
        $('#video').addClass('active');
    }


    $('#logo').click(function() {
        $('.nav').find('.active').removeClass('active');
        $('#init').addClass('active');
    });
    // End Ajuste path - navbar

    $scope.goLogin = function () {
        $location.path("/iniciarsesion");
        $('#init').addClass('active');
    }

    $scope.goRegister = function () {
        $location.path("/registrar");
    }

    $scope.goRecoveryPassword = function () {
        $location.path("/recuperarcontrasena");
        // $('#init').addClass('active');
    }

    $scope.goProfile = function () {
        $location.path("/perfil");
        $('.nav').find('.active').removeClass('active');
        $('#profile').addClass('active');
    }


    $scope.toLogout =  function () {
        authFactory.toLogout();
        userFactory.setIsLogged(false);
        $rootScope.isLogged = userFactory.getIsLogged();
        $('#init').addClass('active');

    }

    if ($(window).width() < 1200) {
        $('.navbar .container').addClass('container-fluid');
        $('.navbar .container').removeClass('container');
    }
    else if($(window).width() > 1200){
        $('.navbar .container-fluid').addClass('container');
        $('.navbar .container-fluid').removeClass('container-fluid');
    }

    $(window).on("resize", function() {
        if ($(window).width() < 1200) {
            $('.navbar .container').addClass('container-fluid');
            $('.navbar .container').removeClass('container');
        }
        else if($(window).width() > 1200){
            $('.navbar .container-fluid').addClass('container');
            $('.navbar .container-fluid').removeClass('container-fluid');
        }
    });

    $rootScope.isLogged = userFactory.getIsLogged();
});