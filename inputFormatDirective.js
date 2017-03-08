// Input Format Directive

// Directions
// allow you to format a text input field and decide on the prepending symbol
// <input type="text" ng-model="test" format="number" symbol="" />
// <input type="text" ng-model="test" format="currency" symbol="$" />

function inputFormatDirective($filter) {
    return {
        require: '?ngModel',
        link: function(scope, elem, attrs, ctrl) {
            if (!ctrl) return;

            ctrl.$formatters.unshift(function(a) {
                return $filter(attrs.format)(ctrl.$modelValue, attrs.symbol)
            });

            elem.bind('blur', function(event) {
                var plainNumber = elem.val().replace(/[^\d|\-+|\.+]/g, '');
                elem.val($filter(attrs.format)(plainNumber, attrs.symbol));
            });
        }
    };
}

appModule.directive('format', inputFormatDirective);
