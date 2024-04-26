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

    resourceList = document.getElementById("resourceList")
    productsList = document.getElementById("productsList")
    

    // Function to toggle visibility of bookingForm
    function toggleBookingForm(selectedProductId) {

         // Hide all other forms and sections
        document.getElementById('aboutInfo').style.display = 'none';
        document.getElementById('contactForm').style.display = 'none';
        document.getElementById('proApplicationForm').style.display = 'none';
        document.getElementById('serviceContainer').style.display = 'none';
        document.getElementById('home').style.display = 'none';
        document.getElementById('reviews').style.display = 'none';

        // Display only the booking form
        document.getElementById('bookingFormContainer').style.display = 'block';
        selectedProductId != undefined ? loadProducts(productsList, selectedProductId) : loadProducts(productsList)
    
    }

    function setServiceDisplay(container, name, description, price, priceType, id){
        container.getElementsByClassName("serviceName")[0].innerHTML = name
        priceStr = "$" + price
        console.log(priceType)
        switch(priceType){
            case("Per Hour"):
                priceStr += "/Hour"
                break
            case("Per Day"):
                priceStr += "/Day"
                break
        }
        container.getElementsByClassName("servicePrice")[0].innerHTML = priceStr
        container.getElementsByClassName("serviceDesc")[0].innerHTML = description
        container.getElementsByClassName("serviceBookNowButton")[0].addEventListener("click", function(){
            toggleBookingForm(id)
        })

    }
    

    // Event listener for the "Services" button
    document.getElementById('servicesLink').addEventListener('click', async function(event) {
        event.preventDefault();
        document.getElementById('aboutInfo').style.display = 'none';
        document.getElementById('contactForm').style.display = 'none';
        document.getElementById('proApplicationForm').style.display = 'none';
        document.getElementById('bookingFormContainer').style.display = 'none';
       

        try {
            // fetch all products from the database
            const response = await fetch('/api/products');
            if(!response.ok) {
              throw new Error('Failed to get products from Database');
            }
      
            const products = await response.json();
            
            let selectedIndecies = []
            
            serviceContainer1 = document.getElementById("service1Display")
            serviceContainer2 = document.getElementById("service2Display")
            serviceContainer3 = document.getElementById("service3Display")
            if(products.length > 3){
                while(selectedIndecies.length < 3){
                    rand = Math.floor(Math.random() * products.length)
                    if(!selectedIndecies.includes(rand)){
                        selectedIndecies.push(rand)
                    }
                }
                currentProduct = products[selectedIndecies[0]]
                setServiceDisplay(serviceContainer1, currentProduct.name, currentProduct.description, currentProduct.price, currentProduct.priceType[0], currentProduct._id)
                
                currentProduct = products[selectedIndecies[1]]
                setServiceDisplay(serviceContainer2, currentProduct.name, currentProduct.description, currentProduct.price, currentProduct.priceType[0], currentProduct._id)
                
                currentProduct = products[selectedIndecies[2]]
                setServiceDisplay(serviceContainer3, currentProduct.name, currentProduct.description, currentProduct.price, currentProduct.priceType[0], currentProduct._id)
            
            
            }else{
                let productsDisplayed = 0
                products.forEach((product) => {
                    productsDisplayed++
                    container = document.getElementById("service" + productsDisplayed + "Display")
                    setServiceDisplay(container, product.name, product.description, product.price, product.priceType, product._id)
                })
            }
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
        bookingForm.style.display = 'none'; // Hide the testimonials section
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
        bookingForm.style.display = 'none'; // Hide the testimonials section
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
        bookingForm.style.display = 'none'; // Hide the testimonials section
    });




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

















/*
//booking form javascript
*/

now = new Date(Date.now());
DisplayedMonth = now.getMonth();
DisplayedYear = now.getFullYear();

Calendar = document.getElementById("Calendar")

selectDateMessage = document.getElementById("enter-date-message")

selectedResourceDayAvailability = []
selectedResourceBookedDates = []

inputFirstName = document.getElementById("first-name")
inputLastName = document.getElementById("last-name")
inputEmail = document.getElementById("email")
inputPassword = document.getElementById("password")
inputConfirmPassword = document.getElementById("confirm-password")
inputBirthDate = document.getElementById("birthdate")

startDateWrapper = document.getElementById("start-date-wrapper")
inputStartDate = document.getElementById("start-date")
endDateWrapper = document.getElementById("end-date-wrapper")
inputEndDate = document.getElementById("end-date")
inputStartTime = document.getElementById("start-time")
inputEndTime = document.getElementById("end-time")

inputHours = document.getElementById("total-time")
totalTimeLabel = document.getElementById("total-time-label")
inputtotalTime = document.getElementById("total-time")
inputRate = document.getElementById("rate")
inputFullPrice = document.getElementById("full-price")

resourceList = document.getElementById("resourceList")
resourceNameBox = document.getElementById("resourceName")
resourceDaysBox = document.getElementById("resourceDays")
resourceTimesBox = document.getElementById("resourceTimes")
scheduleWrapper = document.getElementById("scheduleWrapper")

let hours = 0
let priceType = "flat rate"
let selectedProductRate = 0
let isSelectStart = true;


//returns a month name in string form given the month number
function monthNumToString(monthNumber){
    switch(monthNumber){
        case 1:
            return "January";
        case 2:
            return "February";
        case 3:
            return "March";
        case 4:
            return "April";
        case 5:
            return "May";
        case 6:
            return "June";
        case 7:
            return "July";
        case 8:
            return "August";
        case 9:
            return "Setember";
        case 10:
            return "October";
        case 11:
            return "November";
        case 12:
            return "December";
    }

}

//checks to see is onDate date value is compatible with a resource dayAvailability and bookedDates
//
//onDate: date to check if availible
//dayAvailability: dayAvailability of resource
//bookedDates:bookedDates of resource
//
//returns true: resource is availible onDate
//returns true: resource is not availible onDate
function checkAvailible(onDate, dayAvailability, bookedDates){

    //check if resource is avilable on day of week date falls on
    if(dayAvailability[onDate.getDay()]){

        //iterate through all bookedDates in bookedDates array
        for(i = 0; i < bookedDates.length; i++){

            //convert bookedDate start and end times to date objects
            bookedSDate = new Date(parseInt(bookedDates[i].start.substring(0,4)), parseInt(bookedDates[i].start.substring(5,7))-1, parseInt(bookedDates[i].start.substring(8,10))) 
            bookedEDate = new Date(parseInt(bookedDates[i].end.substring(0,4)), parseInt(bookedDates[i].end.substring(5,7))-1, parseInt(bookedDates[i].end.substring(8,10))) 
            
            //if date falls between start and end date of booked date, resource is unavailable
            if(bookedSDate <= onDate && bookedEDate >= onDate){
                return false
            }
        }
        return true
    }
    return false
    
}


//initialize the Calendar to select booking dates on booking form
//
//monthIndex: month to be displayed on the calendar
//year: year to be displayed on the calendar
//dayAvailability: a boolean array of days that the selected resources is available on
function initCalendar(monthIndex, year, dayAvailability, bookedDates){
    Calendar.innerHTML = '';
    document.getElementById("monthMarker").innerHTML = monthNumToString(monthIndex+1) + ", " + year;
    curDay = 1;
    curDate = new Date(year, monthIndex, curDay);
    
    //fill in empty space days before the first day is added to the calendar
    for(i = 0; i < curDate.getDay(); i++){
        Calendar.innerHTML += '<div></div>';
    }
    
    //while loop which iterates through every day of the given month
    while(curDate.getMonth() == monthIndex){
        let day = document.createElement("button");
        day.setAttribute("class", "CalDayActive");
        day.setAttribute("type", "button");

        day.innerHTML = curDate.getDate();
        day.setAttribute("year", curDate.getFullYear())
        day.setAttribute("month", curDate.getMonth())
        day.setAttribute("day", curDate.getDate())
        console.log(dayAvailability)

        //checking if resource is available on current day
        
        if(checkAvailible(curDate, dayAvailability, bookedDates)){
            day.style.backgroundColor = "lightblue"

            //functionality when user clicks on an available 
            day.addEventListener("click", function(){

                //isSelectStart is true if user is currently selecting start date
                if(isSelectStart){
                    
                    //unselect previously selected start day
                    if(document.getElementById("selectedStartDay") != null){
                        document.getElementById("selectedStartDay").style.backgroundColor = "lightblue"
                        document.getElementById("selectedStartDay").removeAttribute("id")
                    }
                    day.setAttribute("id", "selectedStartDay")
                    day.style.backgroundColor = "lightgreen"

                    //set start date input to day selected by user
                    tempDate = new Date(day.getAttribute("year"), day.getAttribute("month"), day.getAttribute("day"))
                    console.log(tempDate.toISOString())
                    document.getElementById("start-date").value = tempDate.toISOString().substr(0, 10);
                    
                    //changing select day prompt and isSelectStart depending on the selected product price type
                    if(priceType == "Per Hour"){
                        selectDateMessage.innerHTML = "Click to Change Start Date"
                    }else{
                        selectDateMessage.innerHTML = "Select End Date"
                        isSelectStart = false;
                    }
                    
                    //update the amount of hours/days selected by user, rate, and total price
                    updateHours()
                }else{

                    //unselect previously selected end day
                    if(document.getElementById("selectedEndDay") != null){
                        document.getElementById("selectedEndDay").style.backgroundColor = "lightblue"
                        document.getElementById("selectedEndDay").removeAttribute("id")
                    }
                    day.setAttribute("id", "selectedEndDay")
                    day.style.backgroundColor = "lightcoral"

                    //set end date input to day selected by user
                    tempDate = new Date(day.getAttribute("year"), day.getAttribute("month"), day.getAttribute("day"))
                    console.log(tempDate.toISOString())
                    document.getElementById("end-date").value = tempDate.toISOString().substr(0, 10);
                    
                    //changing select day prompt and isSelectStart
                    selectDateMessage.innerHTML = "Click to Change Start Date"
                    isSelectStart = true;

                    //update the amount of hours/days selected by user, rate, and total price
                    updateHours()
                }
                
            })
        }   
        Calendar.appendChild(day);
        curDay++
        curDate = new Date(year, monthIndex, curDay);
    }
    
}

//functionality for prev button above calander; goes back one month and updates calander object
document.getElementById("CalPrev").addEventListener("click", function() {
    if(DisplayedMonth == 0){
        DisplayedMonth = 11;
        DisplayedYear = DisplayedYear - 1;
    }else{
        DisplayedMonth--;
    }
    initCalendar(DisplayedMonth, DisplayedYear, selectedResourceDayAvailability, selectedResourceBookedDates);
})

//functionality for next button above calander; goes forward one month and updates calander object
document.getElementById("CalNext").addEventListener("click", function() {
    if(DisplayedMonth == 11){
        DisplayedMonth = 0;
        DisplayedYear = DisplayedYear + 1;
    }else{
        DisplayedMonth++;
    }
    initCalendar(DisplayedMonth, DisplayedYear, selectedResourceDayAvailability, selectedResourceBookedDates);
})

//clear all input boxes within the schedule selector wrapper
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

//fills the product dropdown menu with all available products
//
//container: drop down menu to hold products
//selectedID: optional - will select the product with this id
async function loadProducts(container, selectedID){
    //add a placeholder option to dropdown menu
    container.innerHTML = "<option disabled selected value> select a product </option>"
    try {
        // fetch all products from the database
        const response = await fetch('/api/products');
        if(!response.ok) {
          throw new Error('Failed to get products from Database');
        }
  
        const products = await response.json();
        products.forEach((product) => {

            //if the product display is set to active show the product
            if(product.display){
                productListing = document.createElement("option")
                productListing.innerHTML =  `${product.name}`
                productListing.setAttribute("id", `${product._id}`)

                //if the current product has the given selectedID, set the product to selected in the menu
                if(product._id == selectedID){
                    productListing.setAttribute("selected", true)
                    updateProductInformation(product._id)
                }
                container.appendChild(productListing)
            }
        });
      } catch (error) {
        console.error(error.message);
        alert("Failed to Fetch products")
      }
}

//function to update the schedule selector wrapper with proper values after user enters schedule inputs
function updateHours(){
    //making sure that all inputs are filled prior to updating calculations
    if(inputEndTime.value != "" && inputStartTime.value != "" && inputStartDate.value != ""){

        switch(priceType){ 
            case("Flat Rate"):
                if(inputEndDate.value != ""){
                    //create date object out of selected end date and time
                    etimes = inputEndTime.value.split(":")
                    eDate = inputEndDate.value.split("-")
                    endDateObj = new Date(parseInt(eDate[0]), parseInt(eDate[1]), parseInt(eDate[2]), parseInt(etimes[0]), parseInt(etimes[1]))

                    //create date object out of selected start date and time
                    stimes = inputStartTime.value.split(":")
                    sDate = inputStartDate.value.split("-")
                    startDateObj = new Date(parseInt(sDate[0]), parseInt(sDate[1]), parseInt(sDate[2]), parseInt(stimes[0]), parseInt(stimes[1]))
                    
                    //calculate total number of hours across selected start and end date
                    hours = (endDateObj - startDateObj)/ (1000 * 60 * 60)

                    //setting the total time box and total price box
                    inputHours.value = hours.toFixed(2)
                    inputFullPrice.value = "$" + parseFloat(selectedProductRate).toFixed(2)
                }
                break
            case("Per Hour"):
                //date of booking
                sDate = inputStartDate.value.split("-")

                //end time and start time
                etimes = inputEndTime.value.split(":")
                stimes = inputStartTime.value.split(":")
                
                //create date object out of selected start date, start time, and end time
                startDateObj = new Date(parseInt(sDate[0]), parseInt(sDate[1]), parseInt(sDate[2]), parseInt(stimes[0]), parseInt(stimes[1]))
                endDateObj = new Date(parseInt(sDate[0]), parseInt(sDate[1]), parseInt(sDate[2]), parseInt(etimes[0]), parseInt(etimes[1]))
            
                //calculate total number of hours across selected start time and end time
                hours = (endDateObj - startDateObj)/(1000 * 60 * 60)


                //setting the total time box and total price box
                inputHours.value = hours.toFixed(2)
                inputFullPrice.value = "$" + parseFloat(hours * selectedProductRate).toFixed(2)
                break
            case("Per Day"):
                if(inputEndDate.value != ""){
                    //create date object out of selected end date and time
                    etimes = inputEndTime.value.split(":")
                    eDate = inputEndDate.value.split("-")
                    endDateObj = new Date(parseInt(eDate[0]), parseInt(eDate[1]), parseInt(eDate[2]), parseInt(etimes[0]), parseInt(etimes[1]))

                    //create date object out of selected start date and time
                    stimes = inputStartTime.value.split(":")
                    sDate = inputStartDate.value.split("-")
                    startDateObj = new Date(parseInt(sDate[0]), parseInt(sDate[1]), parseInt(sDate[2]), parseInt(stimes[0]), parseInt(stimes[1]))
                    
                    //calculate total number of days across selected start date/time and end date/time
                    days = (endDateObj - startDateObj)/(1000 * 60 * 60 * 24)

                    //setting the total time box and total price box
                    inputHours.value = days.toFixed(2)
                    inputFullPrice.value = "$" + parseFloat(days * selectedProductRate).toFixed(2)
                }
                break
        }
    }
}


//function to make sure that all input fields on booking form are appropriate
//
//returns true: all inputs are appropriate
//returns false: an input is not appropriate
async function verifyInput(){

    //making sure password and confirm password fields match
    if(inputPassword.value != inputConfirmPassword.value){
        alert("passwords do not match");
        return false
    }

    //creating start and end date objects for the inputted start and end date/time
    SelectedStimes = inputStartTime.value.split(":")
    SelectedSDate = inputStartDate.value.split("-")
    startDateObj = new Date(parseInt(SelectedSDate[0]), parseInt(SelectedSDate[1])-1, parseInt(SelectedSDate[2]), parseInt(SelectedStimes[0]), parseInt(SelectedStimes[1]))
    //end date = start date when priceType is Per Hour
    if(priceType == "Per Hour"){
        SelectedEtimes = inputEndTime.value.split(":")
        endDateObj = new Date(parseInt(SelectedSDate[0]), parseInt(SelectedSDate[1])-1, parseInt(SelectedSDate[2]), parseInt(SelectedEtimes[0]), parseInt(SelectedEtimes[1]))
    }else{
        SelectedEtimes = inputEndTime.value.split(":")
        SelectedEDate = inputEndDate.value.split("-")
        endDateObj = new Date(parseInt(SelectedEDate[0]), parseInt(SelectedEDate[1])-1, parseInt(SelectedEDate[2]), parseInt(SelectedEtimes[0]), parseInt(SelectedEtimes[1]))
    }
    
    //retrieving resource to confirm availablity
    selectedResourceID = resourceList.options[resourceList.selectedIndex].id
    try {
        // fetch resource from the database
        const response = await fetch('/api/resources/' + selectedResourceID);
        if(!response.ok) {
          throw new Error('Failed to verify resource from database');
        }
        const resource = await response.json();

        //resource name
        resourceName = resource.name

        //days resource is available
        daysAvailable = resource.availability

        //start time of resource availablity
        sTime = resource.start.split(":")

        //end time of resource availablity
        eTime = resource.end.split(":")
        
        //day of the week booking date is on
        let dayIndex = startDateObj.getDay();
        //checking if resource is available to start on day
        if(!daysAvailable[dayIndex]){
            alert(resourceName + " is not available on your selected start date");
            inputStartDate.style.color == "red"
            return false
        }

        //day of the week booking end date is on
        dayIndex = endDateObj.getDay();
        //checking if resource is available to end on day
        if(!daysAvailable[dayIndex]){
            alert(resourceName + " is not available on your selected end date");
            inputEndTime.style.color == "red"
            return false
        }
        
        //making sure selected start time is compatible with resource time availability
        if(parseInt(SelectedStimes[0] + SelectedStimes[1]) < parseInt(sTime[0] + sTime[1])){
            alert(resourceName + " is not available on your selected start Time");
            return false

        //making sure selected end time is compatible with resource time availability
        }else if(parseInt(SelectedEtimes[0] + SelectedEtimes[1]) > parseInt(eTime[0] + eTime[1])){
            alert(resourceName + " is not available on your selected end Time");
            return false
        }
      } catch (error) {
        console.error(error.message);
        alert("Failed to Fetch resource")
    }
    return true
}


//function to create customer object and order object with booking form informaion, and send objects to database
async function sendOrderToDB(){
    //create date object out of inputted birth date
    birthDateValues = inputBirthDate.value.split("-")
    dateBirthDateObj = new Date(parseInt(birthDateValues[0]), parseInt(birthDateValues[1]), parseInt(birthDateValues[2]))

    //create customer object
    try{
        const response = await fetch('/api/customer/register', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
                body: JSON.stringify({ 
                    firstName: inputFirstName.value,
                    LastName: inputLastName.value,
                    email: inputEmail.value,
                    //password: inputPassword.value,
                    birthDate: dateBirthDateObj
                    //organizationID: "temp org id"
            })
        });
        console.log(response)
        if (!response.ok) {
            throw new Error('Failed to add customer');
        }

        // If customer added successfully
        console.log("Successfully added customer");
    } catch (error) {
        console.error(error.message);
        alert('Failed to add customer');
    }

    //getting id of selected product and selected resource from booking form
    tempProducts = []
    tempProducts[0] = productsList.options[productsList.selectedIndex].id
    resourceId = resourceList.options[resourceList.selectedIndex].id

    //create date object for selected start date
    sdate = inputStartDate.value.split("-")
    stimes = inputStartTime.value.split(":")
    startDateTime = new Date(parseInt(sdate[0]), parseInt(sdate[1])-1, parseInt(sdate[2]), (parseInt(stimes[0])-5), parseInt(stimes[1]))
    //create date object for selected end date based on selected product price type
    if(priceType == "Per Hour"){
        etimes = inputEndTime.value.split(":")
        endDateTime = new Date(parseInt(sdate[0]), parseInt(sdate[1])-1, parseInt(sdate[2]), (parseInt(etimes[0])-5), parseInt(etimes[1]))
    }else{
        edate = inputEndDate.value.split("-")
        etimes = inputEndTime.value.split(":")
        endDateTime = new Date(parseInt(edate[0]), parseInt(edate[1])-1, parseInt(edate[2]), (parseInt(etimes[0])-5), parseInt(etimes[1]))    
    }

    console.log(startDateTime)
    console.log(endDateTime)

    //create order object
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
        sentOrder = await response.json()
        if (!response.ok) {
            throw new Error('Failed to add order');
        }

        // If product added successfully,  and render the updated schedule
        console.log("Successfully added order");
    } catch (error) {
        console.error(error.message);
        alert('Failed to add order');
    }




    let prevBookingDates = []
    const existingResponse = await fetch('/api/resources/' + resourceId)
    const existingResourceJSON = await existingResponse.json()

        
    prevBookingDates = existingResourceJSON.bookedDates
        
    prevBookingDates.push({"orderId":sentOrder._id, "start":startDateTime, "end":endDateTime})
    console.log(prevBookingDates)
    const response = await fetch('/api/resources/' + resourceId, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json'
        },
            body: JSON.stringify({ 
            bookedDates: prevBookingDates
        })
    });
    console.log(response.json())

    // try{
        
    //     if (!response.ok) {
    //         throw new Error('Failed to add order');
    //     }

    //     // If product added successfully,  and render the updated schedule
    //     console.log("Successfully added order");
    // } catch (error) {
    //     console.error(error.message);
    //     alert('Failed to add order');
    // }
}

