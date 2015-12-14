angular.module('AngularScaffold.Controllers')
 .controller('AddProductController', ['$scope', 'ProductService','$state','$sessionStorage', function ($scope, ProductService,$state,$sessionStorage) {
  $scope.products = [];
  $scope.producto = {};
  $scope.productoModif = {};

  $scope.show_modificar = function(product){
    $scope.productoModif.id = product._id;
    $scope.productoModif.code = product.code;
    $scope.productoModif.image = product.image;
    $scope.productoModif.name = product.name;
    $scope.productoModif.description = product.description;
    $scope.productoModif.tags = product.tags;
    $scope.productoModif.price = product.price;
    $scope.productoModif.quantity = product.quantity;
    if (product.state == true) {
      $scope.productoModif.state = "true";
    }else{
      $scope.productoModif.state = "false";
    };

  };

  $scope.saveProductChanges = function(){
    ProductService.SaveChanges($scope.productoModif).then(function(response){
      $scope.products = response.data;

    }).catch(function(err){
    });
  };

  $scope.getFetch=function(){
    ProductService.fetchGet().then(function(response){
      $scope.products = response.data;
    }).catch(function(err){
      alert('Error fetching products')
    });
  };

  $scope.createProduct = function(){
    ProductService.AddProduct($scope.producto).then(function(response){
    $scope.products = response.data;
  }).catch(function(err){
      alert(err + "     " + "Error creating product");
    });
  }
}]);
