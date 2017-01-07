var twitchTV = angular.module("TwitchTV",[]);

twitchTV.controller("TwitchController", ["$scope", "twitchConnection", function ($scope ,twitchConnection) {
	console.log("in");
	$scope.type = "All";
	$scope.streamers = twitchConnection.getData();
	$scope.getStatus = function (streamer) {
		var status = $scope.streamers.filter(function (el) {
			return el.display_name === streamer;
		})[0].status;
		return status === null ? "Offline" : status;
	}
}]);

twitchTV.factory("twitchConnection", ["$http", "$sce", function ($http, $sce) {
	return {
		that: this,
		observedStreamers: ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"],
		url: "https://wind-bow.gomix.me/twitch-api/channels/",
		getData: function () {
			var streams = [];
			var that = this;
			var request = function (array) {
				$http.get(that.url + that.observedStreamers[i]).then(function (response) {
					array.push(response.data)
				});
			};

			for(var i = 0; i < this.observedStreamers.length; i ++) {
				request(streams);
			}

			return streams;
		}

	}
}]);

twitchTV.filter("streamType", function () {
	return function(input, type) {
		switch (type) {
			case "Online":
				return input.filter(function (el) {
					return el.status !== null;
				});
			case "Offline":
				return input.filter(function (el) {
					return el.status === null;
				});
			default:
				return input;
		}
	}
});
