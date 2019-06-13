app.controller('galeriaController', ['$scope', '$http',  function($scope, $http) {

	init();
	/* $scope.url = "http://192.168.1.58:1723"; */
	/* 	$scope.url = "http://79.148.154.70:1723"  */
	$scope.url = "http://192.168.43.23:1723"
	,$scope.tag = null
	,$scope.filteredTodos = []
	,$scope.listPhotos = []
	,$scope.currentPage = 1
	,$scope.numPerPage = 10
	,$scope.maxSize = 5;

	function init() {
		var urlGetInfoUser = "https://ofs.fi.upm.es/api/users/loged"; 
		$http.get(urlGetInfoUser).then(function(userInfo){
			$http({
				method: 'GET',
				url: $scope.url + '/TaskAuthor/' + userInfo.data.username,
			}).then(function successCallback(response){
				$scope.photos = response.data;
				$scope.numPages = function () {
					return Math.ceil($scope.photos.Amount / $scope.numPerPage);
				};
				
				$scope.$watch('currentPage + numPerPage', function() {
					totalImagenes();	
					var begin = (($scope.currentPage - 1) * $scope.numPerPage) 
					, end = begin + $scope.numPerPage;

					$scope.filteredTodos = $scope.listPhotos.slice(begin, end);
				});
			}), function errorCallback(response){
				console.log(response.statusText);
			}
		})
	}

	function totalImagenes()
	{
		var i;
		var totalFotos = $scope.photos.Amount;
		for(i=0; i<totalFotos; i++)
		{
			var timestamp = Date.now();
			var element = $scope.photos.members[i];
			var photo = $scope.url + '/Photo/' + element + '?' + timestamp;
			$scope.listPhotos.push(photo);
		}
	}

	$scope.downloadZIP = function()
	{
		var timestamp = Date.now();
		window.open($scope.url + '/CreateZip/' + $scope.IDcopy.toString() + '?' + timestamp,'');
	}

}]);