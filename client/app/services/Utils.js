/**
 * Created by mandy on 16-4-20.
 */
(function () {
  function Utils () {
    'ngInject';
    function _clone(obj) {
      if (null == obj || 'object' != typeof obj) return obj;

      if (obj instanceof Date) {
        var copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
      }

      if (obj instanceof Array) {
        var copy = [];
        for (var i = 0, len = obj.length; i < len; ++i) {
          copy[i] = _clone(obj[i]);
        }
        return copy;
      }

      if (obj instanceof Object) {
        var copy = {};
        for (var attr in obj) {
          if (obj.hasOwnProperty(attr)) copy[attr] = _clone(obj[attr]);
        }
        return copy;
      }
    }

    function _pick(obj, list) {
      var re = {};
      for (var i in list) {
        if (list[i] in obj) {
          if (obj.hasOwnProperty(list[i])) {
            re[list[i]] = _clone(obj[list[i]]);
          }
        }
      }
      return re;
    }

    function _pickBy(obj, test) {
      var re = {};
      for (var attr in obj) {
        if (obj.hasOwnProperty(attr) && test(obj[attr], attr)) {
          re[attr] = _clone(obj[attr]);
        }
      }
      return re;
    }

    this.clone = _clone;
    this.pick = _pick;
    this.pickBy = _pickBy;
  }
  angular.module('app').service('_', Utils)
})();

