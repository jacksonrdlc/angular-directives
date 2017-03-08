/* -----------------------------------------------------------------
 Directive: Stop Propagation
 Allows the event's default functionality to happen, but prevents it
 from propagating (i.e. stops parent elements from firing the event).
 ------------------------------------------------------------------- */

(function (angular) {
    "use strict";

    angular
        .module('stopPropagation', [])
        .directive('stopPropagation', stopPropagationDirective);

    /* @ngInject */
    function stopPropagationDirective() {

        var directive = {
            restrict: 'A',
            link: link
        };

        function link(scope, element, attrs) {

            var event = attrs.stopPropagation || 'click';

            element.on(event, function (e) {
                e.stopPropagation();
            });
        }

        return directive;
    }

}(window.angular));