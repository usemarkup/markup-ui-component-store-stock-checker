/* global describe it expect assert */
/* eslint no-unused-expressions: 0 */

let storeStockChecker = require('../src/js/store-stock-checker');

describe('Testing getStores', () => {

    it('fails when no arg provided', () => {
        try {
            storeStockChecker.getStores();
            expect(storeStockChecker.getStores).to.throw(Error);
            assert.fail();
        } catch (error) {
            expect(error.message === 'getStores(): First arg (size) must be a string.').to.be.true;
        }
    })

    it('should return an object', () => {
        expect(typeof storeStockChecker.getStores("M") === 'object').to.be.true;
    })

    it('should return an object', () => {
        expect(typeof storeStockChecker.getStores("M") === 'object').to.be.true;
    })
})
