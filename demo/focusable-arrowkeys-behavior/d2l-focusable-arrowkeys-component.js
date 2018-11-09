import '../../../@polymer/polymer/polymer-legacy.js';
import '../../d2l-focusable-arrowkeys-behavior.js';
import { Polymer } from '../../../@polymer/polymer/lib/legacy/polymer-fn.js';
import { dom } from '../../../@polymer/polymer/lib/legacy/polymer.dom.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-focusable-arrowkeys-component">
	<template strip-whitespace="">
		<style>
			:host {
				display: inline-block;
			}
			#arrowFocusables div {
				display: inline-block;
				padding: 1rem;
				border: 1px solid black;
			}
			#arrowFocusables div:focus {
				border: 1px solid orange;
			}
		</style>
		<div id="arrowFocusables">
			<div tabindex="0">Focusable 1</div>
			<div tabindex="-1">Focusable 2</div>
			<div tabindex="-1">Focusable 3</div>
			<div tabindex="-1">Focusable 4</div>
			<div tabindex="-1">Focusable 5</div>
		</div>
		<p>this is some content</p>
		<a href="https://www.google.ca">google</a>
		<p>more content</p>
	</template>
	
</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-focusable-arrowkeys-component',
	behaviors: [D2L.PolymerBehaviors.FocusableArrowKeysBehavior],
	attached: function() {
		this.arrowKeyFocusablesContainer = this.$.arrowFocusables;
		this.arrowKeyFocusablesProvider = function() {
			return Promise.resolve(Array.prototype.slice.call(dom(this.root).querySelectorAll('[tabindex]')));
		}.bind(this);
	}
});
