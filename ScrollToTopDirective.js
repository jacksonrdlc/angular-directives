(function (angular) {
    "use strict";

    angular
        .module('scrollToTop', [])
        .directive('scrollToTop', scrollToTopDirective);

    /* @ngInject */
    function scrollToTopDirective() {

        var directive = {
            restrict: 'A',
            link: link
        };

        function link(scope, element) {
            $(element).click(function () {
                window.scrollTo(0, 0);
            });
        }

        return directive;
    }

}(window.angular));