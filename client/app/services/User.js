/**
 * Created by mandy on 16-4-21.
 */
(function () {
  function User ($http, API_CONFIG, Alert, $rootScope, _, $cookies, $q, $httpParamSerializerJQLike) {
    'ngInject';

    /**
     * Get the current user
     * @returns {Promise}
     */
    function getMe () {
      var defer = $q.defer();
      $http.get(API_CONFIG.ME).success(function (res) {
        $rootScope.me = res;
        defer.resolve(res);
      }).error(function(res) {
        defer.reject(res);
      });
      return defer.promise;
    }

    /**
     * Update user information of current User
     * @param {Object} user
     * @returns {Promise}
     */
    function updateMe (user) {
      var defer = $q.defer();
      var sUser = _.pick(user, ['realname', 'email', 'telephone', 'address', 'postcode', 'description']);
      $http.put(API_CONFIG.ME, $httpParamSerializerJQLike(sUser)).success(function (res) {
        defer.resolve(res);
      }).error(function(res) {
        defer.reject(res);
      });
      return defer.promise;
    }

    /**
     * Update password of current User
     * @param {Object} pwd
     * @returns {Promise}
     */
    function updateMyPwd (pwd) {
      var defer = $q.defer();
      $http.put(API_CONFIG.ME_PWD, $httpParamSerializerJQLike(pwd)).success(function (res) {
        defer.resolve(res);
      }).error(function(res) {
        defer.reject(res);
      });
      return defer.promise;
    }

    /**
     * Logout
     */
    function logout () {
      $http.get(API_CONFIG.ME_LOGOUT).success(function (res) {
        $cookies.remove('authtips');
        location.href = '/login.html';
      });
    }

    /**
     * Create user
     * @param {Object} user
     * @returns {Promise}
     */
    function create (user) {
      var defer = $q.defer();
      var sUser = _.pick(user, ['username', 'realname', 'email', 'telephone', 'password', 'address', 'postcode', 'description'])
      sUser.role_id = user.role.id;
      $http.post(API_CONFIG.USER, $httpParamSerializerJQLike(sUser)).success(function (res) {
        defer.resolve(res);
      }).error(function(res) {
        defer.reject(res);
      });
      return defer.promise;
    }

    /**
     * Update user
     * @param {Object} user
     * @returns {Promise}
     */
    function update (user) {
      var defer = $q.defer();
      var sUser = _.pick(user, ['username', 'realname', 'email', 'telephone', 'address', 'postcode', 'description']);
      sUser.role_id = user.role.id;
      $http.put(API_CONFIG.USER + '/' + user.id, $httpParamSerializerJQLike(sUser)).success(function (res) {
        defer.resolve(res);
      }).error(function(res) {
        defer.reject(res);
      });
      return defer.promise;
    }

    /**
     * Delete user
     * @param {Number} id
     * @returns {Promise}
     */
    function dele (id) {
      var defer = $q.defer();
      if (id instanceof Array) {
        id = String(id);
      }
      $http.delete(API_CONFIG.USER + '/' + id).success(function (res) {
        defer.resolve(res);
      }).error(function(res) {
        defer.reject(res);
      });
      return defer.promise;
    }

    /**
     * Init user's password
     * @param {Number} id
     * @param {String} newPwd
     * @returns {Promise}
     */
    function initPwd (id, newPwd) {
      var defer = $q.defer();
      $http.put(API_CONFIG.USER_PWD + '/' + id, $httpParamSerializerJQLike({new_password: newPwd})).success(function (res) {
        defer.resolve(res);
      }).error(function(res) {
        defer.reject(res);
      });
      return defer.promise;
    }

    /**
     * Unlock locked user
     * @param {Number} id
     * @returns {Promise}
     */
    function unlock (id) {
      var defer = $q.defer();
      $http.put(API_CONFIG.USER_UNLOCK + '/' + id).success(function (res) {
        defer.resolve(res);
      }).error(function(res) {
        defer.reject(res);
      });
      return defer.promise;
    }

    this.getMe = getMe;
    this.updateMe = updateMe;
    this.updateMyPwd = updateMyPwd;
    this.logout = logout;
    this.create = create;
    this.update = update;
    this.dele = dele;
    this.initPwd = initPwd;
    this.unlock = unlock;
  }
  angular.module('app').service('User', User);
})();
