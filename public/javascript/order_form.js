document.addEventListener('DOMContentLoaded', () => {
    const orderForm = document.getElementById('orderForm');
    const productList = document.getElementById('Products');
    const resourceList = document.getElementById('Resources');

    let submitted = false;

    const addMessage = (message) => {
      const messagesDiv = document.querySelector('#messages');
      messagesDiv.style.display = 'block';
      const messageWithLinks = addDashboardLinks(message);
      messagesDiv.innerHTML += `> ${messageWithLinks}<br>`;
      console.log(`Debug: ${message}`);
    };

    const addDashboardLinks = (message) => {
      const piDashboardBase = 'https://dashboard.stripe.com/test/payments';
      return message.replace(
        /(pi_(\S*)\b)/g,
        `<a href="${piDashboardBase}/$1" target="_blank">$1</a>`
      );
    };

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
            const response = await fetch("/api/resources?" + `products=${productSelection}`);
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


      const stripe = Stripe(stripePublicKey)
      var elements = stripe.elements()
      var card = elements.create('card');
      card.mount('#card-element');
      // var cardNumber = elements.create('cardNumber');
      // cardNumber.mount('#cardNumber-element')
      // var cardExpiry = elements.create('cardExpiry');
      // cardExpiry.mount('#cardExpiry-element')
      // var cardCvc = elements.create('cardCvc');
      // cardCvc.mount('#cardCvc-element')



      // If you disable collecting fields in the Payment Element, you
      // must pass equivalent data when calling `stripe.confirmPayment`.
      orderForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Disable double submission of the form
        if(submitted) { return; }
        submitted = true;
        orderForm.querySelector('button').disabled = true;

        // Make a call to the server to create a new
        // payment intent and store its client_secret.
        const {error: backendError, clientSecret, nextAction} = await fetch(
          '/api/orders/create-payment-intent',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              currency: 'usd',
              paymentMethodType: 'card',
            }),
          }
        ).then((r) => r.json());

        if (backendError) {
          addMessage(backendError.message);

          // reenable the form.
          submitted = false;
          orderForm.querySelector('button').disabled = false;
          return;
        }

        addMessage(`Client secret returned.`);

        const firstNameInput = document.querySelector('#firstName');
        const lastNameInput = document.querySelector('#lastName');

        // Confirm the card payment given the clientSecret
        // from the payment intent that was just created on
        // the server.
        const {error: stripeError, paymentIntent} = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: {
              card: card,
              billing_details: {
                name: firstNameInput.value + " " + lastNameInput.value,
              }, 
            },
          }
        );

        if (stripeError) {
          addMessage(stripeError.message);

          // reenable the form.
          submitted = false;
          orderForm.querySelector('button').disabled = false;
          return;
        }

        addMessage(`Payment ${paymentIntent.status}: ${paymentIntent.id}`);
        if (paymentIntent.status == "succeeded") {
          window.location.href = '/success.html';
        }
      });
});