import '../d2l-dom-focus.js';
import './focusable-arrowkeys-behavior-components.js';
import { expect, fixture, html } from '@open-wc/testing';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import { keyDown } from '@brightspace-ui/core/tools/dom-test-helpers.js';

describe('d2l-focusable-arrowkeys-behavior', () => {
	let simpleFixture, focusables;

	const testKeyInteractions = (keyInteractions) => {
		keyInteractions.forEach((keyInteraction) => {
			it(keyInteraction.name, (done) => {
				simpleFixture.arrowKeyFocusablesOnBeforeFocus = (elem) => {
					return new Promise((resolve) => {
						expect(elem).to.equal(focusables[keyInteraction.endIndex]);
						resolve();
					});
				};
				focusables[keyInteraction.startIndex].focus();
				focusables[keyInteraction.endIndex].addEventListener('focus', () => {
					expect(D2L.Dom.Focus.getComposedActiveElement()).to.equal(focusables[keyInteraction.endIndex]);
					done();
				});
				keyDown(focusables[keyInteraction.startIndex], keyInteraction.keyCode);
			});
		});
	};

	describe('ltr', () => {
		beforeEach(async() => {
			simpleFixture = await fixture(html`<d2l-focusable-arrowkeys-test></d2l-focusable-arrowkeys-test>`);
			focusables = await simpleFixture.arrowKeyFocusablesProvider();
		});

		describe('left-right', () => {
			testKeyInteractions([
				{ name: 'focuses on next focusable when Right arrow key is pressed', startIndex: 2, endIndex: 3, keyCode: 39 },
				{ name: 'focuses on previous focusable when Left arrow key is pressed', startIndex: 2, endIndex: 1, keyCode: 37 },
				{ name: 'focuses on first focusable when Right arrow key is pressed on last focusable', startIndex: 4, endIndex: 0, keyCode: 39 },
				{ name: 'focuses on last focusable when Left arrow key is pressed on first focusable', startIndex: 0, endIndex: 4, keyCode: 37 },
				{ name: 'focuses on first focusable when Home key is pressed', startIndex: 2, endIndex: 0, keyCode: 36 },
				{ name: 'focuses on last focusable when End key is pressed', startIndex: 2, endIndex: 4, keyCode: 35 }
			]);

		});

		describe('up-down', () => {
			beforeEach(() => {
				simpleFixture.arrowKeyFocusablesDirection = 'updown';
			});

			testKeyInteractions([
				{ name: 'focuses on next focusable when Down arrow key is pressed', startIndex: 2, endIndex: 3, keyCode: 40 },
				{ name: 'focuses on previous focusable when Up arrow key is pressed', startIndex: 2, endIndex: 1, keyCode: 38 },
				{ name: 'focuses on first focusable when Down arrow key is pressed on last focusable', startIndex: 4, endIndex: 0, keyCode: 40 },
				{ name: 'focuses on last focusable when Up arrow key is pressed on first focusable', startIndex: 0, endIndex: 4, keyCode: 38 },
				{ name: 'focuses on first focusable when Home key is pressed', startIndex: 2, endIndex: 0, keyCode: 36 },
				{ name: 'focuses on last focusable when End key is pressed', startIndex: 2, endIndex: 4, keyCode: 35 }
			]);

		});

		describe('nowrap - up-down-left-right', () => {
			beforeEach(() => {
				simpleFixture.arrowKeyFocusablesDirection = 'updownleftright';
				simpleFixture.arrowKeyFocusablesNoWrap = true;
			});

			const testNoWrap = (keyInteractions) => {
				keyInteractions.forEach((keyInteraction) => {
					it(keyInteraction.name, (done) => {
						focusables[keyInteraction.startIndex].focus();
						keyDown(focusables[[keyInteraction.startIndex]], keyInteraction.keyCode);

						afterNextRender(simpleFixture, () => {
							expect(D2L.Dom.Focus.getComposedActiveElement()).to.equal(focusables[keyInteraction.startIndex]);
							done();
						});
					});
				});
			};

			testNoWrap([
				{ name: 'does not focus on last focusable when Left arrow key is pressed on first focusable', startIndex: 0, keyCode: 37 },
				{ name: 'does not focus on last focusable when Up arrow key is pressed on first focusable', startIndex: 0, keyCode: 38 },
				{ name: 'does not focus on first focusable when Right arrow key is pressed on last focusable', startIndex: 4, keyCode: 39 },
				{ name: 'does not focus on first focusable when Down arrow key is pressed on last focusable', startIndex: 4, keyCode: 40 }
			]);

		});

	});

	describe('rtl', () => {
		beforeEach(async() => {
			const fullFixture = await fixture(html`<div dir="rtl"><d2l-focusable-arrowkeys-test></d2l-focusable-arrowkeys-test></div>`);
			simpleFixture = fullFixture.querySelector('d2l-focusable-arrowkeys-test');
			focusables = await simpleFixture.arrowKeyFocusablesProvider();
		});

		describe('left-right', () => {
			testKeyInteractions([
				{ name: 'focuses on previous focusable when Right arrow key is pressed', startIndex: 2, endIndex: 1, keyCode: 39 },
				{ name: 'focuses on next focusable when Left arrow key is pressed', startIndex: 2, endIndex: 3, keyCode: 37 },
				{ name: 'focuses on first focusable when Left arrow key is pressed on last focusable', startIndex: 4, endIndex: 0, keyCode: 37 },
				{ name: 'focuses on last focusable when Right arrow key is pressed on first focusable', startIndex: 0, endIndex: 4, keyCode: 39 },
				{ name: 'focuses on first focusable when Home key is pressed', startIndex: 2, endIndex: 0, keyCode: 36 },
				{ name: 'focuses on last focusable when End key is pressed', startIndex: 2, endIndex: 4, keyCode: 35 }
			]);
		});

	});

});
