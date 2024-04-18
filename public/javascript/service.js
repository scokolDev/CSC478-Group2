document.addEventListener('DOMContentLoaded', function() {
    // Function to toggle visibility of serviceContainer
    function toggleServiceContainer() {
        var serviceContainer = document.getElementById('serviceContainer');
        if (serviceContainer.style.display === 'none' || serviceContainer.style.display === '') {
            serviceContainer.style.display = 'block';
        } else {
            serviceContainer.style.display = 'none';
        }
    }
    service1Name = document.getElementById("service1Name")
    service1Price = document.getElementById("service1Price")
    service1Desc = document.getElementById("service1Desc")

    service2Name = document.getElementById("service2Name")
    service2Price = document.getElementById("service2Price")
    service2Desc = document.getElementById("service2Desc")

    service3Name = document.getElementById("service3Name")
    service3Price = document.getElementById("service3Price")
    service3Desc = document.getElementById("service3Desc")
    // Event listener for the "Services" button
    document.getElementById('servicesLink').addEventListener('click', async function(event) {
        event.preventDefault();
        document.getElementById('aboutInfo').style.display = 'none';
        document.getElementById('contactForm').style.display = 'none';
        document.getElementById('proApplicationForm').style.display = 'none';

        try {
            // fetch all products from the database
            const response = await fetch('/api/products');
            if(!response.ok) {
              throw new Error('Failed to get products from Database');
            }
      
            const products = await response.json();
            let productsDisplayed = 0
            products.forEach((product) => {
                if(productsDisplayed < 3){
                    productsDisplayed++
                    document.getElementById("service" + productsDisplayed + "Name").innerHTML = product.name
                    document.getElementById("service" + productsDisplayed + "Price").innerHTML = product.price
                    document.getElementById("service" + productsDisplayed + "Desc").innerHTML = product.description
                }
            });
          } catch (error) {
    
            console.error(error.message);
            alert("Failed to Fetch products")
          }




        document.getElementById('serviceContainer').style.display = 'block';
        document.getElementById('home').style.display = 'none'; // Hide the home section
        document.getElementById('reviews').style.display = 'none'; // Hide the testimonials section
    });

    // Handle click events for service boxes
    document.querySelectorAll('.service-box').forEach(function(box) {
        box.addEventListener('click', function() {
            // Add your functionality here
            alert('You selected ' + box.textContent);
        });
    });

    // Event listener for other navigation links
    document.querySelectorAll('nav a:not(#servicesLink)').forEach(function(link) {
        link.addEventListener('click', function() {
            // Hide serviceContainer, home, and testimonials sections when other navigation links are clicked
            document.getElementById('serviceContainer').style.display = 'none';
            document.getElementById('home').style.display = 'none';
            document.getElementById('reviews').style.display = 'none';
        });
    });

    // Event listener for signing in
    document.getElementById('signInLink').addEventListener('click', function(event) {
        event.preventDefault();
        var email = prompt("Enter your email:");
        var password = prompt("Enter your password:");
        if (email && password) {
            alert('You entered email: ' + email + ' and password: ' + password);
        }
    });

    // Event listener for reloading the page on clicking "Home" link
    document.getElementById('homeLink').addEventListener('click', function() {
        location.reload();
    });

    // Event listener for displaying the about section
    document.getElementById('aboutLink').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('aboutInfo').style.display = 'block';
        document.getElementById('contactForm').style.display = 'none';
        document.getElementById('proApplicationForm').style.display = 'none';
        document.getElementById('serviceContainer').style.display = 'none';
        document.getElementById('home').style.display = 'none'; // Hide the home section
        document.getElementById('reviews').style.display = 'none'; // Hide the testimonials section
        document.getElementById('.book-now-button').style.display = 'none'; // Hide the testimonials section
    });

    // Event listener for displaying the contact form
    document.getElementById('contactLink').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('aboutInfo').style.display = 'none';
        document.getElementById('contactForm').style.display = 'block';
        document.getElementById('proApplicationForm').style.display = 'none';
        document.getElementById('serviceContainer').style.display = 'none';
        document.getElementById('home').style.display = 'none'; // Hide the home section
        document.getElementById('reviews').style.display = 'none'; // Hide the testimonials section
        document.getElementById('.book-now-button').style.display = 'none'; // Hide the testimonials section
    });

    // Event listener for displaying the pro application form
    document.getElementById('proApplicationLink').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('aboutInfo').style.display = 'none';
        document.getElementById('contactForm').style.display = 'none';
        document.getElementById('proApplicationForm').style.display = 'block';
        document.getElementById('serviceContainer').style.display = 'none';
        document.getElementById('home').style.display = 'none'; // Hide the home section
        document.getElementById('reviews').style.display = 'none'; // Hide the testimonials section
        document.getElementById('.book-now-button').style.display = 'none'; // Hide the testimonials section
    });

