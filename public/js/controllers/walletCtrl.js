/*global angular */

angular.module('wallet').controller('WalletCtrl', function WalletCtrl($scope, $sce, currencies, storage, TYPES) {
	$scope.currency = storage.get('currency') || currencies[0];

	$scope.currencies = currencies;

	$scope.outcome = {};
	$scope.income = {};

	// This function is required to properly escape currency characters in the template.
	$scope.escapedCurrency = function () {
		return $sce.trustAsHtml($scope.currency.entity);
	};

	// Temporary model.
	$scope.records = storage.get('records') || [];

	$scope.addIncome = function () {
		$scope.income.errors = validateIncome($scope.income ? $scope.income.value : '');
		if ($scope.income.errors.length) {
			return;
		}

		addRecord(TYPES.INCOME, $scope.income.value);
		$scope.income.value = '';
	};

	$scope.addOutcome = function () {
		$scope.outcome.errors = validateOutcome($scope.outcome ? $scope.outcome.value : '', $scope.totalValue);

		if ($scope.outcome.errors.length) {
			return;
		}

		addRecord(TYPES.OUTCOME, $scope.outcome.value);
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

	$scope.reset = function () {
		$scope.currency = currencies[0];
		$scope.records = [];
		storage.set('currency', $scope.currency);
		storage.set('records', $scope.records);
	};

	$scope.$watch('records.length', function () {
		$scope.totalValue = calculateTotalValue();
	});

	$scope.$watch('income.value', function (newValue) {
		if (!$scope.income || !newValue) {
			return;
		}

		$scope.income.errors = validateIncome(newValue);
	});

	$scope.$watch('outcome.value', function (newValue) {
		if (!$scope.outcome || !newValue) {
			return;
		}

		$scope.outcome.errors = validateOutcome(newValue, $scope.totalValue);
	});

	function validateIncome(value) {
		var errors = [];

		if (!value) {
			errors.push('Value can\'t be empty.');
			return errors;
		}

		value = parseFloat(value).toFixed(2);
		if (isNaN(value)) {
			errors.push('Invalid value.');
		}

		return errors;
	}

	function validateOutcome(value, totalValue) {
		var errors = [];

		if (!value) {
			errors.push('Value can\'t be empty.');
			return errors;
		}

		value = parseFloat(value).toFixed(2);
		if (isNaN(value)) {
			errors.push('Invalid value.');
		}

		if (totalValue - value < 0) {
			errors.push('Total amount of wallet can\'t be less than zero.');
		}

		return errors;
	}

	// Returns total wallet value.
	function calculateTotalValue() {
		return _.reduce($scope.records, function (memo, record) {
			return memo + (record.type === TYPES.INCOME ? record.value : (record.value * -1));
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
