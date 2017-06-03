app.controller('mainController', function($rootScope, $scope, $location, authFactory, userFactory) {

  var path = window.location.pathname;
  var dir = path.slice(18); //poner a 1 al subir a venus
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
  $scope.goProfile = function () {
    $location.path("/perfil");
    $('.nav').find('.active').removeClass('active');
    $('#profile').addClass('active');
  }


  $scope.toLogout =  function () {
    authFactory.toLogout();
    userFactory.setIsLogged(false);
    $rootScope.isLogged = userFactory.getIsLogged();

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


app.controller('inicioController', ['$scope', '$sce', '$http','httpFactory', function($scope, $sce, $http, httpFactory) {

  // <!-- Google Analytics -->
  ga('set', 'page', '/inicio');
  ga('send', 'pageview');
  // <!-- End Google Analytics -->

    // $scope.cameraFile = $sce.trustAsResourceUrl('https://www.youtube.com/embed/u');
    //Estado observatorio

    $scope.state = {};
    $scope.state.weatherStation=true;//OK
    $scope.state.availabilityMount = "Estado de la montura: <span class='dome-red'>NO DISPONIBLE</span>"
    $scope.state.availabilityWeatherStation = "Estado de la estación meteorológica: <span class='dome-red'>NO DISPONIBLE</span>"
    $scope.state.availabilityMount = "Estado de la montura: <span class='dome-red'>NO DISPONIBLE</span>"
    $scope.state.availabilityCameras = "Estado de las cámaras: <span class='dome-green'>DISPONIBLE</span>"
    // $scope.state.busy = "El observatorio está libre. Inicie sesión o Registrese para observar el cielo."
    // $http.get('http://api.openweathermap.org/data/2.5/weather?q=Boadilladelmonte,sp&APPID=41a51db0a52c9d6db1462321b6a6a297')//7
    //     .then(function successCallback(response) {
    //         $scope.state.temperature = response.data.main.temp - 273.15;
    //         $scope.state.humidity = response.data.main.humidity;
    //         $scope.state.pressure = response.data.main.pressure;
    //         $scope.state.windSpeed = response.data.wind.speed;
    //         $scope.state.visibility = response.data.visibility;
    //     }, function errorCallback(response) {
    //         $scope.state.temperature = "No disponible";
    //         $scope.state.humidity = "No disponible";
    //         $scope.state.pressure = "No disponible";
    //         $scope.state.windSpeed = "No disponible";
    //         $scope.state.visibility = "No disponible";
    //     });

    // var url = 'http://api.openweathermap.org/data/2.5/weather?q=Madrid,sp&APPID=41a51db0a52c9d6db1462321b6a6a297';//7
    // var url = 'http://api.openweathermap.org/data/2.5/weather';//7
    // weatherStationFactory.async(url).then(function(data){
    //   $scope.state.temperature = data.main.temp - 273.15;
    //   $scope.state.humidity = data.main.humidity;
    //   $scope.state.pressure = data.main.pressure;
    //   $scope.state.windSpeed = data.wind.speed;
    //   $scope.state.visibility = data.visibility;
    // });
    // var url = 'http://api.openweathermap.org/data/2.5/weather';//7
    // var params = {q : 'Boadilladelmonte,sp', APPID : '41a51db0a52c9d6db1462321b6a6a297' }

    // Estado estacion meteorologica
    var paramsWeatherStation = '';
    var urlWeatherStation = 'http://localhost:8080/things/weatherstation/state/';
    httpFactory.async(urlWeatherStation,'GET', paramsWeatherStation).then(function(data){
      if(data.operatingStatus == 'OK'){
         $scope.state.temperature = data.temperature;
         $scope.state.pressure = data.pressure;
         $scope.state.humidity = data.humidity;
         $scope.state.rainfall = data.rainfall;
         $scope.state.windSpeed = data.windSpeed;
         $scope.state.windDirection = data.windDirection;
         $scope.state.availabilityWeatherStation = "Estado de la estación meteorológica: <span class='dome-green'>DISPONIBLE</span>";
      }
      else{
        $scope.state.weatherStation = false;//ERROR
        $scope.state.availabilityWeatherStation = "Estado de la estación meteorológica: <span class='dome-red'>NO DISPONIBLE</span>";
      }
    });

    // Estado montura
    var paramsMount = '';
    var urlMount = 'http://localhost:8080/things/mount/state/';
    httpFactory.async(urlMount,'GET', paramsMount).then(function(data){
      if(data.operatingStatus == 'OK'){
         $scope.state.availabilityMount = "Estado de la montura: <span class='dome-green'>DISPONIBLE</span>";
      }
      else{
        $scope.state.availabilityMount = "Estado de la montura: <span class='dome-red'>NO DISPONIBLE</span>";
      }
    });
    // Estado Cupula
    var paramsDome = '';
    var urlDome = 'http://localhost:8080/things/dome/state/';
    httpFactory.async(urlDome,'GET', paramsDome).then(function(data){
      if(data.operatingStatus == 'OK' && data.openingElements[0].status == 'OPEN'){
         $scope.state.availabilityDome = "Estado de la cúpula: <span class='dome-green'>DISPONIBLE, ABIERTA</span>";
      }
      else if(data.operatingStatus == 'OK' && data.openingElements[0].status == 'CLOSED'){
         $scope.state.availabilityDome = "Estado de la cúpula: <span class='dome-green'>DISPONIBLE, CERRADA</span>";
      }
      else{
      $scope.state.availabilityDome = "Estado de la cúpula: <span class='dome-red'>NO DISPONIBLE</span>";
      }
    });

    $scope.cameraFile = 'img/cameraObs.jpg';
    // Seleccion de camara
    $scope.SelectCamera = function() {
      var date = new Date();
      var time = date.getTime();
      // var intervalOut ='';
      // var intervalIn = '';
        if ($scope.camera == 'interior') {
            // $scope.cameraFile = $sce.trustAsResourceUrl('https://www.youtube.com/embed/FM7MFYoylVs');
            $scope.cameraFile = '/moobotix.jpg' + '?timestamp=' + time;
            // if (contIn == 0){
            //   console.log(intervalOut);
            //   clearInterval(intervalOut);
            //   intervalIn = setInterval( 'reloadImgIn()', 2000 );//2 sec
            //   contIn++;
            // } else {
            // $scope.cameraFile = '/moobotix.jpg' + '?timestamp=' + time;
            // }
        } else if ($scope.camera == 'exterior') {
          $scope.cameraFile = '/philips.jpg' + '?timestamp=' + time;
            // if (contOut == 0){
            //   console.log(intervalIn);
            //   clearInterval(intervalIn);
            //   intervalOut = setInterval( 'reloadImgOut()', 2000 );//2 sec
            //   contOut++;
            // } else {
            // $scope.cameraFile = '/philips.jpg' + '?timestamp=' + time;
            // }
        }
    }

    //Modal imagen
    if ($(window).width() > 767) {
        var $lightbox = $('#lightbox');
        $('.thumbnail').on('click', function(event) {
            var $img = $(this).find('img'),
                src = $img.attr('src'),
                alt = $img.attr('alt');
            // css = {
            //     'maxWidth': $(window).width() - 100,
            //     'maxHeight': $(window).height() - 100
            // };

            $lightbox.find('.close').addClass('hidden');
            $lightbox.find('img').attr('src', src);
            $lightbox.find('img').attr('alt', alt);
            // $lightbox.find('img').css(css);
        });

        $lightbox.on('shown.bs.modal', function() {
            var $img = $lightbox.find('img');

            $lightbox.find('.modal-dialog').css({
                'width': $img.width()
            });
            $lightbox.find('.close').removeClass('hidden');
        });
    } else {
        $('.thumbnail').removeAttr('data-toggle');
    }

    // http://api.openweathermap.org/data/2.5/weather?q=Madrid,sp&APPID=41a51db0a52c9d6db1462321b6a6a297
}]);


app.controller('equipamientoController', ['$scope', '$sce', '$http', function($scope, $sce, $http) {

    // <!-- Google Analytics -->
    ga('set', 'page', '/equipamiento');
    ga('send', 'pageview');
    // <!-- End Google Analytics -->

}]);
app.controller('acercaController', ['$scope', '$sce', '$http', function($scope, $sce, $http) {

    // <!-- Google Analytics -->
    ga('set', 'page', '/acerca');
    ga('send', 'pageview');
    // <!-- End Google Analytics -->

}]);

app.controller('contactoController', ['$scope', '$sce', '$http', function($scope, $sce, $http) {

    // <!-- Google Analytics -->
    ga('set', 'page', '/contacto');
    ga('send', 'pageview');
    // <!-- End Google Analytics -->

}]);

app.controller('registrarController', ['$rootScope','$scope', '$sce', '$http', 'authFactory', 'userFactory', function($rootScope, $scope, $sce, $http, authFactory, userFactory) {
    // <!-- Google Analytics -->
    ga('set', 'page', '/registrar');
    ga('send', 'pageview');
    // <!-- End Google Analytics -->

    $('#form-login').hide();
    $('#h2_log').hide();

    $rootScope.user = {};
    $rootScope.isLogged = userFactory.getIsLogged();

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

    $scope.toLogin = function(){
      console.log('sdfsdfsdf');
    };

    $scope.toRegister = function(){
      //validar entradas
      if( $scope.user.passwordRegister1 != $scope.user.passwordRegister2){
        $scope.register.errorPassword = true;

      }else {
        $scope.register.errorPassword = false;
        userFactory.setName($scope.user.nameRegister);
        userFactory.setEmail($scope.user.emailRegister);
        userFactory.setPassword($scope.user.nameRegister);
        userFactory.setIsLogged(true);

        $rootScope.isLogged = userFactory.getIsLogged();
        // console.log($rootScope.isLogged);

        authFactory.register($scope.user.nameRegister);
        $scope.user.isLogged = true;
        var var1 = $('.nav').find('.active').removeClass('active');
        $('#init').addClass('active');
      }
      //http -> token, rol
      //success -> authFactory.register
      //error -> error form envio datos

    }

}]);

app.controller('loginController', ['$rootScope', '$scope', '$sce', '$http','authFactory','userFactory', function($rootScope, $scope, $sce, $http, authFactory,userFactory) {

    // <!-- Google Analytics -->
    ga('set', 'page', '/iniciarsesion');
    ga('send', 'pageview');
    // <!-- End Google Analytics -->

  $('#form-register').hide();
  $('#h2_reg').hide();


  $rootScope.user = {};
  $rootScope.isLogged = userFactory.getIsLogged();

  $scope.user = {};
  $scope.user.nameLogin = null;
  $scope.user.passwordLogin = null;
  $scope.user.isLogged = false;

  $scope.login = {};
  $scope.login.errorName = false;
  $scope.login.errorPassword = false;
  $scope.login.errorEnvio = false;

  //funcion para conectar
  // TO DO
  $scope.toLogin = function(){
    if ( $scope.user.nameLogin != null & $scope.user.passwordLogin != null) {
      userFactory.setName($scope.user.nameLogin);
      userFactory.setPassword($scope.user.passwordLogin);
      userFactory.setIsLogged(true);

      $rootScope.isLogged = userFactory.getIsLogged();
      // console.log($rootScope.isLogged);

      authFactory.toLogin($scope.user.nameLogin);
      $scope.user.isLogged = true;
      var var1 = $('.nav').find('.active').removeClass('active');
      $('#init').addClass('active');
    }

  }

}]);

app.controller('experimentoController', ['$scope', '$sce', '$http','$location', function($scope, $sce, $http) {
  // <!-- Google Analytics -->
  ga('set', 'page', '/experimento');
  ga('send', 'pageview');
  // <!-- End Google Analytics -->

  $scope.experiment = {};
  $scope.experiment.day = false;
  $scope.experiment.night = false;


  $('#experimentoSolar').hover(function() {
    $(this).addClass('expSolar');
  }, function() {
    $(this).removeClass('expSolar');
  });

  $('#experimentoSolar').on('click',function() {
   $(this).toggleClass('expSolar_click');
   $('#experimentoNocturno').removeClass('expNocturno_click');
   $scope.experiment.day = true;
   $scope.experiment.night = false;
   $('#slotTime').slideUp();
   $('#summary').slideUp();
   $('#checkBook').slideUp();
   $('#reservas').slideDown();
  });

  $('#experimentoNocturno').hover(function() {
    $(this).addClass('expNocturno');
  }, function() {
    $(this).removeClass('expNocturno');
  });

  $('#experimentoNocturno').click(function() {
    $(this).toggleClass('expNocturno_click');
    $('#experimentoSolar').removeClass('expSolar_click');
    $scope.experiment.day = false;
    $scope.experiment.night = true;
    $('#slotTime').slideUp();
    $('#summary').slideUp();
    $('#checkBook').slideUp();
     $('#reservas').slideDown();
  });


  //Calendario
  $.datepicker.regional['es'] = {
  closeText: 'Cerrar',
  prevText: 'Sig',
  currentText: 'Hoy',
  monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
  'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié;', 'Juv', 'Vie', 'Sáb'],
  dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
  weekHeader: 'Sm',
  dateFormat: 'dd/mm/yy',
  firstDay: 1,
  isRTL: false,
  showMonthAfterYear: false,
  yearSuffix: ''
  };

  $.datepicker.setDefaults($.datepicker.regional["es"]);
  $("#datepicker").datepicker({
    firstDay:1,
    minDate:0,
    maxDate:'7D'
  });

  $('#datepicker').val()

// experimentSelected = function(experiment){}
  $scope.confirmDate = function(){
    var datePick = $('#datepicker').val();
    if(datePick != ""){
      $scope.experiment.date = datePick;
      $('#slotTime').slideDown();
      //LLAMADA CON FECHA PARA DEVOLUCION DEINTERVALOS
      //RETURN INTERVALOS IMPRIMIR PANTALLA
    }
  }

  $scope.confirmTimeSlot = function(){
    //TODO
    $('#summary').slideDown();
  }

  $scope.confirmSummary = function(){
    //TODO
    $('#checkBook').show();
  }

}]);

app.controller('perfilController', ['$scope', '$sce', '$http','userFactory', function($scope, $sce, $http, userFactory) {

    // <!-- Google Analytics -->
    ga('set', 'page', '/perfil');
    ga('send', 'pageview');
    // <!-- End Google Analytics -->


    $scope.user.name = userFactory.getName();
    $scope.user.email = userFactory.getEmail();


}]);

app.controller('observacionController', ['$scope', '$sce', '$http', 'weatherStationFactory', function($scope, $sce, $http, weatherStationFactory) {

    // <!-- Google Analytics -->
    ga('set', 'page', '/observacion');
    ga('send', 'pageview');
    // <!-- End Google Analytics -->

    setInterval('reloadImages()', 30000); //30 sec
    $scope.state = {};
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=Madrid,sp&APPID=41a51db0a52c9d6db1462321b6a6a297'; //7
    weatherStationFactory.async(url).then(function(data) {
        $scope.state.temperature = data.main.temp - 273.15;
        $scope.state.humidity = data.main.humidity;
        $scope.state.pressure = data.main.pressure;
        $scope.state.windSpeed = data.wind.speed;
        $scope.state.visibility = data.visibility;
    });

    // function activar(){
    //     intervalo = setInterval(restar,1000);
    // }
    // function deactivar(){
    //     clearInterval(intervalo);
    // }

}]);
