import '@polymer/polymer/polymer-legacy.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';

window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};

/** @polymerBehavior */
D2L.PolymerBehaviors.FocusableBehavior = {

	/**
	 * Applies focus to descendent with `d2l-focusable` class.
	 */
	focus: function() {
		var elem = dom(this.root).querySelector('.d2l-focusable');
		if (!elem) return;
		elem.focus();
	}

};
