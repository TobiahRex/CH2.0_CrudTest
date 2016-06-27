'use strict';

angular.module('propertyApp')
.controller('mainController', function($scope, $state, Items, Rooms){
  console.log('mainController');

  $scope.$broadcast('firstRender');

});
