
let customerFirstName, customerLastName
//get customer id from ejs meta data
try{
    cID = document.getElementById("customerID").getAttribute("customerID")
    customerFirstName = document.getElementById("customerID").getAttribute("firstName")
    customerLastName = document.getElementById("customerID").getAttribute("lastName")
}catch(error){
    cID = null
    console.log("not authenticated")
}

console.log(cID)

document.addEventListener('DOMContentLoaded', function() {

    resourceList = document.getElementById("resourceList")
    productsList = document.getElementById("productsList")
    

    // Function to toggle visibility of bookingForm
    function toggleBookingForm(selectedProductId) {
         // Hide all other forms and sections
        document.getElementById('aboutInfo').style.display = 'none';
        document.getElementById('serviceContainer').style.display = 'none';
        document.getElementById('home').style.display = 'none';
        document.getElementById('reviews').style.display = 'none';
        productsList.innerHTML = "";
        // Display only the booking form
        document.getElementById('bookingFormContainer').style.display = 'block';
        selectedProductId != undefined ? loadProducts(productsList, selectedProductId) : loadProducts(productsList)
    }


    //updates the information on a specified product display on the products tab
    //
    //(Requirement 4.1.1) - sets display of a featured product
    //(Requirement 4.1.2) - adds event listener to product display to get to booking form
    //
    //container: product display to be updated
    //name: name of product
    //description: product description
    //price: price rate of product
    //priceType: type of pricing product uses
    //id: product id
    function setServiceDisplay(container, name, description, price, priceType, id){
        container.getElementsByClassName("serviceName")[0].innerHTML = name
        priceStr = "$" + price

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
    

    // loads the product page when user clicks on products tab
    //
    //(Requirement 4.1.0) - displays products tab
    //(Requirement 4.1.1) - displays three featured products
    //
    document.getElementById('servicesLink').addEventListener('click', async function(event) {
        event.preventDefault();
        document.getElementById('aboutInfo').style.display = 'none';
        document.getElementById('bookingFormContainer').style.display = 'none';
       

        try {
            // fetch all products from the database
            const response = await fetch('/api/products');
            if(!response.ok) {
              throw new Error('Failed to get products from Database');
            }
      
            const products = await response.json();
            
            activeProducts = []
            products.forEach((product) => {
                if(product.display){
                    activeProducts.push(product);
                }
            })
            let selectedIndecies = []
            
            //remove event listeners from previous service Display buttons
            oldServicecon1 = document.getElementById("service1Display")
            serviceContainer1 = oldServicecon1.cloneNode(true)
            oldServicecon1.parentNode.replaceChild(serviceContainer1, oldServicecon1) 

            oldServicecon2 = document.getElementById("service2Display")
            serviceContainer2 = oldServicecon2.cloneNode(true)
            oldServicecon2.parentNode.replaceChild(serviceContainer2, oldServicecon2)

            oldServicecon3 = document.getElementById("service3Display")
            serviceContainer3 = oldServicecon3.cloneNode(true)
            oldServicecon3.parentNode.replaceChild(serviceContainer3, oldServicecon3) 

            if(activeProducts.length > 2){
                while(selectedIndecies.length < 3){
                    rand = Math.floor(Math.random() * activeProducts.length)
                    if(!selectedIndecies.includes(rand)){
                        selectedIndecies.push(rand)
                    }
                }
                currentProduct = activeProducts[selectedIndecies[0]]
                setServiceDisplay(serviceContainer1, currentProduct.name, currentProduct.description, currentProduct.price, currentProduct.priceType[0], currentProduct._id)
                
                currentProduct = activeProducts[selectedIndecies[1]]
                setServiceDisplay(serviceContainer2, currentProduct.name, currentProduct.description, currentProduct.price, currentProduct.priceType[0], currentProduct._id)
                
                currentProduct = activeProducts[selectedIndecies[2]]
                setServiceDisplay(serviceContainer3, currentProduct.name, currentProduct.description, currentProduct.price, currentProduct.priceType[0], currentProduct._id)
            
            
            }else{
                let productsDisplayed = 0
                for(i = 0; i < activeProducts.length; i++){
                    productsDisplayed++
                    container = document.getElementById("service" + productsDisplayed + "Display")
                    setServiceDisplay(container, activeProducts[i].name, activeProducts[i].description, activeProducts[i].price, activeProducts[i].priceType, activeProducts[i]._id)
                }
                switch(productsDisplayed){
                    case(0):
                        document.getElementById("service1Display").style.visibility = "hidden"
                    case(1):
                        document.getElementById("service2Display").style.visibility = "hidden"
                    case(2):
                        document.getElementById("service3Display").style.visibility = "hidden"
                        break
                }
            }
          } catch (error) {
    
            console.error(error.message);
            alert("Failed to Fetch products")
          }




        document.getElementById('serviceContainer').style.display = 'block';
        document.getElementById('home').style.display = 'none'; // Hide the home section
        document.getElementById('reviews').style.display = 'none'; // Hide the testimonials section
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
        location.href = "/customer/login"
    });

    // Event listener for reloading the page on clicking "Home" link
    document.getElementById('homeLink').addEventListener('click', function() {
        location.reload();
    });

    // Event listener for displaying the about section
    //
    //(Requirement 4.2.0) - loads about page
    //
    document.getElementById('aboutLink').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('aboutInfo').style.display = 'block';
        document.getElementById('serviceContainer').style.display = 'none';
        document.getElementById('home').style.display = 'none'; // Hide the home section
        document.getElementById('reviews').style.display = 'none'; // Hide the testimonials section
        bookingForm.style.display = 'none'; // Hide the testimonials section
    });




    // Event listener for clicking the "Book Now" button
    //
    //(Requirement 4.4.0) - loads about page
    //
    document.querySelector('.book-now-button').addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the default action of the button
        toggleBookingForm(); // Toggle the visibility of the booking form
    });

    var bookingForm = document.getElementById('bookingForm');
    var paymentFormContainer = document.getElementById('paymentFormContainer');
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

