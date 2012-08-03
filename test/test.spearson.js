var expect, spearson;

expect = require("expect.js");
spearson = require("../lib/spearson.js");

describe("Spearson", function () {

    describe("sort", function () {
        it("the sort order of [5,2,3,10,9] is [2,3,5,9,10]", function () {
            var res;
            res = spearson.sort([5, 2, 3, 10, 9]);
            expect(res).to.eql([2, 3, 5, 9, 10]);
        });
        it("should preserve the order of the original list", function () {
            var list, res;
            list = [5, 2, 3, 10, 9]
            res = spearson.sort(list);
            expect(res).to.eql([2, 3, 5, 9, 10]);
            expect(list).to.eql([5, 2, 3, 10, 9]);
        });
    });

    describe("round", function () {
        it("the rounded value of 0.4281 is 0", function () {
            var res;
            res = spearson.round(0.4281);
            expect(res).to.equal(0);
        });
        it("the rounded value of 0.4281 with two decimal points is 0.43", function () {
            var res;
            res = spearson.round(0.4281, 2);
            expect(res).to.equal(0.43);
        });
    });

    describe("min", function () {
        it("the min of [7,8,1,2,5] is 1", function () {
            var res;
            res = spearson.min([7, 8, 1, 2, 5]);
            expect(res).to.equal(1);
        });
    });

    describe("max", function () {
        it("the max of [7,8,1,2,5] is 8", function () {
            var res;
            res = spearson.max([7, 8, 1, 2, 5]);
            expect(res).to.equal(8);
        });
    });

    describe("range", function () {
        it("returns a list of integers from start to stop", function () {
            var range;
            range = spearson.range(5, 10);
            expect(range.length).to.equal(5);
            expect(range[0]).to.equal(5);
            expect(range[4]).to.equal(9);
        });
    });

    describe("sum", function () {
        it("the sum of [1,2,3,4,5] is 15", function () {
         // Compare to MATLAB: sum([1 2 3 4 5])
         // Compare to R: sum(c(1,2,3,4,5))
            var res;
            res = spearson.sum([1, 2, 3, 4, 5]);
            expect(res).to.equal(15);
        });
    });

    describe("median", function () {
        it("the median of [1] is 1", function () {
         // Compare to MATLAB: median([1])
         // Compare to R: median(c(1))
            var res;
            res = spearson.median([1]);
            expect(res).to.equal(1);
        });
        it("the median of [1,2] is 1.5", function () {
         // Compare to MATLAB: median([1 2])
         // Compare to R: median(c(1,2))
            var res;
            res = spearson.median([1, 2]);
            expect(res).to.equal(1.5);
        });
        it("the median of [1,2,3] is 3", function () {
         // Compare to MATLAB: median([1 2 3])
         // Compare to R: median(c(1,2,3))
            var res;
            res = spearson.median([1, 2, 3]);
            expect(res).to.equal(2);
        });
        it("the median of [1,2,3,4] is 2.5", function () {
         // Compare to MATLAB: median([1 2 3 4])
         // Compare to R: median(c(1,2,3,4))
            var res;
            res = spearson.median([1, 2, 3, 4]);
            expect(res).to.equal(2.5);
        });
        it("the median of [1,2,3,4,5] is 3", function () {
         // Compare to MATLAB: median([1 2 3 4 5])
         // Compare to R: median(c(1,2,3,4,5))
            var res;
            res = spearson.median([1, 2, 3, 4, 5]);
            expect(res).to.equal(3);
        });
    });

    describe("mean", function () {
        it("the mean of [1,2,3,4,5] is 3", function () {
         // Compare to MATLAB: mean([1 2 3 4 5])
         // Compare to R: mean(c(1,2,3,4,5))
            var res;
            res = spearson.mean([1, 2, 3, 4, 5]);
            expect(res).to.equal(3);
        });
    });

    describe("deviation", function () {
        it("the deviation of [1,2,3,4,5] is [-2,-1,0,1,2]", function () {
         // Compare to MATLAB: [1 2 3 4 5] - mean([1 2 3 4 5])
         // Compare to R: c(1,2,3,4,5) - mean(c(1,2,3,4,5))
            var res;
            res = spearson.deviation([1, 2, 3, 4, 5]);
            expect(res).to.eql([-2, -1, 0, 1, 2]);
        });
    });

    describe("variance", function () {
        it("the unbiased sample variance of [1,2,3,4,5] is 2.5", function () {
         // Compare to MATLAB: sum(([1 2 3 4 5] - mean([1 2 3 4 5])) .^ 2) / (5 - 1)
         // Compare to R: var(c(1,2,3,4,5))
            var res;
            res = spearson.variance([1, 2, 3, 4, 5]);
            expect(res).to.equal(2.5);
        });
        it("the biased sample / population variance of [1,2,3,4,5] is 2", function () {
         // Compare to MATLAB: sum(([1 2 3 4 5] - mean([1 2 3 4 5])) .^ 2) / 5
            var res;
            res = spearson.variance([1, 2, 3, 4, 5], true);
            expect(res).to.equal(2);
        });
    });

    describe("standardDeviation", function () {
        it("the unbiased sample standard deviation of [1,2,3,4,5] is 1.5811", function () {
         // Compare to MATLAB: std([1 2 3 4 5])
         // Compare to R: sd(c(1,2,3,4,5))
            var res;
            res = spearson.standardDeviation([1, 2, 3, 4, 5]);
            res = spearson.round(res, 4);
            expect(res).to.equal(1.5811);
        });
        it("the biased sample / population standard deviation of [1,2,3,4,5] is 1.4142", function () {
         // Compare to MATLAB: std([1 2 3 4 5], 1)
            var res;
            res = spearson.standardDeviation([1, 2, 3, 4, 5], true);
            res = spearson.round(res, 4);
            expect(res).to.equal(1.4142);
        });
    });

    describe("standardize", function () {
        it("the z score of [1,3,2] is [-1,1,0]", function () {
         // Compare to MATLAB: zscore([1,3,2])
            var res;
            res = spearson.standardize([1, 3, 2]);
            expect(res).to.eql([-1,1,0]);
        });
    });

    describe("rank", function () {
        it("the rank of [54,17,8,109,78] is [3,2,1,5,4]", function () {
         // Compare to MATLAB: tiedrank([54 17 8 109 78])
            var res;
            res = spearson.rank([54, 17, 8, 109, 78]);
            expect(res).to.eql([3, 2, 1, 5, 4]);
        });
    });

    describe("correlation", function () {
        describe("pearson", function () {
            it("the Pearson correlation coefficient of [1,7,2,3,4] and [9,3,5,2,1] is -0.6181", function () {
             // Compare to MATLAB: corr([1;7;2;3;4], [9;3;5;2;1])
             // Compare to R: cor(c(1,7,2,3,4), c(9,3,5,2,1))
                var x, y, res;
                x = [1, 7, 2, 3, 4];
                y = [9, 3, 5, 2, 1];
                res = spearson.correlation.pearson(x, y);
                res = spearson.round(res, 4);
                expect(res).to.equal(-0.6181);
            });
            it("the Pearson correlation coefficient of pre-standardized [1,7,2,3,4] and [9,3,5,2,1] is -0.6181", function () {
                var x, y, res;
                x = spearson.standardize([1, 7, 2, 3, 4]);
                y = spearson.standardize([9, 3, 5, 2, 1]);
                res = spearson.correlation.pearson(x, y, false);
                res = spearson.round(res, 4);
                expect(res).to.equal(-0.6181);
            });
        });
        describe("spearman", function () {
            it("the Spearman correlation coefficient of [1,7,2,3,4] and [9,3,5,2,1] is -0.7", function () {
             // Compare to MATLAB: corr([1;7;2;3;4], [9;3;5;2;1], 'type', 'Spearman')
             // Compare to R: cor(x=c(1,7,2,3,4), y=c(9,3,5,2,1), method="spearman")
                var x, y, res;
                x = [1, 7, 2, 3, 4];
                y = [9, 3, 5, 2, 1];
                res = spearson.correlation.spearman(x, y);
                expect(res).to.equal(-0.7);
            });
            it("the Spearman correlation coefficient of pre-ranked [1,7,2,3,4] and [9,3,5,2,1] is -0.7", function () {
                var x, y, res;
                x = spearson.rank([1, 7, 2, 3, 4]);
                y = spearson.rank([9, 3, 5, 2, 1]);
                res = spearson.correlation.spearman(x, y, false);
                expect(res).to.equal(-0.7);
            });
            it("the Spearman correlation coefficient of [1,7,2,3,1] and [9,3,2,2,1] (both with tied ranks) is 0.1579", function () {
             // Compare to MATLAB: corr([1;7;2;3;1], [9;3;2;2;1], 'type', 'Spearman')
             // Compare to R: cor(x=c(1,7,2,3,1), y=c(9,3,2,2,1), method="spearman")
                var x, y, res;
                x = [1, 7, 2, 3, 1];
                y = [9, 3, 2, 2, 1];
                res = spearson.correlation.spearman(x, y);
                res = spearson.round(res, 4);
                expect(res).to.equal(0.1579);
            });
            it("the Spearman correlation coefficient of pre-ranked [1,7,2,3,1] and [9,3,2,2,1] (both with tied ranks) is 0.1579", function () {
             // Compare to MATLAB: corr([1;7;2;3;1], [9;3;2;2;1], 'type', 'Spearman')
             // Compare to R: cor(x=c(1,7,2,3,1), y=c(9,3,2,2,1), method="spearman")
                var x, y, res;
                x = spearson.rank([1, 7, 2, 3, 1]);
                y = spearson.rank([9, 3, 2, 2, 1]);
                res = spearson.correlation.spearman(x, y, false);
                res = spearson.round(res, 4);
                expect(res).to.equal(0.1579);
            });
        });
    });

    describe("pairwiseDistance", function () {
        it("the pairwise distance of a bunch of numbers is [101.1039 126.7517 134.5214]", function () {
         // Compare to MATLAB: squareform(pdist([81 91 28 96 96; 91 63 55 16 49; 13 10 96 97 80]))
            var pdist;
            pdist = spearson.pairwiseDistance([
                [81, 91, 28, 96, 96],
                [91, 63, 55, 16, 49],
                [13, 10, 96, 97, 80]
            ], spearson.distance.euclidean);
            expect(pdist[0][0]).to.equal(0);
            expect(pdist[1][1]).to.equal(0);
            expect(pdist[2][2]).to.equal(0);
            expect(spearson.round(pdist[0][1], 4)).to.equal(101.1039);
            expect(spearson.round(pdist[0][2], 4)).to.equal(126.7517);
            expect(spearson.round(pdist[1][2], 4)).to.equal(134.5214);
        });
    });

    describe("hierarchicalClustering", function () {
        describe("random", function () {
            var pdist;
            beforeEach(function () {
                pdist = spearson.pairwiseDistance([
                    [81, 91, 28, 96, 96],
                    [91, 63, 55, 16, 49],
                    [13, 10, 96, 97, 80]
                ], spearson.distance.euclidean);
            });
            describe("linkage.single", function () {
                it("the distance at which all observations are merged into a single cluster is 126.7517", function () {
                 // Compare to MATLAB: linkage(pdist([81 91 28 96 96; 91 63 55 16 49; 13 10 96 97 80]))
                    var clust, res;
                    clust = spearson.hierarchicalClustering(pdist, "single");
                    res = spearson.round(clust[0].distance, 4);
                    expect(res).to.equal(126.7517);
                });
            });
            describe("linkage.complete", function () {
                it("the distance at which all observations are merged into a single cluster is 134.5214", function () {
                 // Compare to MATLAB: linkage(pdist([81 91 28 96 96; 91 63 55 16 49; 13 10 96 97 80]), 'complete')
                    var clust, res;
                    clust = spearson.hierarchicalClustering(pdist, "complete");
                    res = spearson.round(clust[0].distance, 4);
                    expect(res).to.equal(134.5214);
                });
            });
            describe("linkage.upgma", function () {
                it("the distance at which all observations are merged into a single cluster is 130.6365", function () {
                 // Compare to MATLAB: linkage(pdist([81 91 28 96 96; 91 63 55 16 49; 13 10 96 97 80]), 'average')
                    var clust, res;
                    clust = spearson.hierarchicalClustering(pdist, "upgma");
                    res = spearson.round(clust[0].distance, 4);
                    expect(res).to.equal(130.6365);
                });
            });
        });
        describe("fisheriris", function () {
            it("the distance at which all observations are merged into a single cluster is 4.0627", function () {
                var fisheriris, pdist, clust, res;
                fisheriris = [
                    [5.1, 3.5, 1.4, 0.2],
                    [4.9, 3, 1.4, 0.2],
                    [4.7, 3.2, 1.3, 0.2],
                    [4.6, 3.1, 1.5, 0.2],
                    [5, 3.6, 1.4, 0.2],
                    [5.4, 3.9, 1.7, 0.4],
                    [4.6, 3.4, 1.4, 0.3],
                    [5, 3.4, 1.5, 0.2],
                    [4.4, 2.9, 1.4, 0.2],
                    [4.9, 3.1, 1.5, 0.1],
                    [5.4, 3.7, 1.5, 0.2],
                    [4.8, 3.4, 1.6, 0.2],
                    [4.8, 3, 1.4, 0.1],
                    [4.3, 3, 1.1, 0.1],
                    [5.8, 4, 1.2, 0.2],
                    [5.7, 4.4, 1.5, 0.4],
                    [5.4, 3.9, 1.3, 0.4],
                    [5.1, 3.5, 1.4, 0.3],
                    [5.7, 3.8, 1.7, 0.3],
                    [5.1, 3.8, 1.5, 0.3],
                    [5.4, 3.4, 1.7, 0.2],
                    [5.1, 3.7, 1.5, 0.4],
                    [4.6, 3.6, 1, 0.2],
                    [5.1, 3.3, 1.7, 0.5],
                    [4.8, 3.4, 1.9, 0.2],
                    [5, 3, 1.6, 0.2],
                    [5, 3.4, 1.6, 0.4],
                    [5.2, 3.5, 1.5, 0.2],
                    [5.2, 3.4, 1.4, 0.2],
                    [4.7, 3.2, 1.6, 0.2],
                    [4.8, 3.1, 1.6, 0.2],
                    [5.4, 3.4, 1.5, 0.4],
                    [5.2, 4.1, 1.5, 0.1],
                    [5.5, 4.2, 1.4, 0.2],
                    [4.9, 3.1, 1.5, 0.2],
                    [5, 3.2, 1.2, 0.2],
                    [5.5, 3.5, 1.3, 0.2],
                    [4.9, 3.6, 1.4, 0.1],
                    [4.4, 3, 1.3, 0.2],
                    [5.1, 3.4, 1.5, 0.2],
                    [5, 3.5, 1.3, 0.3],
                    [4.5, 2.3, 1.3, 0.3],
                    [4.4, 3.2, 1.3, 0.2],
                    [5, 3.5, 1.6, 0.6],
                    [5.1, 3.8, 1.9, 0.4],
                    [4.8, 3, 1.4, 0.3],
                    [5.1, 3.8, 1.6, 0.2],
                    [4.6, 3.2, 1.4, 0.2],
                    [5.3, 3.7, 1.5, 0.2],
                    [5, 3.3, 1.4, 0.2],
                    [7, 3.2, 4.7, 1.4],
                    [6.4, 3.2, 4.5, 1.5],
                    [6.9, 3.1, 4.9, 1.5],
                    [5.5, 2.3, 4, 1.3],
                    [6.5, 2.8, 4.6, 1.5],
                    [5.7, 2.8, 4.5, 1.3],
                    [6.3, 3.3, 4.7, 1.6],
                    [4.9, 2.4, 3.3, 1],
                    [6.6, 2.9, 4.6, 1.3],
                    [5.2, 2.7, 3.9, 1.4],
                    [5, 2, 3.5, 1],
                    [5.9, 3, 4.2, 1.5],
                    [6, 2.2, 4, 1],
                    [6.1, 2.9, 4.7, 1.4],
                    [5.6, 2.9, 3.6, 1.3],
                    [6.7, 3.1, 4.4, 1.4],
                    [5.6, 3, 4.5, 1.5],
                    [5.8, 2.7, 4.1, 1],
                    [6.2, 2.2, 4.5, 1.5],
                    [5.6, 2.5, 3.9, 1.1],
                    [5.9, 3.2, 4.8, 1.8],
                    [6.1, 2.8, 4, 1.3],
                    [6.3, 2.5, 4.9, 1.5],
                    [6.1, 2.8, 4.7, 1.2],
                    [6.4, 2.9, 4.3, 1.3],
                    [6.6, 3, 4.4, 1.4],
                    [6.8, 2.8, 4.8, 1.4],
                    [6.7, 3, 5, 1.7],
                    [6, 2.9, 4.5, 1.5],
                    [5.7, 2.6, 3.5, 1],
                    [5.5, 2.4, 3.8, 1.1],
                    [5.5, 2.4, 3.7, 1],
                    [5.8, 2.7, 3.9, 1.2],
                    [6, 2.7, 5.1, 1.6],
                    [5.4, 3, 4.5, 1.5],
                    [6, 3.4, 4.5, 1.6],
                    [6.7, 3.1, 4.7, 1.5],
                    [6.3, 2.3, 4.4, 1.3],
                    [5.6, 3, 4.1, 1.3],
                    [5.5, 2.5, 4, 1.3],
                    [5.5, 2.6, 4.4, 1.2],
                    [6.1, 3, 4.6, 1.4],
                    [5.8, 2.6, 4, 1.2],
                    [5, 2.3, 3.3, 1],
                    [5.6, 2.7, 4.2, 1.3],
                    [5.7, 3, 4.2, 1.2],
                    [5.7, 2.9, 4.2, 1.3],
                    [6.2, 2.9, 4.3, 1.3],
                    [5.1, 2.5, 3, 1.1],
                    [5.7, 2.8, 4.1, 1.3],
                    [6.3, 3.3, 6, 2.5],
                    [5.8, 2.7, 5.1, 1.9],
                    [7.1, 3, 5.9, 2.1],
                    [6.3, 2.9, 5.6, 1.8],
                    [6.5, 3, 5.8, 2.2],
                    [7.6, 3, 6.6, 2.1],
                    [4.9, 2.5, 4.5, 1.7],
                    [7.3, 2.9, 6.3, 1.8],
                    [6.7, 2.5, 5.8, 1.8],
                    [7.2, 3.6, 6.1, 2.5],
                    [6.5, 3.2, 5.1, 2],
                    [6.4, 2.7, 5.3, 1.9],
                    [6.8, 3, 5.5, 2.1],
                    [5.7, 2.5, 5, 2],
                    [5.8, 2.8, 5.1, 2.4],
                    [6.4, 3.2, 5.3, 2.3],
                    [6.5, 3, 5.5, 1.8],
                    [7.7, 3.8, 6.7, 2.2],
                    [7.7, 2.6, 6.9, 2.3],
                    [6, 2.2, 5, 1.5],
                    [6.9, 3.2, 5.7, 2.3],
                    [5.6, 2.8, 4.9, 2],
                    [7.7, 2.8, 6.7, 2],
                    [6.3, 2.7, 4.9, 1.8],
                    [6.7, 3.3, 5.7, 2.1],
                    [7.2, 3.2, 6, 1.8],
                    [6.2, 2.8, 4.8, 1.8],
                    [6.1, 3, 4.9, 1.8],
                    [6.4, 2.8, 5.6, 2.1],
                    [7.2, 3, 5.8, 1.6],
                    [7.4, 2.8, 6.1, 1.9],
                    [7.9, 3.8, 6.4, 2],
                    [6.4, 2.8, 5.6, 2.2],
                    [6.3, 2.8, 5.1, 1.5],
                    [6.1, 2.6, 5.6, 1.4],
                    [7.7, 3, 6.1, 2.3],
                    [6.3, 3.4, 5.6, 2.4],
                    [6.4, 3.1, 5.5, 1.8],
                    [6, 3, 4.8, 1.8],
                    [6.9, 3.1, 5.4, 2.1],
                    [6.7, 3.1, 5.6, 2.4],
                    [6.9, 3.1, 5.1, 2.3],
                    [5.8, 2.7, 5.1, 1.9],
                    [6.8, 3.2, 5.9, 2.3],
                    [6.7, 3.3, 5.7, 2.5],
                    [6.7, 3, 5.2, 2.3],
                    [6.3, 2.5, 5, 1.9],
                    [6.5, 3, 5.2, 2],
                    [6.2, 3.4, 5.4, 2.3],
                    [5.9, 3, 5.1, 1.8]
                ];
                pdist = spearson.pairwiseDistance(fisheriris, spearson.distance.euclidean);
                clust = spearson.hierarchicalClustering(pdist, "upgma");
                res = spearson.round(clust[0].distance, 4);
                expect(res).to.equal(4.0627);
            });
        });
    });

});
