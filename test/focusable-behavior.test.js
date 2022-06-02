import '../d2l-dom-focus.js';
import './focusable-behavior-components.js';
import { expect, fixture, html, oneEvent } from '@open-wc/testing';

describe('d2l-focusable-behavior', () => {
	let simpleFixture;

	beforeEach(async() => {
		simpleFixture = await fixture(html`
			<d2l-focusable-test id="wc1">
				<a id="light1" class="d2l-focusable" href="javascript:void(0);"></a>
			</d2l-focusable-test>
		`);
	});

	it('does not initially have focus applied to the d2l-focusable element', () => {
		expect(document.activeElement).to.equal(document.body);
	});

	it('focuses on element with d2l-focusable when focus method is called', () => {
		simpleFixture.focus();
		expect(D2L.Dom.Focus.getComposedActiveElement()).to.equal(simpleFixture.getShadow2());
	});

	it('triggers the focus event when focus method is called on custom element', async() => {
		setTimeout(() => simpleFixture.focus());
		await oneEvent(simpleFixture, 'focus');
	});

	it('triggers the focus event when focus method is called on focusable element', async() => {
		setTimeout(() => simpleFixture.getShadow2().focus());
		await oneEvent(simpleFixture, 'focus');
	});

	it('triggers the blur event when custom element is blurred', async() => {
		simpleFixture.focus();
		const outside = simpleFixture.querySelector('#light1');
		setTimeout(() => outside.focus());
		await oneEvent(simpleFixture, 'blur');
	});

	it('triggers the blur event when custom element focusable element is blurred', async() => {
		simpleFixture.getShadow2().focus();
		const outside = simpleFixture.querySelector('#light1');
		setTimeout(() => outside.focus());
		await oneEvent(simpleFixture, 'blur');
	});

	it('triggers the blur event on light DOM element when focus method is called on custom element', async() => {
		const startingElement = simpleFixture.querySelector('#light1');
		startingElement.focus();

		setTimeout(() => simpleFixture.focus());
		await oneEvent(startingElement, 'blur');
	});
});
