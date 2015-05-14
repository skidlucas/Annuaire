'use strict';

/**
 * @ngdoc function
 * @name annuaireApp.controller
 * @description
 *
 * Controller of the annuaireApp
 */
angular.module('annuaireApp')
  .controller('EditRoleCtrl',  ['$scope', '$http', '$routeParams', '$location', 'Roles', 'Projects', 'Users', function ($scope, $http, $routeParams, $location, Roles, Projects, Users) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    Roles.get($routeParams.roleId, function(data){
      $scope.role = data;
      Projects.get(data.ProjectId, function (data) {
        //$scope.projects = data;
        $scope.projSelected = data;
      }, function (data) {
      });
      Users.get(data.UserId, function (data) {
        //$scope.utils = data;
        $scope.userSelected = data;
      }, function (data) {

      });
    }, function(data){

    });

    $scope.saveData = function(){
      $scope.role.UserId = $scope.userSelected.id;
      $scope.role.ProjectId = $scope.projSelected.id;
      $location.path('/' + $scope.role.UserId + '/detailsUser');
        Roles.edit($scope.role,
          function(data){
            $scope.result = data;
          }, function (data) {
            $scope.error = data;
          });
    };
  }])

  .controller('AddRoleCtrl',  ['$scope', '$http', '$routeParams', '$location', 'Roles', 'Projects', 'Users', function ($scope, $http, $routeParams, $location, Roles, Projects, Users) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    Projects.getAll(function (data) {
      $scope.projects = data;
    }, function (data) {
      $scope.error = data;
    });

    Users.getAll(function (data) {
      $scope.users = data;
    }, function (data) {
      $scope.error = data;
    });

    $scope.saveData = function(){
      $scope.role.UserId = $scope.userSelected.id;
      $scope.role.ProjectId = $scope.projSelected.id;
      $location.path('/' + $scope.role.UserId + '/detailsUser');
      Roles.add($scope.role, function(data){
          $scope.result = data;
      }, function (data) {

      });
    }
  }])
