describe('Main menu module', function () {
	var scope,
		ctrl;

	beforeEach(module('wallet'));

	beforeEach(inject(function ($rootScope, $controller) {
		scope = $rootScope.$new();
		ctrl = $controller('MainMenuController', {$scope: scope});
	}));

	it('should have an initial active value set to false', function () {
		expect(scope.active).to.equal(false);
	});

	it('should properly change active state after call toggleMenu method', function () {
		scope.toggleMenu();
		expect(scope.active).to.equal(true);
	});
});
