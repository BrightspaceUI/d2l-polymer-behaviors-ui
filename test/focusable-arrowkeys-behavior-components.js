import '@polymer/polymer/polymer-legacy.js';
import '../d2l-focusable-arrowkeys-behavior.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-focusable-arrowkeys-test">
	<template strip-whitespace="">
		<div id="arrowFocusables">
			<div tabindex="-1"></div>
			<div tabindex="-1"></div>
			<div tabindex="-1"></div>
			<div tabindex="-1"></div>
			<div tabindex="-1"></div>
		</div>
	</template>
	
</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-focusable-arrowkeys-test',
	behaviors: [D2L.PolymerBehaviors.FocusableArrowKeysBehavior],
	attached: function() {
		this.arrowKeyFocusablesContainer = this.$.arrowFocusables;
		this.arrowKeyFocusablesProvider = function() {
			return Promise.resolve(Array.prototype.slice.call(dom(this.root).querySelectorAll('[tabindex]')));
		}.bind(this);
	}
});
