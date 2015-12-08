var app = angular.module('AngularScaffold', ['ui.router', 'ngStorage', 'AngularScaffold.Services', 'AngularScaffold.Controllers']);

angular.module('AngularScaffold.Controllers', []);
angular.module('AngularScaffold.Services', []);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('home');
	$stateProvider
		        .state('home', {
		            url: '/home',
								params:{content:undefined},
		            templateUrl: '/views/home.html',
		            controller: 'HomeController'
		        })
				.state('services', {
						url: '/services',
						templateUrl: 'views/services.html',
						params:{content:undefined},
						controller: 'HomeController',
				})
				.state('service', {
						url: '/service',
						templateUrl: 'views/searchService.html',
						params:{content:undefined},
						controller: 'HomeController',
				})
				.state('about', {
						url: '/about',
						params:{content:undefined},
						templateUrl: 'views/about.html',
						controller: 'HomeController'
				})
				.state('products', {
						url: '/AddProducts',
						params:{content:undefined},
						templateUrl: 'views/AddProduct.html',
						controller: 'CatalogController'
				})
				.state('details', {
						url: '/details',
						params:{content:undefined},
						templateUrl: 'views/detailProduct.html',
						controller: 'CatalogController'
				})
				.state('adminUsers', {
						url: '/AddUsers',
						templateUrl: 'views/AddUsers.html',
						params:{content:undefined},
						controller: 'HomeController',
				})
				.state('estadisticas', {
						url: '/Graph',
						templateUrl: 'views/estadisticas.html',
						params:{content:undefined},
						controller: 'HomeController',
				})
				.state('factura', {
						url: '/Factura',
						templateUrl: 'views/factura.html',
						params:{content:undefined},
						controller: 'HomeController',
				})
				.state('contact', {
						url: '/contact',
						params:{content:undefined},
						templateUrl: 'views/contact.html',
						controller: 'HomeController'
				});
}])
