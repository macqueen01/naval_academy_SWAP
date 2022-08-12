var assert = require("assert")
var compareDate = require("../utilities/compares.js")

describe('test comparing dates', () => {
	it('available date: 2022-11-12', () => {
		assert.equal(true, compareDate('2022-11-12', new Date().toISOString()))
	})
	it('past date: 2022-01-12', () => {
		assert.equal(false, compareDate('2022-01-12', new Date().toISOString()))
	})
	it('past date: 2022-09-60', () => {
		assert.equal(false, compareDate('2022-09-60', new Date().toISOString()))
	})
	it('past date: 2002-09-60', () => {
		assert.equal(false, compareDate('2002-09-60', new Date().toISOString()))
	})
})