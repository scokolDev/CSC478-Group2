import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

// Load the admin_dash.js file
const scriptPath = path.resolve(__dirname, '../../public/javascript/admin_dash.js');
const code = fs.readFileSync(scriptPath, 'utf-8');

// Mock the document and window objects using JSDOM
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.document = dom.window.document;
global.window = dom.window;

// Define the 'now' variable
global.now = new Date();

// Initialize DisplayedMonth and DisplayedYear
global.DisplayedMonth = now.getMonth();
global.DisplayedYear = now.getFullYear();

// Define the appointmentListOnDay variable
const appointmentListOnDay = document.createElement('div');
appointmentListOnDay.id = 'SelectedAppointmentList';
document.body.appendChild(appointmentListOnDay);

// Define the appointmentsList variable
const appointmentsList = document.createElement('div');
appointmentsList.id = 'AppointmentsList';
document.body.appendChild(appointmentsList);

// Define the Calendar variable
const Calendar = document.createElement('div');
Calendar.id = 'Calendar';
document.body.appendChild(Calendar);

// Define the monthMarker variable
const monthMarker = document.createElement('div');
monthMarker.id = 'monthMarker';
document.body.appendChild(monthMarker);

// Define the curDay variable
let curDay = 1;

// Define the curDate variable
let curDate = new Date(DisplayedYear, DisplayedMonth, curDay);

// Execute the code in the JSDOM environment
eval(code);


describe('Admin Dashboard', () => {
  test('monthNumToString returns correct month name', () => {
    expect(monthNumToString(1)).toBe('January');
    expect(monthNumToString(2)).toBe('February');
    expect(monthNumToString(3)).toBe('March');
    // Add more test cases for other months
  });

  test('AppointmentArray is populated with appointments', () => {
    expect(AppointmentArray.length).toBeGreaterThan(0);
    expect(AppointmentArray[0]).toHaveProperty('service');
    expect(AppointmentArray[0]).toHaveProperty('start');
    expect(AppointmentArray[0]).toHaveProperty('cost');
    expect(AppointmentArray[0]).toHaveProperty('address');
    expect(AppointmentArray[0]).toHaveProperty('end');
  });

  test('displayAppointmentsOnDay updates the UI correctly', () => {
    // Mock the necessary DOM elements
    const selectedAppointmentHeader = document.createElement('div');
    selectedAppointmentHeader.id = 'SelectedAppointmentHeader';
    document.body.appendChild(selectedAppointmentHeader);

    // Call the displayAppointmentsOnDay function
    displayAppointmentsOnDay(2024, 2, 9, appointmentListOnDay); // Pass appointmentListOnDay as an argument

    // Check if the UI elements are updated correctly
    expect(selectedAppointmentHeader.textContent).toContain('Appointments on March 9, 2024');
    expect(appointmentListOnDay.children.length).toBeGreaterThan(0);

    // Clean up the mocked DOM elements
    document.body.removeChild(selectedAppointmentHeader);
  });

  // Add more test cases as needed
});
