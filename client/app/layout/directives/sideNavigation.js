/**
 * Created by mandy on 16-3-29.
 */
(function () {
  function sideNavigation($timeout) {
    'ngInject';
    return {
      restrict: 'EA',
      scope: false,
      link: function($scope, $elem, $attr) {
      }
    }
  }
  angular.module('app.layout').directive('sideNavigation', sideNavigation);
})();
