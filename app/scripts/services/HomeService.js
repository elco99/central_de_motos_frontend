angular.module('AngularScaffold.Services').factory('HomeService', ['$http',
	function($http){
		$http.defaults.withCredentials = true;
		var baseUrl = 'http://localhost:8000/';//https://centraldemotosbackend.herokuapp.com/
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
			getDepositedUsers: function(){
				return $http.post(baseUrl + 'v1/admin/deposited');
			},
			aceptar_deposito: function(payload){
				return $http.put(baseUrl + 'v1/admin/aceptar_deposito',payload);
			},
			fetchGet: function(){
				return $http.get(baseUrl + 'v1/product/fetch');
			},
			updateBought: function(payload){
				return $http.put(baseUrl + 'v1/shopping_cart/bought',payload);
			},
			updateDeposited: function(payload){
				return $http.put(baseUrl + 'v1/shopping_cart/deposited',payload);
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
			},
			fill_cart: function(payload){
				return $http.post(baseUrl + 'v1/shopping_cart',payload);
			},
			send_mail: function(payload){
				return $http.post(baseUrl + 'v1/shopping_cart/sendMail',payload);
			},
			sendConfirmationMail: function(payload){
				return $http.post(baseUrl + 'v1/admin/sendMail',payload);
			},
			sendDenialMail: function(payload){
				return $http.post(baseUrl + 'v1/admin/sendDenialMail',payload);
			},
			deleteCart: function(payload){
				return $http.put(baseUrl + 'v1/admin/deleteCart',payload);
			},
			reduceInventory: function(payload){
				return $http.put(baseUrl + 'v1/admin/reducir',payload);
			},
			remove_from_cart: function(payload){
				return $http.post(baseUrl + 'v1/shopping_cart/delete_item',payload);
			},
			updateReturnProductBuy:function(payload){
				return $http.put(baseUrl + 'v1/admin/devolucionCompra',payload);
			},
			updateReturnProductSell:function(payload){
				return $http.put(baseUrl + 'v1/admin/devolucionVenta',payload);
			},
			add_bought_item: function(payload){
				return $http.post(baseUrl +'v1/shoppin_cart/add',payload);
			}

		};
}]);
