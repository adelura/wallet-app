angular.module('wallet', ['ngRoute', 'angularMoment', 'ngSanitize']).config(function ($routeProvider) {
	var cfg = {
		controller: 'WalletCtrl',
		templateUrl: 'wallet-index.html'
	};

	$routeProvider
		.when('/', cfg)
		.otherwise({
			redirectTo: '/'
		});
})
.constant('currencies', [
	{ name: 'Dollar', class: 'fa-usd', entity: '&#36;' },
	{ name: 'Euro', class: 'fa-eur', entity: '&euro;' },
	{ name: 'Pound', class: 'fa-gbp', entity: '&pound;' }
])
.constant('TYPES', {
	INCOME: 1,
	OUTCOME: 2
});
