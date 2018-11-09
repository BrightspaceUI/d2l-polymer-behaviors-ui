import '../@polymer/polymer/polymer-legacy.js';
import { dom } from '../@polymer/polymer/lib/legacy/polymer.dom.js';
import { Element } from '../@polymer/polymer/polymer-element.js';
import { useShadow } from '../@polymer/polymer/lib/utils/settings.js';
window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};

/** @polymerBehavior */
D2L.PolymerBehaviors.FocusableBehavior = {

	properties: {
		/**
		 * Fired when the focusable receives focus.
		 *
		 * @event focus
		*/

		/**
		 * Fired when the focusable loses focus.
		 *
		 * @event blur
		*/
	},

	ready: function() {
		this._focusHandler = this._handleFocus.bind(this);
		this._blurHandler = this._handleBlur.bind(this);
	},

	attached: function() {
		var elem = dom(this.root).querySelector('.d2l-focusable');
		if (!elem) return;
		elem.addEventListener('focus', this._focusHandler);
		elem.addEventListener('blur', this._blurHandler);
	},

	detached: function() {
		var elem = dom(this.root).querySelector('.d2l-focusable');
		if (!elem) return;
		elem.removeEventListener('focus', this._focusHandler);
		elem.removeEventListener('blur', this._blurHandler);
	},

	/**
	 * Applies focus to descendent with `d2l-focusable` class.
	 */
	focus: function() {
		// Note: focus event will not be triggered with using Polymer 1 + shady.  If necessary,
		// we can raise a custom event. For now, keeping this bare-bones.
		var elem = dom(this.root).querySelector('.d2l-focusable');
		if (!elem) return;
		elem.focus();
	},

	_handleFocus: function() {
		if (!Element && !useShadow) {
			// This custom focus event is only needed for Polymer 1. We should
			// be able to remove this event once we move to Polymer 2.
			this.dispatchEvent(new CustomEvent(
				'focus',
				{bubbles: false}
			));
		}
	},

	_handleBlur: function() {
		if (!Element && !useShadow) {
			// This custom focus event is only needed for Polymer 1. We should
			// be able to remove this event once we move to Polymer 2.
			this.dispatchEvent(new CustomEvent(
				'blur',
				{bubbles: false}
			));
		}
	}
};
