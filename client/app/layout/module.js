"use strict";
(function () {
  function layoutConfig($stateProvider, $urlRouterProvider) {
    'ngInject';
    $stateProvider
      .state('app', {
        abstract: true,
        data: {
          title: 'cs-system'
        },
        views: {
          root: {
            templateUrl: '/app/layout/index.html',
            controller: 'layoutCtrl'
          }
        }
      });
    $urlRouterProvider.otherwise('/dashboard');
  }

  angular.module('app.layout', ['ui.router'])
    .config(layoutConfig);
})();
