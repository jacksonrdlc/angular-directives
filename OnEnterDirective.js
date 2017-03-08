(function (angular) {
    "use strict";

    angular
        .module('onEnter', [])
        .directive('onEnter', OnEnterDirective);

    /* @ngInject */
    function onEnterDirective() {
        return {
            restrict: 'A',
            replace: false,
            transclude: false,
            link: function ($scope, element, attrs) {
                element.bind("keydown", function (event) {
                    var keyCode = event.keyCode || event.charCode,
                        clickHandlerExpression;
                    if (keyCode === 13) {
                        clickHandlerExpression = attrs.onEnter;
                        $scope.$apply(clickHandlerExpression);
                        event.preventDefault();
                    }
                });
            }
        };
    }

}(window.angular));