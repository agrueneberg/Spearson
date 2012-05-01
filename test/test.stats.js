describe("Stats", function () {

    describe("round", function () {
        it("the rounded value of 0.4281 is 0", function () {
            var res;
            res = stats.round(0.4281);
            expect(res).to.equal(0);
        });
        it("the rounded value of 0.4281 with two decimal points is 0.43", function () {
            var res;
            res = stats.round(0.4281, 2);
            expect(res).to.equal(0.43);
        });
    });

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

    describe("standardDeviation", function () {
        it("the standard deviation of [1,2,3,4,5] is 1.5811", function () {
         // Compare to MATLAB: std([1 2 3 4 5])
         // Compare to R: sd(c(1,2,3,4,5))
            var res;
            res = stats.standardDeviation([1, 2, 3, 4, 5]);
            res = stats.round(res, 4);
            expect(res).to.equal(1.5811);
        });
    });

    describe("standardize", function () {
        it("the z score of [1,3,2] is [-1,1,0]", function () {
         // Compare to MATLAB: zscore([1,3,2])
            var res;
            res = stats.standardize([1, 3, 2]);
            expect(res).to.eql([-1,1,0]);
        });
    });

    describe("rank", function () {
        it("the rank of [54,17,8,109,78] is [3,2,1,5,4]", function () {
         // Compare to MATLAB: tiedrank([54 17 8 109 78])
            var res;
            res = stats.rank([54, 17, 8, 109, 78]);
            expect(res).to.eql([3, 2, 1, 5, 4]);
        });
    });

    describe("correlation", function () {
        describe("pearson", function () {
            it("the Pearson correlation coefficient of [1,7,2,3,4] and [9,3,5,2,1] is -0.6181", function () {
             // Compare to MATLAB: corr([1;7;2;3;4], [9;3;5;2;1])
             // Compare to R: cor(c(1,7,2,3,4), c(9,3,5,2,1))
                var res;
                res = stats.correlation.pearson([1, 7, 2, 3, 4], [9, 3, 5, 2, 1]);
                res = stats.round(res, 4);
                expect(res).to.equal(-0.6181);
            });
        });
        describe("spearman", function () {
            it("the Spearman correlation coefficient of [1,7,2,3,4] and [9,3,5,2,1] is -0.7", function () {
             // Compare to MATLAB: corr([1;7;2;3;4], [9;3;5;2;1], 'type', 'Spearman')
             // Compare to R: cor(x=c(1,7,2,3,4), y=c(9,3,5,2,1), method="spearman")
                var res;
                res = stats.correlation.spearman([1, 7, 2, 3, 4], [9, 3, 5, 2, 1]);
                expect(res).to.equal(-0.7);
            });
        });
    });

});
