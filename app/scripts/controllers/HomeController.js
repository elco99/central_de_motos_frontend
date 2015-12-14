angular.module('AngularScaffold.Controllers')
  .controller('HomeController', ['ProductService','UserService', '$scope', '$rootScope','$state', '$sessionStorage',  function (ProductService,UserService, $scope, $rootScope,$state, $sessionStorage) {
    $scope.SessionCurrentUser = {};
    $scope.$sessionStorage = $sessionStorage;
    $scope.users = [];
  	$scope.user = {};
  	$scope.search_user = {};
    $scope.search_bar ={};
    $scope.products = [];
    $scope.producto = {};
    $scope.contactMail = {};
    $scope.search=[];
    $scope.prueba = {};
  	/*$scope.show_login = true;
    $scope.show_logout = false;
    $scope.show_shopping_cart = false;
    $scope.show_bill= false;*/
    if($state.params.content){
      $scope.prueba = $state.params.content.searched_value;
      $scope.imageName = $state.params.content.image;
      $scope.name = $state.params.content.name;
      $scope.description = $state.params.content.description;
      $scope.price = $state.params.content.price;
    }
    $scope.ContactSendMail = function(){
      UserService.contact_mail($scope.contactMail).then(function(response){

      }).catch(function(err){
        alert(err.data.error + " " + err.data.message);
      })
    }
    $scope.goHome = function(){
      $state.go('home');

    };

    $scope.goDevolucion = function(){
      $state.go('devoluciones');
    };

    $scope.goGestionVentas = function(){
      $state.go('gestionventa');
    };

    $scope.goShopping = function(){
      $state.go('shopping');
    };

    $scope.goEstadisticas = function(){
      $state.go('estadisticas');
    };

    $scope.goFactura = function(){
      $state.go('factura');
    };

    $scope.goService = function(){
        $state.go('services');
    };

    $scope.goAbout = function(){
    	$state.go('about');
    };
    $scope.goContact = function(){
    	$state.go('contact');
    };
    $scope.goGestionProductos = function(){
      $state.go('products');
    };

    $scope.goGestionUser = function(){
      $state.go('adminUsers');
    };
    $scope.logout = function(){
      UserService.Logout().then(function(response){
        $sessionStorage.$reset();
        $scope.goHome();
      }).catch(function(err){
        alert(err.data.error + " " + err.data.message);
      })
    }

    $scope.login = function(){
      UserService.Login($scope.user).then(function(response){
        $sessionStorage.currentUser = response.data;
        console.log(  $sessionStorage.currentUser);
        $scope.SessionCurrentUser = {};
      }).catch(function(err){
        alert(err.data.error + " " + err.data.message);
      });
    }

    $scope.aceptarDeposito = function(user){
      UserService.aceptar_deposito(user).then(function(response){
          UserService.sendConfirmationMail(user).then(function(response){
            ProductService.reduceInventory(user).then(function(response){
              UserService.deleteCart(user).then(function(response){
                $state.reload();
              }).catch(function(err){
                alert('Error from deleting cart')
              });
            }).catch(function(err){
              alert('Error from deleting products')
            });

          }).catch(function(err){
            alert('Error from mail')
          });

      }).catch(function(err){

      });
    }
    $scope.denegarDeposito = function(user){
      UserService.aceptar_deposito(user).then(function(response){
          UserService.sendDenialMail(user).then(function(response){
            $state.reload();
          }).catch(function(err){
            alert('Error from mail')
          });
      }).catch(function(err){

      });
    }

    $scope.confirmationTable = function(){
      UserService.getDepositedUsers().then(function(response){
        $scope.users = response.data;
      }).catch(function(err){
        alert(err.data.error + " " + err.data.message);
      });
    }

    $scope.loadSearched=function(){
      ProductService.searchByTag($scope.prueba).then(function(response){
        $scope.search = response.data;
      if ($scope.search.length === 0) {
        alert("No existe")
      };
      }).catch(function(err){
        alert('Error fetching product')
      });
    };

    $scope.goDetail = function(image, name, description, price){
      $state.go('details', {content:
        {image: image,
        name: name,
        description:description,
        price:price}
      });
    };

    $scope.searchByTags=function(searched_value){
        $state.go('service',{content:{searched_value:searched_value}},{ reload: true });
    };
    $scope.isAdmin = function(){
      return $sessionStorage.currentUser && $sessionStorage.currentUser.scope.indexOf('admin') > -1;
    }

    $scope.isVendedor = function(){
      return $sessionStorage.currentUser && $sessionStorage.currentUser.scope.indexOf('vendedor') > -1;
    }

    $scope.isCliente = function(){
      return $sessionStorage.currentUser && $sessionStorage.currentUser.scope.indexOf('cliente') > -1;
    }
    $scope.isLogged= function(){
      return $scope.$sessionStorage.currentUser;
    }
  }]);