resourceList = document.getElementById("resourceList")
productsList = document.getElementById("productsList")
   // Function to toggle visibility of bookingForm
function toggleBookingForm() {
    var bookingForm = document.getElementById('bookingFormContainer');
    if (bookingForm.style.display === 'none' || bookingForm.style.display === '') {
        // Hide all other forms and sections
        document.getElementById('aboutInfo').style.display = 'none';
        document.getElementById('contactForm').style.display = 'none';
        document.getElementById('proApplicationForm').style.display = 'none';
        document.getElementById('serviceContainer').style.display = 'none';
        document.getElementById('home').style.display = 'none';
        document.getElementById('reviews').style.display = 'none';

        // Display only the booking form
        bookingForm.style.display = 'block';
    } else {
        // Hide the booking form
        bookingForm.style.display = 'none';
    }
    loadProducts(productsList)
    
}


    // Event listener for clicking the "Book Now" button
    document.querySelector('.book-now-button').addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the default action of the button
        toggleBookingForm(); // Toggle the visibility of the booking form
    });

    var bookingForm = document.getElementById('bookingForm');
    var paymentFormContainer = document.getElementById('paymentFormContainer');

    bookingForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        
        // Hide booking form and show payment form
        bookingForm.style.display = 'none';
        paymentFormContainer.style.display = 'block';
    });

    var paymentForm = document.getElementById('paymentForm');
    paymentForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        
        // Process payment (you can add your payment processing logic here)
        // Once payment is processed successfully, you may redirect the user to a confirmation page or perform other actions.
        alert('Payment processed successfully!');
        location.reload();    });
});

















// 
// Booking form javascript
// 



inputStartDate = document.getElementById("start-date")

inputEndDate = document.getElementById("end-date")
inputStartTime = document.getElementById("start-time")
inputEndTime = document.getElementById("end-time")
inputHours = document.getElementById("total-time")
startDateWrapper = document.getElementById("start-date-wrapper")
endDateWrapper = document.getElementById("end-date-wrapper")
totalTimeLabel = document.getElementById("total-time-label")
inputtotalTime = document.getElementById("total-time")
inputRate = document.getElementById("rate")
inputFullPrice = document.getElementById("full-price")
inputResource = document.getElementById("resourceList")
scheduleWrapper = document.getElementById("scheduleWrapper")

inputFirstName = document.getElementById("first-name")
inputLastName = document.getElementById("last-name")
inputEmail = document.getElementById("email")
inputPassword = document.getElementById("password")
inputConfirmPassword = document.getElementById("confirm-password")
inputBirthDate = document.getElementById("birthdate")

resourceList = document.getElementById("resourceList")
resourceNameBox = document.getElementById("resourceName")
resourceDaysBox = document.getElementById("resourceDays")
resourceTimesBox = document.getElementById("resourceTimes")


tempDate = new Date(Date.now());
let hours = 0
let priceType = "flat rate"
let selectedProductRate = 0


function clearOrderInputs(){
    inputEndTime.value = ""
    inputStartTime.value = ""
    inputStartDate.value = ""
    inputEndDate.value = ""
    inputFullPrice.value = ""
    inputRate.value = ""
    inputHours.value = ""
    scheduleWrapper.style.display = "none"
}

