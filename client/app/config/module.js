'use strict';
(function () {
  function dashboardConfig($stateProvider) {
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
            controller: 'userCtrl'
          }
        }
      })
  }
  angular.module('app.dashboard', ['ui.router'])
    .config(dashboardConfig);
})();
