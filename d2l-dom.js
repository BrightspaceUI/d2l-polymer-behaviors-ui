import {
	findComposedAncestor,
	getComposedChildren,
	getComposedParent,
	isComposedAncestor
} from '@brightspace-ui/core/helpers/dom.js';

window.D2L = window.D2L || {};
window.D2L.Dom = window.D2L.Dom || {};
window.D2L.Dom.findComposedAncestor = findComposedAncestor;
window.D2L.Dom.getComposedChildren = getComposedChildren;
window.D2L.Dom.getComposedParent = getComposedParent;
window.D2L.Dom.isComposedAncestor = isComposedAncestor;
window.D2L.Dom.getOffsetParent = function(node) {
	if (!window.ShadowRoot) {
		return node.offsetParent;
	}

	if (
		!this.getComposedParent(node) ||
		node.tagName === 'BODY' ||
		window.getComputedStyle(node).position === 'fixed'
	) {
		return null;
	}

	let currentNode = this.getComposedParent(node);
	while (currentNode) {
		if (currentNode instanceof ShadowRoot) {
			currentNode = this.getComposedParent(currentNode);
		} else if (currentNode instanceof DocumentFragment) {
			return null;
		} else if (currentNode.tagName === 'BODY') {
			return currentNode;
		}
		const position = window.getComputedStyle(currentNode).position;
		const tagName = currentNode.tagName;

		if (
			(position && position !== 'static') ||
			position === 'static' && (tagName === 'TD' || tagName === 'TH' || tagName === 'TABLE')
		) {
			return currentNode;
		}
		currentNode = this.getComposedParent(currentNode);
	}

	return null;
};
