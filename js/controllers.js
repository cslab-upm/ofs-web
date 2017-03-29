app.controller('mainController', function($scope) {

});


app.controller('inicioController', ['$scope', '$sce', '$http', function($scope, $sce, $http) {
                $scope.cameraFile = $sce.trustAsResourceUrl('https://www.youtube.com/embed/u');
                //Estado observatorio
                $scope.state = {};
                // $scope.state.temperature = null;
                // $scope.state.humidity = null;
                // $scope.state.pressure = null;
                // $scope.state.windSpeed = null;
                // $scope.state.visibility = null;
                $scope.state.operability = "Actualmente se encuentra operativo.";
                $scope.state.busy = "El observatorio está libre. Inicie sesión o Registrese para observar el cielo."
                $http.get('http://api.openweathermap.org/data/2.5/weather?q=Boadilladelmonte,sp&APPID=41a51db0a52c9d6db1462321b6a6a297')
                .then(function successCallback(response){
                  $scope.state.temperature = response.data.main.temp - 273.15;
                  $scope.state.humidity = response.data.main.humidity;
                  $scope.state.pressure = response.data.main.pressure;
                  $scope.state.windSpeed = response.data.wind.speed;
                  $scope.state.visibility = response.data.visibility;
                },function errorCallback(response){
                  $scope.state.temperature = "No disponible";
                  $scope.state.humidity = "No disponible";
                  $scope.state.pressure = "No disponible";
                  $scope.state.windSpeed = "No disponible";
                  $scope.state.visibility = "No disponible";
                });

                // Seleccion de camara
                $scope.SelectCamera = function() {
                    if ($scope.camera == 'interior') {
                        $scope.cameraFile = $sce.trustAsResourceUrl('https://www.youtube.com/embed/FM7MFYoylVs');
                    } else if ($scope.camera == 'exterior') {
                        $scope.cameraFile = $sce.trustAsResourceUrl('https://www.youtube.com/embed/D5drYkLiLI8');
                    } else if ($scope.camera == 'ccd') {
                        $scope.cameraFile = $sce.trustAsResourceUrl('https://www.youtube.com/embed/RhU9MZ98jxo');
                    }
                }


// http://api.openweathermap.org/data/2.5/weather?q=Madrid,sp&APPID=41a51db0a52c9d6db1462321b6a6a297
}]);
