'use strict';

/**
 * @ngdoc overview
 * @name gestionUsersApp
 * @description
 * # gestionUsersApp
 *
 * Main module of the application.
 */
angular
  .module('gestionUsersApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html'
      })
      .when('/utilisateurs', {
        templateUrl: '../views/utilisateurs/utilisateurs.html',
        controller: 'UtilCtrl'
      })
      .when('/projets',{
        templateUrl:'../views/projets/projets.html',
        controller: 'ProjCtrl'
      })
      .when('/addUtil',{
        templateUrl:'../views/utilisateurs/addUtil.html',
        controller: 'AddUtilCtrl'
      })
      .when('/addProj',{
        templateUrl:'../views/projets/addProj.html',
        controller: 'AddProjCtrl'
      })
      .when('/:userId/detailsUtil',{
        templateUrl:'../views/utilisateurs/detailsUtil.html',
        controller:'DetailUtilCtrl'
      })
      .when('/:userId/editerUtil', {
        templateUrl:'../views/utilisateurs/addUtil.html',
        controller:'EditUtilCtrl'
      })
      .when('/:projId/editerProj', {
        templateUrl:'../views/projets/addProj.html',
        controller:'EditProjCtrl'
      })
      .when('/:projId/detailsProj', {
        templateUrl:'../views/projets/detailsProj.html',
        controller: 'DetailProjCtrl'
      })
      .when('/addRole', {
        templateUrl:'../views/roles/addRole.html',
        controller: 'AddRoleCtrl'
      })
      .when('/:roleId/editerRole', {
        templateUrl:'../views/roles/addRole.html',
        controller: 'EditRoleCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
