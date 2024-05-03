now = new Date(Date.now());
console.log(now);

customerID = document.getElementById("customerID").getAttribute("customerID")
appointmentsList = document.getElementById("AppointmentsList")
appointmentListOnDay = document.getElementById("SelectedAppointmentList")
Calendar = document.getElementById("Calendar");

appointmentDates = []
DisplayedMonth = now.getMonth();
DisplayedYear = now.getFullYear();

//returns a month name in string form given the month number
//
//monthNumber: month index 1-12 inclusive
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

//displays all appointments on a given day, fills in box under calendar when user clicks on a calendar day
//
//(Requirement 6.0.0) - display orders to the user
//(Requirement 6.0.3) - displays all orders on selected day from calendar
//
//year: year of day to display all orders on
//month: month of day to display all orders on
//day: day number of day to display all orders on
async function displayAppointmentsOnDay(year, month, day){

    //clear selectedAppointmentsList on page
    document.getElementById("SelectedAppointmentList").innerHTML = '';

    // fetch all orders from the database
    try {
        const response = await fetch('/api/orders');
        if(!response.ok) {
          throw new Error('Failed to get orders from Database');
        }
        const orders = await response.json();

        //for each order in database
        orders.forEach((order) => {
            if(order.customerID == customerID){
                //get order's scheduled year, month, and day number
                scheduledTime = order.startTime
                orderYear = parseInt(scheduledTime.substring(0, 4))
                orderMonth = parseInt(scheduledTime.substring(5, 7))
                orderDay = parseInt(scheduledTime.substring(8, 10))

                //checking to see if this order is on the given year, month, and day
                if(orderYear == year && orderMonth == parseInt(month) + 1 && orderDay == day){
                    
                    //call addAppointment function to display order information
                    addAppointment(appointmentListOnDay, order, false)
                }  
            } 
        });
      } catch (error) {
        console.error(error.message);
        alert("Failed to Fetch orders")
      }
}

//function to create or find existing date header which goes over all orders listed in the appointmentsList
//
//container: the html container to place the order header in
//date: date to create the header out of
function createOrderDateHeader(container, date){

    //try to get appointmentHeader by id if appointment header for given date already exists
    appointmentHeader = document.getElementById(date.getTime())


    //if no appointment header for the desired date already exists, create the desired appointment header
    if(appointmentHeader == null){
        appointmentHeader = document.createElement("div")
        appointmentHeader.setAttribute("style", "text-align: left; margin-top: 5%;")
        appointmentHeader.setAttribute("id", date.getTime())
        appointmentHeader.innerHTML = '-' + monthNumToString(date.getMonth()) + ', ' + date.getDate() + ' ' + date.getFullYear()
        appointmentDates.push(date)
    }

    //add appointmentHeader to given appointment container
    container.appendChild(appointmentHeader)

    return appointmentHeader
}

