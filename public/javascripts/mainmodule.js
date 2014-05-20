var mainApp = angular.module('mainApp',['ngRoute']);

mainApp.config(function ($routeProvider){
	$routeProvider
		.when('/addPost',
			{
				controller: 'NamesController',
				templateUrl: 'partials/addPost.html'
			})
		.when('/deletePost',
			{
				controller: 'NamesController',
				templateUrl: 'partials/deletePost.html'
			})
		.otherwise({ redirectTo: '/'});
});

mainApp.factory('customersFactory', function(){
	
	var factory = {};
	var customers = [
		{name: 'Jacek', city: 'Sikora' },
		{name: 'Piotr', city: 'Sikora' }
	];

	factory.getCustomers = function () {
		return customers;
	};

	return factory;
});

mainApp.controller('NamesController', function($scope,customersFactory){
	
	$scope.customers = [];

	init();

	function init(){
			
		$scope.customers = customersFactory.getCustomers();
	}

	$scope.addCustomer = function(){
		$scope.customer.push(
			{name: $scope.newCustomer.name, city:$scope.newCustomer.city}
		);
	};
});