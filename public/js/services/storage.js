/*global angular */

/**
 * Services that persists and retrieves todos from localStorage or a backend API
 * if available.
 *
 * They both follow the same API, returning promises for all changes to the
 * model.
 */
angular.module('wallet').factory('storage', function () {
	var STORAGE_ID = 'wallet';

	return {
		get: function (key) {
			return JSON.parse(localStorage.getItem(STORAGE_ID + key));
		},

		set: function (key, value) {
			localStorage.setItem(STORAGE_ID + key, JSON.stringify(value));
		}
	};
});
