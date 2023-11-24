import '../d2l-dom-focus.js';
import './focusable-arrowkeys-behavior-components.js';
import { expect, fixture, html, oneEvent, sendKeysElem } from '@brightspace-ui/testing';

describe('d2l-focusable-arrowkeys-behavior', () => {
	let simpleFixture, focusables;

	const testKeyInteractions = (keyInteractions) => {
		keyInteractions.forEach((keyInteraction) => {
			it(keyInteraction.name, async() => {
				simpleFixture.arrowKeyFocusablesOnBeforeFocus = (elem) => {
					return new Promise((resolve) => {
						expect(elem).to.equal(focusables[keyInteraction.endIndex]);
						resolve();
					});
				};
				sendKeysElem(focusables[keyInteraction.startIndex], 'press', keyInteraction.key);
				await oneEvent(focusables[keyInteraction.endIndex], 'focus');
				expect(D2L.Dom.Focus.getComposedActiveElement()).to.equal(focusables[keyInteraction.endIndex]);
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
				{ name: 'focuses on next focusable when Right arrow key is pressed', startIndex: 2, endIndex: 3, key: 'ArrowRight' },
				{ name: 'focuses on previous focusable when Left arrow key is pressed', startIndex: 2, endIndex: 1, key: 'ArrowLeft' },
				{ name: 'focuses on first focusable when Right arrow key is pressed on last focusable', startIndex: 4, endIndex: 0, key: 'ArrowRight' },
				{ name: 'focuses on last focusable when Left arrow key is pressed on first focusable', startIndex: 0, endIndex: 4, key: 'ArrowLeft' },
				{ name: 'focuses on first focusable when Home key is pressed', startIndex: 2, endIndex: 0, key: 'Home' },
				{ name: 'focuses on last focusable when End key is pressed', startIndex: 2, endIndex: 4, key: 'End' }
			]);

		});

		describe('up-down', () => {
			beforeEach(() => {
				simpleFixture.arrowKeyFocusablesDirection = 'updown';
			});

			testKeyInteractions([
				{ name: 'focuses on next focusable when Down arrow key is pressed', startIndex: 2, endIndex: 3, key: 'ArrowDown' },
				{ name: 'focuses on previous focusable when Up arrow key is pressed', startIndex: 2, endIndex: 1, key: 'ArrowUp' },
				{ name: 'focuses on first focusable when Down arrow key is pressed on last focusable', startIndex: 4, endIndex: 0, key: 'ArrowDown' },
				{ name: 'focuses on last focusable when Up arrow key is pressed on first focusable', startIndex: 0, endIndex: 4, key: 'ArrowUp' },
				{ name: 'focuses on first focusable when Home key is pressed', startIndex: 2, endIndex: 0, key: 'Home' },
				{ name: 'focuses on last focusable when End key is pressed', startIndex: 2, endIndex: 4, key: 'End' }
			]);

		});

		describe('nowrap - up-down-left-right', () => {
			beforeEach(() => {
				simpleFixture.arrowKeyFocusablesDirection = 'updownleftright';
				simpleFixture.arrowKeyFocusablesNoWrap = true;
			});

			const testNoWrap = (keyInteractions) => {
				keyInteractions.forEach((keyInteraction) => {
					it(keyInteraction.name, async() => {
						sendKeysElem(focusables[keyInteraction.startIndex], 'press', keyInteraction.key);
						await oneEvent(focusables[keyInteraction.startIndex], 'focus');
						expect(D2L.Dom.Focus.getComposedActiveElement()).to.equal(focusables[keyInteraction.startIndex]);
					});
				});
			};

			testNoWrap([
				{ name: 'does not focus on last focusable when Left arrow key is pressed on first focusable', startIndex: 0, key: 'ArrowLeft' },
				{ name: 'does not focus on last focusable when Up arrow key is pressed on first focusable', startIndex: 0, key: 'ArrowUp' },
				{ name: 'does not focus on first focusable when Right arrow key is pressed on last focusable', startIndex: 4, key: 'ArrowRight' },
				{ name: 'does not focus on first focusable when Down arrow key is pressed on last focusable', startIndex: 4, key: 'ArrowDown' }
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
				{ name: 'focuses on previous focusable when Right arrow key is pressed', startIndex: 2, endIndex: 1, key: 'ArrowRight' },
				{ name: 'focuses on next focusable when Left arrow key is pressed', startIndex: 2, endIndex: 3, key: 'ArrowLeft' },
				{ name: 'focuses on first focusable when Left arrow key is pressed on last focusable', startIndex: 4, endIndex: 0, key: 'ArrowLeft' },
				{ name: 'focuses on last focusable when Right arrow key is pressed on first focusable', startIndex: 0, endIndex: 4, key: 'ArrowRight' },
				{ name: 'focuses on first focusable when Home key is pressed', startIndex: 2, endIndex: 0, key: 'Home' },
				{ name: 'focuses on last focusable when End key is pressed', startIndex: 2, endIndex: 4, key: 'End' }
			]);
		});

	});

});
