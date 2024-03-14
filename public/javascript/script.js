document.addEventListener('DOMContentLoaded', () => {
    const addEventForm = document.getElementById('addEventForm');
    const eventNameInput = document.getElementById('eventName');
    const eventDateTimeInput = document.getElementById('eventDateTime');
    const scheduleDiv = document.getElementById('schedule');
  
    addEventForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const eventName = eventNameInput.value;
      const eventDateTime = eventDateTimeInput.value;
  
      try {
        // Send a POST request to add the event
        const response = await fetch('/api/events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: eventName, dateTime: eventDateTime })
        });
  
        if (!response.ok) {
          throw new Error('Failed to add event');
        }
  
        // If event added successfully, fetch and render the updated schedule
        console.log("Successfull added Event");
        renderSchedule();
        eventNameInput.value = '';
        eventDateTimeInput.value = '';
      } catch (error) {
        console.error(error.message);
        alert('Failed to add event');
      }
    });
  
    // Function to fetch and render the schedule
    async function renderSchedule() {
      scheduleDiv.innerHTML = ''; // Clear existing schedule content
  
      try {
        // Fetch schedule data from the server
        const response = await fetch('/api/events');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }

        const events = await response.json();
        

        // Render each event in the schedule
        events.forEach((event) => {
          const eventElement = document.createElement('div');
          eventElement.textContent = `${event.name} - ${new Date(event.dateTime).toLocaleString()}`;
          scheduleDiv.appendChild(eventElement);
        });
      } catch (error) {
        console.error(error.message);
        alert('Failed to fetch events');
      }
    }
  
    // Initial rendering of the schedule when the page loads
    renderSchedule();

    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth'
    });
    calendar.render();

  });
  