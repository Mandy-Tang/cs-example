function Alert () {
  'ngInject';
  var self = this;
  self.success = function (title, body) {
    toastr.success(body, title, {
      'closeButton': true,
      'debug': false,
      'newestOnTop': false,
      'progressBar': false,
      'positionClass': 'toast-top-right',
      'onclick': null,
      'showDuration': '300',
      'hideDuration': '1000',
      'timeOut': '2000',
      'extendedTimeOut': '1000',
      'showEasing': 'swing',
      'hideEasing': 'linear',
      'showMethod': 'show',
      'hideMethod': 'hide'
    });
  },
    self.error = function (title, body) {
      toastr.error(body, title, {
        'closeButton': true,
        'debug': false,
        'newestOnTop': false,
        'progressBar': false,
        'positionClass': 'toast-top-right',
        'onclick': null,
        'showDuration': '300',
        'hideDuration': '1000',
        'timeOut': '2000',
        'extendedTimeOut': '1000',
        'showEasing': 'swing',
        'hideEasing': 'linear',
        'showMethod': 'show',
        'hideMethod': 'hide'
      });
    },
    self.warning = function (title, body) {
      toastr.warning(body, title, {
        'closeButton': true,
        'debug': false,
        'newestOnTop': false,
        'progressBar': false,
        'positionClass': 'toast-top-right',
        'onclick': null,
        'showDuration': '300',
        'hideDuration': '1000',
        'timeOut': '2000',
        'extendedTimeOut': '1000',
        'showEasing': 'swing',
        'hideEasing': 'linear',
        'showMethod': 'show',
        'hideMethod': 'hide'
      });
    };
  self.info = function (title, body) {
    toastr.info(body, title, {
      'closeButton': true,
      'debug': false,
      'newestOnTop': false,
      'progressBar': false,
      'positionClass': 'toast-top-right',
      'onclick': null,
      'showDuration': '300',
      'hideDuration': '1000',
      'timeOut': '2000',
      'extendedTimeOut': '1000',
      'showEasing': 'swing',
      'hideEasing': 'linear',
      'showMethod': 'show',
      'hideMethod': 'hide'
    });
  }
  self.tips = function (title,body,obj) {
    var place=obj.place|| "toast-bottom-right",
      timeOut=obj.timeOut||false,
      extendedTimeOut=obj.extendedTimeOut||false,
      callback=obj.callback||null;
    toastr.info(body, title, {
      'closeButton': true,
      'debug': false,
      'toastClass':'toasttips',
      'newestOnTop': false,
      'progressBar': false,
      'positionClass': place,
      'closeButtoncallback':callback,
      'onclick': true,
      'showDuration': '300',
      'hideDuration': '1000',
      'timeOut': timeOut,
      'extendedTimeOut':extendedTimeOut,
      'showEasing': 'swing',
      'hideEasing': 'linear',
      'showMethod': 'show',
      'hideMethod': 'hide'
    });
  }
};

angular.module('app').service('Alert', Alert);
