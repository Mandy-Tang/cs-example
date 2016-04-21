/**
 * Created by mandy on 16-4-21.
 */
(function () {
  function User ($http, API_CONFIG) {
    var self = this;
    /**
     * Get the user list
     *
     * @param pageIndex {Number} page index for pagination
     * @param pageRows {Number} page rows in each page for pagination
     * @param query {Object} pairs of key-value for query
     * @param next {Function} callback
     */
    self.getUsers = function (pageIndex, pageRows, query, next) {
      var params = null;
      var httpGet = function (params, next) {
        $http.get(API_CONFIG.USERS, {params: params}).success(function (res) {
          next(res);
        });
      };
      if (arguments.length === 4) { // pageIndex, pageRows, query, next
        params = _.pickBy(query, function (value, key) {
          return value && value !== '';
        });
        params.page_index = pageIndex;
        params.page_rows = pageRows;
        httpGet(params, next);
      } else if (arguments.length === 3 ) { // pageIndex, pageRows, next
        params = {
          page_index: pageIndex,
          page_rows: pageRows
        };
        httpGet(params, arguments[2]);
      } else if (arguments.length === 1) { // next
        params = {
          page_index: 1,
          page_rows: 10
        };
        httpGet(params, arguments[0]);
      } else {

      }
    };

    /**
     * Get user detail by user id
     *
     * @param id {Number} user.id
     * @param next {Function} callback
     */
    self.getUserById = function (id, next) {
      $http.get(API_CONFIG.USER + '/' + id).success(function (res) {
        next(res);
      });
    };

    /**
     *
     * @param user {Object} user
     * @param next {Function} callback
     */
    self.createUser = function (user, next) {
      $http.put(API_CONFIG.USER, $.param(user)).success(function (res) {
        next(res);
      });
    };

    /**
     *
     * @param id {Number} user.id
     * @param next {Function} callback
     */
    self.deleteUserById = function (id, next) {
      $http.delete(API_CONFIG.USER + '/' + id).success(function (res) {
        next(res);
      });
    }
  }
  angular.module('app').service('User', User);
})();
