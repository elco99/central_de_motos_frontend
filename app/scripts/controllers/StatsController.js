angular.module('AngularScaffold.Controllers')
 .controller('StatsController', ['$scope', 'ProductService','$state','$sessionStorage', function ($scope, ProductService,$state,$sessionStorage) {
  $scope.products = [];
  $scope.producto = {};
  $scope.productoModif = {};

  $scope.name_producto = [];
  $scope.cantidad_producto =[];
  $scope.bestSeller_producto = [];
  $scope.bestSeller_name = [];

  $scope.getFetch = function(){
    $scope.products = [];
    $scope.name_producto = [];
    $scope.cantidad_producto =[];
    ProductService.fetchGet().then(function(response){
      $scope.products = response.data;
      for (var i = 0; i<$scope.products.length; i++) {
          $scope.name_producto.push($scope.products[i].name);
          $scope.cantidad_producto.push($scope.products[i].quantity);
          if ($scope.products[i].bestSeller > 0) {
            $scope.bestSeller_name.push($scope.products[i].name);
            $scope.bestSeller_producto.push($scope.products[i].bestSeller);
          }

      };
      $scope.graficaInventario();
      $scope.graficaBestSeller();
    }).catch(function(err){
      alert('Error fetching productos')
    });
  }

  $scope.getFetch();

  $scope.graficaInventario = function () {
    $('#graph1').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Inventario'
        },
        subtitle: {
            text: 'Control de Inventario'
        },
        xAxis: {
            categories: $scope.name_producto,
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Cantidad',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ''
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 80,
            floating: true,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Cantidad',
            colorByPoint: true,
            data: $scope.cantidad_producto
        }]
    });
};

$scope.graficaBestSeller = function () {
    $('#graph2').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Mas Vendidos'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: $scope.bestSeller_name,
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Cantidad',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ''
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 80,
            floating: true,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Cantidad',
            colorByPoint: true,
            data: $scope.bestSeller_producto
        }]
    });
    };


}]);