function getDayIndex(day){
    switch(day){
        case("sunday"):
        return 0;

        case("monday"):
        return 1;

        case("tuesday"):
        return 2;

        case("wednsday"):
        return 3;

        case("thursday"):
        return 4;

        case("friday"):
        return 5;

        case("saturday"):
        return 6;
    }
}

async function loadProducts(container){
    container.innerHTML = "<option disabled selected value> select a product </option>"
    try {
        // fetch all products from the database
        const response = await fetch('/api/products');
        if(!response.ok) {
          throw new Error('Failed to get products from Database');
        }
  
        const products = await response.json();
        products.forEach((product) => {
            productListing = document.createElement("option")
            productListing.innerHTML =  `${product.name}`
            productListing.setAttribute("id", `${product._id}`)

            container.appendChild(productListing)
        });
      } catch (error) {

        console.error(error.message);
        alert("Failed to Fetch products")
      }
}

function updateHours(){
    console.log("--------" + priceType + "---------")
    if(inputEndTime.value != "" && inputStartTime.value != "" && inputStartDate.value != ""){
        switch(priceType){ 
            case("Flat Rate"):
                if(inputEndDate.value != ""){
                    etimes = inputEndTime.value.split(":")
                    stimes = inputStartTime.value.split(":")
                    sDate = inputStartDate.value.split("-")
                    eDate = inputEndDate.value.split("-")
                    startDateObj = new Date(parseInt(sDate[0]), parseInt(sDate[1]), parseInt(sDate[2]), parseInt(stimes[0]), parseInt(stimes[1]))
                    endDateObj = new Date(parseInt(eDate[0]), parseInt(eDate[1]), parseInt(eDate[2]), parseInt(etimes[0]), parseInt(etimes[1]))
                    
                    hours = (endDateObj - startDateObj)/ (1000 * 60 * 60)
                    inputHours.value = hours.toFixed(2)
                    inputFullPrice.value = "$" + parseFloat(selectedProductRate).toFixed(2)
                    
                }
                break
            case("Per Hour"):
                etimes = inputEndTime.value.split(":")
                stimes = inputStartTime.value.split(":")
                hours = parseInt(etimes[0] - stimes[0]) + parseInt(etimes[1] - stimes[1])/60
                inputHours.value = hours.toFixed(2)
                inputFullPrice.value = "$" + parseFloat(hours * selectedProductRate).toFixed(2)
                break
            case("Per Day"):
                if(inputEndDate.value != ""){
                    etimes = inputEndTime.value.split(":")
                    stimes = inputStartTime.value.split(":")
                    sDate = inputStartDate.value.split("-")
                    eDate = inputEndDate.value.split("-")
                    startDateObj = new Date(parseInt(sDate[0]), parseInt(sDate[1]), parseInt(sDate[2]), parseInt(stimes[0]), parseInt(stimes[1]))
                    endDateObj = new Date(parseInt(eDate[0]), parseInt(eDate[1]), parseInt(eDate[2]), parseInt(etimes[0]), parseInt(etimes[1]))
                
                    days = (endDateObj - startDateObj)/(1000 * 60 * 60 * 24)
                    inputHours.value = days.toFixed(2)
                    inputFullPrice.value = "$" + parseFloat(days * selectedProductRate).toFixed(2)
                }
                break
        }
    }
}



