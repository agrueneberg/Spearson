(function (exports) {
    "use strict";

    var sum, mean, deviation, variance, standardDeviation, standardize, rank, correlation;

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
 // @param {string} method "pearson" (default) or "spearman".
    exports.correlation = correlation = function (x, y, method) {
        if (["pearson", "spearman"].indexOf(method) === -1) {
            method = "pearson";
        }
        switch (method) {
            case "pearson":
                x = standardize(x);
                y = standardize(y);
                return sum(x.map(function (xi, i) {
                    return xi * y[i];
                })) / (x.length - 1);
                break;
            case "spearman":
                x = rank(x);
                y = rank(y);
                return 1 - ((6 * sum(x.map(function (xi, i) {
                    return Math.pow(xi - y[i], 2);
                }))) / (x.length * (Math.pow(x.length, 2) - 1)));
                break;
        }
    };

}(typeof exports === "undefined" ? this.stats = {} : exports));
