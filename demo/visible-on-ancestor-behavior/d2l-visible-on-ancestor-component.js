import '../../../@polymer/polymer/polymer-legacy.js';
import '../../d2l-focusable-behavior.js';
import '../../d2l-visible-on-ancestor-behavior.js';
import { Polymer } from '../../../@polymer/polymer/lib/legacy/polymer-fn.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-visible-on-ancestor-component">
	<template strip-whitespace="">
		<style include="d2l-visible-on-ancestor-styles">
			:host {
				display: inline-block;
			}
		</style>
		<button class="d2l-focusable"><slot></slot></button>
	</template>
	
</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-visible-on-ancestor-component',
	behaviors: [
		D2L.PolymerBehaviors.FocusableBehavior,
		D2L.PolymerBehaviors.VisibleOnAncestorBehavior
	]
});
