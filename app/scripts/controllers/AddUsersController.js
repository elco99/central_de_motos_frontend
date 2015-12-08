angular.module('AngularScaffold.Controllers')
 .controller('AddUsersController', ['$scope', 'HomeService','$state','$sessionStorage', function ($scope, HomeService,$state,$sessionStorage) {
	$scope.users = [];
	$scope.user = {};
	$scope.userModif = {};

	$scope.show_login = true;
  $scope.show_logout = false;
  $scope.show_shopping_cart = false;
  $scope.show_admin = true;
  $scope.show_bill= false;

  if($state.params.content){
    $scope.prueba = $state.params.content.searched_value;
    $scope.imageName = $state.params.content.image;
    $scope.name = $state.params.content.name;
    $scope.description = $state.params.content.description;
    $scope.price = $state.params.content.price;
  }

  $scope.goHome = function(){
    $state.go('home');
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
  $scope.goGestionuseros = function(){
    $state.go('users');
  };

  $scope.goGestionUser = function(){
    $state.go('adminUsers');
  };

	$scope.getUsers = function(){
		HomeService.GetUsers().then(function(response){
  		$scope.users = response.data;
  	}).catch(function(err){
  		alert('Error fetching users')
  	});
	};

	$scope.postUsers = function(){
		HomeService.PostUsers($scope.user).then(function(response){
	    alert("Creado Exitosamente");
	}).catch(function(err){
	    alert("Error posting to users");
		});
	}

  $scope.show_modificar_user = function(user){
    $scope.userModif.id = user._id;
    $scope.userModif.name = user.name;
    $scope.userModif.username = user.username;
    $scope.userModif.password = user.password;
    $scope.userModif.email = user.email;
    $scope.userModif.type = user.type;
    if (user.state == true) {
      $scope.userModif.state = "true";
    }else{
      $scope.userModif.state = "false";
    };

  };

  $scope.saveUserChanges = function(){
    HomeService.SaveUserChanges($scope.userModif).then(function(response){
      $scope.users = response.data;

    }).catch(function(err){
    });
  };

}]);