//creates an html element to respresent an order and appends it to a specified container
//
//(Requirement 6.0.4) - adds event listener to order objects to redirect user to modify order page for selected order
//
//container: container to append order html object to
//order: order to be displayed
//isWithDateHeader: true - display each order with date header above it, false - just display order info
async function addAppointment(container, order, isWithDateHeader){

        //fetch product associated with order from database
        const productResponse = await fetch('/api/products/' + order.products[0]);
        const product = await productResponse.json();
        
        console.log("--------" + product)
        scheduledTime = order.startTime
        
        //if isWithDateHeader is selected, display order info with a date header above it
        if(isWithDateHeader){
            
            //date object to respresent day order is scheduled on
            startDate = new Date(parseInt(scheduledTime.substring(0,4)), parseInt(scheduledTime.substring(5, 7)), parseInt(scheduledTime.substring(8, 10))) 
            
            //get appointment header if an appointment header for the desired date already exists
            let appointmentHeader = createOrderDateHeader(container, startDate)
            

            //create order html element with all order information
            let appointment = document.createElement("div")
            appointment.setAttribute("style", "text-align: center; display:flex; justify-content: space-between; margin-top: 3%; background-color:lightblue; border-radius:5px; padding-left: 5%; padding-right:5%;")
            appointmentName = document.createElement("div")
            appointmentName.innerHTML = product.name
            appointmentTime = document.createElement("div")
            appointmentTime.innerHTML = parseInt(scheduledTime.substring(11, 13))%12 + ":" + scheduledTime.substring(14, 16) + (parseInt(scheduledTime.substring(11, 13)) > 11 ? "pm" : "am")
            appointment.appendChild(appointmentName)
            appointment.appendChild(appointmentTime)
            appointment.setAttribute("orderID", order._id)

            //click event listener that redirects user to order details page if user clicks on order element
            appointment.addEventListener("click", function() {
                location.href = '/order_details?ID=' + appointment.getAttribute("orderID")
            })

            //add order to appointment header object
            appointmentHeader.appendChild(appointment)
        
        //isWithDateHeader is not selected, just display order info with no date header
        }else{

            //create order html element with all order information
            let appointment = document.createElement("div")
            appointment.setAttribute("style", "text-align: center; display:flex; justify-content: space-between; margin-top: 3%; background-color:lightblue; border-radius:5px; padding-left: 5%; padding-right:5%;")
            appointmentName = document.createElement("div")
            appointmentName.innerHTML = product.name
            appointmentTime = document.createElement("div")
            temptimeStr = parseInt(scheduledTime.substring(11, 13))%12 + ":" + scheduledTime.substring(14, 16) + (parseInt(scheduledTime.substring(11, 13)) > 12 ? "pm" : "am")
            appointmentTime.innerHTML = temptimeStr
            appointment.appendChild(appointmentName)
            appointment.appendChild(appointmentTime)
            appointment.setAttribute("orderID", order._id)

            //click event listener that redirects user to order details page if user clicks on order element
            appointment.addEventListener("click", function() {
                location.href = '/order_details?ID=' + appointment.getAttribute("orderID")
            })

            //add order object to given container
            container.appendChild(appointment)
        }
}

//fills upcoming appointments box on the far left of site. Takes all appointments from appointmentArr and displays them in upcoming appointments
//
//(Requirement 6.0.0) - display orders to the user
//(Requirement 6.0.1) - displays all upcoming orders to the user
//
async function displayAppointments(){
    
    //clear appointments list
    document.getElementById("AppointmentsList").innerHTML = '';

    //fetch all orders from the database
    try {
        const response = await fetch('/api/orders');
        if(!response.ok) {
          throw new Error('Failed to get orders from Database');
        }
        const orders = await response.json();
        
        //for each order in database
        orders.forEach((order) => {
            if(order.customerID == customerID){
                //check to make sure order is not already completed
                if(parseInt(order.endTime.substring(0, 4)) >= now.getFullYear()){
                    if(parseInt(order.endTime.substring(5, 7)) >= now.getMonth() + 1){
                        if(parseInt(order.endTime.substring(8, 10)) >= now.getDate()){

                            //call addAppointment function to add order information to page
                            addAppointment(appointmentsList, order, true)
                        }
                    }
                }
            }
        });

      } catch (error) {
        console.error(error.message);
        alert("Failed to Fetch orders")
      }
}

//checks to see if there is any orders on the given date, and if so changes the style of the dayElement
//
//dayDate: date of day function is checking if any orders are on
//dayElement: html element of day object on calendar represented by date in dayDate
async function OrderOnDay(dayDate, dayElement){

    // fetch all orders from the database
    try {
        const response = await fetch('/api/orders');
        if(!response.ok) {
          throw new Error('Failed to get orders from Database');
        }
        const orders = await response.json();

        //for all orders in database
        orders.forEach((order) => {
            if(order.customerID == customerID){
                scheduledTime = order.startTime 

                //get order scheduled year, month, and day
                orderYear = parseInt(scheduledTime.substring(0, 4))
                orderMonth = parseInt(scheduledTime.substring(5, 7))
                orderDay = parseInt(scheduledTime.substring(8, 10))

                //if order schedualed year, month, and day falls on given day
                if(orderYear == dayDate.getFullYear() && orderMonth == dayDate.getMonth() + 1 && orderDay == dayDate.getDate()){
                    
                    //set dayElement text color to green
                    dayElement.style.color  = "green"
                }
            }
        });

      } catch (error) {
        console.error(error.message);
        alert("Failed to Fetch orders")
      }
}

