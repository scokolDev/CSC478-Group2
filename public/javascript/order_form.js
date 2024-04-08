document.addEventListener('DOMContentLoaded', () => {
    const orderForm = document.getElementById('orderForm');
    const productList = document.getElementById('Products');
    const resourceList = document.getElementById('Resources');

    async function updateProducts() {
        try {
          // fetch all products from the database
          const response = await fetch('/api/products');
          if(!response.ok) {
            throw new Error('Failed to get products form Database');
          }
  
          const products = await response.json();
          products.forEach((product) => {
            const option = document.createElement('option');
            option.value = product.name
            option.textContent = product.name
            productList.appendChild(option)
          });
        } catch (error) {
          console.error(error.message);
          alert("Failed to Fetch products")
        }
      }

    updateProducts()

    async function updateResources(product) {
        try {
          // fetch all resources from the database
          const response = await fetch('/api/resources');
          if(!response.ok) {
            throw new Error('Failed to get resources form Database');
          }
  
          const resources = await response.json();
          resources.forEach((resource) => {
            const option = document.createElement('option');
            option.value = resource
            option.textContent = resource.name
            resourceList.appendChild(option)
          });
        } catch (error) {
          console.error(error.message);
          alert("Failed to Fetch resources")
        }
      }

      productList.addEventListener('change', async (event) => {
        const productSelection = productList.value;
        resourceList.innerHTML = "";

        try {
            // fetch all resources from the database
            const response = await fetch(`/api/resources?products=${productSelection}`);
            if(!response.ok) {
              throw new Error('Failed to get resources form Database');
            }
    
            const resources = await response.json();
            resources.forEach((resource) => {
              const option = document.createElement('option');
              option.value = resource
              option.textContent = resource.name
              resourceList.appendChild(option)
            });
          } catch (error) {
            console.error(error.message);
            alert("Failed to Fetch resources")
          }


      })

});