/**
 * Created by tangman on 2016/5/23.
 */
(function () {
  function ngDateRangePicker() {
    'ngInject';
    return {
      restrict: 'EA',
      scope: {
        startTime: '=',
        endTime: '=',
        onCancel: '&',
        onApply: '&'
      },
      replace: true,
      template: '<input>',
      link: function ($scope, $element, $attrs) {
        var format = 'YYYY-MM-DD HH:mm:ss';
        var singleDatePicker = String($attrs['singleDatePicker']) == 'true';
        console.log($attrs['singleDatePicker'])
        function resetTime (ev, picker) {
          $element.val('');
          $scope.startTime = '';
          if (!singleDatePicker) {
            $scope.endTime = '';
          }
          $scope.$apply();
          $scope.onCancel();
        }
        function setTime (ev, picker) {
          if (singleDatePicker) {
            $element.val(picker.startDate.format(format));
            $scope.startTime = picker.startDate.format(format);
          } else {
            $element.val(picker.startDate.format(format) + ' - ' + picker.endDate.format(format));
            $scope.startTime = picker.startDate.format(format);
            $scope.endTime = picker.endDate.format(format);
          }
          $scope.$apply();
          $scope.onApply();
        }
        var options = {
          'singleDatePicker': singleDatePicker,
          'timePicker': true,
          'timePicker24Hour': true,
          'timePickerSeconds': true,
          'autoApply': true,
          'autoUpdateInput': false,
          'locale': {
            'format': format,
            'separator': ',',
            'applyLabel': '确定',
            'cancelLabel': '清空',
            'daysOfWeek': [
              '日',
              '一',
              '二',
              '三',
              '四',
              '五',
              '六'
            ],
            'monthNames': [
              '一月 ',
              '二月 ',
              '三月 ',
              '四月 ',
              '五月 ',
              '六月 ',
              '七月 ',
              '八月 ',
              '九月 ',
              '十月 ',
              '十一月 ',
              '十二月 '
            ],
            'firstDay': 1
          },
          'opens': 'right',
          'startDate': moment().add(-7, 'day').format(format),
          'endData':moment().format(format)
        };

        $($element).daterangepicker(options).on('cancel.daterangepicker', resetTime)
          .on('apply.daterangepicker', setTime);
      }
    }
  }
  angular.module('app').directive('ngDateRangePicker', ngDateRangePicker);
})();
