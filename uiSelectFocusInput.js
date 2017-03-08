// fix for ui-select not focusing properly
// https://github.com/angular-ui/ui-select/issues/1201
(function (angular) {
  "use strict";

  angular
    .module('uiSelectFocusInput', [])
    .directive('uiSelectFocusInput', uiSelectFocusInputDirective);

  /* @ngInject */
  function uiSelectFocusInputDirective($timeout) {
    return {
      require: 'ui-select',
      link: function link(scope) {
        scope.$on('uis:activate', function () {
          // Give it time to appear before focus
          $timeout(function () {
            scope.$select.searchInput[0].focus();
          }, 200);
        });
      }
    };
  }

}(window.angular));