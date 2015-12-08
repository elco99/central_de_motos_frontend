angular.module('AngularScaffold.Services').factory('HomeService', ['$http',
	function($http){
		$http.defaults.withCredentials = true;
		var baseUrl = 'https://centraldemotosbackend.herokuapp.com/';//https://angular-scaffold-backend.herokuapp.com/
		return {
			GetUsers: function(){
				return $http.get(baseUrl + "v1/users");
			},
			PostUsers: function(payload){
				return $http.post(baseUrl + "v1/user", payload);
			},
			Logout: function(){
				return $http.get(baseUrl + "v1/logout");
			},
			Login: function(payload){
				return $http.post(baseUrl + "v1/login", payload);
			},
			GetAllProduct: function(){
				return $http.get(baseUrl + 'v1/product');
			},
			fetchGet: function(){
				return $http.get(baseUrl + 'v1/product/fetch');
			},
			AddItem: function(payload){
				return $http.post(baseUrl + 'v1/factura/add',payload);
			},
			SaveUserChanges: function(payload){
				return $http.put(baseUrl + 'v1/user/update',payload);
			},
			SaveChanges: function(payload){
				return $http.put(baseUrl + 'v1/product/update',payload);
			},
			AddProduct: function(payload){
				return $http.post(baseUrl + 'v1/product/add',payload);
			},
			Facturar: function(){
				return $http.get(baseUrl + 'v1/facturar',payload);
			},
			ChangeSoldProduct:function(payload){
				return $http.put(baseUrl + 'v1/facturar/update',payload);
			},
			NoMoreItems: function(payload){
				return $http.put(baseUrl + 'v1/facturar/updateState',payload);
			},
			searchByTag: function(payload){
				return $http.post(baseUrl + 'v1/product/search',payload);
			}

		};
}]);