existingCustomerRadio = document.getElementById("existingCustomerRadio")
newCustomerRadio = document.getElementById("newCustomerRadio")
existingCustomerInputs = document.getElementById("existingCustomerInputs")
newCustomerInputs = document.getElementById("newCustomerInputs")


let hours = 0
let priceType = "flat rate"
let selectedProductRate = 0
let isSelectStart = true
let isNewCustomer = true
let submitted = false;

//
//(Requirement 5.3.0) - creates card input fields and loads them on page from stripe
//
const stripe = Stripe(stripePublicKey)
var elements = stripe.elements()
var card = elements.create('card');
card.mount('#card-element');


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
//(Requirement 5.2.3) - creates interactable calendar object
//(Requirement 5.2.4) - adds event listeners to days on calendar so user can select them to enter booking dates
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
//(Requirement 5.1.0) - fills product drop down menu with available products
//
//container: drop down menu to hold products
//selectedID: optional - will select the product with this id
async function loadProducts(container, selectedID){
    //add a placeholder option to dropdown menu
    container.innerHTML = "";
    container.innerHTML = "<option disabled selected value> select a product </option>"
    let selectedProduct = null
    let selectedProductid = null
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
                    selectedProduct = productListing;
                    selectedProductid = product._id
                }
                container.appendChild(productListing)
            }
        });
      } catch (error) {
        console.error(error.message);
        alert("Failed to Fetch products")
      }

      if(selectedProduct != null){
        selectedProduct.setAttribute("selected", true)
        updateProductInformation(selectedProductid)
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
//(Requirement 5.4.0) - validates all user entered inputs
//
//returns true: all inputs are appropriate
//returns false: an input is not appropriate
async function verifyInput(){

    //making sure password and confirm password fields match
    if(cID == null){
        if(inputPassword.value != inputConfirmPassword.value){
            alert("passwords do not match");
            return false
        }
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
        const resourceResponse = await fetch('/api/resources');
        
        if(!resourceResponse.ok) {
            throw new Error('Failed to get resources from Database');
        }
        const resources = await resourceResponse.json();
        for(j = 0; j < resources.length; j++){
            if(resources[j]._id == selectedResourceID){
                resource = resources[j]
            }
        }

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
        
        if(startDateObj > endDateObj){
            alert("Your entered start date is after your entered end date");
            return false
        }else if(startDateObj-endDateObj == 0){
            alert("Your entered start date and time cannot be the same as your entered end date and time");
            return false
        }

        //making sure selected start time is compatible with resource time availability
        if(parseInt(SelectedStimes[0] + SelectedStimes[1]) < parseInt(sTime[0] + sTime[1]) || parseInt(SelectedStimes[0] + SelectedStimes[1]) > parseInt(eTime[0] + eTime[1])){
            alert(resourceName + " is not available on your selected start Time");
            return false

        //making sure selected end time is compatible with resource time availability
        }else if(parseInt(SelectedEtimes[0] + SelectedEtimes[1]) > parseInt(eTime[0] + eTime[1])  || parseInt(SelectedEtimes[0] + SelectedEtimes[1]) < parseInt(sTime[0] + sTime[1])){
            alert(resourceName + " is not available on your selected end Time");
            return false
        }
      } catch (error) {
        console.error(error.message);
        alert("Failed to Fetch resource")
    }
    return true
}

//creates a customer with booking form customer inputs
//
async function CreateCustomer(){
        //create customer object
        try{
            const response = await fetch('/customer/register', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                    body: JSON.stringify({ 
                        firstname: inputFirstName.value,
                        lastname: inputLastName.value,
                        email: inputEmail.value,
                        password: inputPassword.value,
                        order: true
                })
            });
            if (!response.ok) {
                throw new Error('Failed to add customer');
            }

            // If customer added successfully
            console.log("Successfully added customer");

            customerFirstName = inputFirstName.value
            customerLastName = inputLastName.value

            return await response.json()
        } catch (error) {
            console.error(error.message);
            alert('Failed to add customer');
        }
}

