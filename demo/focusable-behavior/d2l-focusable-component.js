import '../../../@polymer/polymer/polymer-legacy.js';
import '../../d2l-focusable-behavior.js';
import { Polymer } from '../../../@polymer/polymer/lib/legacy/polymer-fn.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-focusable-component">
	<template strip-whitespace="">
		<style>
			:host, a {
				display: block;
			}
		</style>
		<div>
			<a id="shadow1" href="javascript:void(0);" tabindex="0">Shadow 1</a>
			<slot></slot>
			<a id="shadow2" class="d2l-focusable" href="javascript:void(0);" tabindex="0">Shadow 2 (d2l-focusable)</a>
		</div>
	</template>
	
</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-focusable-component',
	behaviors: [D2L.PolymerBehaviors.FocusableBehavior]
});
