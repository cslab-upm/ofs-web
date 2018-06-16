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
    var urlWeatherStation = 'api/weatherstation/status';
    httpFactory.async(urlWeatherStation,'GET', paramsWeatherStation).then(function successCallback(response){
      if (response.status == 200) {
        var status = response.data;
        if(status.active){
           $scope.state.weatherStation = true;
           $scope.state.temperature = status.temperature;
           $scope.state.pressure = status.pressure;
           $scope.state.humidity = status.humidity;
           $scope.state.rainfall = status.rainFall;
           $scope.state.windSpeed = status.windSpeed;
           $scope.state.windDirection = status.windDirection;
           $scope.state.timestamp = status.timestamp;
           $scope.state.availabilityWeatherStation = "Estado de la estación meteorológica: <span class='dome-green'>DISPONIBLE</span>";
        }
        else{
          $scope.state.weatherStation = false;//ERROR
		  $scope.state.timestamp = status.timestamp;
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
      }
    }).catch(p => {
	  $('#form-submit-log').show();
	  $('#login-gif').hide();
	  $scope.login.errorEnvio = true;
  })
  }
  }
  }]);

app.controller('experimentoController', ['$rootScope', '$scope', '$sce', '$http', 'httpFactory', 'userFactory', function ($rootScope, $scope, $sce, $http, httpFactory, userFactory) {
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
		firstDay: 1,
		minDate: 0,
		maxDate: '14D'
	});

	// Variables del template
	$scope.daySelected = undefined;
	$scope.reservationError = false;
	$scope.reservationOk = false;
	$scope.showSlots = false;
	$scope.slots = [];
	$scope.slotsSelected = [];
	// Tiempo reserva
	$scope.startTime = undefined;
	$scope.endTime = undefined;
	$scope.totalTime = 0;

	$scope.confirmDate = function () {
		$scope.slots = [];
		$scope.slotsSelected = [];
		$scope.dayError = false;
		$scope.startTime = undefined;
		$scope.endTime = undefined;
		$scope.totalTime = 0;
		$scope.daySelected = $('#datepicker').val();

		// Comrpobar que hay un día seleccionado
		if (!$scope.daySelected) {
			$scope.dayError = true;
			return;
		}

		// Reservations from 22h to 06h
		const startReservation = moment($scope.daySelected).hour(22).minute(0).second(0);
		const endReservation = moment($scope.daySelected).add(1, 'days').hour(6).minute(0).second(0);

		// Format date
		const endDateStr = moment($scope.daySelected).add(1, 'days').format('YYYY-MM-DD');

		// Pedir reservas del día seleccionado y el siguiente
		$scope.loading = true;
		const url = 'http://localhost:8080/reservations?start=' + $scope.daySelected + '&end=' + endDateStr;
		httpFactory.auth(url, 'GET')
			.then(function success(response) {
				if (response.status === 200) {
					$scope.showSlots = true;

					const reservationList = response.data.filter(r => r.status === 1);
					let contId = 1;

					// Ver rangos disponibles
					while (!startReservation.isSame(endReservation)) {
						let slot = {
							startDate: moment(startReservation),
							endDate: moment(startReservation.add(15, 'm'))
						};

						// Evitar solapes
						if (!reservationList.some(r => slot.startDate.isBetween(r.startDate, r.endDate, null, '[)')
							|| slot.endDate.isBetween(r.startDate, r.endDate, null, '(]'))) {

							// Convertir a Date para mostrar en el front
							slot.startDate = slot.startDate.toDate();
							slot.endDate = slot.endDate.toDate();
							slot.id = contId++;
							$scope.slots.push(slot);
						}
					}
				}
			});
	};

	$scope.selectSlot = function (slot) {
		if ($scope.slotsSelected.length === 0) {
			$scope.slotsSelected.push(slot);
			$scope.startTime = slot.startDate;
			$scope.endTime = slot.endDate;
			$scope.totalTime = -moment(slot.startDate).diff(slot.endDate, 'm')
		} else {
			const last = $scope.slotsSelected[$scope.slotsSelected.length - 1];
			const duration = -moment($scope.startTime).diff(slot.endDate, 'm');

			// Comprobar que el slot es consecutivo y que no supera las 3 horas de duración
			if (moment(last.endDate).isSame(moment(slot.startDate)) && duration <= 180) {
				$scope.slotsSelected.push(slot);
				$scope.endTime = slot.endDate;
				$scope.totalTime = duration;
			}
		}
	};

	$scope.confirmReservation = function () {
		$scope.reservationError = false;
		$scope.reservationOk = false;

		const body = {
			startDate: moment($scope.startTime).format('YYYY-MM-DDTHH:mm'),
			endDate: moment($scope.endTime).format('YYYY-MM-DDTHH:mm')
		};

		httpFactory.auth('http://localhost:8080/reservations', 'POST', body)
			.then(function success(response) {
				if (response.status === 201) {
					$scope.reservationOk = true;
				} else {
					$scope.reservationError = true;
				}
			}, function error() {
				$scope.reservationError = true;
			});

	}

}]);

