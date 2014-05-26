'use strict';

/* Controllers */

function Customers($scope, $http) {
  $http.get('/api/posts').
    success(function(data, status, headers, config) {
      $scope.customers = data.customers;
    });
}

function AddCustomer($scope, $http, $location) {
  $scope.form = {};
  $scope.submitCustomer = function () {
    $http.post('/api/post', $scope.form).
      success(function(data) {
        $location.path('/');
      });
  };
}

function DeleteCustomer($scope, $http, $location, $routeParams) {

  $scope.deleteCustomer = function () {
    $http.delete('/api/post/' + $routeParams.id).
      success(function(data) {
        $location.url('/');
      });
  };

  $scope.home = function () {
    $location.url('/');
  };
}