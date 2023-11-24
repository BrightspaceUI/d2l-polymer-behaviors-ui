import '@polymer/polymer/polymer-legacy.js';
import 'fastdom/fastdom.js';
window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};

/** @polymerBehavior */
D2L.PolymerBehaviors.FocusableArrowKeysBehavior = {

	properties: {

		arrowKeyFocusablesContainer: {
			type: Object,
			observer: '__handleArrowKeyFocusablesContainer',
		},

		arrowKeyFocusablesOnBeforeFocus: {
			type: Object
		},

		arrowKeyFocusablesProvider: {
			type: Object
		},

		arrowKeyFocusablesDirection: {
			type: String,
			value: 'leftright'
		},

		arrowKeyFocusablesNoWrap: {
			type: Boolean,
			value: false
		}

	},

	__keyCodes: {
		END: 35,
		HOME: 36,
		LEFT: 37,
		UP: 38,
		RIGHT: 39,
		DOWN: 40
	},

	ready: function() {
		this.__handleKeyDown = this.__handleKeyDown.bind(this);
	},

	detached: function() {
		this.arrowKeyFocusablesContainer = null;
		this.arrowKeyFocusablesProvider = null;
		this.arrowKeyFocusablesOnBeforeFocus = null;
	},

	__focus: function(elem) {
		if (elem) {
			if (this.arrowKeyFocusablesOnBeforeFocus) {
				this.arrowKeyFocusablesOnBeforeFocus(elem).then(function() {
					fastdom.mutate(function() { elem.focus(); });
				});
			} else {
				fastdom.mutate(function() { elem.focus(); });
			}
		}
	},

	__focusFirst: function() {
		if (!this.arrowKeyFocusablesProvider) {
			Promise.reject('No focusables provider.');
		}
		return this.arrowKeyFocusablesProvider().then(
			function(elems) {
				if (elems && elems.length > 0) {
					this.__focus(elems[0]);
				}
			}.bind(this)
		);
	},

	__focusLast: function() {
		if (!this.arrowKeyFocusablesProvider) {
			Promise.reject('No focusables provider.');
		}
		return this.arrowKeyFocusablesProvider().then(
			function(elems) {
				if (elems && elems.length > 0) {
					this.__focus(elems[elems.length - 1]);
				}
			}.bind(this)
		);
	},

	__focusNext: function(elem) {
		if (!this.arrowKeyFocusablesProvider) {
			Promise.reject('No focusables provider.');
		}
		return this.arrowKeyFocusablesProvider().then(
			function(elems) {
				var next = this.__tryGetNextFocusable(elems, elem);
				this.__focus(next);
			}.bind(this)
		);
	},

	__focusPrevious: function(elem) {
		if (!this.arrowKeyFocusablesProvider) {
			Promise.reject('No focusables provider.');
		}
		return this.arrowKeyFocusablesProvider().then(
			function(elems) {
				var previous = this.__tryGetPreviousFocusable(elems, elem);
				this.__focus(previous);
			}.bind(this)
		);
	},

	__handleArrowKeyFocusablesContainer: function(newElem, oldElem) {
		if (oldElem) {
			oldElem.removeEventListener('keydown', this.__handleKeyDown);
		}
		if (!newElem) {
			return;
		}
		newElem.addEventListener('keydown', this.__handleKeyDown);
	},

	__handleKeyDown: function(e) {
		var target = e.target;
		if (this.arrowKeyFocusablesDirection.indexOf('left') >= 0 && e.keyCode === this.__keyCodes.LEFT) {
			fastdom.measure(function() {
				if (!this.isConnected) return;
				if (getComputedStyle(this).direction === 'rtl') {
					this.__focusNext(target);
				} else {
					this.__focusPrevious(target);
				}
			}.bind(this));
		} else if (this.arrowKeyFocusablesDirection.indexOf('right') >= 0 && e.keyCode === this.__keyCodes.RIGHT) {
			fastdom.measure(function() {
				if (!this.isConnected) return;
				if (getComputedStyle(this).direction === 'rtl') {
					this.__focusPrevious(target);
				} else {
					this.__focusNext(target);
				}
			}.bind(this));
		} else if (this.arrowKeyFocusablesDirection.indexOf('up') >= 0 && e.keyCode === this.__keyCodes.UP) {
			this.__focusPrevious(target);
		} else if (this.arrowKeyFocusablesDirection.indexOf('down') >= 0 && e.keyCode === this.__keyCodes.DOWN) {
			this.__focusNext(target);
		} else if (e.keyCode === this.__keyCodes.HOME) {
			this.__focusFirst();
		} else if (e.keyCode === this.__keyCodes.END) {
			this.__focusLast();
		} else {
			return;
		}
		e.preventDefault();
	},

	__tryGetNextFocusable: function(elems, elem) {
		if (!elems || elems.length === 0) {
			return;
		}
		var index = elems.indexOf(elem);
		if (index === elems.length - 1) {
			if (this.arrowKeyFocusablesNoWrap) {
				return;
			}
			return elems[0];
		}
		return elems[index + 1];
	},

	__tryGetPreviousFocusable: function(elems, elem) {
		if (!elems || elems.length === 0) {
			return;
		}
		var index = elems.indexOf(elem);
		if (index === 0) {
			if (this.arrowKeyFocusablesNoWrap) {
				return;
			}
			return elems[elems.length - 1];
		}
		return elems[index - 1];
	}

};
