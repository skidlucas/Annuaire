'use strict';

/**
 * @ngdoc overview
 * @name annuaireApp
 * @description
 * # annuaireApp
 *
 * Main module of the application.
 */
angular
  .module('annuaireApp', [
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
      .when('/users', {
        templateUrl: '../views/users/users.html',
        controller: 'UserCtrl'
      })
      .when('/projects',{
        templateUrl:'../views/projects/projects.html',
        controller: 'ProjCtrl'
      })
      .when('/addUser',{
        templateUrl:'../views/users/addUser.html',
        controller: 'AddUserCtrl'
      })
      .when('/addProj',{
        templateUrl:'../views/projects/addProj.html',
        controller: 'AddProjCtrl'
      })
      .when('/:userId/detailsUser',{
        templateUrl:'../views/users/detailsUser.html',
        controller:'DetailUserCtrl'
      })
      .when('/:userId/editUser', {
        templateUrl:'../views/users/editUser.html',
        controller:'EditUserCtrl'
      })
      .when('/:projId/editProj', {
        templateUrl:'../views/projects/editProj.html',
        controller:'EditProjCtrl'
      })
      .when('/:projId/detailsProj', {
        templateUrl:'../views/projects/detailsProj.html',
        controller: 'DetailProjCtrl'
      })
      .when('/addRole', {
        templateUrl:'../views/roles/addRole.html',
        controller: 'AddRoleCtrl'
      })
      .when('/:roleId/editRole', {
        templateUrl:'../views/roles/editRole.html',
        controller: 'EditRoleCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
