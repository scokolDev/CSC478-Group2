const { monthNumToString } = require('../../public/javascript/admin_dash');


describe('monthNumToString', () => {
  test('returns correct month names', () => {
    expect(monthNumToString(1)).toBe('January');
    expect(monthNumToString(12)).toBe('December');
  });

  test('returns undefined for invalid month number', () => {
    expect(monthNumToString(0)).toBeUndefined();
    expect(monthNumToString(13)).toBeUndefined();
  });
});

// Mock DOM elements
document.body.innerHTML = `
  <div id="AppointmentsList"></div>
  <div id="SelectedAppointmentList"></div>
  <div id="Calendar"></div>
  <button id="CalPrev"></button>
  <button id="CalNext"></button>
`;

// Mock fetch function
global.fetch = jest.fn();

// Mock Date object
const now = new Date('2024-05-02');
global.Date = jest.fn(() => now);

// Include your other functions and tests here
