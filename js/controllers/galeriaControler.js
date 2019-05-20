app.controller('galeriaController', ['$scope', '$http', function($scope, $http) {

	$scope.url = "http://192.168.43.23:1723";
	/* $scope.url = "http://138.100.9.212:1723"; */

	$scope.name = null;
	$scope.ID = null;
	$scope.IDcopy = null;

	$scope.part1 = "The task does not exist or is not finished yet";
	$scope.part2 = "Please make sure you are introducing the correct argument";
	$scope.message = [$scope.part1, $scope.part2, "display: none;"];

	$scope.listPhotos = [];
	$scope.hidePhotos = [];
	$scope.floatingText = [];

	$scope.page = 0;
	$scope.hideNextPhotos = "display: none;";
	$scope.hideLastPhotos = "display: none;";
	$scope.hideIFrame = "display: none;";

	$scope.variable = null;

	$scope.nextList = function()
	{
		console.log('Hola Mundo');
		$scope.page++;
		console.log($scope.page);

		$scope.hideLastPhotos = "display: inline;";

		$http({
			method: 'GET',
			url: $scope.url + '/Task/' + $scope.IDcopy,
		}).then(function successCallback(response){
			console.log(response.data);
			$scope.currentTask = response.data.Value;

			var i=$scope.page*30;
			console.log($scope.page);
			console.log(i);
			var amount = response.data.Amount;

			if(($scope.page+1)*30 < amount)
			{
				while(i<($scope.page+1)*30)
				{
					var timestamp = Date.now();
					var timestampStr = timestampStr + '';

					var element = response.data.members[i];

					var photo = $scope.url + '/Photo/' + element + '?' + timestamp;
//						$scope.listPhotos.splice(i, 1, photo);
					$scope.listPhotos[i-$scope.page*30] = photo;

					var hide = "display: inline;";
					var hideBlock = "display: block;";
//						$scope.hidePhotos.splice(i, 1, hide);
					$scope.hidePhotos[i-$scope.page*30] = hide;
					$scope.floatingText[i-$scope.page*30] = element;

					i++;
				}
			}

			else
			{
				$scope.hideNextPhotos = "display: none;";

				while(i<amount)
				{
					var timestamp = Date.now();
					var timestampStr = timestampStr + '';

					var element = response.data.members[i];

					var photo = $scope.url + '/Photo/' + element + '?' + timestamp;

					$scope.listPhotos[i-$scope.page*30] = photo;

					var hide = "display: inline;";
					$scope.hidePhotos[i-$scope.page*30] = hide;
					$scope.floatingText[i-$scope.page*30] = element;

					i++;
				}

				i = amount;

				while(i<($scope.page+1)*30)
				{
					$scope.listPhotos[i-$scope.page*30] = null;
					$scope.floatingText[i-$scope.page*30] = null;

					var hide = "display: none;";
					$scope.hidePhotos[i-$scope.page*30] = hide;

					i++;
				}

			}
			console.log($scope.listPhotos);
			console.log($scope.hidePhotos);
		}, function errorCallback(response){
			console.log(response.statusText);
		});
	}


	$scope.lastList = function()
	{
		console.log('Hola Mundo');
		$scope.page--;
		console.log($scope.page);
		$scope.hideNextPhotos = "display: inline;";

		$http({
			method: 'GET',
			url: $scope.url + '/Task/' + $scope.IDcopy,
		}).then(function successCallback(response){
			console.log(response.data);
			$scope.currentTask = response.data.Value;

			var i=$scope.page*30;
			console.log($scope.page);
			console.log(i);
			var amount = response.data.Amount;

			if($scope.page <= 0)
			{
				$scope.hideLastPhotos = "display: none;";
			}

			while(i<($scope.page+1)*30)
			{
				var timestamp = Date.now();
				var timestampStr = timestampStr + '';

				var element = response.data.members[i];

				var photo = $scope.url + '/Photo/' + element + '?' + timestamp;
//						$scope.listPhotos.splice(i, 1, photo);
				$scope.listPhotos[i-$scope.page*30] = photo;

				var hide = "display: inline;";
				var hideBlock = "display: block;";
//						$scope.hidePhotos.splice(i, 1, hide);
				$scope.hidePhotos[i-$scope.page*30] = hide;
				$scope.floatingText[i-$scope.page*30] = element;

				i++;
			}

			console.log($scope.listPhotos);
			console.log($scope.hidePhotos);
		}, function errorCallback(response){
			console.log(response.statusText);
		});
	}

	$scope.Init = function()
	{
		console.log('Hola Mundo');
		var element = null;
		var hide = "display: none;";
		var i=0;
		for(i=0; i<30; i++)
		{
			$scope.listPhotos.push(element);
			$scope.floatingText.push(element);
			$scope.hidePhotos.push(hide);
		}

		console.log($scope.listPhotos);
		console.log($scope.hideNextPhotos);
//			console.log($scope.hidePhotos);
		console.log("Final del Init");
	}

	$scope.getName = function(name, keyEvent)
	{
		if(keyEvent.which == 13)
		{
			$scope.name = name;
			console.log($scope.name);
			$scope.name = null;
		}
	}

	$scope.getPhotos = function()
	{
		console.log($scope.name);


		$scope.name = null;
	}

    $scope.getID = function(){
	    console.log($scope.ID);

		$scope.page = 0;
		var hide = "display: none;";
		$scope.hideLastPhotos = "display: none;";
		$scope.hideNextPhotos = "display: none;";

		var i=0;
		while(i<30){
			$scope.hidePhotos[i] = hide;
			i++;
		}

		console.log($scope.hidePhotos);

			//Here goes the AJAX call
		$http({
			method: 'GET',
			url: $scope.url + '/Task/' + $scope.ID,
			}).then(function successCallback(response){
				console.log(response.data);
                $scope.currentTask = response.data.Value;
                
				if(response.data.Code == 400)
				{
					$scope.message[2] = "display: inline;";
					$scope.hideNextPhotos = "display: none;";
					console.log("Actividad1");
                }
                
				else if(response.data.Code == 200 && (response.data.Status == "Running" || response.data.Status == "Pending"))
				{
					$scope.message[2] = "display: inline;";
					$scope.hideNextPhotos = "display: none;";

					console.log("Actividad2");
                }
                
                else if(response.data.Code == 200 && response.data.Status == "Done"){
                    
                    $scope.message[2] = "display: none;";
					$scope.hideNextPhotos = "display: inline;";
					console.log("Success!!");
					console.log($scope.IDcopy);
					$scope.variable =	$scope.url + '/CreateZip/' + $scope.IDcopy.toString() + '?' // + timestamp
					console.log($scope.variable)
					var i=$scope.page*30;
					var amount = response.data.Amount;
					console.log($scope.page);
                    console.log(i);
                    
					if(($scope.page+1)*30 < amount){
						console.log("En el if");
						while(i<($scope.page+1)*30){
							console.log("Entro en el loop");
							var timestamp = Date.now();
							var timestampStr = timestampStr + '';
							console.log(response.data.members);
							var element = response.data.members[i];
							var photo = $scope.url + '/Photo/' + element + '?' + timestamp;
							$scope.listPhotos[i-$scope.page*30] = photo;
							var hide = "display: inline;";
							$scope.hidePhotos[i-$scope.page*30] = hide;
							$scope.floatingText[i-$scope.page*30] = element;
							i++;
						}
					}
					else{

						console.log("En el else");
						while(i<amount){
							var timestamp = Date.now();
							var timestampStr = timestampStr + '';
							var element = response.data.members[i];
							var photo = $scope.url + '/Photo/' + element + '?' + timestamp;
							$scope.listPhotos[i-$scope.page*30] = photo;
							var hide = "display: inline;";
							$scope.hidePhotos[i-$scope.page*30] = hide;
							$scope.floatingText[i-$scope.page*30] = element;
							i++;
						}

						i = amount;

						while(i<($scope.page+1)*30){
							$scope.listPhotos[i-$scope.page*30] = null;
							$scope.floatingText[i-$scope.page*30] = null;
							var hide = "display: none;";
							$scope.hidePhotos[i-$scope.page*30] = hide;
							i++;
						}
					}

					console.log($scope.listPhotos);
					console.log($scope.hidePhotos);
				}
            }, 
            function errorCallback(response){
				console.log(response.statusText);
			});

			$scope.IDcopy = $scope.ID;
			$scope.ID = null;
    }

    $scope.downloadZIP = function()
    {
        console.log("Downloading");
        var timestamp = Date.now();
        var timestampStr = timestampStr + '';
        window.open($scope.url + '/CreateZip/' + $scope.IDcopy.toString() + '?' + timestamp,'');
    }
    
}]);