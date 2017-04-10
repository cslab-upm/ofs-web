app.controller('mainController', function($scope) {

});


app.controller('inicioController', ['$scope', '$sce', '$http', function($scope, $sce, $http) {
    // $scope.cameraFile = $sce.trustAsResourceUrl('https://www.youtube.com/embed/u');
    //Estado observatorio
    $scope.state = {};
    // $scope.state.temperature = null;
    // $scope.state.humidity = null;
    // $scope.state.pressure = null;
    // $scope.state.windSpeed = null;
    // $scope.state.visibility = null;'
    $scope.state.operability = "Estado de la cúpula: <span class='dome-red'>CERRADA</span>";
    // $scope.state.busy = "El observatorio está libre. Inicie sesión o Registrese para observar el cielo."
    $http.get('http://api.openweathermap.org/data/2.5/weather?q=Boadilladelmonte,sp&APPID=41a51db0a52c9d6db1462321b6a6a297')
        .then(function successCallback(response) {
            $scope.state.temperature = response.data.main.temp - 273.15;
            $scope.state.humidity = response.data.main.humidity;
            $scope.state.pressure = response.data.main.pressure;
            $scope.state.windSpeed = response.data.wind.speed;
            $scope.state.visibility = response.data.visibility;
        }, function errorCallback(response) {
            $scope.state.temperature = "No disponible";
            $scope.state.humidity = "No disponible";
            $scope.state.pressure = "No disponible";
            $scope.state.windSpeed = "No disponible";
            $scope.state.visibility = "No disponible";
        });
    $scope.cameraFile = 'img/cameraObs.jpg';
    // Seleccion de camara
    $scope.SelectCamera = function() {
        if ($scope.camera == 'interior') {
            // $scope.cameraFile = $sce.trustAsResourceUrl('https://www.youtube.com/embed/FM7MFYoylVs');
            $scope.cameraFile = '/moobotix.jpg';
        } else if ($scope.camera == 'exterior') {
            $scope.cameraFile = '/philips.jpg';
            // $scope.cameraFile = $sce.trustAsResourceUrl('https://www.youtube.com/embed/D5drYkLiLI8');
        } else if ($scope.camera == 'ccd') {
            // $scope.cameraFile = $sce.trustAsResourceUrl('https://www.youtube.com/embed/RhU9MZ98jxo');
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
