const { isPalindrome, reverseString, closestPair, Calculator } = require('../index');

describe('reverseString', () => {
  it('should reverse the string', () => {
      expect(reverseString('hello')).toEqual('olleh');
      expect(reverseString('world')).toEqual('dlrow');
  });
});


describe('isPalindrome', () => {
  it('should return true if the string is a palindrome', () => {
      expect(isPalindrome('racecar')).toBe(true);
      expect(isPalindrome('hello')).toBe(false);
  });
});


describe('closestPair', () => {
  it('should return the closest pair of elements', () => {
      expect(closestPair([4, 2, 1, 7, 9, 10])).toEqual([1, 2]);
      expect(closestPair([1, 5, 9, 12, 15])).toEqual([9, 12]);
  });
});



describe('Calculator', () => {
  let calc;

  beforeEach(() => {
      calc = new Calculator();
  });

  it('should add two numbers', () => {
      expect(calc.add(2, 3)).toEqual(5);
      expect(calc.getLastResult()).toEqual(5); 
      expect(calc.add(-5, 10)).toEqual(5);
      expect(calc.getLastResult()).toEqual(5); 
  });

  it('should subtract two numbers', () => {
      expect(calc.subtract(5, 2)).toEqual(3);
      expect(calc.getLastResult()).toEqual(3); 
      expect(calc.subtract(10, -5)).toEqual(15);
      expect(calc.getLastResult()).toEqual(15); 
  });

  it('should multiply two numbers', () => {
      expect(calc.multiply(2, 3)).toEqual(6);
      expect(calc.getLastResult()).toEqual(6); 
      expect(calc.multiply(-5, 10)).toEqual(-50);
      expect(calc.getLastResult()).toEqual(-50); 
  });

  it('should divide two numbers', () => {
      expect(calc.divide(6, 2)).toEqual(3);
      expect(calc.getLastResult()).toEqual(3); 
      expect(calc.divide(10, -5)).toEqual(-2);
      expect(calc.getLastResult()).toEqual(-2); 
  });

  it('should throw error for division by zero', () => {
      expect(() => calc.divide(10, 0)).toThrow('Division by zero is not allowed');
  });

  it('should exponentiate base to exponent', () => {
      expect(calc.exponentiate(2, 3)).toEqual(8);
      expect(calc.getLastResult()).toEqual(8); 
      expect(calc.exponentiate(5, 0)).toEqual(1);
      expect(calc.getLastResult()).toEqual(1); 
      expect(() => calc.exponentiate(2, -3)).toThrow('Exponentiation with negative exponent is not allowed');
  });

  it('should return the last result', () => {
      calc.add(2, 3);
      expect(calc.getLastResult()).toEqual(5);
      calc.subtract(10, -5);
      expect(calc.getLastResult()).toEqual(15);
      calc.multiply(-5, 10);
      expect(calc.getLastResult()).toEqual(-50);
      calc.divide(10, -5);
      expect(calc.getLastResult()).toEqual(-2);
  });
});
