'use strict';

/**
 * @ngdoc function
 * @name annuaireApp.controller
 * @description
 *
 * Controller of the annuaireApp
 */
angular.module('annuaireApp')
  .controller('UserCtrl',  ['$scope', '$http', '$routeParams', '$location', 'Users', function ($scope, $http, $routeParams, $location, Users) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.getAll = function() {
        Users.getAll(function(data) {
            $scope.users = data;
        }, function(data) {
            $scope.error = data;
        });
    }

    $scope.delete = function (userId) {
      Users.delete(userId, function(data){
        $location.path('/users');
        $scope.getAll();
      }, function (data){
        $scope.error = "Erreur dans la suppression de l'utilisateur";
      });
    }

        $scope.getAll();
  }])

  .controller('AddUserCtrl',['$scope', '$http', '$routeParams', '$location', 'Users', function ($scope, $http, $routeParams, $location, Users){
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.saveData = function () {
      Users.add($scope.user, function (data){
          $location.path('/users');
      }, function (data){
      });
    }

  }])

  .controller('DetailUserCtrl',['$scope', '$http', '$routeParams', 'Users', 'Roles', 'Projects', function ($scope, $http, $routeParams, Users, Roles, Projects) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    if ($routeParams.userId) {
      Users.get($routeParams.userId,
        function (data) {
          $scope.user = data;
          var donneesProj = new Array();
          Users.getProj($routeParams.userId,
            function (data) {
              donneesProj = data;
              var donneesRoles = new Array();
              Users.getRoles($routeParams.userId,
                function(data){
                  donneesRoles = data;
                  for(var i = 0 ; i < donneesRoles.length ; ++i){
                    for(var j = 0 ; j < donneesProj.length ; ++j) {
                      if(donneesRoles[i].ProjectId === donneesProj[j].id){
                        donneesRoles[i].title = donneesProj[j].title;
                        donneesRoles[i].description = donneesProj[j].description;
                        break;
                      }
                    }
                  }
                  $scope.projects = donneesRoles;
                }, function (data) {
                  //a faire
                })
            }, function (data){
              // a faire
            })
        },
        function (data) {
          $scope.error = data;
        });
    }
  }])

  .controller('EditUserCtrl', ['$scope', '$http', '$routeParams', '$location', 'Users', function ($scope, $http, $routeParams, $location, Users) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.delete = function (userId) {
      Users.delete(userId, function(data){
        $location.path('/users');
      }, function (data){
        $scope.error = "Erreur dans la suppression de l'utilisateur";
      });
    }

    if ($routeParams.userId) {
      Users.get($routeParams.userId,
        function(data) {
          $scope.user = data;
        },
        function(data) {
          $scope.error = data;
        });
    }

    $scope.saveData = function() {
      Users.edit($scope.user,
        function(data) {
          $location.path('/'+ data.id +'/detailsUser');
        },
        function(data) {
          $scope.error = data;
        });
    };
  }])

