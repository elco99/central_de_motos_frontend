angular.module('AngularScaffold.Controllers')
 .controller('AddUsersController', ['$scope', 'UserService','$state','$sessionStorage', function ($scope, UserService,$state,$sessionStorage) {
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
		UserService.GetUsers().then(function(response){
  		$scope.users = response.data;
  	}).catch(function(err){
  		alert('Error fetching users')
  	});
	};

	$scope.postUsers = function(){
    console.log($scope.user)
		UserService.PostUsers($scope.user).then(function(response){
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
    $scope.userModif.scope = user.scope ;
    if (user.state == true) {
      $scope.userModif.state = "true";
    }else{
      $scope.userModif.state = "false";
    };

  };

  $scope.saveUserChanges = function(){
    UserService.SaveUserChanges($scope.userModif).then(function(response){
      $scope.userModif = {};

    }).catch(function(err){
    });
  };

}]);
