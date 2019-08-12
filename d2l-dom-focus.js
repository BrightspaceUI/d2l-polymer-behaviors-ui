import {
	getComposedActiveElement,
	getFirstFocusableDescendant,
	getLastFocusableDescendant,
	getPreviousFocusable,
	getPreviousFocusableAncestor,
	getNextFocusable,
	isFocusable
} from '@brightspace-ui/core/helpers/focus.js';

var Focus = {

	getComposedActiveElement: getComposedActiveElement,

	getFirstFocusableDescendant: getFirstFocusableDescendant,

	getLastFocusableDescendant: getLastFocusableDescendant,

	getPreviousFocusable: getPreviousFocusable,

	getNextFocusable: getNextFocusable,

	getPreviousFocusableAncestor: getPreviousFocusableAncestor,

	isFocusable: isFocusable

};

window.D2L = window.D2L || {};
window.D2L.Dom = window.D2L.Dom || {};
window.D2L.Dom.Focus = Focus;
