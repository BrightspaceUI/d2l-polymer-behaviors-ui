import '../d2l-dom-expand-collapse.js';
import { expect, fixture, html } from '@open-wc/testing';

describe('d2l-dom-expand-collapse', () => {
	describe('collapse', () => {
		let collapseFixture;

		beforeEach(async() => {
			collapseFixture = await fixture(html`<div>Some content.</div>`);
		});

		it('returns rejected promise if node not specified', (done) => {
			D2L.Dom.ExpandCollapse.collapse()
				.catch(() => {
					done();
				});
		});

		it('collapses element', async() => {
			await D2L.Dom.ExpandCollapse.collapse(collapseFixture);

			expect(collapseFixture.getBoundingClientRect().height).to.equal(0);
			expect(collapseFixture.offsetParent).to.equal(null);
		});

		it('restores existing style properties', async() => {
			collapseFixture.style.display = 'inline-block';
			collapseFixture.style.height = '500px';
			collapseFixture.style.overflow = 'visible';
			collapseFixture.style.transition = 'transform 2s ease-out';
			await D2L.Dom.ExpandCollapse.collapse(collapseFixture);
			await D2L.Dom.ExpandCollapse.expand(collapseFixture);

			expect(collapseFixture.style.display).to.equal('inline-block');
			expect(collapseFixture.style.height).to.equal('500px');
			expect(collapseFixture.style.overflow).to.equal('visible');
			const isExpectedTransition = (collapseFixture.style.transition === 'transform 2s ease-out 0s' || collapseFixture.style.transition === 'transform 2s ease-out');
			expect(isExpectedTransition).to.equal(true);
			expect(collapseFixture.getAttribute('data-d2l-ec-display')).to.equal(null);
			expect(collapseFixture.getAttribute('data-d2l-ec-height')).to.equal(null);
			expect(collapseFixture.getAttribute('data-d2l-ec-overflow')).to.equal(null);
			expect(collapseFixture.getAttribute('data-d2l-ec-transition')).to.equal(null);
		});

	});

	describe('expand', () => {
		let expandFixture;

		beforeEach(async() => {
			expandFixture = await fixture(html`<div style="height: 0; overflow: hidden; display: none;">Some content.</div>`);
		});

		it('returns rejected promise if node not specified', (done) => {
			D2L.Dom.ExpandCollapse.expand()
				.catch(() => {
					done();
				});
		});

		it('expands element', async() => {
			await D2L.Dom.ExpandCollapse.expand(expandFixture);

			expect(expandFixture.getBoundingClientRect().height).not.to.equal(0);
			expect(expandFixture.offsetParent).not.to.equal(null);
		});

		it('removes d2l-hidden if present', async() => {
			expandFixture.classList.add('d2l-hidden');
			await D2L.Dom.ExpandCollapse.expand(expandFixture);

			expect(expandFixture.getBoundingClientRect().height).not.to.equal(0);
			expect(expandFixture.classList.contains('d2l-hidden')).to.equal(false);
			expect(expandFixture.offsetParent).not.to.equal(null);
		});

	});

});
