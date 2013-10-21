function Kata() {
  
}

Kata.prototype.calculateMinimumValue = function ( list ) {
  list.sort();
  return list[0]; 
}

Kata.prototype.calculateMaximumValue = function ( list ) {
  list.sort();
  return list[list.length-1]; 
}

Kata.prototype.calculateSequenceLength = function ( list ) {
  return list.length; 
}

Kata.prototype.calculateAverageValue = function ( list, precision ) {
  var sum = 0;
  for ( var i = 0 ; i < list.length ; i++ ) {
    sum += list[i];
  }
  
  prec = Math.pow(10, precision);
  return (Math.round(parseFloat(sum/list.length)*prec)/prec)
}