//submit Booking functionality
document.getElementById("submitBooking").addEventListener("click", async function(){
    //verify inputs
    if(await verifyInput() == false){
        return
    }

    //send order to database
    await sendOrderToDB();

    //redirect to dashboard
    //location.href = "/dashboard"
})

//creates the schedule selector section with proper fields based off of the selected product and selected resource
//
//resourceID: id of the selected resource
async function updateScheduleSelector(resourceID){
    console.log(priceType)

    //boolean array to hold days of the week the resource can be scheduled on
    let dayAvailability = []
    let bookedDates = []
    let resourceName, resourceStart, resourceEnd

    //get the selected resource from database
    try {
        // const resourceResponse = await fetch('/api/resources/' + resourceID);
        // if(!resourceResponse.ok) {
        //     throw new Error('Failed to get resources form Database');
        // }
        // const resource = await resourceResponse.json();
        //TODO: Fix resource retrieval
        // fetch resource from the database
        const resourceResponse = await fetch('/api/resources');
        
        if(!resourceResponse.ok) {
            throw new Error('Failed to get resources from Database');
        }
        const resources = await resourceResponse.json();
        console.log(resources)
        for(j = 0; j < resources.length; j++){
            if(resources[j]._id == resourceID){
                resource = resources[j]
            }
        }
        //end of temporary code section

        //retrieving selected resource data
        dayAvailability = resource.availability
        bookedDates = resource.bookedDates
        resourceName = resource.name
        resourceStart = resource.start
        resourceEnd = resource.end
    } catch (error) {
        console.error(error.message);
        alert("Failed to Fetch products")
    }

    //initialize the calendar for selecting booking date
    initCalendar(DisplayedMonth, DisplayedYear, dayAvailability, bookedDates)
    selectedResourceDayAvailability = dayAvailability
    selectedResourceBookedDates = 

    //displaying the resource name
    resourceNameBox.innerHTML = resourceName

    //displaying the days of the week in which selected resource is available
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

    //setting the time range that the selected resource is available for
    resourceTimesBox.innerHTML = resourceStart + " - " + resourceEnd

    //change from display:none to display:grid
    scheduleWrapper.style.display = "grid"
}


