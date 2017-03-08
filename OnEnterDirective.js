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

appModule.directive('onEnter', onEnterDirective);