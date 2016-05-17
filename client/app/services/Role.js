/**
 * Created by tangman on 2016/5/10.
 */
(function () {
  function Role ($http, API_CONFIG, $rootScope, _, $cookies, $q, $interval, $httpParamSerializerJQLike) {
    'ngInject';

    function create () {

    }
    function update () {

    }
    function search () {

    }
    function getAll () {
      var defer = $q.defer();
      $http.get(API_CONFIG.ROLES).success(function (res) {
        defer.resolve(res.data);
      }).error(function(res) {
        defer.reject(res);
      });
      return defer.promise;
    }

    function dele () {

    }
    function getMenu () {

    }

    this.create = create;
    this.update = update;
    this.search = search;
    this.getAll = getAll;
    this.dele = dele;
    this.getMenu = getMenu;
  }
  angular.module('app').service('Role', Role);
})();
