import '@polymer/polymer/polymer-legacy.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-focus-test">
	<template strip-whitespace="">
		<div>
			<div>
				<a id="shadow1" href="javascript:void(0);"></a>
			</div>
			<div id="content">
				<slot></slot>
			</div>
			<div>
				<a id="shadow2" href="javascript:void(0);"></a>
			</div>
		</div>
	</template>
	
</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-focus-test',
	getShadow1: function() { return this.$.shadow1; },
	getContent: function() { return this.$.content; },
	getShadow2: function() { return this.$.shadow2; }
});
