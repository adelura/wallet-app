/*global angular */

angular.module('wallet').controller('MainMenuController', function MainMenuController($scope) {
	$scope.active = false;
	$scope.toggleMenu = function () {
		$scope.active = !$scope.active;
	}
});
