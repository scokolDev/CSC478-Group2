// Define the isLeapYear function directly in the test file
function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }
  
  describe('isLeapYear', () => {
    test('returns true for a leap year', () => {
      expect(isLeapYear(2020)).toBe(true);
      expect(isLeapYear(2000)).toBe(true);
      expect(isLeapYear(2400)).toBe(true);
    });
  
    test('returns false for a non-leap year', () => {
      expect(isLeapYear(2021)).toBe(false);
      expect(isLeapYear(2100)).toBe(false);
      expect(isLeapYear(2200)).toBe(false);
    });
  });
  