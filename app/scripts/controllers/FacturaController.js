angular.module('AngularScaffold.Controllers')
 .controller('FacturaController', ['$scope', 'HomeService','$state','$sessionStorage', function ($scope, HomeService,$state,$sessionStorage) {
  $scope.products = [];
  $scope.producto = {};
  $scope.$sessionStorage = $sessionStorage;
  $scope.item = {};
  $scope.factura = {};
  $scope.total = 0;
  $scope.showModal = false;

	$scope.show_login = true;
  $scope.show_logout = false;
  $scope.show_shopping_cart = false;
  $scope.show_admin = true;
  $scope.show_bill= false;

  $scope.uploadImage = function(){

      var elm = document.getElementById('imagen'),
      img = elm.files[0],
      filename = img.name,
      filesize = img.size;
      var reader = new FileReader(),binary,base64     ;
      reader.addEventListener('loadend', function(){
        binary = reader.result;
        base64 = btoa(binary);
        var imgbase64 = {
          base64 : base64
        }
        //$scope.sendM()
        HomeService.send_mail(imgbase64).then(function(response){
          alert(response.data)
        }).catch(function(err){
          alert('Error from cart')
        });
      }, false);


      HomeService.updateDeposited($scope.$sessionStorage.currentUser).then(function(response){
        alert(response.data)
      }).catch(function(err){
        alert('Error from cart')
      });
        reader.readAsBinaryString(img);
    /*
      reader.readAsBinaryString(img);*/


   }
   $scope.wasBought = function(){
     console.log($sessionStorage.currentUser)
     return  $sessionStorage.currentUser.bought_cart;
   }


   $scope.habilitar_upload_image = function() {

     HomeService.updateBought($scope.$sessionStorage.currentUser).then(function(response){
        $scope.$sessionStorage.currentUser.bought_cart = true;
        alert(response.data)
      }).catch(function(err){
        alert('Error from cart')
      });
   }
  $scope.deleteItem = function(product){
    var params = {
      username : $scope.$sessionStorage.currentUser.username,
      product_code : product.code
    }
    HomeService.remove_from_cart(params).then(function(response){
      alert(response.data)
    }).catch(function(err){
      alert('Error deleting product from cart')
    });
     $scope.products.splice($scope.products.indexOf(product),1);
     $scope.putSubTotal();
  }


  $scope.fill_shopping_cart = function(){
    console.log($scope.$sessionStorage.currentUser)
    HomeService.fill_cart($scope.$sessionStorage.currentUser).then(function(response){
        $scope.products = response.data.cart;
        console.log($scope.products)
    }).catch(function(err){
      alert('Error fetching products')
    });
  }
  $scope.addItem = function(){
    HomeService.AddItem($scope.item.ingreso).then(function(response){

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
      $scope.putSubTotal();
    }).catch(function(err){
      alert('Error fetching products')
    });
  };

  $scope.LowerItem = function(product){

      if (product.currentAmount != 1) {
        product.currentAmount -= 1;
      };
      $scope.putSubTotal();
  };

  $scope.IncreaseItem = function(product){
      if (product.currentAmount  < product.quantity) {
        product.currentAmount += 1;
        $scope.putSubTotal();
      }else{
        alert("No hay suficiente en el inventario");
      };

  };

  $scope.putSubTotal = function(){
    var contador = 0;
    for (var i = $scope.products.length - 1; i >= 0; i--) {
      contador = contador + ($scope.products[i].price * $scope.products[i].currentAmount);
    };
      $scope.factura.subtotal = contador;
  };

  $scope.CancelAll = function(){
    $state.reload();
  };

  $scope.reduccionInventario = function(divName){
    for (var i = $scope.products.length - 1; i >= 0; i--) {
      $scope.products[i].quantity = $scope.products[i].quantity - $scope.products[i].currentAmount;
    };
    for (var i = $scope.products.length - 1; i >= 0; i--) {
      HomeService.ChangeSoldProduct($scope.products[i]).then(function(response){
        $scope.products = response.data;
        if ($scope.products.quantity <= 0) {
          HomeService.NoMoreItems($scope.products).then(function(response){
            $scope.products = response.data;

          })
        };
      }).catch(function(err){

      });

      try{
        var printContents = document.getElementById(divName).innerHTML;
        var popupWin = window.open('', '_blank', 'width=300,height=300');
        popupWin.document.open()
        popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + printContents + '</html>');
        popupWin.document.close();
      }catch(e){

      }

      $state.reload();
    };
  };
}]);