async function verifyInput(){

    if(inputPassword.value != inputConfirmPassword.value){
        alert("passwords do not match");
        inputPassword.style.color = "red"
        inputConfirmPassword.style.color = "red"
        return false
    }


    selectedResourceID = inputResource.options[inputResource.selectedIndex].id

    SelectedStimes = inputStartTime.value.split(":")
    SelectedSDate = inputStartDate.value.split("-")
    startDateObj = new Date(parseInt(SelectedSDate[0]), parseInt(SelectedSDate[1])-1, parseInt(SelectedSDate[2]), parseInt(SelectedStimes[0]), parseInt(SelectedStimes[1]))
    
    if(priceType == "Per Hour"){
        SelectedEtimes = inputEndTime.value.split(":")
        endDateObj = new Date(parseInt(SelectedSDate[0]), parseInt(SelectedSDate[1])-1, parseInt(SelectedSDate[2]), parseInt(SelectedEtimes[0]), parseInt(SelectedEtimes[1]))
    }else{
        SelectedEtimes = inputEndTime.value.split(":")
        SelectedEDate = inputEndDate.value.split("-")
        endDateObj = new Date(parseInt(SelectedEDate[0]), parseInt(SelectedEDate[1])-1, parseInt(SelectedEDate[2]), parseInt(SelectedEtimes[0]), parseInt(SelectedEtimes[1]))
    }
    
    
    try {
        // fetch product from the database
        const response = await fetch('/api/resources/' + selectedResourceID);
        if(!response.ok) {
          throw new Error('Failed to verify resource from database');
        }
        
        const resource = await response.json();
        resourceName = resource.name
        daysAvailable = resource.dayAvailability

        sTime = resource.start.split(":")
        eTime = resource.end.split(":")
        
        let dayIndex = startDateObj.getDay();
        console.log(startDateObj)
        if(!daysAvailable[dayIndex]){
            alert(resourceName + " is not available on your selected start date");
            inputStartDate.style.color == "red"
            return false
        }

        dayIndex = endDateObj.getDay();
        if(!daysAvailable[dayIndex]){
            alert(resourceName + " is not available on your selected end date");
            inputEndTime.style.color == "red"
            return false
        }
        console.log(parseInt(SelectedStimes[0] + SelectedStimes[1]))
        console.log(parseInt(sTime[0] + sTime[1]))
        if(parseInt(SelectedStimes[0] + SelectedStimes[1]) < parseInt(sTime[0] + sTime[1])){
            alert(resourceName + " is not available on your selected start Time");
            return false
        }else if(parseInt(SelectedEtimes[0] + SelectedEtimes[1]) > parseInt(eTime[0] + eTime[1])){
            alert(resourceName + " is not available on your selected end Time");
            return false
        }

        return true
      } catch (error) {

        console.error(error.message);
        alert("Failed to Fetch resource")
    }
}





async function sendOrderToDB(){
    birthDateValues = inputBirthDate.value.split("-")
    dateBirthDateObj = new Date(parseInt(birthDateValues[0]), parseInt(birthDateValues[1]), parseInt(birthDateValues[2]))
    try{
        const response = await fetch('/api/customers', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
                body: JSON.stringify({ 
                    firstName: inputFirstName.value,
                    LastName: inputLastName.value,
                    email: inputEmail.value,
                    password: inputPassword.value,
                    birthDate: dateBirthDateObj,
                    organizationID: "temp org id"
            })
        });
        if (!response.ok) {
            throw new Error('Failed to add customer');
        }

        // If product added successfully,  and render the updated schedule
        console.log("Successfully added customer");
    } catch (error) {
        console.error(error.message);
        alert('Failed to add customer');
    }

    tempProducts = []
    tempProducts[0] = productsList.options[productsList.selectedIndex].id
    resourceId = resourceList.options[resourceList.selectedIndex].id

    
    sdate = inputStartDate.value.split("-")
    stimes = inputStartTime.value.split(":")
    startDateTime = new Date(parseInt(sdate[0]), parseInt(sdate[1])-1, parseInt(sdate[2]), parseInt(stimes[0]), parseInt(stimes[1]))

    if(priceType == "Per Hour"){
        etimes = inputEndTime.value.split(":")
        endDateTime = new Date(parseInt(sdate[0]), parseInt(sdate[1])-1, parseInt(sdate[2]), parseInt(etimes[0]), parseInt(etimes[1]))

    }else{
        edate = inputEndDate.value.split("-")
        etimes = inputEndTime.value.split(":")
        endDateTime = new Date(parseInt(edate[0]), parseInt(edate[1])-1, parseInt(edate[2]), parseInt(etimes[0]), parseInt(etimes[1]))    
    }
    
    console.log(tempDate)
    console.log(startDateTime)
    console.log(endDateTime)
    try{
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
                body: JSON.stringify({ 
                    customerID: "customer number",
                    products: tempProducts,
                    startTime: startDateTime,
                    endTime: endDateTime,
                    status: "processing",
                    organizationID: "org id",
                    resourceID: resourceId
            })
        });
        if (!response.ok) {
            throw new Error('Failed to add order');
        }

        // If product added successfully,  and render the updated schedule
        console.log("Successfully added order");
    } catch (error) {
        console.error(error.message);
        alert('Failed to add order');
    }
}

