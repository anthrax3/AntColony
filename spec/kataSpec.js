// KataSpec.js

describe("Calculating Statistics", function() {
   var kata;
   var list; 

   beforeEach(function() {
      kata = new Kata();
      list = [6, 9, 15, -2, 92, 11];
   });

   it('should calculate minimum value properly', function() {
      var minimumValue = kata.calculateMinimumValue(list);
      expect(minimumValue).toEqual(-2);
   });

   it('should calculate maximum value properly', function() {
     var maximumValue = kata.calculateMaximumValue(list);
     expect(maximumValue).toEqual(92);
   });
   
   it('should calculate the sequence length', function() {
     var sequenceLength = kata.calculateSequenceLength(list);
     expect(sequenceLength).toEqual(6);
   });
   
   it('should calculate the average value at 3 decimals', function() {
     var averageValue = kata.calculateAverageValue(list, 3);
     expect(averageValue).toEqual(21.833);
   });
   
   it('should calculate the average value integer precision', function() {
     var averageValue = kata.calculateAverageValue(list, 0);
     expect(averageValue).toEqual(22);
   });

});