async function calculateTotalCost(productId, start, end){
    const productResponse = await fetch('/api/products/' + productId)
    const product = await productResponse.json()  
    
    prodPriceType = product.priceType[0]
    prodPrice = product.price
    

    //if date objects are passed in as strings
    if(typeof start == "string" || typeof end == "string"){
        //convert bookedDate start and end times to date objects
        const startDateObj = new Date(parseInt(start.substring(0,4)), parseInt(start.substring(5,7))-1, parseInt(start.substring(8,10)), parseInt(start.substring(11,13)), parseInt(start.substring(14,16))) 
        const endDateObj = new Date(parseInt(end.substring(0,4)), parseInt(end.substring(5,7))-1, parseInt(end.substring(8,10)), parseInt(end.substring(11,13)), parseInt(end.substring(14,16))) 

        timeReserved = endDateObj - startDateObj
        
    }else{
        timeReserved = end - start
    }
    switch(prodPriceType){
        case("Flat Rate"):
            return prodPrice;
        case("Per Hour"):
            timeReserved /= (1000 * 60 * 60)
            break
        case("Per Day"):
            timeReserved /= (1000 * 60 * 60 * 24)
            break
    }

    return timeReserved * prodPrice
}

//function to create customer object and order object with booking form informaion, and send objects to database
//
//(Requirement 5.5.0) - creates order object out of user inputs
//
async function sendOrderToDB(){

    if(cID == null){
        let customer = await CreateCustomer()
        if(customer == undefined){
            alert("Customer with entered information already exists")
            document.getElementById("submitBooking").disabled = false
            submitted = false;
            return
        }
        cID = customer._id
    }
  
    //addMessage(`Client secret returned.`);

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
                productID: tempProducts,
                start: startDateTime,
                end: endDateTime,
            }),
    }
    ).then((r) => r.json());


    if (backendError) {
        alert(backendError.message)
  
        // reenable the form.
        submitted = false;
        document.getElementById("submitBooking").disabled = false;
        return;
    }
    
    
    //addMessage(`Client secret returned.`);

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

    // Confirm the card payment given the clientSecret
    // from the payment intent that was just created on
    // the server.
    const {error: stripeError, paymentIntent} = await stripe.confirmCardPayment(
        clientSecret,
        {
            payment_method: {
                card: card,
                billing_details: {
                    name: customerFirstName + " " + customerLastName,
                    // productID: tempProducts,
                    // start: startDateTime,
                    // end: endDateTime,
                }, 
            },
        }
    );
    
    if (stripeError) {
        alert(stripeError.message);
  
        // reenable the form.
        submitted = false;
        document.getElementById("submitBooking").disabled = false;
        return;
    }
    console.log(`Payment ${paymentIntent.status}: ${paymentIntent.id}`)
    

    //create order object
    try{
        const OrderResponse = await fetch('/api/orders', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
                body: JSON.stringify({ 
                    customerID: cID,
                    products: tempProducts,
                    startTime: startDateTime,
                    endTime: endDateTime,
                    status: "processing",
                    resourceID: resourceId
            })
        });
        sentOrder = await OrderResponse.json()
        if (!OrderResponse.ok) {
            throw new Error('Failed to add order');
        }

        // If product added successfully,  and render the updated schedule
        console.log("Successfully added order");
    } catch (error) {
         console.error(error.message);
         alert('Failed to add order');
     }




    let prevBookingDates = []

    // fetch resource from the database
    const resourceResponse = await fetch('/api/resources');
        
    if(!resourceResponse.ok) {
        throw new Error('Failed to get resources from Database');
    }
    const resources = await resourceResponse.json();

    for(j = 0; j < resources.length; j++){
        if(resources[j]._id == resourceId){
            existingResourceJSON = resources[j]
        }
    }
    //end of temporary code section

        
    prevBookingDates = existingResourceJSON.bookedDates
        
    prevBookingDates.push({"orderId":sentOrder._id, "start":startDateTime, "end":endDateTime})
    const response = await fetch('/api/resources/' + resourceId, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json'
        },
            body: JSON.stringify({ 
            bookedDates: prevBookingDates
        })
    });

    if (paymentIntent.status == "succeeded") {
        window.location.href = '/success.html';
    }
}

