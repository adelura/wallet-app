/*global angular */

angular.module('wallet').controller('WalletCtrl', function WalletCtrl($scope) {
	$scope.TYPES = {
		INCOME: 1,
		OUTCOME: 2
	};

	// Temporary model.
	$scope.records = [];

	$scope.totalValue = 0;

	$scope.addIncome = function () {
		// @TODO: Validation.

		addRecord($scope.TYPES.INCOME, $scope.income.value);
		$scope.income.value = '';
		$scope.totalValue = calculateTotalValue();
	};

	$scope.addOutcome = function () {
		// @TODO: Validation.

		addRecord($scope.TYPES.OUTCOME, $scope.outcome.value);
		$scope.outcome.value = '';
		$scope.totalValue = calculateTotalValue();
	};

	// Returns total wallet value.
	function calculateTotalValue() {
		return _.reduce($scope.records, function (memo, record) {
			return memo + (record.type === $scope.TYPES.INCOME ? record.value : (record.value * -1));
		}, 0);
	}

	// Add record to storage.
	function addRecord(type, value) {
		$scope.records.push({
			date: new Date(),
			value: Number(value),
			type: type
		});
	}
});
