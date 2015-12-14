angular.module('AngularScaffold.Controllers')
 .controller('DevolucionController', ['$scope', 'ProductService','$state','$sessionStorage', function ($scope, ProductService,$state,$sessionStorage) {
  $scope.products = [];
  $scope.producto = {};
  $scope.$sessionStorage = $sessionStorage;
  $scope.item = {};
  $scope.factura = {};
  $scope.radio_return;
  $scope.total = 0;
  $scope.showModal = false;


  $scope.updateItem = function(product){
    if ($scope.radio_return === "Compra") {
      ProductService.updateReturnProductBuy(product).then(function(response){
        alert("Se devolvio exitosamente!")
      }).catch(function(err){

      });
    }else{
      ProductService.updateReturnProductSell(product).then(function(response){
        alert("Se devolvio exitosamente!")
      }).catch(function(err){

      });
    };
  }

  $scope.addItem = function(){
    ProductService.AddItem($scope.item.ingreso).then(function(response){

      var cont = -1;
      for (var i = $scope.products.length-1; i>= 0; i--) {
        if (response.data[0].code === $scope.products[i].code) {
          cont = i;
          break;
        };
      };

      if (cont >= 0) {
        $scope.products[cont].currentAmount += 1;
      }else{
        if (response.data[0].quantity > 0) {
          $scope.products.push(response.data[0]);
        }else{
          alert("No hay suficiente en inventario");
        };

      }
          }).catch(function(err){
      alert('Error fetching products')
    });
  };

  $scope.LowerItem = function(product){
    if (product.currentAmount != 1) {
      product.currentAmount -= 1;
    };
  };
  $scope.IncreaseItem = function(product){
    product.currentAmount += 1;
  };

  $scope.clearItem = function(product){
    $scope.products.splice($scope.products.indexOf(product),1);
  };

}]);
