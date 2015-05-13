'use strict';

/**
 * @ngdoc function
 * @name gestionUsersApp.controller
 * @description
 *
 * Controller of the gestionUsersApp
 */
angular.module('gestionUsersApp')
  .controller('ProjCtrl',  ['$scope', '$http', '$routeParams', '$location', 'Projects', function ($scope, $http, $routeParams, $location, Projects) {
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

    $scope.deleteElt = function (projId) {
      Projects.delete(projId, function(data){
        $location.url('/projets');// ne marche pas
      }, function (data){
        //erreur dans le delete
      });
    }

  }])
  .controller('AddProjCtrl',  ['$scope', '$http', '$routeParams', 'Projects', function ($scope, $http, $routeParams, Projects) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.saveData = function () {
      Projects.add($scope.project, function (data){
        //afficher l'élément ajouté
      }, function (data){
        //erreur dans l'ajout
      });
    }
  }])

  .controller('EditProjCtrl',['$scope', '$http', '$routeParams', '$location', 'Projects', function ($scope, $http, $routeParams, $location, Projects) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

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
      Projects.edit($scope.project, function (data){
        $location.path('/' + data.id + '/detailsProj');//a test
      }, function (data){
        //erreur dans l'ajout
      });
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
          var donneesUtil = new Array();
          Projects.getUtil($routeParams.projId,
            function (data) {
              donneesUtil = data;
              var donneesRoles = new Array();
              Projects.getRoles($routeParams.projId,
                function (data) {
                  donneesRoles = data;
                  for(var i = 0 ; i < donneesRoles.length ; ++i){
                    for(var j = 0 ; j < donneesUtil.length ; ++j){
                      if(donneesRoles[i].UserId === donneesUtil[j].id){
                        donneesRoles[i].surname = donneesUtil[j].surname;
                        donneesRoles[i].prenom = donneesUtil[j].name;
                        break;
                      }
                    }
                  }
                  $scope.users = donneesRoles;

                }, function (data) {
                  //a faire
                });
            },
            function (data) {
              //a faire
            });

        },
        function (data) {
          $scope.error = data;// a refaire
        });
    }
  }])

