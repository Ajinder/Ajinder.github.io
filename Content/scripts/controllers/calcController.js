 /*recommended */
  //mainController.js //
// Use IIFE "Immediately invoked function expression"
(function(){
  'use strict';

  angular.module('calcApp').service('calcSvc', calcSvc);

  function calcSvc($http, $q)
  {
          var service = {
              getRecords: getRecords,
              putRecords:putRecords
          }
      
          return service;

      function getRecords()
      {
          var deferred = $q.defer();
          $http({
              method: 'GET',
              url: 'Records.json',
          }).success(function (data) {
              deferred.resolve(data);
          }).error(function (data, status) {
              deferred.reject(false);
          });
          return deferred.promise
      }
      function putRecords()
      {
          var deferred = $q.defer();
          $http({
              method: 'POST',
              url: 'Records.json',
              data: [{"Name":"DJ", "Description":"Software Engineer", "imagePath":"Content/images/img.png" }]
          }).success(function (data) {
              deferred.resolve(data);
          }).error(function (data, status) {
              deferred.reject(false);
          });
          return deferred.promise
      }
  }

    angular
         .module('calcApp')
         .controller('MainController',MainController);


  // Instead of passing the anonymous function use named function controller.
  function  MainController($scope,calcSvc)
    {
      var vm = this;
      vm.records = [];

      getRecords();
      function getRecords() {
          return calcSvc.getRecords().then(function (data) {
              vm.records = data;
              return vm.records;
          }, function (error) {
          alert(error)});
      }

      putRecords();
      function putRecords() {
          return calcSvc.putRecords().then(function (data) {
              debugger
          }, function (error) {
              alert(error)
          });
      }
     //this.records = [{
     //   Name:'AJ',
     //   Description:'Software Engineer',
     //   imagePath:'Content/images/img.png'
     //},
     //{
     //   Name:'BJ',
     //   Description:'Software Engineer',
     //   imagePath:'Content/images/img.png'
     //},{
     //   Name:'CJ',
     //   Description:'Software Engineer',
     //   imagePath:'Content/images/img.png'
     // }];

};

})();
