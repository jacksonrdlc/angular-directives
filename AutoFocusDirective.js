(function (angular) {
    "use strict";

    angular
        .module('outsideClick', [])
        .directive('outsideClick', outsideClickDirective);

    /* @ngInject */
    function autoFocusDirective($timeout) {

        var directive = {
            restrict: 'A',
            link: link
        };

        function link(scope, element, attrs) {
            $(element).click(function () {
                var $focusTarget = $(attrs.autoFocus + ':not([readonly])');
                var selectAfterFocus = scope.$eval(attrs.selectAfterFocus);

                $timeout(function () {
                    var focused = $focusTarget.focus();
                    if (_.isUndefined(selectAfterFocus) || selectAfterFocus) {
                        focused.select();
                    } else {
                        // Move the cursor to the end of text
                        if (focused.length > 0 && _.isFunction(focused[0].setSelectionRange)) {
                            var selectionEnd = focused.val().length * 2;
                            focused[0].setSelectionRange(selectionEnd, selectionEnd);
                        }
                    }

                    if (attrs.autoFocusSelect2) {
                        // allows for optional use of select2's 'open' command
                        $focusTarget.select2(attrs.autoFocusSelect2 || 'focus');
                    }

                }, 300);

            });
        }

        return directive;
    }

}(window.angular));