Spearson
========

A poor man's stats library.

[![Build Status](https://secure.travis-ci.org/agrueneberg/Spearson.png)](http://travis-ci.org/agrueneberg/Spearson)


API
---

### sort
`sort(x)`, x = array of numbers

### round
`round(x, [n])`, x = number to round, n = number of decimal places

### min
`min(x)`, x = array of numbers

### max
`max(x)`, x = array of numbers

### range
`range(start, stop)` start = start number, stop = stop number

### sum
`sum(x)`, x = array of numbers

### median
`median(x)`, x = array of numbers

### mean
`mean(x)`, x = array of numbers

### deviation
`deviation(x)`, x = array of numbers

### variance
`variance(x, [bias])`, x = array of numbers, bias = flag whether to use biased sample variance

### standardDeviation
`standardDeviation(x, [bias])`, x = array of numbers, bias = flag whether to use biased sample variance

### standardize
`standardize(x)`, x = array of numbers

### rank
`rank(x)`, x = array of numbers

### correlation
#### pearson
`correlation.pearson(x, y, [standardize])`, x = array of numbers, y = array of numbers, standarize = flag whether to standardize x and y
#### spearman
`correlation.spearman(x, y, [rank])`, x = array of numbers, y = array of numbers, rank = flag whether to rank x and y

### distance
#### euclidean
`distance.euclidean(x, y)`, x = array of numbers, y = array of numbers
### manhattan
`distance.manhattan(x, y)`, x = array of numbers, y = array of numbers

### pairwiseDistance
`pairwiseDistance(x, distanceMetric)`, x = array of numbers, distanceMetric = distance function (x, y)

### hierarchicalClustering
`hierarchicalClustering(pairwiseDistances, linkageCriterion)`, pairwiseDistances = pairwise distance matrix, linkageCriterion = one of `single`, `complete`, `upgma`
