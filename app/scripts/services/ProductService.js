angular.module('AngularScaffold.Services').factory('ProductService', ['$http',
	function($http){
		$http.defaults.withCredentials = true;
		//var baseUrl = 'http://localhost:8000/';
		var baseUrl = 'https://centraldemotosbackend.herokuapp.com/';
		return {
			GetAllProduct: function(){
				return $http.get(baseUrl + 'v1/product');
			},
			fetchGet: function(){
				return $http.get(baseUrl + 'v1/product/fetch');
			},
			AddItem: function(payload){
				return $http.post(baseUrl + 'v1/factura/add',payload);
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
			},
			reduceInventory: function(payload){
				return $http.put(baseUrl + 'v1/admin/reducir',payload);
			},
			updateReturnProductBuy:function(payload){
				return $http.put(baseUrl + 'v1/admin/devolucionCompra',payload);
			},
			updateReturnProductSell:function(payload){
				return $http.put(baseUrl + 'v1/admin/devolucionVenta',payload);
			}//12

		};
}]);
