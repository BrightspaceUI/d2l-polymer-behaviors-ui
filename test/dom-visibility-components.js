import '../../@polymer/polymer/polymer-legacy.js';
import { Polymer } from '../../@polymer/polymer/lib/legacy/polymer-fn.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-visibility-test">
	<template strip-whitespace="">
		<style>
			:host([hidden]) {
				display: none;
			}
			:host([hidden-shadow]) .container {
				display: none;
			}
		</style>
		<div class="container">
			<slot></slot>
		</div>
	</template>
	
</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-visibility-test'
});
