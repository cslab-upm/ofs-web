app.controller('observacionController', ['$scope', '$sce', '$http', '$interval', 'httpFactory',
    function ($scope, $sce, $http, $interval, httpFactory) {

        // Tiempo restante reserva
        $scope.timeLeft = '';
        let stopInterval;
        let endReservation;

        httpFactory.auth('api/reservations/actual', 'GET')
            .then(function success(response) {
                if (response.status === 200) {
                    endReservation = moment(response.data.endDate);
                    stopInterval = $interval(updateTime, 1000)
                }
            });

        function updateTime() {
            const duration = moment.duration(endReservation.diff(moment()));
            $scope.timeLeft = duration.hours() + ':' + duration.minutes() + ':' + duration.seconds();
            if (duration < 0) {
                $interval.cancel(stopInterval);
                $scope.timeLeft = 'FINALIZADA';
            }
        }

        // Estado estacion meteorologica
        $scope.state = {};
        $scope.state.weatherStation = false;

        httpFactory.async('api/weatherstation/status', 'GET', '').then(function successCallback(response) {
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
        $scope.externalCamera = 'api/externalCamera';
        $scope.internalCamera = 'api/internalCamera/1';

        $interval(reloadImages, 30000); //30 sec
        function reloadImages() {
            $scope.externalCamera = 'api/externalCamera' + '?timestamp=' + moment();
            $scope.internalCamera = 'api/internalCamera/1' + '?timestamp=' + moment();
        }

        // Obtener foto
        $scope.takePhoto = function () {
            httpFactory.auth('api/camera/takePhoto', 'POST').then(function successCallback(response) {
                if (response.status === 200) {
                    console.log('Id de la foto: ' + response.data.id);
                    // TODO: Obtener foto
                }
            });
        };

        // Movimiento montura
        $scope.coordinates = {};
        $scope.coordinates.rightAscension = '';
        $scope.coordinates.declination = '';

        $scope.sendCoordinates = function () {
            httpFactory.auth('api/mount/move', 'PUT', $scope.coordinates);
        };

        $scope.moveUP = function () {
            httpFactory.auth('api/mount/step', 'POST', {direction: 'Up'});
        };

        $scope.moveDown = function () {
            httpFactory.auth('api/mount/step', 'POST', {direction: 'Down'});
        };

        $scope.moveRight = function () {
            httpFactory.auth('api/mount/step', 'POST', {direction: 'Right'});
        };

        $scope.moveLeft = function () {
            httpFactory.auth('api/mount/step', 'POST', {direction: 'Left'});
        };

        // Parametros de la camara
        $scope.param = {};
        $scope.param.brightness = 50;
        $scope.param.gamma = 50;
        $scope.param.exposure = 1;

        $scope.confPhoto = function () {
            httpFactory.auth('api/camera/status', 'PUT', $scope.param);
        };

        // Abrir cupula
        $scope.openDome = function () {
            httpFactory.auth('api/dome/open', 'PUT');
        };

        // Cerrar cupula
        $scope.closeDome = function () {
            httpFactory.auth('api/dome/close', 'PUT');
        };

    }]);