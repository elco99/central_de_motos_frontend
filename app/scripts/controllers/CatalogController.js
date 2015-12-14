angular.module('AngularScaffold.Controllers')
 .controller('CatalogController', ['$scope', 'HomeService','$state','$stateParams', '$sessionStorage', function ($scope, HomeService,$state,$stateParams, $sessionStorage) {
  $scope.products = [];
  $scope.producto = {};
  $scope.$sessionStorage = $sessionStorage;
  if($state.params.content){
    $scope.imageName = $state.params.content.image;
    $scope.name = $state.params.content.name;
    $scope.description = $state.params.content.description;
    $scope.price = $state.params.content.price;
  }
 $scope.item = {};




  $scope.add_to_cart = function(product){
    var object = {
      item : product,
      current_user : $scope.$sessionStorage.currentUser
    }
    HomeService.add_bought_item(object).then(function(response){
    }).catch(function(err){
      alert('Error adding product')
    });

  }
  $scope.goDetail = function(image, name, description, price){
    $state.go('details', {content:
      {image: image,
      name: name,
      description:description,
      price:price}
    });
  };

  $scope.getCatalogo = function(){
    HomeService.GetAllProduct().then(function(response){
      $scope.products = response.data;
    }).catch(function(err){
      alert('Error fetching users')
    });
  };
  $scope.LowerItem = function(product){
      if (product.currentAmount != 1) {
        product.currentAmount -= 1;
      };
  };
  $scope.IncreaseItem = function(product){
      if (product.currentAmount  < product.quantity) {
        product.currentAmount += 1;
      }else{
        alert("No hay suficiente en el inventario");
      };

  };
}]);
