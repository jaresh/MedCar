'use strict';

angular.module('mainApp',['ngRoute']).
config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/',
			{
				controller: Customers,
				templateUrl: 'partials/index.html'
			})
		.when('/addPost',
			{
				controller: AddCustomer,
				templateUrl: 'partials/addPost.html'
			})
		.when('/deletePost/:id',
			{
				controller: DeleteCustomer,
				templateUrl: '../partials/deletePost.html'
			})
		.otherwise(
			{ 
				redirectTo: '/'
			});
		$locationProvider.html5Mode(true);
}]);
