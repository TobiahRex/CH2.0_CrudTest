'use strict';
console.log('homecontroller');
angular.module('propertyApp')
.controller('homeController', function($scope, $state, Items, Rooms){
  console.log('homeController');

  let firstRender = () => {
    Items.getAll()
    .then(res => {
      console.log('res.data: ', res);

      let total = 0;
      res.data.forEach(item=> {
        total += item.value;
      });
      $scope.total = total;
      $scope.items = res.data;
      console.log('items', $scope.items);
    })
    .catch(()=> {
      $scope.items = "ERROR No Data!!!!!"
    });
  };
  $scope.$on('firstRender', firstRender());


  let addItem = newItem => {
    console.log('newItem to Post: ', newItem);
    Items.addItem(newItem)
    .then(res=> {
      console.log('new return items: ', res.data);
      firstRender();
    })
    .catch(()=> {
      $scope.items = 'ERROR : no data';
    });
  };

  $scope.newItem = item => {
    let newItem = angular.copy(item);
    addItem(newItem);
  };

  $scope.editItem = item => {
    console.log(item);
    let editThis = angular.copy(item);
    console.log('editThis: ', editThis);
    $scope.item.name = editThis.item.name;
    $scope.item.value = editThis.item.value;
    $scope.item.room = editThis.item.room;
    $scope.item._id = editThis.item._id;
  };

  $scope.deleteItem = item => {
    Items.deleteItem(item.item._id)
    .then(()=> {
      firstRender();
    })
    .catch(()=> {
      console.log('ERROR : could not delete');
    });
  };


  $scope.submitEdit = item => {
    let itemForEdit = angular.copy(item);

    Items.updateItem(itemForEdit.item._id, editObj)
    .then(res => {
      updateData(res.data);
    });

  };
});
