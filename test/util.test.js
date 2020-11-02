/* eslint-disable no-undef */
const {
    getTodaysDateString,
    createInClauseArg,
    calcCharges
} = require("../server/utils");
const expect = require("chai").expect;

describe("utility logic test", function () {
    it("should format the date correctly", function () {
        let input = new Date(2020, 10, 1);
        expect(getTodaysDateString(input)).to.equal("2020-11-01");
    });
    it("should pad the month and date correctly", function () {
        let input = new Date(2020, 4, 1);
        expect(getTodaysDateString(input)).to.equal("2020-05-01");
    });
    it("should create the argument for database query IN clause", function () {
        let input = [1, 2, 3];
        expect(createInClauseArg(input)).to.equal("(1, 2, 3)");
    });
    describe("test charges calculation logic", () => {
        it("should correctly calculate novel category charges", () => {
            let days = 5;
            let trans = {
                category_days_limit: 3,
                category_min_charges: "450",
                category_perday_cost: "150"
            };
            expect(calcCharges(days, trans)).to.equal(750);
        });
        
        it("should correctly calculate fiction category charges", () => {
            let days = 5;
            let trans = {
                category_days_limit: 0,
                category_min_charges: "0",
                category_perday_cost: "300"
            };
            expect(calcCharges(days, trans)).to.equal(1500);
        });
        it("should correctly calculate regular category charges", () => {
            let days = 5;
            let trans = {
                category_days_limit: 2,
                category_min_charges: "200",
                category_perday_cost: "150"
            };
            expect(calcCharges(days, trans)).to.equal(650);
        });
        it("should correctly calculate regular category charges charges less than days limit case", () => {
            let days = 1;
            let trans = {
                category_days_limit: 2,
                category_min_charges: "200",
                category_perday_cost: "150"
            };
            expect(calcCharges(days, trans)).to.equal(200);
        });
        it("should correctly calculate novel category charges  less than days limit case", () => {
            let days = 1;
            let trans = {
                category_days_limit: 3,
                category_min_charges: "450",
                category_perday_cost: "150"
            };
            expect(calcCharges(days, trans)).to.equal(450);
        });
        //novels less case tested
    });
});
