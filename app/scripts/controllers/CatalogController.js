angular.module('AngularScaffold.Controllers')
 .controller('CatalogController', ['$scope', 'HomeService','$state','$stateParams', '$sessionStorage', function ($scope, HomeService,$state,$stateParams, $sessionStorage) {
  $scope.products = [];
  $scope.producto = {};
  if($state.params.content){
    $scope.imageName = $state.params.content.image;
    $scope.name = $state.params.content.name;
    $scope.description = $state.params.content.description;
    $scope.price = $state.params.content.price;
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
}]);
