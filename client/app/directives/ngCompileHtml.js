(function () {
  function ngCompileHtml($compile) {
    'ngInject';
    return function(scope, element, attrs) {
      var unbindWatch = scope.$watch(
        function(scope) {
          // watch the 'compile' expression for changes
          return scope.$eval(attrs['ngCompileHtml']);
        },
        function(value) {
          // when the 'compile' expression changes
          // assign it into the current DOM
          element.html(value);

          // compile the new DOM and link it to the current
          // scope.
          // NOTE: we only compile .childNodes so that
          // we don't get into infinite loop compiling ourselves
          $compile(element.contents())(scope);
        }
      );
      scope.$on('$destroy', function () {
        unbindWatch();
      })
    };
  }
  angular.module('app').directive('ngCompileHtml', ngCompileHtml);
})();
