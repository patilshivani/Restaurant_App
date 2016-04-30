angular.module('foodController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Foods', function($scope, $http, Foods) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Foods.get()
			.success(function(data) {
				$scope.foods = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		$scope.createFoodItem =function() {

			Foods.create($scope.formData)
				.success(function(data){
					$scope.loading=false;
					$scope.formData ={};
					$scope.foods = data;
				});
		};


		// DELETE ==================================================================

		$scope.deleteFoodItem = function(id) {
			$scope.loading = true;

			Foods.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.foods = data; // assign our new list of todos
				});
		};

		$scope.checkTotal = function() {
			Foods.getTotal()
				.success(function(data) {
					$scope.foods = data;
					$scope.loading = false;
				});
		};

	}]);