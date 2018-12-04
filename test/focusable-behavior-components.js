import '@polymer/polymer/polymer-legacy.js';
import '../d2l-focusable-behavior.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-focusable-test">
	<template strip-whitespace="">
		<div>
			<div>
				<a id="shadow1" href="javascript:void(0);"></a>
			</div>
			<div>
				<slot></slot>
			</div>
			<div>
				<a id="shadow2" class="d2l-focusable" href="javascript:void(0);"></a>
			</div>
		</div>
	</template>
	
</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-focusable-test',
	behaviors: [D2L.PolymerBehaviors.FocusableBehavior],
	getShadow1: function() { return this.$.shadow1; },
	getShadow2: function() { return this.$.shadow2; }
});
