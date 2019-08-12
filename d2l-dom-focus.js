import * as core from '@brightspace-ui/core/helpers/focus.js';

var Focus = {

	getComposedActiveElement: core.getComposedActiveElement,

	getFirstFocusableDescendant: core.getFirstFocusableDescendant,

	getLastFocusableDescendant: core.getLastFocusableDescendant,

	getPreviousFocusable: core.getPreviousFocusable,

	getNextFocusable: core.getNextFocusable,

	getPreviousFocusableAncestor: core.getPreviousFocusableAncestor,

	isFocusable: core.isFocusable

};

window.D2L = window.D2L || {};
window.D2L.Dom = window.D2L.Dom || {};
window.D2L.Dom.Focus = Focus;
