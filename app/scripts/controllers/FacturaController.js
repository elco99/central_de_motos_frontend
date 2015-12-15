angular.module('AngularScaffold.Controllers')
 .controller('FacturaController', ['$scope', 'ProductService', 'UserService','$state','$sessionStorage', function ($scope, ProductService,UserService,$state,$sessionStorage) {
  $scope.products = [];
  $scope.producto = {};
  $scope.$sessionStorage = $sessionStorage;
  $scope.item = {};
  $scope.factura = {};
  $scope.total = 0;
  $scope.showModal = false;
  $scope.shopping_cart_total =  0;
/*  var doc = new jsPDF('p', 'pt');
  */


  $scope.generate = function() {//descargar pdf
    var columns = ["codigo","nombre","cantidad", "precio"]
    var rows = [];
    for (var i = 0; i < $scope.products.length; i++) {
      var rowItem = [
        $scope.products[i].code,
        $scope.products[i].name,
        $scope.products[i].quantity,
        $scope.products[i].price*$scope.products[i].quantity
      ]
      rows.push(rowItem)
    }
    var specialElementHandlers = {
      '#editor' : function(element, renderer){
        return true;
      }
    };
    var doc = new jsPDF('p', 'pt');
    doc.autoTable(columns, rows);
    doc.fromHTML($('#fecha_cart').get(0), 0 ,5 , {
      'width':180,
      'elementHandlers' : specialElementHandlers

    });
    doc.fromHTML($('#totales').get(0),50 ,25*($scope.products.length+2), {
      'width':180,
      'elementHandlers' : specialElementHandlers

    });
    doc.save('cotizacion.pdf');
  };

  $scope.uploadImage = function(){

      var elm = document.getElementById('imagen'),
      img = elm.files[0],
      filename = img.name,
      filesize = img.size;
      var reader = new FileReader(),binary,base64;
      var prodList = "Lista de articulos comprados en formato { codigo // nombre // cantidad // precio}\n"
      var subtotal = 0;
      for (var i = 0; i < $scope.products.length; i++) {
        prodList = prodList + "{ "+ $scope.products[i].code + " // " + $scope.products[i].name+ " // " + $scope.products[i].quantity + " // " +
        $scope.products[i].price*$scope.products[i].quantity + " }\n";
        subtotal = subtotal + ($scope.products[i].price*$scope.products[i].quantity)
      }

      prodList = prodList + "\n subtotal: " + subtotal+"\n IVS:"+ subtotal*0.15 + "\n Total: " + ((subtotal*0.15)+subtotal)
      console.log(prodList)
      reader.addEventListener('loadend', function(){
        binary = reader.result;
        base64 = btoa(binary);
        var imgbase64 = {
          username: $sessionStorage.currentUser.username,
          base64 : base64,
          itemList : prodList
        }
        UserService.send_mail(imgbase64).then(function(response){
          alert(response.data)
        }).catch(function(err){
          alert('Error from cart')
        });
      }, false);
      UserService.updateDeposited($scope.$sessionStorage.currentUser).then(function(response){
        alert(response.data)
      }).catch(function(err){
        alert('Error from cart')
      });
      reader.readAsBinaryString(img);

   }

   $scope.wasBought = function(){
     return  $sessionStorage.currentUser.bought_cart;
   }


   $scope.habilitar_upload_image = function() {
     UserService.updateBought($scope.$sessionStorage.currentUser).then(function(response){
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
    UserService.remove_from_cart(params).then(function(response){
     $scope.products.splice($scope.products.indexOf(product),1);
     $scope.putSubTotal();
     $scope.shopping_cart_subtotal();
    }).catch(function(err){
      alert('Error deleting product from cart')
    });
  }

  $scope.remove_from_factura = function(product){
     $scope.products.splice($scope.products.indexOf(product),1);
  }


  $scope.fill_shopping_cart = function(){

    UserService.fill_cart($scope.$sessionStorage.currentUser).then(function(response){
        $scope.products = response.data.cart;
        $scope.shopping_cart_subtotal();

    }).catch(function(err){
      alert('Error fetching products')
    });
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
      $scope.item = {};
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

  $scope.shopping_cart_subtotal = function(){
      var contador = 0;
      for (var i = $scope.products.length - 1; i >= 0; i--) {
        contador = contador + ($scope.products[i].price * $scope.products[i].quantity);
      };
        $scope.shopping_cart_total = contador;
    };

  $scope.CancelAll = function(){
    $state.reload();
  };

  $scope.reduccionInventario = function(divName){
    for (var i = $scope.products.length - 1; i >= 0; i--) {
      $scope.products[i].quantity = $scope.products[i].quantity - $scope.products[i].currentAmount;
    };
    for (var i = $scope.products.length - 1; i >= 0; i--) {
      ProductService.ChangeSoldProduct($scope.products[i]).then(function(response){
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
