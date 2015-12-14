angular.module('AngularScaffold.Services').factory('UserService', ['$http',
	function($http){
		$http.defaults.withCredentials = true;

		var baseUrl = 'http://localhost:8000/';
		//var baseUrl = 'https://centraldemotosbackend.herokuapp.com/';
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
			getDepositedUsers: function(){
				return $http.post(baseUrl + 'v1/admin/deposited');
			},
			aceptar_deposito: function(payload){
				return $http.put(baseUrl + 'v1/admin/aceptar_deposito',payload);
			},
			updateBought: function(payload){
				return $http.put(baseUrl + 'v1/shopping_cart/bought',payload);
			},
			updateDeposited: function(payload){
				return $http.put(baseUrl + 'v1/shopping_cart/deposited',payload);
			},
			SaveUserChanges: function(payload){
				return $http.put(baseUrl + 'v1/user/update',payload);
			},
			fill_cart: function(payload){
				return $http.post(baseUrl + 'v1/shopping_cart',payload);
			},
			send_mail: function(payload){
				return $http.post(baseUrl + 'v1/shopping_cart/sendMail',payload);
			},
			contact_mail: function(payload){
				return $http.post(baseUrl + 'v1/contact/sendMail',payload);
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
			remove_from_cart: function(payload){
				return $http.post(baseUrl + 'v1/shopping_cart/delete_item',payload);
			},
			add_bought_item: function(payload){
				return $http.post(baseUrl +'v1/shoppin_cart/add',payload);
			}

		};
}]);
