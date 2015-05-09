/*global angular */

angular.module('wallet').controller('WalletCtrl', function WalletCtrl($scope) {
	$scope.records = [
		{ date: new Date(), value: 100 }
	];
});
