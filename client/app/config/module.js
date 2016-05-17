'use strict';
(function () {
  function allRoleList (Role) {
    'ngInject';
    return Role.getAll();
  }
  function configConfig($stateProvider) {
    'ngInject';
    $stateProvider
      .state('app.config', {
        url: '/config',
        data: {
          title: 'System Configuration'
        }
      })
      .state('app.config.user', {
        url: '/config/user',
        data: {
          title: 'User Management'
        },
        views: {
          "content@app": {
            templateUrl: '/app/config/user/index.html',
            controller: 'userCtrl',
            resolve: {
              allRoleList: allRoleList
            }
          }
        }
      })
  }
  angular.module('app.config', ['ui.router'])
    .config(configConfig);
})();
