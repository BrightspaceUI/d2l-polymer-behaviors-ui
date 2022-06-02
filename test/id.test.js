import '../d2l-id.js';
import { expect } from '@open-wc/testing';

describe('d2l-id', () => {

	describe('getUniqueId', () => {

		it('gets different id each time called', () => {
			expect(D2L.Id.getUniqueId()).not.to.equal(D2L.Id.getUniqueId());
		});

	});

});
