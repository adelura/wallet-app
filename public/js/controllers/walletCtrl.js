/*global angular */

angular.module('wallet').controller('WalletCtrl', function WalletCtrl($scope, $sce, currencies, storage) {
	$scope.TYPES = {
		INCOME: 1,
		OUTCOME: 2
	};

	$scope.currency = storage.get('currency') || currencies[0];

	$scope.currencies = currencies;

	// This function is required to properly escape currency characters in the template.
	$scope.escapedCurrency = function () {
		return $sce.trustAsHtml($scope.currency.entity);
	};

	// Temporary model.
	$scope.records = storage.get('records') || [];

	$scope.totalValue = 0;

	$scope.addIncome = function () {
		if ($scope.income.errors.length) {
			return;
		}

		addRecord($scope.TYPES.INCOME, $scope.income.value);
		$scope.income.value = '';
	};

	$scope.addOutcome = function () {
		if ($scope.outcome.errors.length) {
			return;
		}

		addRecord($scope.TYPES.OUTCOME, $scope.outcome.value);
		$scope.outcome.value = '';
	};

	$scope.changeCurrency = function (_currency) {
		var foundIndex = _.findIndex($scope.currencies, function (currency) {
			return currency.name === _currency.name;
		});

		if (foundIndex === -1) {
			throw new Error('Index not found');
		}

		$scope.currency = $scope.currencies[foundIndex];
		storage.set('currency', $scope.currency);
	};

	$scope.reset = function() {
		$scope.currency = currencies[0];
		$scope.records = [];
		storage.set('currency', $scope.currency);
		storage.set('records', $scope.records);
	};

	$scope.$watch('records.length', function () {
		$scope.totalValue = calculateTotalValue();
	});

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

		if ($scope.totalValue - newValue < 0) {
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

		// Filtered out records.
		storage.set('records', _.map($scope.records, function (record) {
			return _.pick(record, 'date', 'value', 'type');
		}));
	}
});
