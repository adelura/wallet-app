angular.module('wallet', ['ngRoute', 'angularMoment']).config(function ($routeProvider) {
	var cfg = {
		controller: 'WalletCtrl',
		templateUrl: 'wallet-index.html'
	};

	$routeProvider
		.when('/', cfg)
		.otherwise({
			redirectTo: '/'
		});
});
