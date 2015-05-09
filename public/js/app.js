angular.module('wallet', ['ngRoute']).config(function ($routeProvider) {
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
