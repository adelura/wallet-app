/*global angular */

/**
 * Services that persists and retrieves todos from localStorage or a backend API
 * if available.
 *
 * They both follow the same API, returning promises for all changes to the
 * model.
 */
angular.module('wallet').factory('walletStorage', function ($timeout, $q) {
	var STORAGE_ID = 'wallet';

	return {
		get: function (key) {
			var deferred, result;

			deferred = $q.defer();
			result = JSON.parse(localStorage.getItem(STORAGE_ID + key));

			$timeout(function() {
				deferred.resolve(result);
			}, 3 * 1000);

			return deferred.promise;
		},

		set: function (key, value) {
			localStorage.setItem(STORAGE_ID + key, JSON.stringify(value));
		}
	};
});
