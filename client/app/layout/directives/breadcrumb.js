/**
 * Created by mandy on 16-3-29.
 */
(function () {
  function breadcrumb ($rootScope) {
    return {
      restrict: 'AE',
      template:
      '<div class="breadcrumb-wrapper">' +
      '<i class="fa fa-map-marker"></i>' +
      '<span>&nbsp;当前位置:&nbsp;&nbsp;</span>' +
      '<ol id="breadcrumb" class="breadcrumb">' +
      '<li ><span>level-1</span></li>' +
      '<li class="active"><span class="text-primary">level-2</span></li>' +
      '</ol>' +
      '</div>',
      link: function ($scope, $elem, $attr) {

        var changeBreadcrumb = function () {
          console.log($rootScope.$state.current);
          if ($rootScope.$state.current.name == 'app.dashboard') {
            $($elem).addClass('hide');
            return;
          }
          else {
            var current = $rootScope.$state.current;
            $($elem).removeClass('hide');
            switch ($rootScope.$state.$current.parent.self.name) {
              case 'app':
                $('#breadcrumb li:last-child').hide();
                $('#breadcrumb li:first-child span').addClass('text-primary').text(current.data.title);
                break;
              case 'app.log':
              case 'app.strategy':
              case 'app.config':
              case 'app.analysis':
              case 'app.report':
                $('#breadcrumb li:first-child span').removeClass('text-primary').text($rootScope.$state.$current.parent.data.title);
                $('#breadcrumb li:last-child span').text(current.data.title);
                $('#breadcrumb li:last-child').show();
                break;
              default :
                $('#breadcrumb li:last-child').hide();
                $('#breadcrumb li:first-child span').text(current.data.title);
                break;
            }
          }
        };
        changeBreadcrumb();

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
          changeBreadcrumb();
        });
      }
    }
  }

  angular.module('app.layout').directive('breadcrumb', breadcrumb);

})();
