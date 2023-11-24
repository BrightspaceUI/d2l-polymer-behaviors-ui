import '../d2l-dom-visibility.js';
import './dom-visibility-components.js';
import { expect, fixture, html } from '@brightspace-ui/testing';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';

describe('d2l-dom-visibility', () => {
	let Visibility;

	describe('isVisible', () => {
		let visibilityFixture;

		beforeEach(async() => {
			const fullFixture = await fixture(html`<span>
				<style>
					#visibilityInheritHidden { visibility: hidden; }
					#displayInheritNone { display: none; }
				</style>
				<d2l-visibility-test id="wc1">
					<div id="default"></div>
					<div id="visibilityHidden" style="visibility:hidden;"></div>
					<div id="visibilityInheritHidden"></div>
					<div id="displayNone" style="display:none;"></div>
					<div id="displayInheritNone"></div>
					<div style="display:none;">
						<div id="parentDisplayNone"></div>
					</div>
					<div style="visibility:hidden;">
						<div id="parentVisibilityNone"></div>
					</div>
				</d2l-visibility-test>
			</span>`);
			visibilityFixture = fullFixture.querySelector('#wc1');
			Visibility = D2L.Dom.Visibility;
		});

		it('returns true if it and all ancestors are visible', () => {
			expect(Visibility.isVisible(visibilityFixture.querySelector('#default')))
				.to.be.true;
		});

		it('returns false if web component ancestor has display:none', () => {
			dom(visibilityFixture).setAttribute('hidden', true);
			expect(Visibility.isVisible(visibilityFixture.querySelector('#default')))
				.to.be.false;
		});

		it('returns false if web component shadow ancestor has display:none', () => {
			dom(visibilityFixture).setAttribute('hidden-shadow', true);
			expect(Visibility.isVisible(visibilityFixture.querySelector('#default')))
				.to.be.false;
		});

		it('returns false if inline style has visibility:hidden', () => {
			expect(Visibility.isVisible(visibilityFixture.querySelector('#visibilityHidden')))
				.to.be.false;
		});

		it('returns false if inline style has display:none', () => {
			expect(Visibility.isVisible(visibilityFixture.querySelector('#displayNone')))
				.to.be.false;
		});

		it('returns false if inheriting visibility:hidden', () => {
			expect(Visibility.isVisible(visibilityFixture.querySelector('#visibilityInheritHidden')))
				.to.be.false;
		});

		it('returns false if inheriting display:none', () => {
			expect(Visibility.isVisible(visibilityFixture.querySelector('#displayInheritNone')))
				.to.be.false;
		});

		it('returns false if parent has display:none', () => {
			expect(Visibility.isVisible(visibilityFixture.querySelector('#parentDisplayNone')))
				.to.be.false;
		});

		it('returns false if parent has visibility:hidden', () => {
			expect(Visibility.isVisible(visibilityFixture.querySelector('#parentVisibilityNone')))
				.to.be.false;
		});

	});

});
