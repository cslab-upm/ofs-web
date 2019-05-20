app.controller('experimentoController', ['$rootScope', '$scope', '$sce', '$http', 'httpFactory',
    function ($rootScope, $scope, $sce, $http, httpFactory) {
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
            const url = 'api/reservations?start=' + $scope.daySelected + '&end=' + endDateStr;
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

            httpFactory.auth('api/reservations', 'POST', body)
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