app.controller('perfilController', ['$scope', '$sce', '$http', '$location', '$route', 'httpFactory', 'userFactory', function ($scope, $sce, $http, $location, $route, httpFactory, userFactory) {
	$scope.user = {};
	$scope.user.name = '';
	$scope.user.email = '';

	$scope.reservations = [];
	$scope.selectedReservationId = 0;
	$scope.selectedReservation = {};
	$scope.reservationActualError = false;

	$scope.reservationStatus = {
		1: 'Pendiente',
		2: 'Completada',
		3: 'Cancelada'
	};

	// Obtener datos usuario
	httpFactory.auth('http://localhost:8080/users/logged', 'GET')
		.then(function success(response) {
			userFactory.setEmail(response.data.email);
			userFactory.setName(response.data.username);

			$scope.user.name = userFactory.getName();
			$scope.user.email = userFactory.getEmail();
		});

	httpFactory.auth('http://localhost:8080/reservations/own', 'GET')
		.then(function success(response) {
			if (response.status === 200) {
				$scope.reservations = response.data;
			}
		});

	$scope.selectElement = function (id) {
		$scope.selectedReservationId = id;
		$scope.selectedReservation = $scope.reservations.filter(r => r.id === id)[0];
	};

	// Cancelar reserva
	$scope.removeReservation = function () {
		const url = 'http://localhost:8080/reservations/' + $scope.selectedReservationId + '/cancel';
		httpFactory.auth(url, 'PUT')
			.then(function success(response) {
				if (response.status === 200) {
					$route.reload();
				}
			});
	};

	// Ir a reserva si es la actual
	$scope.goToObservation = function () {
		$scope.reservationActualError = false;
		httpFactory.auth('http://localhost:8080/reservations/actual', 'GET')
			.then(function success(response) {
				if (response.status === 200 && response.data.id === $scope.selectedReservationId) {
					$location.path("/observacion");
				} else {
					$scope.reservationActualError = true;
				}
			}, function error() {
				$scope.reservationActualError = true;
			});
	}

}]);

app.controller('observacionController', ['$scope', '$sce', '$http', '$interval', 'httpFactory', 'userFactory', function ($scope, $sce, $http, $interval, httpFactory, userFactory) {
	// Estado estacion meteorologica
	$scope.state = {};
	$scope.state.weatherStation = false;

	httpFactory.async('http://localhost:8080/weatherstation/status', 'GET', '').then(function successCallback(response) {
		if (response.status === 200) {
			var status = response.data;
			if (status.active) {
				$scope.state.weatherStation = true;
				$scope.state.temperature = status.temperature;
				$scope.state.pressure = status.pressure;
				$scope.state.humidity = status.humidity;
				$scope.state.rainfall = status.rainFall;
				$scope.state.windSpeed = status.windSpeed;
				$scope.state.windDirection = status.windDirection;
				$scope.state.timestamp = status.timestamp;
			}
			else {
				$scope.state.weatherStation = false;
				$scope.state.timestamp = status.timestamp;
			}
		}
		else {
			$scope.state.weatherStation = false;
		}
	});

	// Recarga de imágenes de camaras
	$scope.externalCamera = 'http://ofs.fi.upm.es/api/externalCamera';
	$scope.internalCamera = 'http://ofs.fi.upm.es/api/internalCamera/1';

	$interval(reloadImages, 30000); //30 sec
	function reloadImages() {
		$scope.externalCamera = 'http://ofs.fi.upm.es/api/externalCamera' + '?timestamp=' + moment();
		$scope.internalCamera = 'http://ofs.fi.upm.es/api/internalCamera/1' + '?timestamp=' + moment();
	}

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
