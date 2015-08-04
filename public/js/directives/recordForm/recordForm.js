/*global angular */

angular.module('wallet').directive('walletRecordForm', function () {
	return {
		restrict: 'E',
		scope: {
			walletTitle: '@',
			walletPlaceholder: '@',
			walletName: '@',
			walletSubmit: '&',
			walletErrors: '&',
			walletInputModel: '='
		},
		templateUrl: '/js/directives/recordForm/recordForm.html'
	};
});
