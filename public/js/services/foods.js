angular.module('foodService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Foods', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/food');
			},
			delete : function(id) {
				return $http.delete('/api/food/' + id);
			},
			create : function(foodData){
				return $http.post('/api/food', foodData);
			},
			getTotal: function() {
				return $http.get('/api/total');
			}
		}
	}]); 