//initializes calendar with all days for a given month in a given year
//handles coloring 
//
//(Requirement 6.0.2) - displays interactable calendar to find orders by day
//
//monthIndex: index of month to be displayed
//year: year to be displayed
function initCalendar(monthIndex, year){

    //clear calendar object
    Calendar.innerHTML = '';

    //set calendar header to displayed month and year
    document.getElementById("monthMarker").innerHTML = monthNumToString(monthIndex+1) + ", " + year;

    //set current day to 1, and create curDate object set to given year, given month, and curDay
    curDay = 1;
    curDate = new Date(year, monthIndex, curDay);
    
    //for loop which adds empty div element to calendar before the first day of the month is added
    //this is because the first of the month does not always fall on sunday, so spacer objects are needed
    //to shift the first day to the proper day of the week
    for(i = 0; i < curDate.getDay(); i++){
        Calendar.innerHTML += '<div></div>';
    }
    
    //while curDate is still within the given month
    while(curDate.getMonth() == monthIndex){

        //create button html object to represent a calendar day
        let day = document.createElement("button");
        day.setAttribute("class", "CalDayActive");
        day.innerHTML = curDate.getDate();
        day.setAttribute("year", curDate.getFullYear())
        day.setAttribute("month", curDate.getMonth())
        day.setAttribute("day", curDate.getDate())

        //change background color of day to green if an order is scheduled on that day
        OrderOnDay(curDate, day)

        //functionality if the user clicks on a day
        day.addEventListener("click", function(){

            //deselect the previously selected day
            if(document.getElementById("selectedDay") != null){
                document.getElementById("selectedDay").style.backgroundColor = "white"
                document.getElementById("selectedDay").removeAttribute("id")
            }
            day.setAttribute("id", "selectedDay")
            day.style.backgroundColor = "lightblue"

            //display all orders on the clicked day using displayAppointmentsOnDay function
            displayAppointmentsOnDay(day.getAttribute("year"), day.getAttribute("month"), day.getAttribute("day"))
            
        })

        //if the displayed month and year of calendar is equal to the current month and year
        if(curDate.getMonth() == now.getMonth() && curDate.getFullYear() == now.getFullYear()){

            //check if the date of the current day is equal to today
            if(curDate.getDate() == now.getDate()){

                //Select today and display all appointment on today
                day.setAttribute("id", "selectedDay")
                displayAppointmentsOnDay(day.getAttribute("year"), day.getAttribute("month"), day.getAttribute("day"))
                day.style.backgroundColor = "lightblue"
            }
        }        
        //if another month and year is being displayed
        else{

            //checking if the date of the current day is first day of the month
            if(curDate.getDate() == 1){

                //Select first of the month and display all appointment on first of the month
                day.setAttribute("id", "selectedDay")
                displayAppointmentsOnDay(day.getAttribute("year"), day.getAttribute("month"), day.getAttribute("day"))
                day.style.backgroundColor = "lightblue"
            }
        }

        //add day object to calendar object
        Calendar.appendChild(day);

        //increment curDay object and curDate object
        curDay++
        curDate = new Date(year, monthIndex, curDay);
    }
}

initCalendar(DisplayedMonth, DisplayedYear)
displayAppointments()

//functionality for prev button above calander; goes back one month and updates calander object
document.getElementById("CalPrev").addEventListener("click", function() {

    //increment year if displayed month is december
    if(DisplayedMonth == 0){
        DisplayedMonth = 11;
        DisplayedYear = DisplayedYear - 1;
    }else{
        DisplayedMonth--;
    }

    //initialize calendar
    initCalendar(DisplayedMonth, DisplayedYear);
})

//functionality for next button above calander; goes forward one month and updates calander object
document.getElementById("CalNext").addEventListener("click", function() {

    //reduce year if displayed month is january
    if(DisplayedMonth == 11){
        DisplayedMonth = 0;
        DisplayedYear = DisplayedYear + 1;
    }else{
        DisplayedMonth++;
    }

    //initialize calendar
    initCalendar(DisplayedMonth, DisplayedYear);
})
