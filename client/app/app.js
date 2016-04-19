'use strict';
/*
 * app config
 * including http interceptor and http default config
 */
function appConfig($provide, $httpProvider, $stateProvider, $urlRouterProvider) {
  'ngInject';
  // Intercept http calls.
  $provide.factory('ErrorHttpInterceptor', ['$q', function ($q) {
    function notifyError(rejection){
      console.log(rejection);
    }

    return {
      // On request failure
      requestError: function (rejection) {
        // show notification
        notifyError(rejection);

        // Return the promise rejection.
        return $q.reject(rejection);
      },

      // On response failure
      responseError: function (rejection) {
        // show notification
        notifyError(rejection);
        // Return the promise rejection.
        return $q.reject(rejection);
      }
    };
  }]);

  // Add the interceptor to the $httpProvider.
  $httpProvider.interceptors.push('ErrorHttpInterceptor');

  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';

}

/*
 * app run function
 */
function appRun($rootScope, $state, $stateParams, $http, $cookies) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
  $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
}

var app = angular.module('app', [
    'ngCookies',
    'ui.router',

    'app.layout',
    'app.dashboard',
  ])
  .config(appConfig)
  .constant('API_CONFIG', window.apiConfig)
  .run(appRun);

/*
 * bootstrap the angularjs app
 */
function bootstrapApp () {
  angular.bootstrap(document, ['app']);
}

$(function() {


  bootstrapApp();
});
