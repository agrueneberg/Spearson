(function (exports) {
    "use strict";

    var round, sum, mean, deviation, variance, standardDeviation, standardize, rank, correlation, distance,
        pairwiseDistance, linkage, hierarchicalClustering;

 // @param {number} x Value to round.
 // @param {number} n Number of decimal places.
    exports.round = round = function (x, n) {
        n = typeof n === "number" ? n : 0;
        return Math.round(x * Math.pow(10, n)) / Math.pow(10, n);
    };

 // @param {[number]} x Array of numbers.
    exports.sum = sum = function (x) {
        return x.reduce(function (previousValue, currentValue) {
            return previousValue + currentValue;
        });
    };

 // @param {[number]} x Array of numbers.
    exports.mean = mean = function (x) {
        return sum(x) / x.length;
    };

 // @param {[number]} x Array of numbers.
    exports.deviation = deviation = function (x) {
        var xBar;
        xBar = mean(x);
        return x.map(function (xi) {
            return xi - xBar;
        });
    };

 // Calculates the sample variance.
 // @param {[number]} x Array of numbers.
    exports.variance = variance = function (x) {
        return sum(deviation(x).map(function (xi) {
            return Math.pow(xi, 2);
        })) / (x.length - 1);
    };

 // Calculates the sample standard deviation.
 // @param {[number]} x Array of numbers.
    exports.standardDeviation = standardDeviation = function (x) {
        return Math.sqrt(variance(x));
    };

 // @param {[number]} x Array of numbers.
    exports.standardize = standardize = function (x) {
        var sd;
        sd = standardDeviation(x);
        return deviation(x).map(function (xi) {
            return xi / sd;
        });
    };

 // @param {[number]} x Array of numbers.
    exports.rank = rank = function (x) {
        var ranks;
     // Copy array.
        ranks = x.slice();
     // Sort array.
        ranks.sort(function (a, b) {
            return a - b;
        });
     // Calculate ranks.
        return x.map(function (xi) {
            var rank, first, last;
         // Handle tied ranks.
            first = ranks.indexOf(xi);
            last = ranks.lastIndexOf(xi);
            if (first === last) {
                rank = first;
            } else {
                rank = (first + last) / 2;
            }
         // Add 1 because ranks start with 1.
            return rank + 1;
        });
    };

 // Calculates the correlation coefficient for two variables.
 // @param {[number]} x Array of numbers.
 // @param {[number]} y Array of numbers.
    exports.correlation = correlation = {
        pearson: function (x, y) {
            x = standardize(x);
            y = standardize(y);
            return sum(x.map(function (xi, i) {
                return xi * y[i];
            })) / (x.length - 1);
        },
        spearman: function (x, y) {
            var xDeviation, yDeviation;
            x = rank(x);
            y = rank(y);
            xDeviation = deviation(x);
            yDeviation = deviation(y);
            return sum(xDeviation.map(function (xi, i) {
                return xi * yDeviation[i];
            })) / Math.sqrt(sum(xDeviation.map(function (xi) {
                return Math.pow(xi, 2);
            })) * sum(yDeviation.map(function (yi) {
                return Math.pow(yi, 2);
            })));
        }
    };

 // @param {[number]} x Array of numbers.
 // @param {[number]} y Array of numbers.
    exports.distance = distance = {
        euclidean: function (x, y) {
            return Math.sqrt(sum(x.map(function (xi, i) {
                return Math.pow(xi - y[i], 2);
            })));
        },
        manhattan: function (x, y) {
            return sum(x.map(function (xi, i) {
                return Math.abs(xi - y[i]);
            }));
        }
    };

 // @param {[[number]]} a Array of array of numbers (the members of a cluster).
 // @param {[[number]]} b Array of array of numbers (the members of a cluster).
 // @param {(x, y)} distance Distance metric.
    exports.linkage = linkage = {
        single: function (a, b, distance) {
            var min, d;
            min = Infinity;
            a.map(function (x) {
                b.map(function (y) {
                    d = distance(x, y);
                    if (d < min) {
                        min = d;
                    }
                });
            });
            return min;
        },
        complete: function (a, b, distance) {
            var max, d;
            max = -Infinity;
            a.map(function (x) {
                b.map(function (y) {
                    d = distance(x, y);
                    if (d > max) {
                        max = d;
                    }
                });
            });
            return max;
        },
        upgma: function (a, b, distance) {
            return (sum(a.map(function (x) {
                return sum(b.map(function (y) {
                    return distance(x, y);
                }));
            })) / (a.length * b.length));
        }
    };

 // @param {[[number]]} x Array of array of numbers.
 // @param {(x, y)} distance Distance function.
    exports.pairwiseDistance = pairwiseDistance = function (x, distance) {
        if (typeof distance !== "function") {
            distance = this.distance.euclidean;
        }
        return x.map(function (v1) {
            return x.map(function (v2) {
                return distance(v1, v2);
            });
        });
    };

 // @param {[[number]]} x Array of array of numbers.
 // @param {(a, b, distance)} linkage Linkage criterion.
 // @param {(x, y)} distance Distance metric.
    exports.hierarchicalClustering = hierarchicalClustering = function (x, linkage, distance) {
        var clusters;
     // Initialize one clusters per observation.
        clusters = {};
        Object.keys(x).map(function (label) {
            clusters[label] = [x[label]];
        });
        return (function rec(clusters, history) {
            var labels, mergedClusters, mergedDistance, mergedLabel;
            labels = Object.keys(clusters);
            if (labels.length <= 1) {
                return history;
            }
         // Find closest clusters, the candidates for merging.
            mergedDistance = Infinity;
            labels.map(function (labelA) {
                labels.map(function (labelB) {
                    var d;
                 // Ignore clusters with the same name.
                    if (labelA !== labelB) {
                        d = linkage(clusters[labelA], clusters[labelB], distance);
                        if (d < mergedDistance) {
                            mergedDistance = d;
                            mergedClusters = [labelA, labelB];
                        }
                    }
                });
            });
         // Merge clusters.
            mergedLabel = mergedClusters[0] + " / " + mergedClusters[1];
            clusters[mergedLabel] = clusters[mergedClusters[0]].concat(clusters[mergedClusters[1]]);
         // Remove obsolete clusters.
            delete clusters[mergedClusters[0]];
            delete clusters[mergedClusters[1]];
         // Keep merge history.
            history.push({
                clusters: mergedClusters,
                distance: mergedDistance
            });
            return rec(clusters, history);
        }(clusters, []));
    };

}(typeof exports === "undefined" ? this.spearson = {} : exports));
