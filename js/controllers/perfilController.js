app.controller('perfilController', ['$scope', '$sce', '$http', '$location', '$route', 'httpFactory', 'userFactory',
    function ($scope, $sce, $http, $location, $route, httpFactory, userFactory) {

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
        httpFactory.auth('api/users/logged', 'GET')
            .then(function success(response) {
                userFactory.setEmail(response.data.email);
                userFactory.setName(response.data.username);

                $scope.user.name = userFactory.getName();
                $scope.user.email = userFactory.getEmail();
            });

        httpFactory.auth('api/reservations/own', 'GET')
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
            const url = 'api/reservations/' + $scope.selectedReservationId + '/cancel';
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
            httpFactory.auth('api/reservations/actual', 'GET')
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