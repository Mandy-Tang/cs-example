/**
 * Created by mandy on 16-4-20.
 */
(function () {
  function layoutCtrl ($rootScope) {
    'ngInject';
    $rootScope.getWord = function (key) {
      return key;
    }
    $rootScope.myMenus = {
      'app.dashboard': true,
      'app.config': true,
      'app.config.status': true,
      'app.config.setting': true,
      'app.config.engine': true,
      'app.config.user': true,
      'app.config.role': true,
      'app.config.audit': true,
      'app.config.authorization': true,
      'app.config.update': true,
      'app.config.me': true
    };
  }
  angular.module('app.layout').controller('layoutCtrl', layoutCtrl);
})();
