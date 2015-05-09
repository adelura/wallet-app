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
		if ($scope.income.errors.length) {
			return;
		}

		addRecord($scope.TYPES.INCOME, $scope.income.value);
		$scope.income.value = '';
		$scope.totalValue = calculateTotalValue();
	};

	$scope.addOutcome = function () {
		if ($scope.outcome.errors.length) {
			return;
		}

		addRecord($scope.TYPES.OUTCOME, $scope.outcome.value);
		$scope.outcome.value = '';
		$scope.totalValue = calculateTotalValue();
	};

	$scope.$watch('income.value', function (newValue) {
		if (!$scope.income) {
			return;
		}

		$scope.income.errors = [];

		if (newValue === '') {
			return;
		}

		newValue = parseFloat(newValue).toFixed(2);
		if (isNaN(newValue)) {
			$scope.income.errors.push('Invalid value.');
		}
	});

	$scope.$watch('outcome.value', function (newValue) {
		if (!$scope.outcome) {
			return;
		}

		$scope.outcome.errors = [];

		if (newValue === '') {
			return;
		}

		newValue = parseFloat(newValue).toFixed(2);
		if (isNaN(newValue)) {
			$scope.outcome.errors.push('Invalid value.');
		}

		if (calculateTotalValue() - newValue < 0) {
			$scope.outcome.errors.push('Total amount of wallet can\'t be less than zero.');
		}
	});

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
			value: Number(parseFloat(value).toFixed(2)),
			type: type
		});
	}
});
