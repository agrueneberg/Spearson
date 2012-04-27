(function (exports) {
    "use strict";

    var sum, mean, deviation, variance, standardDeviation, standardize, rank, correlation, distance, pairwiseDistance;

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
            x = rank(x);
            y = rank(y);
            return 1 - ((6 * sum(x.map(function (xi, i) {
                return Math.pow(xi - y[i], 2);
            }))) / (x.length * (Math.pow(x.length, 2) - 1)));
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

}(typeof exports === "undefined" ? this.stats = {} : exports));
