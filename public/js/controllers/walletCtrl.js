/*global angular */

angular.module('wallet').controller('WalletCtrl', function WalletCtrl($scope, $sce, currencies, walletStorage, TYPES, $q) {
	var that = this;

	this.currency = currencies[0];
	this.records = [];

	this.isLoading = true;

	this.currencies = currencies;

	this.outcome = {};
	this.income = {};

	activate();

	function activate() {
		that.isLoading = true;

		$q.all({
			currency: walletStorage.get('currency'),
			records: walletStorage.get('records')
		}).then(function (result) {
			that.currency = result.currency || that.currency;
			that.records = result.records || that.records;
			that.isLoading = false;
		});
	}

	// This function is required to properly escape currency characters in the template.
	this.escapedCurrency = function () {
		return $sce.trustAsHtml(this.currency.entity);
	};


	this.addIncome = function () {
		this.income.errors = validateIncome(this.income ? this.income.value : '');
		if (this.income.errors.length) {
			return;
		}

		addRecord(this.records, TYPES.INCOME, this.income.value);
		this.income.value = '';
	};

	this.addOutcome = function () {
		this.outcome.errors = validateOutcome(this.outcome ? this.outcome.value : '', this.totalValue);

		if (this.outcome.errors.length) {
			return;
		}

		addRecord(this.records, TYPES.OUTCOME, this.outcome.value);
		this.outcome.value = '';
	};

	this.changeCurrency = function (_currency) {
		var foundIndex = _.findIndex(this.currencies, function (currency) {
			return currency.name === _currency.name;
		});

		if (foundIndex === -1) {
			throw new Error('Index not found');
		}

		this.currency = this.currencies[foundIndex];
		walletStorage.set('currency', this.currency);
	};

	this.reset = function () {
		this.currency = currencies[0];
		this.records = [];
		walletStorage.set('currency', this.currency);
		walletStorage.set('records', this.records);
	};

	$scope.$watch(function () {
		return that.records.length;
	}, function () {
		that.totalValue = calculateTotalValue(that.records);
	});

	$scope.$watch(function () {
		return that.income.value;
	}, function (newValue) {
		if (!that.income || !newValue) {
			return;
		}

		that.income.errors = validateIncome(newValue);
	});

	$scope.$watch(function() {
		return that.outcome.value;
	}, function (newValue) {
		if (!that.outcome || !newValue) {
			return;
		}

		that.outcome.errors = validateOutcome(newValue, that.totalValue);
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
	function calculateTotalValue(records) {
		return _.reduce(records, function (memo, record) {
			// Income increase and outcome decrease the total value.
			return memo + (record.type === TYPES.INCOME ? record.value : (record.value * -1));
		}, 0);
	}

	// Add record to storage.
	function addRecord(records, type, value) {
		records.push({
			date: new Date(),
			value: Number(parseFloat(value).toFixed(2)),
			type: type
		});

		// Filtered out records.
		walletStorage.set('records', _.map(records, function (record) {
			return _.pick(record, 'date', 'value', 'type');
		}));
	}
});
