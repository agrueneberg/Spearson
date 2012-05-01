describe("Stats", function () {

    describe("sum", function () {
        it("the sum of [1,2,3,4,5] is 15", function () {
         // Compare to MATLAB: sum([1 2 3 4 5])
         // Compare to R: sum(c(1,2,3,4,5))
            var res;
            res = stats.sum([1, 2, 3, 4, 5]);
            expect(res).to.equal(15);
        });
    });

    describe("mean", function () {
        it("the mean of [1,2,3,4,5] is 3", function () {
         // Compare to MATLAB: mean([1 2 3 4 5])
         // Compare to R: mean(c(1,2,3,4,5))
            var res;
            res = stats.mean([1, 2, 3, 4, 5]);
            expect(res).to.equal(3);
        });
    });

    describe("deviation", function () {
        it("the deviation of [1,2,3,4,5] is [-2,-1,0,1,2]", function () {
         // Compare to MATLAB: [1 2 3 4 5] - mean([1 2 3 4 5])
         // Compare to R: c(1,2,3,4,5) - mean(c(1,2,3,4,5))
            var res;
            res = stats.deviation([1, 2, 3, 4, 5]);
            expect(res).to.eql([-2, -1, 0, 1, 2]);
        });
    });

    describe("variance", function () {
        it("the variance of [1,2,3,4,5] is 2.5", function () {
         // Compare to MATLAB: sum(([1 2 3 4 5] - mean([1 2 3 4 5])) .^ 2) / (5 - 1)
         // Compare to R: sum((c(1,2,3,4,5) - mean(c(1,2,3,4,5))) ^ 2) / (5 - 1)
            var res;
            res = stats.variance([1, 2, 3, 4, 5]);
            expect(res).to.equal(2.5);
        });
    });

});