//submit Booking functionality
document.getElementById("submitBooking").addEventListener("click", async function(){
    if(await verifyInput() == false){
        return
    }
    await sendOrderToDB();
    location.href = "/dashboard"
})

async function updateScheduleSelector(resourceID){
    console.log(priceType)
    let dayAvailability = []
    let resourceStart, resourceEnd
    try {
        const resourceResponse = await fetch('/api/resources/' + resourceID);
        if(!resourceResponse.ok) {
            throw new Error('Failed to get resources form Database');
        }
        const resource = await resourceResponse.json();
        dayAvailability = resource.dayAvailability
        resourceName = resource.name
        resourceStart = resource.start
        resourceEnd = resource.end

    } catch (error) {
        console.error(error.message);
        alert("Failed to Fetch products")
    }

    resourceNameBox.innerHTML = resourceName
    resourceDaysBox.innerHTML = ''
    for(i = 0; i < dayAvailability.length; i++){
        if(dayAvailability[i]){
            switch(i){
                case(0):
                    resourceDaysBox.innerHTML += "Sunday ";
                    break
                case(1):
                    resourceDaysBox.innerHTML += "Monday ";
                    break
                case(2):
                    resourceDaysBox.innerHTML += "Tuesday ";
                    break
                case(3):
                    resourceDaysBox.innerHTML += "Wednsday ";
                    break
                case(4):
                    resourceDaysBox.innerHTML += "Thursday ";
                    break
                case(5):
                    resourceDaysBox.innerHTML += "Friday ";
                    break
                case(6):
                    resourceDaysBox.innerHTML += "Saturday ";
            }
        }
    }
    resourceTimesBox.innerHTML = resourceStart + " - " + resourceEnd
    scheduleWrapper.style.display = "block"
}

async function updateResources(prodId){
    resourceList.innerHTML = '<option disabled selected value> select a resource </option>'
    clearOrderInputs()
    try {
        // fetch product from the database
        const response = await fetch('/api/products/' + prodId);
        if(!response.ok) {
          throw new Error('Failed to get product from Database');
        }
        
        const product = await response.json();
        selectedProductRate = parseFloat(product.price).toFixed(2)
        inputRate.value = "$" + selectedProductRate
        console.log("product.priceType" + "= " + product.priceType)
        priceType = product.priceType[0]
        
        switch(priceType){
            case("Flat Rate"):
                endDateWrapper.style = "display:block;"
                totalTimeLabel.innerHTML = "Number of Hours:"
                break
            case("Per Hour"):
                endDateWrapper.style = "display:none;"
                totalTimeLabel.innerHTML = "Number of Hours:"
                inputRate.value += "/Hour"
                break
            case("Per Day"):
                endDateWrapper.style = "display:block;"
                totalTimeLabel.innerHTML = "Number of Days:"
                inputRate.value += "/Day"
                break
        }
        
        for(i = 0; i < product.resources.length; i++){
            const resourceResponse = await fetch('/api/resources/' + product.resources[i]);
            if(!resourceResponse.ok) {
                throw new Error('Failed to get resources form Database');
            }
            const resource = await resourceResponse.json();

            resourceListing = document.createElement("option")
            resourceListing.innerHTML =  `${resource.name}`
            resourceListing.setAttribute("id", `${resource._id}`)

            resourceList.appendChild(resourceListing)
        }
      } catch (error) {

        console.error(error.message);
        alert("Failed to Fetch products")
    }
}