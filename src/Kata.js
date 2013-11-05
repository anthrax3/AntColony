function Kata() {
  'use strict';
}

Kata.prototype.calculateMinimumValue = function (list) {
  'use strict';
  list.sort();
  return list[0];
};

Kata.prototype.calculateMaximumValue = function (list) {
  'use strict';
  list.sort();
  return list[list.length - 1];
};

Kata.prototype.calculateSequenceLength = function (list) {
  'use strict';
  return list.length;
};

Kata.prototype.calculateAverageValue = function (list, precision) {
  'use strict';
  var sum = 0,
    i,
    prec;
  for (i = 0; i < list.length; i++) {
    sum += list[i];
  }

  prec = Math.pow(10, precision);
  return (Math.round(parseFloat(sum / list.length) * prec) / prec);
};