//Updates the booking form with information pertaining to the given product id,
//fills resource drop down menu with all resources coupled with the selected product
//updates the time type and rate in schedule selector
//
//prodId: id of the selected product
async function updateProductInformation(prodId){
    //add a placeholder option to the drop down menu
    resourceList.innerHTML = '<option disabled selected value> select a resource </option>'

    //clear all order inputs because a new resource has been selected
    clearOrderInputs()

    //get the selected product from database to find all coupled resources
    try {

        //TODO: Fix product retrieval
        // fetch product from the database
        const response = await fetch('/api/products');
        
        if(!response.ok) {
          throw new Error('Failed to get product from Database');
        }
        const products = await response.json();
        console.log(products)
        for(i = 0; i < products.length; i++){
            if(products[i]._id == prodId){
                product = products[i]
            }
        }
        //end of temporary code section






        
        //set global selected product rate variable and set input rate field
        selectedProductRate = parseFloat(product.price).toFixed(2)
        inputRate.value = "$" + selectedProductRate

        //set global price type variable
        priceType = product.priceType[0]
        
        //update the total time input field with proper prompt dempending on selected product price type
        switch(priceType){
            case("Flat Rate"):
                endDateWrapper.style.display = "block"
                totalTimeLabel.innerHTML = "Number of Hours:"
                break
            case("Per Hour"):
                endDateWrapper.style.display = "none"
                totalTimeLabel.innerHTML = "Number of Hours:"
                inputRate.value += "/Hour"
                break
            case("Per Day"):
                endDateWrapper.style.display = "block"
                totalTimeLabel.innerHTML = "Number of Days:"
                inputRate.value += "/Day"
                break
        }
        
        //iterate through all resources coupled to the selected product
        for(i = 0; i < product.resources.length; i++){

            //retrieve the resource from the database
            // const resourceResponse = await fetch('/api/resources/' + product.resources[i]);
            // if(!resourceResponse.ok) {
            //     throw new Error('Failed to get resources from Database');
            // }
            // const resource = await resourceResponse.json();

            //TODO: Fix resource retrieval
            // fetch resource from the database
            const resourceResponse = await fetch('/api/resources');
        
            if(!resourceResponse.ok) {
                throw new Error('Failed to get resources from Database');
            }
            const resources = await resourceResponse.json();
            console.log(resources)
            for(j = 0; j < resources.length; j++){
                if(resources[j]._id == product.resources[i]){
                    resource = resources[j]
                }
            }
            //end of temporary code section


            //create option for resource drop down menu with resource name and resource id
            resourceListing = document.createElement("option")
            resourceListing.innerHTML =  `${resource.name}`
            resourceListing.setAttribute("id", `${resource._id}`)

            //add resource option to drop down menu
            resourceList.appendChild(resourceListing)
        }
      } catch (error) {
        console.error(error.message);
        alert("Failed to Fetch products")
    }
}