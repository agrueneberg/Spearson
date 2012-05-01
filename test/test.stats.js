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

});
