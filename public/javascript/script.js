document.addEventListener('DOMContentLoaded', () => {
    const addEventForm = document.getElementById('addEventForm');
    const eventNameInput = document.getElementById('eventName');
    const eventDateTimeInput = document.getElementById('eventDateTime');
    const scheduleDiv = document.getElementById('schedule');
    const productsDiv = document.getElementById('products');
    const productNameInput = document.getElementById('productName');
    const productDescInput = document.getElementById('productDesc');
    const productPriceInput = document.getElementById('productPrice');
    const productPriceTypeInput = document.getElementById('productPriceType');
    const productImageInput = document.getElementById('productImage');
    const productAvailableInput = document.getElementById('productAvailable');
    const productCategoryInput = document.getElementById('productCategory');
    const addProductForm = document.getElementById('addProductForm');
  
  
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

    async function displayProducts() {
      productsDiv.innerHTML = '';

      try {
        // fetch all products from the database
        const response = await fetch('/api/products');
        if(!response.ok) {
          throw new Error('Failed to get products form Database');
        }

        const products = await response.json();
        products.forEach((product) => {
          const productElement = document.createElement('div');
          productElement.textContent = `${product.name} costs $${product.price}.00 and has an ID of ${product._id}`;
          productsDiv.appendChild(productElement);
        });
      } catch (error) {
        console.error(error.message);
        alert("Failed to Fetch products")
      }
    }

    displayProducts();


    //Handle Add Product Form
    addProductForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const productName = productNameInput.value;
      const productDesc = productDescInput.value;
      const productPrice = productPriceInput.value;
      const productPriceType = productPriceTypeInput.value;
      const productImage = productImageInput.value;
      const productAvailable = productAvailableInput.checked ? true : false;
      const productCategory = productCategoryInput.value;

      try {
        // Send a POST request to add the product
        const response = await fetch('/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            name: productName, 
            description: productDesc,
            price: productPrice,
            priceType: productPriceType,
            category: productCategory,
            image: productImage,
            display: productAvailable
          })
        });
  
        if (!response.ok) {
          throw new Error('Failed to add product');
        }
  
        // If product added successfully, fetch and render the updated schedule
        console.log("Successfull added Product");
        displayProducts();
      } catch (error) {
        console.error(error.message);
        alert('Failed to add product');
      }
    });
  });
  