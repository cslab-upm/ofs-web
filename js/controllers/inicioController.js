app.controller('inicioController', ['$scope', '$sce', '$http','httpFactory', function($scope, $sce, $http, httpFactory) {
    //Estado observatorio
    $scope.state = {};
    $scope.state.weatherStation=true;//OK
    $scope.state.availabilityMount = "Estado de la montura: <span class='dome-red'>NO DISPONIBLE</span>"
    $scope.state.availabilityWeatherStation = "Estado de la estación meteorológica: <span class='dome-red'>NO DISPONIBLE</span>"
    $scope.state.availabilityMount = "Estado de la montura: <span class='dome-red'>NO DISPONIBLE</span>"
    $scope.state.availabilityCameras = "Estado de las cámaras: <span class='dome-green'>DISPONIBLE</span>"

    // Estado estacion meteorologica
    httpFactory.async('api/weatherstation/status','GET').then(function successCallback(response){
        if (response.status === 200) {
            const status = response.data;
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
    httpFactory.async('api/mount/status', 'GET').then(function successCallback(response) {
        if (response.status === 200) {
            if (response.data.active) {
                $scope.state.availabilityMount = "Estado de la montura: <span class='dome-green'>DISPONIBLE</span>";
            }
            else {
                $scope.state.availabilityMount = "Estado de la montura: <span class='dome-red'>NO DISPONIBLE</span>";
            }
        }
        else {
            $scope.state.availabilityMount = "Estado de la montura: <span class='dome-red'>NO DISPONIBLE</span>";
        }
    });

    // Estado Cupula
    httpFactory.async('api/dome/status', 'GET').then(function successCallback(response) {
        if (response.status === 200) {
            if (response.data.status && response.data.shutter === 'open') {
                $scope.state.availabilityDome = "Estado de la cúpula: <span class='dome-green'>DISPONIBLE, ABIERTA</span>";
            }
            else if (response.data.status && response.data.shutter === 'closed') {
                $scope.state.availabilityDome = "Estado de la cúpula: <span class='dome-green'>DISPONIBLE, CERRADA</span>";
            }
            else {
                $scope.state.availabilityDome = "Estado de la cúpula: <span class='dome-red'>NO DISPONIBLE</span>";
            }
        }
        else {
            $scope.state.availabilityDome = "Estado de la cúpula: <span class='dome-red'>NO DISPONIBLE</span>";
        }
    });

    $scope.cameraFile = 'img/cameraObs.jpg';
    // Seleccion de camara
    $scope.SelectCamera = function () {
        var date = new Date();
        var time = date.getTime();
        if ($scope.camera === 'interior1') {
            $scope.cameraFile = '/api/internalCamera/1';
        } else if ($scope.camera === 'interior2') {
            $scope.cameraFile = '/api/internalCamera/2';
        } else if ($scope.camera === 'exterior') {
            $scope.cameraFile = '/api/externalCamera';
        }
    };

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

}]);