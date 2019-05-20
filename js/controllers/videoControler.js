
app.controller('videoController', ['$scope', '$http', function($scope, $http) {



    $scope.url = "http://192.168.43.23:1723";
	/* $scope.url = "http://138.100.9.212:1723	"; */
	$scope.urlPointer = "http://192.168.1.38:8000";

/* 	$scope.ranges = [
		{
			nombre: 'Brightness',
			min: 0,
			max: 0,
			value: 0,
			valueNum: 0,
			changeFunction: $scope.putBrightness,
			keyPressFunction: $scope.putBrightnessNum
		},
		{
			nombre: 'Gamma',
			min: 0,
			max: 0,
			value: '',
			valueNum: 0,
			changeFunction: $scope.putGamma,
			keyPressFunction: $scope.putGammaNum
		},
		{
			nombre: 'Gain',
			min: 0,
			max: 0,
			value: '',
			valueNum: 0,
			changeFunction: $scope.putGain,
			keyPressFunction: $scope.putGainNum
		},
		{
			nombre: 'Exposure',
			min: 0,
			max: 0,
			value: '',
			valueNum: 0,
			changeFunction: $scope.putExposure,
			keyPressFunction: $scope.putExposureNum
		},
		{
			nombre: 'Saturation',
			min: 0,
			max: 0,
			value: '',
			valueNum: 0,
			changeFunction: $scope.putSaturation,
			keyPressFunction: $scope.putSaturationNum
		},
		{
			nombre: 'Hue',
			min: 0,
			max: 0,
			value: '',
			valueNum: 0,
			changeFunction: $scope.putHue,
			keyPressFunction: $scope.puthueNum
		},
		{
			nombre: 'White balance red',
			min: 0,
			max: 0,
			value: '',
			valueNum: 0,
			changeFunction: $scope.putWhitebalanceRed,
			keyPressFunction: $scope.putWhitebalanceRedNum
		},
		{
			nombre: 'White balance blue',
			min: 0,
			max: 0,
			value: '',
			valueNum: 0,
			changeFunction: $scope.putWhitebalanceBlue,
			keyPressFunction: $scope.putWhitebalanceBlueNum
		}
	]; */

	$scope.brightnessSlider = 0;
	$scope.brightnessNumber = 0;
	$scope.brightnessMin = 0;
//	$scope.brightnessMax = 63;
	$scope.brightnessMax = 0;
	$scope.brightnessAuto = 0;

//	$scope.gammaSlider = 100;
//	$scope.gammaNumber = 100;
//	$scope.gammaMin = 1;
//	$scope.gammaMax = 500;

	$scope.gammaSlider = 0;
	$scope.gammaNumber = 0;
	$scope.gammaMin = 0;
	$scope.gammaMax = 0;
	$scope.gammaAuto = 0;

//	$scope.gainSlider = 260;
//	$scope.gainNumber = 260;
//	$scope.gainMin = 260;
//	$scope.gainMax = 1023;

	$scope.gainSlider = 0;
	$scope.gainNumber = 0;
	$scope.gainMin = 0;
	$scope.gainMax = 0;
	$scope.gainAuto = 0;

//	$scope.exposureSlider = 33;
//	$scope.exposureNumber = 33300;
//	$scope.exposureMin = 100;
//	$scope.exposureMax = 3600000000;

	$scope.exposureSlider = 0;
	$scope.exposureNumber = 0;
	$scope.exposureMin = 0;
	$scope.exposureMax = 0;
	$scope.exposureAuto = 0;

	$scope.saturationSlider = 0;
	$scope.saturationNumber = 0;
	$scope.saturationMin = 0;
//	$scope.saturationMax = 255;
	$scope.saturationMax = 0;
	$scope.saturationAuto = 0;

	$scope.hueSlider = 0;
	$scope.hueNumber = 0;
	$scope.hueMin = 0;
//	$scope.hueMax = 359;
	$scope.hueMax = 0;
	$scope.hueAuto = 0;

	$scope.whitebalanceredSlider = 0;
	$scope.whitebalanceredNumber = 0;
	$scope.whitebalanceredMin = 0;
//	$scope.whitebalanceredMax = 95;
	$scope.whitebalanceredMax = 0;
	$scope.whitebalanceredAuto = 0;

	$scope.whitebalanceblueSlider = 0;
	$scope.whitebalanceblueNumber = 0;
	$scope.whitebalanceblueMin = 0;
//	$scope.whitebalanceblueMax = 95;
	$scope.whitebalanceblueMax = 0;
	$scope.whitebalanceblueAuto = 0;

	$scope.nameButton = "Start Video";
	$scope.streaming = false;
	$scope.refresh = null;
	$scope.video = null;
	$scope.hidden = "display: none;";
	$scope.hiddenStopped = "display: inline";

	$scope.videoPointer = null;

	$scope.listParameters = [];

	$scope.unableBrightness = "color: lightgrey";
	$scope.unableGamma = "color: lightgrey";
	$scope.unableGain = "color: lightgrey";
	$scope.unableExposure = "color: lightgrey";
	$scope.unableSaturation = "color: lightgrey";
	$scope.unableHue = "color: lightgrey";
	$scope.unableWhiteBalanceRed = "color: lightgrey";
	$scope.unableWhiteBalanceBlue = "color: lightgrey";

	/* "display: none"*/

	$scope.getBrightness = function()
	{
		$http({
			method: 'GET',
			url: $scope.url + '/GetParameters/Brightness',
		}).then(function successCallback(response){
			console.log(response.data);
			$scope.brightnessSlider = response.data.Value.CurrentValue;
			$scope.brightnessNumber = response.data.Value.CurrentValue;
			$scope.brightnessMin = response.data.Value.MinValue;
			$scope.brightnessMax = response.data.Value.MaxValue;
			$scope.brightnessAuto = response.data.Value.DefaultValue;

			$scope.unableBrightness = "";
		}, function errorCallback(response){
			console.log(response.statusText);
		});
	}


	$scope.getGamma = function()
	{
			$http({
			method: 'GET',
			url: $scope.url + '/GetParameters/Gamma',
		}).then(function successCallback(response){
			console.log(response.data);
			$scope.gammaSlider = response.data.Value.CurrentValue;
			$scope.gammaNumber = response.data.Value.CurrentValue;
			$scope.gammaMin = response.data.Value.MinValue;
			$scope.gammaMax = response.data.Value.MaxValue;
			$scope.gammaAuto = response.data.Value.DefaultValue;

			$scope.unableGamma = "";
		}, function errorCallback(response){
			console.log(response.statusText);
		});
	}


	$scope.getGain = function()
	{
		$http({
			method: 'GET',
			url: $scope.url + '/GetParameters/Gain',
		}).then(function successCallback(response){
			console.log(response.data);
			$scope.gainSlider = response.data.Value.CurrentValue;
			$scope.gainNumber = response.data.Value.CurrentValue;
			$scope.gainMin = response.data.Value.MinValue;
			$scope.gainMax = response.data.Value.MaxValue;
			$scope.gainAuto = response.data.Value.DefaultValue;

			$scope.unableGain = "";
		}, function errorCallback(response){
			console.log(response.statusText);
		});

	}


	$scope.getExposure = function()
	{
		$http({
			method: 'GET',
			url: $scope.url + '/GetParameters/Exposure',
		}).then(function successCallback(response){
			console.log(response.data);
			$scope.exposureNumber = response.data.Value.CurrentValue;
			$scope.exposureMin = response.data.Value.MinValue;
			$scope.exposureMax = response.data.Value.MaxValue;
			$scope.exposureAuto = response.data.Value.DefaultValue;

			var minp = 0;
			var maxp = 100;

			var minv = Math.log($scope.exposureMin);
			var maxv = Math.log($scope.exposureMax);

			var scale = (maxv - minv) / (maxp - minp);

			var position = (Math.log($scope.exposureNumber) - minv) / scale + minp;

			$scope.exposureSlider = Math.round(position);

			$scope.unableExposure = "";
		}, function errorCallback(response){
			console.log(response.statusText);
		});
	}


	$scope.getSaturation = function()
	{
			$http({
			method: 'GET',
			url: $scope.url + '/GetParameters/Saturation',
		}).then(function successCallback(response){
			console.log(response.data);
			$scope.saturationSlider = response.data.Value.CurrentValue;
			$scope.saturationNumber = response.data.Value.CurrentValue;
			$scope.saturationMin = response.data.Value.MinValue;
			$scope.saturationMax = response.data.Value.MaxValue;
			$scope.saturationAuto = response.data.Value.DefaultValue;

			$scope.unableSaturation = "";
		}, function errorCallback(response){
			console.log(response.statusText);
		});
	}


	$scope.getHue = function()
	{
		$http({
			method: 'GET',
			url: $scope.url + '/GetParameters/Hue',
		}).then(function successCallback(response){
			console.log(response.data);
			$scope.hueSlider = response.data.Value.CurrentValue;
			$scope.hueNumber = response.data.Value.CurrentValue;
			$scope.hueMin = response.data.Value.MinValue;
			$scope.hueMax = response.data.Value.MaxValue;
			$scope.hueAuto = response.data.Value.DefaultValue;

			$scope.unableHue = "";
		}, function errorCallback(response){
			console.log(response.statusText);
		});
	}


	$scope.getWhitebalanceRed = function()
	{
		$http({
			method: 'GET',
			url: $scope.url + '/GetParameters/WhiteBalanceRed',
		}).then(function successCallback(response){
			console.log(response.data);
			$scope.whitebalanceredSlider = response.data.Value.CurrentValue;
			$scope.whitebalanceredNumber = response.data.Value.CurrentValue;
			$scope.whitebalanceredMin = response.data.Value.MinValue;
			$scope.whitebalanceredMax = response.data.Value.MaxValue;
			$scope.whitebalanceredAuto = response.data.Value.DefaultValue;

			$scope.unableWhiteBalanceRed = "";
		}, function errorCallback(response){
			console.log(response.statusText);
		});
	}


	$scope.getWhitebalanceBlue = function()
	{
		$http({
			method: 'GET',
			url: $scope.url + '/GetParameters/WhiteBalanceBlue',
		}).then(function successCallback(response){
			console.log(response.data);
			$scope.whitebalanceblueSlider = response.data.Value.CurrentValue;
			$scope.whitebalanceblueNumber = response.data.Value.CurrentValue;
			$scope.whitebalanceblueMin = response.data.Value.MinValue;
			$scope.whitebalanceblueMax = response.data.Value.MaxValue;
			$scope.whitebalanceblueAuto = response.data.Value.DefaultValue;
//			console.log($scope.whitebalanceblueAuto);

			$scope.unableWhiteBalanceBlue = "";
			console.log(response);
//			$scope.putWhitebalanceBlue($scope.whitebalanceblueAuto);
		}, function errorCallback(response){
			console.log(response.statusText);
		});


	}


	$scope.putBrightness = function(position)
	{
		$scope.brightnessNumber = position;

		var dat = {Value: position};
		var json = JSON.stringify(dat);

		$http({
			method: 'PUT',
			url: $scope.url + '/SetParameters/Brightness',
			data: json,
		}).then(function successCallback(response){
			console.log(response.data);
			$scope.brightness = response.data.Message;
		}, function errorCallback(response){
			console.log(response.statusText);
		});

	}


	$scope.putBrightnessNum = function(value, keyEvent)
	{
		if(keyEvent.which == 13)
		{
			$scope.brightnessSlider = value;

			var dat = {Value: value};
			var json = JSON.stringify(dat);

			$http({
				method: 'PUT',
				url: $scope.url + '/SetParameters/Brightness',
				data: json,
			}).then(function successCallback(response){
				console.log(response.data);
				$scope.brightness = response.data.Message;
			}, function errorCallback(response){
				console.log(response.statusText);
			});

		}
	}


	$scope.putGamma = function(position)
	{
		$scope.gammaNumber = position;

		var dat = {Value: position};
		var json = JSON.stringify(dat);

		$http({
			method: 'PUT',
			url: $scope.url + '/SetParameters/Gamma',
			data: json,
		}).then(function successCallback(response){
			console.log(response.data);
			$scope.gamma = response.data.Message;
		}, function errorCallback(response){
			console.log(response.statusText);
		});
	}


	$scope.putGammaNum = function(value, keyEvent)
	{
		if(keyEvent.which == 13)
		{
			$scope.gammaSlider = value;

			var dat = {Value: value};
			var json = JSON.stringify(dat);

			$http({
				method: 'PUT',
				url: $scope.url + '/SetParameters/Gamma',
				data: json,
			}).then(function successCallback(response){
				console.log(response.data);
				$scope.gamma = response.data.Message;
			}, function errorCallback(response){
				console.log(response.statusText);
			});

			$scope.gammaput = null;
		}
	}


	$scope.putGain = function(position)
	{
		$scope.gainNumber = position;

		var dat = {Value: position};
		var json = JSON.stringify(dat);

		$http({
			method: 'PUT',
			url: $scope.url + '/SetParameters/Gain',
			data: json,
		}).then(function successCallback(response){
			console.log(response.data);
			$scope.gain = response.data.Message;
		}, function errorCallback(response){
			console.log(response.statusText);
		});
	}


	$scope.putGainNum = function(value, keyEvent)
	{
		if(keyEvent.which == 13)
		{
			$scope.gainSlider = value;

			var dat = {Value: value};
			var json = JSON.stringify(dat);

			$http({
				method: 'PUT',
				url: $scope.url + '/SetParameters/Gain',
				data: json,
			}).then(function successCallback(response){
				console.log(response.data);
				$scope.gain = response.data.Message;
			}, function errorCallback(response){
				console.log(response.statusText);
			});

		}
	}


	$scope.putExposure = function(position)
	{
		var minp = 0;
		var maxp = 100;

		var minv = Math.log(100);
		var maxv = Math.log(3600000000);

		var scale = (maxv - minv) / (maxp - minp);

		$scope.exposureNumber = Math.exp(minv + scale*(position - minp));

		$scope.exposureNumber = Math.round($scope.exposureNumber/100)*100;

		var value = $scope.exposureNumber;

		var dat = {Value: value};
		var json = JSON.stringify(dat);

		$http({
			method: 'PUT',
			url: $scope.url + '/SetParameters/Exposure',
			data: json,
		}).then(function successCallback(response){
			console.log(response.data);
			$scope.exposure = response.data.Message;
		}, function errorCallback(response){
			console.log(response.statusText);
		});
	}


	$scope.putExposureNum = function(value, keyEvent)
	{
		if(keyEvent.which == 13)
		{
			var roundedValue = Math.round(value/100)*100;

			$scope.exposureNumber = roundedValue;

			var minp = 0;
			var maxp = 100;

			var minv = Math.log(100);
			var maxv = Math.log(3600000000);

			var scale = (maxv - minv) / (maxp - minp);

			var position = (Math.log(roundedValue) - minv) / scale + minp;

			$scope.exposureSlider = Math.round(position);

			var dat = {Value: value};
			var json = JSON.stringify(dat);

			$http({
				method: 'PUT',
				url: $scope.url + '/SetParameters/Exposure',
				data: json,
			}).then(function successCallback(response){
				console.log(response.data);
				$scope.exposure = response.data.Message;
			}, function errorCallback(response){
				console.log(response.statusText);
			});

		}
	}


	$scope.putSaturation = function(position)
	{
		$scope.saturationNumber = position;

		var dat = {Value: position};
		var json = JSON.stringify(dat);

		$http({
			method: 'PUT',
			url: $scope.url + '/SetParameters/Saturation',
			data: json,
		}).then(function successCallback(response){
			console.log(response.data);
			$scope.saturation = response.data.Message;
		}, function errorCallback(response){
			console.log(response.statusText);
		});
	}


	$scope.putSaturationNum = function(value, keyEvent)
	{
		if(keyEvent.which == 13)
		{
			$scope.saturationSlider = value;

			var dat = {Value: value};
			var json = JSON.stringify(dat);

			$http({
				method: 'PUT',
				url: $scope.url + '/SetParameters/Saturation',
				data: json,
			}).then(function successCallback(response){
				console.log(response.data);
				$scope.saturation = response.data.Message;
			}, function errorCallback(response){
				console.log(response.statusText);
			});

		}
	}


	$scope.putHue = function(position)
	{
		$scope.hueNumber = position;

		var dat = {Value: position};
		var json = JSON.stringify(dat);

		$http({
			method: 'PUT',
			url: $scope.url + '/SetParameters/Hue',
			data: json,
		}).then(function successCallback(response){
			console.log(response.data);
			$scope.hue = response.data.Message;
		}, function errorCallback(response){
			console.log(response.statusText);
		});
	}


	$scope.putHueNum = function(value, keyEvent)
	{
		if(keyEvent.which == 13)
		{
			$scope.hueSlider = value;

			var dat = {Value: value};
			var json = JSON.stringify(dat);

			$http({
				method: 'PUT',
				url: $scope.url + '/SetParameters/Hue',
				data: json,
			}).then(function successCallback(response){
				console.log(response.data);
				$scope.hue = response.data.Message;
			}, function errorCallback(response){
				console.log(response.statusText);
			});

		}
	}


	$scope.putWhitebalanceRed = function(position)
	{
		$scope.whitebalanceredNumber = position;

		var dat = {Value: position};
		var json = JSON.stringify(dat);

		$http({
			method: 'PUT',
			url: $scope.url + '/SetParameters/WhiteBalanceRed',
			data: json,
		}).then(function successCallback(response){
			console.log(response.data);
			$scope.whitebalancered = response.data.Message;
		}, function errorCallback(response){
			console.log(response.statusText);
		});
	}


	$scope.putWhitebalanceRedNum = function(value, keyEvent)
	{
		if(keyEvent.which == 13)
		{
			$scope.whitebalanceredSlider = value;

			var dat = {Value: value};
			var json = JSON.stringify(dat);

			$http({
				method: 'PUT',
				url: $scope.url + '/SetParameters/WhiteBalanceRed',
				data: json,
			}).then(function successCallback(response){
				console.log(response.data);
				$scope.whitebalancered = response.data.Message;
			}, function errorCallback(response){
				console.log(response.statusText);
			});

		}
	}


	$scope.putWhitebalanceBlue = function(position)
	{
		$scope.whitebalanceblueNumber = position;

		var dat = {Value: position};
		var json = JSON.stringify(dat);

		$http({
			method: 'PUT',
			url: $scope.url + '/SetParameters/WhiteBalanceBlue',
			data: json,
		}).then(function successCallback(response){
			console.log(response.data);
			$scope.whitebalanceblue = response.data.Message;
		}, function errorCallback(response){
			console.log(response.statusText);
		});
	}


	$scope.putWhitebalanceBlueNum = function(value, keyEvent)
	{
		if(keyEvent.which == 13)
		{
			$scope.whitebalanceblueSlider = value;

			var dat = {Value: value};
			var json = JSON.stringify(dat);

			$http({
				method: 'PUT',
				url: $scope.url + '/SetParameters/WhiteBalanceBlue',
				data: json,
			}).then(function successCallback(response){
				console.log(response.data);
				$scope.whitebalanceblue = response.data.Message;
			}, function errorCallback(response){
				console.log(response.statusText);
			});

		}
	}


	$scope.setUp = function()
	{
		$http({
			method: 'GET',
			url: $scope.url + '/VideoStreaming2',
		}).then(function successCallback(response){
			console.log(response.data);
		}, function errorCallback(response){
			console.log(response.statusText);
		});
	}

	$scope.setUpPointer = function()
	{
		$http({
			method: 'GET',
			url: $scope.urlPointer + '/VideoStreaming2',
		}).then(function successCallback(response){
			console.log(response.data);
		}, function errorCallback(response){
			console.log(response.statusText);
		});
	}

	$scope.loop = function()
	{

		var timestamp = Date.now();
		var timestampStr = timestampStr + '';

		$scope.video = $scope.url + '/Photo/video' + '?' + timestamp;

		$http({
			method: 'GET',
			url: $scope.video,
		}).then(function successCallback(response){
			console.log("Updating picture timestamp:" + timestamp);
		}, function errorCallback(response){
			console.log(response.statusText);
		});
	}

	$scope.loopPointer = function()
	{

		var timestamp = Date.now();
		var timestampStr = timestampStr + '';

		$scope.videoPointer = $scope.urlPointer + '/Photo/video' + '?' + timestamp;

		$http({
			method: 'GET',
			url: $scope.videoPointer,
		}).then(function successCallback(response){
			console.log("Updating picturePointer timestamp:" + timestamp);
		}, function errorCallback(response){
			console.log(response.statusText);
		});
	}

	$scope.stop = function()
	{
		$http({
			method: 'GET',
			url: $scope.url + '/VideoStreamingOff2',
		}).then(function successCallback(response){
			console.log("Stopped Streaming");
		}, function errorCallback(response){
			console.log(response.statusText);
		});
	}


	$scope.obtainVideo = function()
	{
		if($scope.streaming == false)
		{
			$scope.streaming = true;
			$scope.hidden = "display: inline;";
			$scope.hiddenStopped = "display: none;";

			$scope.setUp();
			$scope.refresh = setInterval($scope.loop, 125); /* milisegundos */
		}
		else if($scope.streaming == true)
		{
			$scope.streaming = false;
			$scope.hidden = "display: none;";
			$scope.hiddenStopped = "display: inline;";

			clearInterval($scope.refresh);

			$scope.stop();
		}
	}

	$scope.cerrarVideo = function(){
		$scope.streaming = false;
		$scope.hidden = "display: none;";
		$scope.hiddenStopped = "display: inline;";
		clearInterval($scope.refresh);
		$scope.stop();
	}

	$scope.obtainVideoPointer = function()
	{
		$scope.setUpPointer();
		$scope.refresh = setInterval($scope.loopPointer, 500);
	}

	$scope.askParameters = function()
	{
		$http({
			method: 'GET',
			url: $scope.url + '/GetAmountParameters',
		}).then(function successCallback(response){
			console.log("Getting Response");
			$scope.listParameters = response.data.listParameters;
			console.log($scope.listParameters);

			console.log("Ya he terminado de pedir los parametros");

			for(var i=0; i<$scope.listParameters.length; i++)
			{
				//Brightness
				if($scope.listParameters[i] == "Brightness")
				{
					console.log("Brightness");
					console.log(i);
					$scope.getBrightness();
				}
				if($scope.listParameters[i] == "Saturation")
				{
					console.log("Saturation");
					console.log(i);
					$scope.getSaturation();
				}
				if($scope.listParameters[i] == "Hue")
				{
					console.log("Hue");
					console.log(i);
					$scope.getHue();
				}
				if($scope.listParameters[i] == "Whitebalance Red")
				{
					console.log("Whitebalance Red");
					console.log(i);
					$scope.getWhitebalanceRed();
				}
				if($scope.listParameters[i] == "Whitebalance Blue")
				{
					console.log("Whitebalance Blue");
					console.log(i);
					$scope.getWhitebalanceBlue();
					console.log($scope.whitebalanceblueMin);
					console.log($scope.whitebalanceblueMax);
					console.log($scope.whitebalanceblueAuto);
				}
				if($scope.listParameters[i] == "Gamma")
				{
					console.log("Gamma");
					console.log(i);
					$scope.getGamma();
				}
				if($scope.listParameters[i] == "Gain")
				{
					console.log("Gain");
					console.log(i);
					$scope.getGain();
				}
				if($scope.listParameters[i] == "Exposure")
				{
					console.log("Exposure");
					console.log(i);
					$scope.getExposure();
				}
			}
		}, function errorCallback(response){
			console.log(response.statusText);
		});
	}


	$scope.Init = function()
	{

		$scope.askParameters();
		//Here it is still coding
		//End of the coding

		console.log($scope.listParameters);
		console.log($scope.listParameters.length);
//		$scope.getBrightness();
//		$scope.getGamma();
//		$scope.getGain();
//		$scope.getExposure();
//		$scope.getSaturation();
//		$scope.getHue();
//		$scope.getWhitebalanceRed();
//		$scope.getWhitebalanceBlue();
//		$scope.obtainVideoPointer();

	}

	$scope.Init();

//Funciones para la ventana modal

	$scope.amountNum = 1;

	$scope.amountTags = null;
	$scope.nameTag = "";
	$scope.listTags = [];
    $scope.listSize = 0;
	
	$scope.abrirModal = function (idModal) {
		document.getElementById(idModal).style.display = 'block';
		document.getElementById('veloModal').style.display = 'block';
		document.getElementsByTagName('body')[0].style.overflow = 'hidden';
	}

	$scope.cerrarModal = function (idModal) {
		document.getElementById(idModal).style.display = 'none';
		document.getElementById('veloModal').style.display = 'none';
		document.getElementsByTagName('body')[0].style.overflow = 'auto';
	}

    $scope.setElements = function(){
        var dat = {Amount: $scope.amountNum,
            Tags: $scope.listTags,
            Author: "Juanen"};
        var json = JSON.stringify(dat);

        $http({
            method: 'POST',
            url: $scope.url + '/CreateTask',
            data: json,
        })
        .then(function successCallback(response){
            console.log(response.data);
            $scope.ID = response.data.ID;
            $scope.text = "Success! " + response.data.Message + ". Your ID is " + $scope.ID;
			console.log($scope.text);
			$scope.cerrarModal('modalVideo');
			$scope.abrirModal('modalExito');
        },
        function errorCallback(response){
			console.log(response.statusText);
			$scope.cerrarModal('modalVideo');
			$scope.abrirModal('modalError');
        });
    }

    $scope.getAmountNum = function(Amount, keyEvent)
	{
		if(keyEvent.which == 13)
		{
			$scope.amountNum = Amount;
		}
	}

	$scope.getTags = function(number)
	{
		$scope.amountTags = number;
	}

	$scope.getNameTag = function(name, keyEvent)
	{
		if(keyEvent.which == 13)
		{
			$scope.nameTag = name;

			$scope.listTags.push($scope.nameTag);
			$scope.listSize++;

			$scope.nameTag = "";

			if($scope.listSize >= $scope.amountTags)
			{
				$scope.hideTag = "display: none;";
			}
		}

	}


}]);


