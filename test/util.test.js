/* eslint-disable no-undef */
const { getTodaysDate, createInClauseArg } = require("../server/utils");
const expect = require("chai").expect;

describe("utility logic test", function () {
    it("should format the date correctly", function () {
        let input = new Date(2020, 10, 1);
        expect(getTodaysDate(input)).to.equal("2020-11-01");
    });
    it("should pad the month and date correctly", function () {
        let input = new Date(2020, 4, 1);
        expect(getTodaysDate(input)).to.equal("2020-05-01");
    });
    it("should create the argument for database query IN clause", function () {
        let input = [1, 2, 3];
        expect(createInClauseArg(input)).to.equal("(1, 2, 3)");
    });
});
