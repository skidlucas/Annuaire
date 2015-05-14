'use strict';

/**
 * @ngdoc function
 * @name annuaireApp.controller
 * @description
 *
 * Controller of the annuaireApp
 */
angular.module('annuaireApp')
  .controller('ProjCtrl',  ['$scope', '$http', '$routeParams', '$location', 'Projects', function ($scope, $http, $routeParams, $location, Projects) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
     ];

    $scope.getAll = function() {
        Projects.getAll(function(data) {
            $scope.projects = data;
        }, function(data) {
            $scope.error = data;
        });
    }

    $scope.delete = function (projectId) {
        Projects.delete(projectId, function(data){
            $location.path('/projects');
            $scope.getAll();
        }, function (data){
            $scope.error = "Erreur dans la suppression du projet";
        });
    }

    $scope.getAll();
}])

  .controller('AddProjCtrl',  ['$scope', '$http', '$routeParams', '$location', 'Projects', function ($scope, $http, $routeParams, $location, Projects) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.saveData = function () {
        if($scope.project.title != null && $scope.project.year != null) {
            Projects.add($scope.project, function (data) {
                $location.path('/projects');
            }, function (data) {
            });
        }
    }
  }])

  .controller('EditProjCtrl',['$scope', '$http', '$routeParams', '$location', 'Projects', function ($scope, $http, $routeParams, $location, Projects) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.delete = function (projId) {
        Projects.delete(projId, function(data){
            $location.path('/projects');
        }, function (data){
            $scope.error = "Erreur dans la suppression du projet";
        });
    }

    if ($routeParams.projId) {
      Projects.get($routeParams.projId,
        function(data) {
          $scope.project = data;
        },
        function(data) {
          $scope.error = data;
        });
    }

    $scope.saveData = function () {
        if($scope.project.title != null && $scope.project.year != null) {
            Projects.edit($scope.project, function (data) {
                $location.path('/' + data.id + '/detailsProj');
            }, function (data) {
            });
        }
    }
  }])

  .controller('DetailProjCtrl',['$scope', '$http', '$routeParams', 'Users', 'Roles', 'Projects', function ($scope, $http, $routeParams, Users, Roles, Projects) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    if ($routeParams.projId) {
      $scope.users = new Array();
      Projects.get($routeParams.projId,
        function (data) {
          $scope.proj = data;
          var dataUsers = new Array();
          Projects.getUtil($routeParams.projId,
            function (data) {
              dataUsers = data;
              var dataRoles = new Array();
              Projects.getRoles($routeParams.projId,
                function (data) {
                  dataRoles = data;
                  for(var i = 0 ; i < dataRoles.length ; ++i){
                    for(var j = 0 ; j < dataUsers.length ; ++j){
                      if(dataRoles[i].UserId === dataUsers[j].id){
                        dataRoles[i].surname = dataUsers[j].surname;
                        dataRoles[i].prenom = dataUsers[j].name;
                        break;
                      }
                    }
                  }
                  $scope.users = dataRoles;

                }, function (data) {
                });
            },
            function (data) {
            });

        },
        function (data) {
          $scope.error = data;
        });
    }
  }])

