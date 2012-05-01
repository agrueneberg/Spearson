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

});
