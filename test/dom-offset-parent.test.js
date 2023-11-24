import '../d2l-dom.js';
import { expect, fixture, html } from '@brightspace-ui/testing';
import { PolymerElement, html as polymerHtml } from '@polymer/polymer/polymer-element.js';

class TestWrapper extends PolymerElement {
	static get properties() {
		return {
			wrapperId: {
				type: String,
				value: 'notExpected'
			}
		};
	}
	static get template() {
		return polymerHtml`
			<style>
				#expected {
					position: relative;
				}
			</style>
			<div id=[[wrapperId]]>
				<slot></slot>
			</div>
		`;
	}
}

window.customElements.define('test-wrapper', TestWrapper);

describe('d2l-dom', () => {
	describe('getOffsetParent', () => {
		[
			{ name: 'direct-parent', fixture: html`
				<div><div class="expected" style="position: relative;">
					<div class="child"></div>
				</div></div>`
			},
			{ name: 'indirect-parent', fixture: html`
				<div><div class="expected" style="position: relative;">
					<div><div class="child"></div></div>
				</div></div>`
			},
			{ name: 'td', fixture: html`
				<div><table>
					<td class="expected" style="position: static;">
						<div class="child"></div>
					</td>
				</table></div>`
			},
			{ name: 'th', fixture: html`
				<div><table>
					<th class="expected" style="position: static;">
						<div class="child"></div>
					</th>
				</table></div>`
			},
			{ name: 'table', fixture: html`
				<div><table class="expected" style="position: static;">
					<tbody class="child"></tbody>
				</table></div>`
			},
			{ name: 'wrapper-inside', fixture: html`
				<div><test-wrapper>
					<div class="expected" style="position: relative;">
						<div class="child"></div>
					</div>
				</test-wrapper></div>`
			},
			{ name: 'wrapper-passthrough', fixture: html`
				<div><div class="expected" style="position: relative;">
					<test-wrapper>
						<div class="child"></div>
					</test-wrapper>
				</div></div>`
			},
			{ name: 'wrapper-is-parent', fixture: html`
				<div><test-wrapper class="expected" style="position: relative;">
					<div class="child"></div>
				</test-wrapper></div>`
			},
			{ name: 'nested-wrapper-is-parent', fixture: html`
				<div><test-wrapper class="expected" style="position: relative;">
					<test-wrapper>
						<div class="child"></div>
					</test-wrapper>
				</test-wrapper></div>`
			}
		].forEach(test => {
			it(test.name, async() => {
				const fixt = await fixture(test.fixture);
				const child = fixt.querySelector('.child');
				const expected = fixt.querySelector('.expected');
				expect(D2L.Dom.getOffsetParent(child)).to.equal(expected);
			});
		});

		it('wrapper-simple', async() => {
			const fixt = await fixture(html`
				<div><test-wrapper wrapper-id="expected">
					<div class="child"></div>
				</test-wrapper></div>
			`);
			const child = fixt.querySelector('.child');
			expect(D2L.Dom.getOffsetParent(child).id).to.equal('expected');
		});

		it('wrapper-nested', async() => {
			const fixt = await fixture(html`
				<div><test-wrapper>
					<test-wrapper wrapper-id="expected">
						<div class="child"></div>
					</test-wrapper>
				</test-wrapper></div>
			`);
			const child = fixt.querySelector('.child');
			expect(D2L.Dom.getOffsetParent(child).id).to.equal('expected');
		});

		it('fallback-when-shadowroot-undefined', () => {
			const tempShadowRoot = window.ShadowRoot;
			window.ShadowRoot = false;
			const child = {
				offsetParent: 'this is the offsetParent'
			};
			expect(D2L.Dom.getOffsetParent(child)).to.equal(child.offsetParent);
			window.ShadowRoot = tempShadowRoot;
		});

		it('body', () => {
			const body = document.querySelector('body');
			expect(D2L.Dom.getOffsetParent(body)).to.equal(null);
		});

		it('orphan', () => {
			const child = document.createElement('div');
			expect(D2L.Dom.getOffsetParent(child)).to.equal(null);
		});

		it('orphan-with-extra-steps', () => {
			const grandparent = document.createElement('div');
			const parent = document.createElement('div');
			const child = document.createElement('div');
			grandparent.appendChild(parent);
			parent.appendChild(child);
			expect(D2L.Dom.getOffsetParent(child)).to.equal(null);
		});

		it('fixed', async() => {
			const fixed = await fixture(html`<div><div id="fixed" style="position: fixed;"></div></div>`);
			const el = fixed.querySelector('#fixed');
			expect(D2L.Dom.getOffsetParent(el)).to.equal(null);
		});

		it('body-is-parent', () => {
			const child = document.createElement('div');
			document.body.appendChild(child);
			expect(D2L.Dom.getOffsetParent(child)).to.equal(document.body);
		});
	});
});
