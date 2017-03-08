// ----------------------------------------------------------------------------
// Directive: Outside Click (tough to name)
//
// Detects a click outside the directive element, and executes the given expression.
//
// Useful when creating custom dropdown menus or panes, to allow users to click
// anywhere outside the dropdown in order to dismiss it.
//
// Usage:
// <div class="my-custom-dropdown" ng-if="isDropdownOpen" outside-click="closeDropDown()">
//
// NOTE: Assumes usage with ng-if, to avoid $event.stopPropagation requirement on
// button that triggered dropdown. The desired effect is that other open dropdowns
// will automatically close when a new one is opened.
// ----------------------------------------------------------------------------

/* @ngInject */
function outsideClickDirective($document, $parse) {

    var directive = {
        restrict: 'A',
        link: link
    };

    return directive;

    function link(scope, element, attrs) {

        var clickHandler = $parse(attrs.outsideClick),
            additionalElements = ['.modal'],
            skipFirstClick = true;

        if (attrs.outsideClickExcludes) {
            additionalElements.add(attrs.outsideClickExcludes.split(','));
        }

        $document.on('click', onClick);

        function onClick(event) {

            // avoids $event.stopPropagation() requirement on trigger element, assumes DOM entry exit via ng-if (see note above)
            if (skipFirstClick) {
                skipFirstClick = false;
                return;
            }

            var isElement = event.target === element[0],
                isElementChild = element.find(event.target).length !== 0,
                isAdditionalElement = _.some(additionalElements, function (elem) {
                    var addlElem = angular.element(elem),
                        isAddlElement = event.target === addlElem[0],
                        isAddlElementChild = addlElem.find(event.target).length !== 0;
                    return isAddlElement || isAddlElementChild;
                });

            if (isElement || isElementChild || isAdditionalElement) {
                return;
            }

            scope.$apply(function () {
                clickHandler(scope, {
                    $event: event
                });
            });
        }

        element.on('$destroy', function () {
            $document.off('click', onClick);
        });
    }
}

appModule.directive('outsideClick', outsideClickDirective);