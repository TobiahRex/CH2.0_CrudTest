'use strict';

angular.module('propertyApp')
.service('Items', function($http){

  this.getAll = () => $http.get('/api/items/');

  this.addItem = newItem => $http.post('/api/items/', newItem);

  this.deleteItem = itemId => $http.delete(`/api/items/${itemId}`);

  this.updateItem = itemObj => $http.put(`/api/items/${itemObj.id}`, itemObj);


});
