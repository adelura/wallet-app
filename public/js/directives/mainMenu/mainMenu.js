/*global angular */

angular.module('wallet').directive('walletMainMenu', function () {
	return {
		restrict: 'E',
		scope: {
			walletReset: '&'
		},
		templateUrl: '/js/directives/mainMenu/mainMenu.html',
		controller: 'MainMenuController'
	};
});
