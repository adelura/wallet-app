/*global angular */

angular.module('wallet').controller('WalletCtrl', function WalletCtrl($scope) {
	$scope.TYPES = {
		INCOME: 1,
		OUTCOME: 2
	};

	// Temporary model.
	$scope.records = [];

	$scope.addIncome = function () {
		// @TODO: Validation.

		addRecord($scope.TYPES.INCOME, $scope.income.value);
		$scope.income.value = '';
	};

	$scope.addOutcome = function () {
		// @TODO: Validation.

		addRecord($scope.TYPES.OUTCOME, $scope.outcome.value);
		$scope.income.value = '';
	};

	function addRecord(type, value) {
		$scope.records.push({
			date: new Date(),
			value: value,
			type: type
		});
	}
});
