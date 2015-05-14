'use strict';

/**
 * @ngdoc function
 * @name annuaireApp.service:UserServ
 * @description
 * # UserServ
 * Service of the annuaireApp
 */
angular.module('annuaireApp')
    .service('Users', ['$http', function Users($http){
      this.getAll = function(successCB, errorCB) {
        $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users/')
            .success(function(data) {
              if (data.status === 'success') {
                successCB(data.data);
              } else {
                errorCB(data.data);
              }
            });
      };

    //add one user
    this.add = function(user, successCB, errorCB) {
      $http.post('http://poo-ihm-2015-rest.herokuapp.com/api/Users/', user)
        .success(function(data) {
          if (data.status === 'success') {
            successCB(data.data);
          } else {
            errorCB(data.data);
          }
        });
    }

    //delete one user
    this.delete = function(userId, successCB, errorCB) {
      $http.delete('http://poo-ihm-2015-rest.herokuapp.com/api/Users/'+ userId)
        .success(function(data) {
          if (data.status === 'success') {
            successCB(data.data);
          } else {
            errorCB(data.data);
          }
        });
    }

    //select user with his id
    this.get = function(userId, successCB, errorCB) {
      $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users/'+ userId)
        .success(function(data) {
          if (data.status === 'success') {
            successCB(data.data);
          } else {
            errorCB(data.data);
          }
        });
    }

    //edit the user with userId
    this.edit = function(user, successCB, errorCB) {
      $http.put('http://poo-ihm-2015-rest.herokuapp.com/api/Users/'+ user.id, user)
        .success(function(data) {
          if (data.status === 'success') {
            successCB(data.data);
          } else {
            errorCB(data.data);
          }
        });
    }

    this.getProj = function(userId, successCB, errorCB) {
      $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users/'+ userId + '/Projects/')
        .success(function(data) {
          if (data.status === 'success') {
            successCB(data.data);
          } else {
            errorCB(data.data);
          }
        });
    }

    this.getRoles = function(userId, successCB, errorCB) {
      $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users/'+ userId + '/Roles/')
        .success(function(data) {
          if (data.status === 'success') {
            successCB(data.data);
          } else {
            errorCB(data.data);
          }
        });
    }
  }])

  .service('Roles',  ['$http', function Roles($http) {

    //select role corresponding at the id
   this.get = function (roleId, successCB, errorCB) {
      $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Roles/' + roleId)
        .success(function (data) {
          if (data.status === 'success') {
            successCB(data.data);
          } else {
            errorCB(data.data);
          }
        });
    }

    //select all roles for the user
    this.getByUser = function (userId, successCB, errorCB) {
      $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Users/' + userId + '/Roles')
        .success(function (data) {
          if (data.status === 'success') {
            successCB(data.data);
          } else {
            errorCB(data.data);
          }
        });
    }

    //select all user for the project
    this.getByProject = function (projId, successCB, errorCB) {
      $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/' + projId + '/Roles')
        .success(function (data) {
          if (data.status === 'success') {
            successCB(data.data);
          } else {
            errorCB(data.data);
          }
        });
    }

    //add a role
    this.add = function(role, successCB, errorCB) {
      $http.post('http://poo-ihm-2015-rest.herokuapp.com/api/Roles/', role)
        .success(function(data) {
          if (data.status === 'success') {
            successCB(data.data);
          } else {
            errorCB(data.data);
          }
        });
    }

    //add a role for a project
    this.addRole = function(projId, userId, successCB, errorCB) {
      $http.put('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/' + projId + '/Users/' + userId)
        .success(function (data) {
          if (data.status === 'success') {
            successCB(data.data);
          } else {
            errorCB(data.data);
          }
        });
    }

    //edit the role
    this.edit = function(role, successCB, errorCB) {
      $http.put('http://poo-ihm-2015-rest.herokuapp.com/api/Roles/' + role.id, role)
        .success(function (data) {
          if (data.status === 'success') {
            successCB(data.data);
          } else {
            errorCB(data.data);
          }
        });
    }
  }])

  .service('Projects',  ['$http', function Projects($http) {
    //select project with the projectId
    this.get = function (projectId, successCB, errorCB) {
      $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/' + projectId)
        .success(function (data) {
          if (data.status === 'success') {
            successCB(data.data);
          } else {
            errorCB(data.data);
          }
        });
    }

    //get users of the project
    this.getUtil = function (projectId, successCB, errorCB) {
      $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/' + projectId + '/Users/')
        .success(function (data) {
          if (data.status === 'success') {
            successCB(data.data);
          } else {
            errorCB(data.data);
          }
        });
    }

    //get roles of the project
    this.getRoles = function (projectId, successCB, errorCB) {
      $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/' + projectId + '/Roles/')
        .success(function (data) {
          if (data.status === 'success') {
            successCB(data.data);
          } else {
            errorCB(data.data);
          }
        });
    }

    //select all projects
    this.getAll = function (successCB, errorCB) {
      $http.get('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/')
          .success(function (data) {
            if (data.status === 'success') {
              successCB(data.data);
            } else {
              errorCB(data.data);
            }
          });
    };

    //add one project
    this.add = function(project, successCB, errorCB) {
      $http.post('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/', project)
        .success(function(data) {
          if (data.status === 'success') {
            successCB(data.data);
          } else {
            errorCB(data.data);
          }
        });
    }

    //delete one project
    this.delete = function(projId, successCB, errorCB) {
      $http.delete('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/'+ projId)
        .success(function(data) {
          if (data.status === 'success') {
            successCB(data.data);
          } else {
            errorCB(data.data);
          }
        });
    }

    //edit the user with userId
    this.edit = function(proj, successCB, errorCB) {
      $http.put('http://poo-ihm-2015-rest.herokuapp.com/api/Projects/'+ proj.id, proj)
        .success(function(data) {
          if (data.status === 'success') {
            successCB(data.data);
          } else {
            errorCB(data.data);
          }
        });
    }

  }])
