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

    // Estado estacion meteorologica
    var paramsWeatherStation = '';
    var urlWeatherStation = 'http://localhost:8080/things/weatherstation/state/';
    httpFactory.async(urlWeatherStation,'GET', paramsWeatherStation).then(function successCallback(response){
      if (response.status == 200) {
        if(response.data.operatingStatus == 'OK'){
           $scope.state.temperature = response.data.temperature;
           $scope.state.pressure = response.data.pressure;
           $scope.state.humidity = response.data.humidity;
           $scope.state.rainfall = response.data.rainfall;
           $scope.state.windSpeed = response.data.windSpeed;
           $scope.state.windDirection = response.data.windDirection;
           $scope.state.availabilityWeatherStation = "Estado de la estación meteorológica: <span class='dome-green'>DISPONIBLE</span>";
        }
        else{
          $scope.state.weatherStation = false;//ERROR
          $scope.state.availabilityWeatherStation = "Estado de la estación meteorológica: <span class='dome-red'>NO DISPONIBLE</span>";
        }
      }
      else {
        $scope.state.weatherStation = false;//ERROR
        $scope.state.availabilityWeatherStation = "Estado de la estación meteorológica: <span class='dome-red'>NO DISPONIBLE</span>";
      }

    });

    // Estado montura
    var paramsMount = '';
    var urlMount = 'http://localhost:8080/things/mount/state/';
    httpFactory.async(urlMount,'GET', paramsMount).then(function successCallback(response){
      if (response.status == 200){
        if(response.data.operatingStatus == 'OK'){
           $scope.state.availabilityMount = "Estado de la montura: <span class='dome-green'>DISPONIBLE</span>";
        }
        else{
          $scope.state.availabilityMount = "Estado de la montura: <span class='dome-red'>NO DISPONIBLE</span>";
        }
      }
      else{
        $scope.state.availabilityMount = "Estado de la montura: <span class='dome-red'>NO DISPONIBLE</span>";
      }

    });
    // Estado Cupula
    var paramsDome = '';
    var urlDome = 'http://localhost:8080/things/dome/state/';
    httpFactory.async(urlDome,'GET', paramsDome).then(function successCallback(response){
      if (response.status == 200) {
        if(response.data.operatingStatus == 'OK' && response.data.openingElements[0].status == 'OPEN'){
           $scope.state.availabilityDome = "Estado de la cúpula: <span class='dome-green'>DISPONIBLE, ABIERTA</span>";
        }
        else if(response.data.operatingStatus == 'OK' && response.data.openingElements[0].status == 'CLOSED'){
           $scope.state.availabilityDome = "Estado de la cúpula: <span class='dome-green'>DISPONIBLE, CERRADA</span>";
        }
        else{
        $scope.state.availabilityDome = "Estado de la cúpula: <span class='dome-red'>NO DISPONIBLE</span>";
        }
      }
      else {
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
        if ($scope.camera === 'interior') {
            // $scope.cameraFile = $sce.trustAsResourceUrl('https://www.youtube.com/embed/FM7MFYoylVs');
            $scope.cameraFile = '/api/internalCamera/1';
            // if (contIn == 0){
            //   console.log(intervalOut);
            //   clearInterval(intervalOut);
            //   intervalIn = setInterval( 'reloadImgIn()', 2000 );//2 sec
            //   contIn++;
            // } else {
            // $scope.cameraFile = '/moobotix.jpg' + '?timestamp=' + time;
            // }
        } else if ($scope.camera === 'exterior') {
          $scope.cameraFile = '/api/externalCamera';
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

    $scope.toRegister = function(){
      //validar entradas
      if( $scope.user.passwordRegister1 != $scope.user.passwordRegister2){
        $scope.register.errorPassword = true;

      }else {
        $scope.register.errorPassword = false;
        userFactory.setName($scope.user.nameRegister);
        userFactory.setEmail($scope.user.emailRegister);
        userFactory.setPassword($scope.user.passwordRegister1);
        $('#form-submit-reg').hide();
        $('#register-gif').show();


        $http({
          url: 'http://localhost:8080/things/gatekeeper/registerUser',
          method: 'POST',
          data : {name: $scope.user.nameRegister, email: $scope.user.emailRegister, password: $scope.user.passwordRegister1},
          headers : {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function successCallback(response) {
          if (response.status == 201) {
            // userFactory.setIsLogged(true);
            // $rootScope.isLogged = userFactory.getIsLogged();

            authFactory.register($scope.user.nameRegister);//cookie
            // $scope.user.isLogged = true;
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

app.controller('loginController', ['$rootScope', '$scope', '$sce', '$http', '$location', 'authFactory','userFactory','Base64','httpFactory', function($rootScope, $scope, $sce, $http, $location, authFactory,userFactory, Base64, httpFactory) {

    // <!-- Google Analytics -->
    ga('set', 'page', '/iniciarsesion');
    ga('send', 'pageview');
    // <!-- End Google Analytics -->

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
    url: 'http://localhost:8080/login',
    method: 'POST',
	data: {username: $scope.user.nameLogin, password: $scope.user.passwordLogin}
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
		  httpFactory.auth('http://localhost:8080/users/logged', 'GET')
			  .then(function success(response) {
				  userFactory.setEmail(response.data.email);
				  userFactory.setName(response.data.username);
				  $location.path("/perfil");
			  });
        // var token = userFactory.getToken();
        // var paramsUsers = {
        //   name: $scope.user.nameLogin,
        //   access_token: token
        // };
        // var urlUsers = 'http://localhost:8080/things/gatekeeper/users';
        // httpFactory.async(urlUsers, 'GET', paramsUsers).then(function successCallback(response) {
        //   if (response.status == 200) {
        //     // console.log(response.data[0].roleNames[0]);
        //     authFactory.toLogin($scope.user.nameLogin); //cokiee
        //     $scope.user.isLogged = true;
        //     userFactory.setIsLogged(true);
        //     $scope.user.email = response.data[0].email;
        //     userFactory.setEmail(response.data[0].email);
        //     $scope.user.rol = response.data[0].roleNames[0];
        //     userFactory.setRol(response.data[0].roleNames[0]);
        //     $rootScope.isLogged = userFactory.getIsLogged();
        //     // console.log(userFactory.getRol());
        //   } else {
        //     $('#form-submit-log').show();
        //     $('#login-gif').hide();
        //     $scope.login.errorEnvio = true;
        //   }
        // });
      }
    }).catch(p => {
	  $('#form-submit-log').show();
	  $('#login-gif').hide();
	  $scope.login.errorEnvio = true;
  })
  }
  }
  }]);

app.controller('experimentoController', ['$rootScope', '$scope', '$sce', '$http','$location', 'httpFactory', 'userFactory', function($rootScope, $scope, $sce, $http, httpFactory, userFactory) {
  // <!-- Google Analytics -->
  ga('set', 'page', '/experimento');
  ga('send', 'pageview');
  // <!-- End Google Analytics -->

  $scope.experiment = {};
  $scope.experiment.day = false;
  $scope.experiment.night = false;
  $scope.experiment.typeR = null;
  $scope.experiment.type = null;
  $scope.experiment.date = null;
  $scope.experiment.slot = null;
  $scope.experiment.td1 = null;
  $scope.experiment.td2 = null;

  $('#experimentoSolar').hover(function() {
    $(this).addClass('expSolar');
  }, function() {
    $(this).removeClass('expSolar');
  });

  $('#experimentoSolar').on('click',function() {
   $(this).toggleClass('expSolar_click');
   $('#experimentoNocturno').removeClass('expNocturno_click');
   $scope.experiment.type = 'SOLAR';
   $scope.experiment.typeR = 'SOLAR';
   $scope.experiment.day = true;
   $scope.experiment.night = false;
   $('.slotTime').slideUp();
   $('#summary').slideUp();
   $('#checkBooking').slideUp();
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
    $scope.experiment.type = 'NOCTURNO';
    $scope.experiment.typeR = 'LUNAR';
    $scope.experiment.day = false;
    $scope.experiment.night = true;
    $('.slotTime').slideUp();
    $('#summary').slideUp();
    $('#checkBooking').slideUp();
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
  dateFormat: 'yy-mm-dd',
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
  $('#datepicker').click(function() {
    $('.slotTime').slideUp();
    $('#summary').slideUp();
    $('#confirm-timeslot').slideUp();
    $('#confirmDate').show();
    $('#dateError').hide();
    $('#requestError').hide();
    $('#confirmBookingLoading').hide();
  });

// experimentSelected = function(experiment){}
  $scope.confirmDate = function() {

    var datePick = $('#datepicker').val();
    if (datePick != "") {
      $('#confirmDate').hide();
      $('#confirmDateLoading').show();

      $scope.experiment.date = datePick;
      //Añadimos 'T00:00:00Z' a la fecha para peticion GET de reservas disponibles
      datePick = datePick.concat('T00:00:00Z');
      // console.log(datePick);

      var currentDate = new Date();
      var currentDayUTC = currentDate.getUTCDate();
      var currentHourUTC = currentDate.getUTCHours();
      var currentMinutesUTC = currentDate.getUTCMinutes();
      var currentHour = currentDate.getHours();
      var currentMinutes = currentDate.getMinutes();

      // var diffLocalHour = abs()

      // console.log(currentDayUTC);
      // console.log(currentHourUTC);
      // console.log(currentMinutesUTC);
      // console.log(currentHour);
      // console.log(currentMinutes);

      var token = $rootScope.user.token;
      // console.log(token);

      var paramsDate = {
        access_token: token,
        freebusy: 'FREE',
        startDate: datePick
      };
      var urlDate = 'http://localhost:8080/things/gatekeeper/calendar';

      $http({
        url: urlDate,
        method: 'GET',
        params: paramsDate
      }).then(function successCallback(response) {
        var arrData = response.data;
        // console.log(arrData);
        if (response.status == 200) {
          $('#confirmDateLoading').hide();
          //Si experimento solar
          if ($scope.experiment.day) {
            // var initSolar = 540;//min->9am
            // var endSolar = 1139;//min->18:59pm
            // var initLunar = 1140;//min->19pm
            // var endLunar =  1439;//min->23:59pm
            var initHourSolar = 09; //min->9am
            var initMinSolar = 00;
            var endHourSolar = 19; //min->18:59pm
            var endMinSolar = 59;

            var initHourLunar = 19; //min->19pm
            var initMinLunar = 00;
            var endHourLunar = 23; //min->23:59pm
            var endMinLunar = 59;

            for (var i = 0; i < arrData.length; i++) {

              var startDay = arrData[i].startDate.slice(8, 10) //dia
              var startDate = arrData[i].startDate.slice(-9, -4) //hora inicio formato hh:mm
              // arrData[i].startDate = startDate;
              var endDate = arrData[i].endDate.slice(-9, -4) //hora inicio formato hh:mm
              // arrData[i].endDate = endDate;
              //  console.log(arrData[i].startDate);
              // console.log(endDate);
              // console.log(arrData[i]);
              // console.log(arrData);

              //La API devuelve reservas en hora Local, pasar a hora UTC -2h
              var hourToBook = startDate.slice(0, -3);
              var minuteToBook = startDate.slice(3);
              hourToBook = hourToBook - 2;
              arrData[i].startDate = hourToBook + ':' + minuteToBook;
              console.log(hourToBook);

              //La API devuelve reservas en hora Local, pasar a hora UTC -2h
              var hourToBook_end = endDate.slice(0, -3);
              var minuteToBook_end = endDate.slice(3);
              hourToBook_end = hourToBook_end - 2;
              arrData[i].endDate = hourToBook_end + ':' + minuteToBook_end;


              // var hourToBook = endDate.slice(0,-3);
              // var minuteToBook = endDate.slice(3);

              //  console.log(hourToBook + ':'+minuteToBook);
              // console.log(arrData);

              //Filtrado de intervalos de timepo para experimento solar
              if ((hourToBook < initHourSolar || (hourToBook == initHourSolar && minuteToBook < initMinSolar)) ||
                (hourToBook > endHourSolar || (hourToBook == endHourSolar && minuteToBook > endMinSolar))) {
                if (i !== -1) {
                  // console.log(arrData);
                  // console.log(i);
                  // arrData.splice(i,1);
                  delete arrData[i];
                }
              } else if (currentDayUTC == startDay) {
                if (hourToBook < currentHourUTC || (hourToBook == currentHourUTC && minuteToBook < currentMinutesUTC)) {
                  if (i !== -1) {
                    delete arrData[i];
                  }
                }
              }
              //calcular horas
              //calcular minutos
            }

          } else if ($scope.experiment.night) {
            var initHourLunar = 21; //min->19pm
            var initMinLunar = 00;
            var endHourLunar = 23; //min->23:59pm
            var endMinLunar = 59;
            var endHourNextDay = 4;
            var endMinNextDay = 59;

            for (var i = 0; i < arrData.length; i++) {

              // console.log(arrData[i].startDate);
              var startDay = arrData[i].startDate.slice(8, 10) //dia
              // console.log(startDay);
              var startDate = arrData[i].startDate.slice(-9, -4) //hora inicio formato hh:mm
              arrData[i].startDate = startDate;
              var endDate = arrData[i].endDate.slice(-9, -4) //hora inicio formato hh:mm
              arrData[i].endDate = endDate;

              var hourToBook = startDate.slice(0, -3);
              var minuteToBook = startDate.slice(3);

              //Filtrado de intervalos de timepo para experimento nocturno
              if (((hourToBook < initHourLunar && hourToBook > endHourNextDay) || (hourToBook == initHourLunar && minuteToBook < initMinLunar)) ||
                (hourToBook > endHourLunar || (hourToBook == endHourLunar && minuteToBook > endMinLunar))
              ) {
                if (i !== -1) {
                  delete arrData[i];
                }
              } else if (currentDayUTC == startDay) {
                if (hourToBook < currentHourUTC || (hourToBook == currentHourUTC && minuteToBook < currentMinutesUTC)) {
                  if (i !== -1) {
                    delete arrData[i];
                  }
                }
              }
              //calcular horas
              //calcular minutos
            }
          }

          var myArrClean = arrData.filter(Boolean);
          $scope.slots = myArrClean;
          // console.log($scope.slots);

          //TABLA obtener valor seleccion de intervalo de tiempo
          $('#res-table tbody').on('click', 'tr', function() {
            $('#res-table tbody tr').removeClass('table-active');
            $('#summary').slideUp();
            $('#confirmBookingLoading').hide();
            $('#request').show();
            $('#checkBooking').hide();
            $(this).addClass('table-active');
            var tds = $(this)[0];
            var td1 = tds.children[0].textContent;
            $scope.experiment.td1 = td1;
            var td2 = tds.children[1].textContent;
            $scope.experiment.td2 = td2;
            // console.log(td1 +'--'+ td2);
            $scope.experiment.slot = $scope.experiment.td1 + ' a ' + $scope.experiment.td2;
            $('#confirm-timeslot').slideDown();
          });

          $('.slotTime').slideDown();

        }
        else{
          $('#confirmDateLoading').hide();
          $('#dateError').show();
        }

      }, function errorCallback(response) {
        // console.log('error');
        return response;
      });
    }
  }

  $scope.confirmTimeSlot = function(){
    //TODO
    $('#confirm-timeslot').slideUp();
    $('#summary').slideDown();
  }

  $scope.confirmBooking = function(){
    $('#request').hide();
    $('#confirmBookingLoading').show();
    var slot = $scope.experiment.td1.slice(0, 5);
    var datePOST = $scope.experiment.date.concat('T'+ slot + ':00.00Z');
    // console.log($scope.experiment.date);

    var token = $rootScope.user.token;

    var paramsReservation = {
      access_token: token
    };
    var urlReservation = 'http://localhost:8080/things/gatekeeper/addUserReservation';

    $http({
      url: urlReservation,
      method: 'POST',
      params: paramsReservation,
      data : {"startDate": datePOST, "experiment": $scope.experiment.typeR},
      headers : {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(function successCallback(response) {
      var arrData = response.data;
      // console.log(arrData);
      if (response.status == 201) {
        $('#confirmBookingLoading').hide();
        $('#checkBooking').show();
        $('#requestError').hide();
        // console.log(response);
      }
      else{
        $('#confirmBookingLoading').hide();
        $('#requestError').show();
      }
    }, function errorCallback(response) {
      $('#confirmBookingLoading').hide();
      $('#requestError').show();
      // console.log(response);
    });
  }

}]);

app.controller('perfilController', ['$scope', '$sce', '$http', '$location', 'userFactory', function($scope, $sce, $http, $location, userFactory) {

    // <!-- Google Analytics -->
    ga('set', 'page', '/perfil');
    ga('send', 'pageview');
    // <!-- End Google Analytics -->
    $('.nav').find('.active').removeClass('active');
    $('#profile').addClass('active');

    $scope.user.name = userFactory.getName();
    $scope.user.email = userFactory.getEmail();
    $scope.reservations = {};
    $scope.reservations.experiment = null;
    $scope.reservations.date = null;
    $scope.reservations.hour = null;
    $scope.reservations.deleteHour = null;


    var currentDate = new Date();
    var currentMonth = currentDate.getMonth();//0-11
    var currentMonth = currentMonth + 1;
    var currentYear = currentDate.getFullYear();
    var currentDayUTC = currentDate.getUTCDate();
    var currentHourUTC = currentDate.getUTCHours();
    var currentMinutesUTC = currentDate.getUTCMinutes();
    var currentHour = currentDate.getHours();
    var currentMinutes = currentDate.getMinutes();

    var token = userFactory.getToken();

    var paramsProfile = {
      access_token: token,
      freebusytype: 'RESERVATION'
    };
    var urlReservation = 'http://localhost:8080/things/gatekeeper/calendar';

    $http({
      url: urlReservation,
      method: 'GET',
      params: paramsProfile
    }).then(function successCallback(response) {
      var arrayData = response.data;
      // console.log(arrayData);
      if (response.status == 200) {
        // console.log(response);

        for (var i = 0; i < arrayData.length; i++) {

          var fullDate = arrayData[i].startDate.slice(0, 10); //date
          $scope.reservations.date = fullDate;
          $scope.reservations.experiment = arrayData[i].reservation.experiment;
          // console.log(arrayData[i].reservation.experiment);

          var startDay = arrayData[i].startDate.slice(8, 10); //dia
          // console.log(startDay);
          var startMonth = arrayData[i].startDate.slice(5, 7); //month
          // console.log(startMonth);
          var startYear = arrayData[i].startDate.slice(0, 4); //year
          // console.log(startYear);
          var dateReservation = startYear + '-' + startMonth + '-' + startDay;
          arrayData[i].reservation.dateCreated = dateReservation;//pisamos campo que no nos hace falta
          var startDate = arrayData[i].startDate.slice(-9, -4); //hora inicio formato hh:mm
          arrayData[i].startDate = startDate;
          var endDate = arrayData[i].endDate.slice(-9, -4); //hora inicio formato hh:mm
          arrayData[i].endDate = endDate;

          $scope.reservations.hour = startDate + ' - ' + endDate;
          if(arrayData[i].reservation.experiment == 'LUNAR'){
            arrayData[i].reservation.experiment = 'NOCTURNO';
          }

          // console.log(currentYear + '-' + currentMonth + '-' + currentDayUTC);

          if( currentYear > startYear ||
            ( currentYear == startYear && currentMonth > startMonth) ||
            ( currentYear == startYear && currentMonth == startMonth && currentDayUTC > startDay)){
              if (i !== -1) {
                // console.log('borrar');
                  delete arrayData[i];
                }
          }
        }

        var myArrClean = arrayData.filter(Boolean);
        $scope.slots = myArrClean;
        // console.log($scope.slots);

        if (myArrClean.length > 0) {
          // mostrar botons

        }
        //TABLA selecionar reserva
        $('#res-table tbody').on('click', 'tr', function() {
          $('#res-table tbody tr').removeClass('table-active');
          $(this).addClass('table-active');
          // console.log($(this)[0].children[0].textContent);
          var tds1 = $(this)[0].children[0].textContent;//experimento
          var tds2 = $(this)[0].children[1].textContent;//fecha
          var tds3 = $(this)[0].children[2].textContent;//hora
          // console.log($(this)[0].children[1].textContent);
          // console.log($(this)[0].children[2].textContent);
          var hourToDelete = tds3.slice(0,5);
          var toDelete = tds2.concat('T' + hourToDelete + ':00Z');
          $scope.reservations.deleteHour = toDelete;
        });

      }
      else{
        // console.log('error');
      }
    }, function errorCallback(response) {
      // console.log('error');
    });

  $scope.removeReservation = function(){
    $('#deleteReservationOK').hide();
    $('#requestError').hide();
    var token = userFactory.getToken();

    var paramsDelete = {
      access_token: token
    };
    var urlDeleteReservation = 'http://localhost:8080/things/gatekeeper/deleteUserReservation';

    $http({
      url: urlDeleteReservation,
      method: 'POST',
      params: paramsDelete,
      data : {"startDate": $scope.reservations.deleteHour},
      headers : {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(function successCallback(response) {
      if (response.status == 204) {
        // console.log('ok');
        $('#deleteReservationOK').show();
        /////////////////////////////////////////LLAMR A OBTENER RESERVA DE NUEVO
        $location.path("/perfil");
      }
      else{
        $('#confirmBookingLoading').hide();
        $('#requestError').show();
      }
    }, function errorCallback(response) {
      $('#confirmBookingLoading').hide();
      $('#requestError').show();
      // console.log(response);
    });

  }

  $scope.goToObservation = function(){

	  $location.path("/observacion");
    // var token = userFactory.getToken();
    // var paramsAck = {
    //   access_token: token
    // };
    // var urlAckReservation = 'http://localhost:8080/things/gatekeeper/ackReservation';
	//
    // $http({
    //   url: urlAckReservation,
    //   method: 'POST',
    //   params: paramsAck
    // }).then(function successCallback(response) {
    //   if (response.status == 204) {
    //     // console.log('ok');
    //     $location.path("/observacion");
    //   }
    //   else{
    //     $('#observationError').show();
    //     // console.log('error');
    //   }
    // }, function errorCallback(response) {
    //   $('#observationError').show();
    //     // console.log('error');
    // });
  }

}]);

app.controller('observacionController', ['$scope', '$sce', '$http','httpFactory','userFactory', function($scope, $sce, $http, httpFactory, userFactory) {

    // <!-- Google Analytics -->
    ga('set', 'page', '/observacion');
    ga('send', 'pageview');
    // <!-- End Google Analytics -->

    $('.nav').find('.active').removeClass('active');
    $(window).scrollTop(0);
    setInterval('reloadImages()', 30000); //30 sec
    $scope.state = {};
    $scope.state.weatherStation=true;//OK

    var paramsWeatherStation = '';
    var urlWeatherStation = 'http://localhost:8080/things/weatherstation/state/';
    httpFactory.async(urlWeatherStation,'GET', paramsWeatherStation).then(function successCallback(response){
      if (response.status == 200) {
        if(response.data.operatingStatus == 'OK'){
           $scope.state.temperature = response.data.temperature;
           $scope.state.pressure = response.data.pressure;
           $scope.state.humidity = response.data.humidity;
           $scope.state.rainfall = response.data.rainfall;
           $scope.state.windSpeed = response.data.windSpeed;
           $scope.state.windDirection = response.data.windDirection;
           $scope.state.availabilityWeatherStation = "Estado de la estación meteorológica: <span class='dome-green'>DISPONIBLE</span>";
        }
        else{
          $scope.state.weatherStation = false;//ERROR
          $scope.state.availabilityWeatherStation = "Estado de la estación meteorológica: <span class='dome-red'>NO DISPONIBLE</span>";
        }
      }
      else {
        $scope.state.weatherStation = false;//ERROR
        $scope.state.availabilityWeatherStation = "Estado de la estación meteorológica: <span class='dome-red'>NO DISPONIBLE</span>";
      }

    });

    $scope.takePhoto = function(){
      console.log('photo');
    }

    $scope.moveUP = function(){
      console.log('up');
    }

    $scope.moveDown = function(){
      console.log('down');
    }

    $scope.moveRight = function(){
      console.log('right');
    }

    $scope.moveLeft = function(){
      console.log('left');
    }

    $scope.param = {};
    $scope.param.brillo = 50;
    $scope.param.calidad = 5;
    $scope.param.ganancia = 8;
    $scope.param.exposicion = 5;
    $scope.param.errorEnvio = false;

    $scope.confPhoto = function(){
      // $('#confPhoto-gif').show();
      $('#photo').css('color', '#cc185a');
    }
    $scope.confPhoto2 = function(){
      // $('#confPhoto-gif2').show();
      $('#photo').css('color', '#cc185a');
    }

    // function activar(){
    //     intervalo = setInterval(restar,1000);
    // }
    // function deactivar(){
    //     clearInterval(intervalo);
    // }

    $scope.user = {};
    $scope.user.admin = false;//para abrir o cerrar cupula necesita permitos de administrador
    $scope.user.authenticated = false;

    // console.log(userFactory.getRol());
    if(userFactory.getRol() == 'Authenticated'){
      $scope.user.auth = true;
    }else if(userFactory.getRol() == 'Administrator'){
      // console.log('admin OK');
      $scope.user.admin = true;
    }

    $scope.openDome = function(){
      console.log('openDome')
    }

    $scope.closeDome = function(){
      console.log('closeDome');
    }

    $scope.experiment = {};
    $scope.experiment.montura = false;
    $scope.experiment.solar = true;
    $scope.experiment.solarSeg = false;
    $scope.experiment.seg = false;
    $scope.experiment.lunar = false;
    $scope.experiment.lunarSeg = false;

    $scope.followSun = function(){
      console.log('siguiendo al sol');
      $scope.experiment.solar = false;

      var token = userFactory.getToken();

      //Seguimiento de la cupula
      $http({
        url: 'http://localhost:8080/things/dome/activateTracking?access_token='+token,
        method: 'POST',
        headers : {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function successCallback(response) {
        // console.log(response);
        if (response.status == 201 || response.status == 204) {

          // Seguimiento de la montura
          $http({
            url: 'http://localhost:8080/things/mount/enableObjectMonitoring?access_token='+token,
            method: 'POST',
            data : { "monitoredObject": "SUN", "monitoringInterval": 23},
            headers : {'Content-Type': 'application/x-www-form-urlencoded'}
          }).then(function successCallback(response) {
            // console.log(response);
            if (response.status == 201 || response.status == 204) {
              $scope.experiment.solarSeg = true;
              $scope.experiment.seg = true;
              $scope.experiment.montura = true;
            }
          }, function errorCallback(response) {
            $scope.experiment.solar = true;
            // console.log(response);
          });
          // Fin seguimiento de la montura
        }
        // return response;
      }, function errorCallback(response) {
        $scope.experiment.solar = true;
      });
      //Fin seguimiento de la cupula

    }

    $scope.followMoon = function(){
      console.log('siguiendo a la Luna');
      $scope.experiment.lunar = false;
      var token = userFactory.getToken();
      //Seguimiento de la cupula
      $http({
        url: 'http://localhost:8080/things/dome/activateTracking?access_token='+token,
        method: 'POST',
        headers : {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function successCallback(response) {
        console.log(response);
        if (response.status == 201 || response.status == 204) {

          // Seguimiento de la montura
          $http({
            url: 'http://localhost:8080/things/mount/enableObjectMonitoring?access_token='+token,
            method: 'POST',
            data : { "monitoredObject": "MOON", "monitoringInterval": 23},
            headers : {'Content-Type': 'application/x-www-form-urlencoded'}
          }).then(function successCallback(response) {
            // console.log(response);
            if (response.status == 201 || response.status == 204) {
              $scope.experiment.lunarSeg = true;
              $scope.experiment.seg = true;
              $scope.experiment.montura = true;
            }
          }, function errorCallback(response) {
            $scope.experiment.lunar = true;
            // console.log(response);
          });
          // Fin seguimiento de la montura
        }
        // return response;
      }, function errorCallback(response) {
        $scope.experiment.lunar = true;
      });
      //Fin seguimiento de la cupula
    }

    $scope.stopTracking = function(){
      if($scope.experiment.solarSeg == true){
          var token = userFactory.getToken();
        $http({
          url: 'http://localhost:8080/things/mount/disableMonitoring?access_token='+token,
          method: 'POST',
          headers : {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function successCallback(response) {
          // console.log(response);
          if (response.status == 201 || response.status == 204) {
            $scope.experiment.solar = true;
            $scope.experiment.solarSeg = false;
            $scope.experiment.lunarSeg = false;
            $scope.experiment.seg = false;
            $scope.experiment.montura = false;
          }
        }, function errorCallback(response) {
          // console.log(response);
        });
      }else if ($scope.experiment.lunarSeg == true) {
        $scope.experiment.lunar = true;
        $scope.experiment.lunarSeg = false;
        $scope.experiment.solarSeg = false;
        $scope.experiment.seg = false;
        $scope.experiment.montura = false;
      }

    }


}]);

app.controller('recoverypasswordController', ['$rootScope','$scope', '$sce', '$http', 'authFactory', 'userFactory', function($rootScope, $scope, $sce, $http, authFactory, userFactory) {
    // <!-- Google Analytics -->
    ga('set', 'page', '/recuperarcontrasena');
    ga('send', 'pageview');
    // <!-- End Google Analytics -->

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