//submit Booking functionality
//
//(Requirement 5.5.0) - button that allows user to submit booking form
//
document.getElementById("submitBooking").addEventListener("click", async function(){
    if(submitted) { return; }

    //verify inputs
    if(await verifyInput() == false){
        return
    }
    document.getElementById("submitBooking").disabled = true
    submitted = true;
    //send order to database
    sendOrderToDB();

})

//creates the schedule selector section with proper fields based off of the selected product and selected resource
//
//(Requirement 5.2.1) - shows resource name and availability under the resource drop down menu
//
//resourceID: id of the selected resource
async function updateScheduleSelector(resourceID){

    //boolean array to hold days of the week the resource can be scheduled on
    let dayAvailability = []
    let bookedDates = []
    let resourceName, resourceStart, resourceEnd

    //get the selected resource from database
    try {
        // fetch resource from the database
        const resourceResponse = await fetch('/api/resources');
        
        if(!resourceResponse.ok) {
            throw new Error('Failed to get resources from Database');
        }
        const resources = await resourceResponse.json();
        for(j = 0; j < resources.length; j++){
            if(resources[j]._id == resourceID){
                resource = resources[j]
            }
        }

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
    selectedResourceBookedDates = bookedDates

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
//(Requirement 5.2.0) - fills resource drop down menu with all resources coupled with selected products
//(Requirement 5.2.2) - proper date and time inputs are displayed for user
//
//prodId: id of the selected product
async function updateProductInformation(prodId){
    //add a placeholder option to the drop down menu
    resourceList.innerHTML = '<option disabled selected value> select a resource </option>'

    //clear all order inputs because a new resource has been selected
    clearOrderInputs()

    //get the selected product from database to find all coupled resources
     try {

        // fetch product from the database
        const response = await fetch('/api/products');
        
        if(!response.ok) {
          throw new Error('Failed to get product from Database');
        }
        const products = await response.json();
        for(i = 0; i < products.length; i++){
            if(products[i]._id == prodId){
                product = products[i]
            }
        }






        
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

        const resourceResponse = await fetch('/api/resources');
            

        if(!resourceResponse.ok) {
            throw new Error('Failed to get resources from Database');
        }

        const orgResources = await resourceResponse.json();

        //iterate through all resources coupled to the selected product
        for(i = 0; i < product.resources.length; i++){
            let resource = undefined

            desiredResource = product.resources[i]

            for(j = 0; j < orgResources.length; j++){
                
                if(orgResources[j]._id == desiredResource){
                    resource = orgResources[j]
                }
            }
            //end of temporary code section


            //create option for resource drop down menu with resource name and resource id
            if(resource != undefined){
                resourceListing = document.createElement("option")
                resourceListing.innerHTML =  `${resource.name}`
                resourceListing.setAttribute("id", `${resource._id}`)
    
                //add resource option to drop down menu
                resourceList.appendChild(resourceListing)
            }
        }
    } catch (error) {
         console.error(error.message);
         alert("Failed to Fetch products")
     }
}