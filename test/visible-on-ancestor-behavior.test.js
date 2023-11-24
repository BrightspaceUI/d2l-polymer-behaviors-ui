import './visible-on-ancestor-behavior-components.js';
import { expect, fixture, html } from '@brightspace-ui/testing';

describe('d2l-visible-on-ancestor-behavior', () => {
	let voaFixture;

	const isDisplayed = function(node) {
		return !node.hasAttribute('d2l-visible-on-ancestor-hide');
	};

	const dispatchMouseEvent = function(node, name) {
		const e = new MouseEvent(name, {
			bubbles: false,
			cancelable: false,
			clientX: 0,
			clientY: 0,
			composed: true,
			buttons: 0
		});
		node.dispatchEvent(e);
	};

	describe('no visible-on-ancestor elements', () => {
		beforeEach(async() => {
			voaFixture = await fixture(html`
				<div class="d2l-visible-on-ancestor-target">
					<d2l-visible-on-ancestor-behavior-test id="wc1">focusable 1</d2l-visible-on-ancestor-behavior-test>
				</div>
			`);
		});

		it('is visible', () => {
			expect(isDisplayed(voaFixture.querySelector('#wc1'))).to.equal(true);
		});

		it('is not visible after adding visible-on-ancestor attribute', async() => {
			voaFixture.querySelector('#wc1').setAttribute('visible-on-ancestor', 'visible-on-ancestor');
			await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));

			expect(isDisplayed(voaFixture.querySelector('#wc1'))).to.equal(false);
		});

	});

	describe('no visible-on-ancestor target element', () => {
		beforeEach(async() => {
			voaFixture = await fixture(html`
				<div>
					<d2l-visible-on-ancestor-behavior-test id="wc1" visible-on-ancestor>focusable 1</d2l-visible-on-ancestor-behavior-test>
				</div>
			`);
		});

		it('is visible', () => {
			expect(isDisplayed(voaFixture.querySelector('#wc1'))).to.equal(true);
		});

	});

	describe('visible-on-ancestor', () => {
		beforeEach(async() => {
			voaFixture = await fixture(html`
				<div>
					<d2l-visible-on-ancestor-behavior-test id="wc1">focusable 1</d2l-visible-on-ancestor-behavior-test>
					<div class="d2l-visible-on-ancestor-target" tabindex="0">
						<d2l-visible-on-ancestor-behavior-test id="wc2" tabindex="0">focusable 2</d2l-visible-on-ancestor-behavior-test>
						<d2l-visible-on-ancestor-behavior-test id="wc3" visible-on-ancestor>focusable 3</d2l-visible-on-ancestor-behavior-test>
					</div>
				</div>
			`);
		});

		it('is visible if visible-on-ancestor attribute not specified', () => {
			expect(isDisplayed(voaFixture.querySelector('#wc1'))).to.equal(true);
			expect(isDisplayed(voaFixture.querySelector('#wc2'))).to.equal(true);
		});

		it('is not visible if visible-on-ancestor attribute is specified', async() => {
			await new Promise(resolve => requestAnimationFrame(resolve));
			expect(isDisplayed(voaFixture.querySelector('#wc3'))).to.equal(false);
		});

		it('is visible if mouseenter event fires for visible-on-ancestor target', async() => {
			dispatchMouseEvent(voaFixture.querySelector('.d2l-visible-on-ancestor-target'), 'mouseenter');
			await new Promise(resolve => requestAnimationFrame(resolve));
			expect(isDisplayed(voaFixture.querySelector('#wc3'))).to.equal(true);
		});

		it('is not visible if mouseleave event fires for visible-on-ancestor target', async() => {
			dispatchMouseEvent(voaFixture.querySelector('.d2l-visible-on-ancestor-target'), 'mouseenter');
			await new Promise(resolve => requestAnimationFrame(resolve));
			expect(isDisplayed(voaFixture.querySelector('#wc3'))).to.equal(true);
			dispatchMouseEvent(voaFixture.querySelector('.d2l-visible-on-ancestor-target'), 'mouseleave');
			await new Promise(resolve => requestAnimationFrame(resolve));
			expect(isDisplayed(voaFixture.querySelector('#wc3'))).to.equal(false);
		});

		it('is visible if visible-on-ancestor target is focused', async() => {
			voaFixture.querySelector('.d2l-visible-on-ancestor-target').focus();
			await new Promise(resolve => requestAnimationFrame(resolve));
			expect(isDisplayed(voaFixture.querySelector('#wc3'))).to.equal(true);
		});

		it('is visible if visible-on-ancestor target child is focused', async() => {
			voaFixture.querySelector('#wc2').focus();
			await new Promise(resolve => requestAnimationFrame(resolve));
			expect(isDisplayed(voaFixture.querySelector('#wc3'))).to.equal(true);
		});

		it('is visible if mouseleave event fires for visible-on-ancestor target and child is focused', async() => {
			voaFixture.querySelector('#wc2').focus();
			await new Promise(resolve => requestAnimationFrame(resolve));
			expect(isDisplayed(voaFixture.querySelector('#wc3'))).to.equal(true);
			dispatchMouseEvent(voaFixture.querySelector('.d2l-visible-on-ancestor-target'), 'mouseleave');
			await new Promise(resolve => requestAnimationFrame(resolve));
			expect(isDisplayed(voaFixture.querySelector('#wc3'))).to.equal(true);
		});

		it('is not visible if focus is moved to element outside visible-on-ancestor target', async() => {
			voaFixture.querySelector('#wc2').focus();
			await new Promise(resolve => requestAnimationFrame(resolve));
			expect(isDisplayed(voaFixture.querySelector('#wc3'))).to.equal(true);
			voaFixture.querySelector('#wc1').focus();
			await new Promise(resolve => requestAnimationFrame(resolve));
			expect(isDisplayed(voaFixture.querySelector('#wc3'))).to.equal(false);
		});

	});

	describe('multiple visible-on-ancestor targets', () => {
		beforeEach(async() => {
			voaFixture = await fixture(html`
				<div>
					<div id="target1" class="d2l-visible-on-ancestor-target">
						<d2l-visible-on-ancestor-behavior-test id="wc1" visible-on-ancestor>focusable 1</d2l-visible-on-ancestor-behavior-test>
					</div>
					<div id="target2" class="d2l-visible-on-ancestor-target"></div>
				</div>
			`);
		});

		it('is not visible if visible-on-ancestor element is moved to another target', async() => {
			await new Promise(resolve => requestAnimationFrame(resolve));
			const elem = voaFixture.querySelector('#wc1');
			expect(isDisplayed(elem)).to.equal(false);
			elem.parentNode.removeChild(elem);
			voaFixture.querySelector('#target2').appendChild(elem);
			await new Promise(resolve => requestAnimationFrame(resolve));
			expect(isDisplayed(elem)).to.equal(false);
		});

		it('is not visible when mouseenter fires on old target of transplanted visible-on-ancestor element', async() => {
			await new Promise(resolve => requestAnimationFrame(resolve));
			const elem = voaFixture.querySelector('#wc1');
			elem.parentNode.removeChild(elem);
			voaFixture.querySelector('#target2').appendChild(elem);
			await new Promise(resolve => requestAnimationFrame(resolve));
			dispatchMouseEvent(voaFixture.querySelector('#target1'), 'mouseenter');
			await new Promise(resolve => requestAnimationFrame(resolve));
			expect(isDisplayed(elem)).to.equal(false);
		});

		it('is visible when mouseenter fires on new target of transplanted visible-on-ancestor element', async() => {
			await new Promise(resolve => requestAnimationFrame(resolve));
			const elem = voaFixture.querySelector('#wc1');
			elem.parentNode.removeChild(elem);
			voaFixture.querySelector('#target2').appendChild(elem);
			await new Promise(resolve => requestAnimationFrame(resolve));
			dispatchMouseEvent(voaFixture.querySelector('#target2'), 'mouseenter');
			await new Promise(resolve => requestAnimationFrame(resolve));
			expect(isDisplayed(elem)).to.equal(true);
		});

		it('is not visible when mouseleave fires on new target of transplanted visible-on-ancestor element', async() => {
			await new Promise(resolve => requestAnimationFrame(resolve));
			const elem = voaFixture.querySelector('#wc1');
			elem.parentNode.removeChild(elem);
			voaFixture.querySelector('#target2').appendChild(elem);
			await new Promise(resolve => requestAnimationFrame(resolve));
			dispatchMouseEvent(voaFixture.querySelector('#target2'), 'mouseenter');
			await new Promise(resolve => requestAnimationFrame(resolve));
			expect(isDisplayed(elem)).to.equal(true);
			dispatchMouseEvent(voaFixture.querySelector('#target2'), 'mouseleave');
			await new Promise(resolve => requestAnimationFrame(resolve));
			expect(isDisplayed(elem)).to.equal(false);
		});

	});

});
