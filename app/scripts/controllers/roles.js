'use strict';

/**
 * @ngdoc function
 * @name gestionUsersApp.controller
 * @description
 *
 * Controller of the gestionUsersApp
 */
angular.module('gestionUsersApp')
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
        //erreur dans le chargement
      });
      Users.get(data.UserId, function (data) {
        //$scope.utils = data;
        $scope.utilSelected = data;
      }, function (data) {

      });
    }, function(data){

    });

    $scope.saveData = function(){
      console.log($scope.projSelected);
      console.log($scope.utilSelected);
    }
  }])

  .controller('AddRoleCtrl',  ['$scope', '$http', '$routeParams', '$location', 'Roles', 'Projects', 'Users', function ($scope, $http, $routeParams, $location, Roles, Projects, Users) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    Projects.getAll($routeParams.projId, function (data) {
      $scope.projects = data;
    }, function (data) {
      //erreur dans le chargement
    });

    Users.getAll($routeParams.userId, function (data) {
      $scope.utils = data;
    }, function (data) {

    });

    $scope.saveData = function(){
      $scope.role.UserId = $scope.utilSelected.id;
      $scope.role.ProjectId = $scope.projSelected.id;
      Roles.add($scope.role, function(data){
        //
      }, function (data) {
        //
      });
    }
  }])
