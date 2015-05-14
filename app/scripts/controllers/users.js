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
        if($scope.user.name != null && $scope.user.surname != null) {
            Users.add($scope.user, function (data) {
                $location.path('/users');
            }, function (data) {
            });
        }
    }
  }])

  .controller('DetailUserCtrl',['$scope', '$http', '$routeParams', '$route', 'Users', 'Roles', 'Projects', function ($scope, $http, $routeParams, $route, Users, Roles, Projects) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    if ($routeParams.userId) {
      Users.get($routeParams.userId,
        function (data) {
          $scope.user = data;
          var dataProj = new Array();
          Users.getProj($routeParams.userId,
            function (data) {
              dataProj = data;
              var dataRoles = new Array();
              Users.getRoles($routeParams.userId,
                function(data){
                  dataRoles = data;
                  for(var i = 0 ; i < dataRoles.length ; ++i){
                    for(var j = 0 ; j < dataProj.length ; ++j) {
                      if(dataRoles[i].ProjectId === dataProj[j].id){
                        dataRoles[i].title = dataProj[j].title;
                        dataRoles[i].description = dataProj[j].description;
                        break;
                      }
                    }
                  }
                  $scope.projects = dataRoles;
                }, function (data) {
                })
            }, function (data){
            })
        },
        function (data) {
          $scope.error = data;
        });
    }

    $scope.reload = function() {
        Users.get($routeParams.userId, function(data) {
            $scope.user = data;
        }, function(data) {
            $scope.error = data;
        });
    }

    $scope.delete = function (role) {
        Roles.delete(role, function(data) {
            $route.reload();
        }, function (data) {
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
        if($scope.user.name != null && $scope.user.surname != null) {
            Users.edit($scope.user,
                function (data) {
                    $location.path('/' + data.id + '/detailsUser');
                },
                function (data) {
                    $scope.error = data;
                });
        }
    };

  }])

