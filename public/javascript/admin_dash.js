now = new Date(Date.now());
console.log(now);
DisplayedMonth = now.getMonth();
DisplayedYear = now.getFullYear();

appointmentListOnDay = document.getElementById("SelectedAppointmentList")
appointmentsList = document.getElementById("AppointmentsList")
Calendar = document.getElementById("Calendar")

//returns a month name in string form given the month number
//
//monthNumber: int representing month index 1-12 inclusive
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


//converts all given order information into an html object and stores the object in the given container
//
//(Requirement 1.0.0) - displays order information
//
//container: container to put html object in
//orderID: id of order to be displayed
//productID: product id associated with order to be displayed
//resourceID: resource id associated with order to be displayed
//isSmallDisplay: true - display a smaller html element to display order info; false - display larger html element to hold data
async function addAppointment(container, order, isSmallDisplay){

    //fetch product associated with order from database
    const productResponse = await fetch('/api/products/' + order.products[0]);
    const product = await productResponse.json();

    scheduledTime = order.startTime
    scheduledEndTime = order.endTime

    //if small display is selected make small version of order information html element
    if(isSmallDisplay){
        let appointment = document.createElement("div");
        appointment.setAttribute("class", "AppointmentObject");
        appointment.innerHTML += '<div style="grid-area: 1/1/3/5;">' + product.name + '</div>'
        TimeRange = parseInt(scheduledTime.substring(11, 13))%12 + ":" + scheduledTime.substring(14, 16) + (parseInt(scheduledTime.substring(11, 13)) > 11 ? "pm" : "am")
        appointment.innerHTML += '<div style="grid-area: 1/5/3/8; text-align: center;">' + TimeRange + '</div>'
        appointment.innerHTML += '<div style="grid-area: 3/7/5/8; text-align: center;">' + '$' + product.price + '</div>' 
        appointment.innerHTML += '<div style="grid-area: 3/1/5/7;">order #: ' + order.orderNumber + '</div>' 
        appointment.setAttribute("orderID", order._id)
        appointment.addEventListener("click", function() {
            location.href = '/admin/order_details?ID=' + appointment.getAttribute("orderID")
        })
        container.appendChild(appointment)
    }else{
        let appointment = document.createElement("div");
        appointment.setAttribute("class", "AppointmentObjectLarge");
        appointment.innerHTML += '<div style="grid-area: 1/1/2/8;">' + product.name + '</div>'
        TimeRange = monthNumToString(parseInt(scheduledTime.substring(5, 7))) + ", " + parseInt(scheduledTime.substring(8, 10)) + " " + parseInt(scheduledTime.substring(0,4)) +  " at "
        TimeRange += parseInt(scheduledTime.substring(11, 13))%12 + ":" + scheduledTime.substring(14, 16) + (parseInt(scheduledTime.substring(11, 13)) > 11 ? "pm" : "am")
        appointment.innerHTML += '<div style="grid-area: 2/1/3/8; text-align: center;">' + TimeRange + '</div>'
        appointment.innerHTML += '<div style="grid-area: 3/7/4/8; text-align: center;">' + '$' + product.price + '</div>'
        appointment.innerHTML += '<div style="grid-area: 3/1/4/7;">order #: ' + order.orderNumber + '</div>'
        appointment.setAttribute("orderID", order._id)
        appointment.addEventListener("click", function() {
            location.href = '/admin/order_details?ID=' + appointment.getAttribute("orderID")
        })
        container.appendChild(appointment)
    }
}

//displays all appointments on a given day, fills in box under calendar when user clicks on a calendar day
//
//(Requirement 1.0.3) - displays orders on a given day
//
//year: year of day to display all orders on
//month: month of day to display all orders on
//day: day number of day to display all orders on
async function displayAppointmentsOnDay(year, month, day){

    //clear selectedAppointmentsList on page
    document.getElementById("SelectedAppointmentList").innerHTML = '';

    //set selected appointment header to display selected year, month and day
    document.getElementById("SelectedAppointmentHeader").innerHTML = "Appointments on " + monthNumToString(parseInt(month) + 1) + ", " + day + " " + year

    //fetch all orders from the database
    try {
        const response = await fetch('/api/orders');
        if(!response.ok) {
          throw new Error('Failed to get orders from Database');
        }
        const orders = await response.json();

        //for each order in database
        orders.forEach((order) => {
            //get order's scheduled year, month, and day number
            scheduledTime = order.startTime
            orderYear = parseInt(scheduledTime.substring(0, 4))
            orderMonth = parseInt(scheduledTime.substring(5, 7))
            orderDay = parseInt(scheduledTime.substring(8, 10))

            //checking to see if this order is on the given year, month, and day
            if(orderYear == year && orderMonth == parseInt(month) + 1 && orderDay == day){

                //call addAppointment function to display order information
                addAppointment(appointmentListOnDay, order, true)
            }  
        });
      } catch (error) {
        console.error(error.message);
        alert("Failed to Fetch orders")
      }
}

//fills upcoming appointments box on the far left of site. Takes all appointments from appointmentArr and displays them in upcoming appointments
//
//(Requirement 1.0.1) - displays upcoming orders
//
async function displayAppointments(){

    //clear selectedAppointmentsList on page
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
            
            //check to make sure order is not already completed
            if(parseInt(order.endTime.substring(0, 4)) >= now.getFullYear()){
                if(parseInt(order.endTime.substring(5, 7)) >= now.getMonth() + 1){
                    if(parseInt(order.endTime.substring(8, 10)) >= now.getDate()){

                       //call addAppointment function to add order information to page
                       addAppointment(appointmentsList, order, false)
                    }
                }
           }
        });
      } catch (error) {
        console.error(error.message);
        alert("Failed to Fetch orders")
      }
}

//checks to see if any orders fall on a specific date, and adjusts a day element to show that orders fall on that day
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

            //get order scheduled year, month, and day
            scheduledTime = order.startTime 
            orderYear = parseInt(scheduledTime.substring(0, 4))
            orderMonth = parseInt(scheduledTime.substring(5, 7))
            orderDay = parseInt(scheduledTime.substring(8, 10))

            //if order schedualed year, month, and day falls on given day
            if(orderYear == dayDate.getFullYear() && orderMonth == dayDate.getMonth() + 1 && orderDay == dayDate.getDate()){

                //set dayElement background to green
                dayElement.style.backgroundColor  = "green"
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
//(Requirement 1.0.2) - displays interactable calendar
//
//monthIndex: index of month to be displayed
//year: year to be displayed
function initCalendar(monthIndex, year){
    //clear calendar element
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

            //unselect the previously selected day
            if(document.getElementById("selectedDay") != null){
                document.getElementById("selectedDay").style.border = "1px solid black"
                document.getElementById("selectedDay").removeAttribute("id")
            }
            day.setAttribute("id", "selectedDay")
            day.style.border = "5px solid red"

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
                day.style.border = "5px solid red"
            }
        }
        //if another month and year is being displayed
        else{

            //checking if the date of the current day is first day of the month
            if(curDate.getDate() == 1){

                //Select first of the month and display all appointment on first of the month
                day.setAttribute("id", "selectedDay")
                displayAppointmentsOnDay(day.getAttribute("year"), day.getAttribute("month"), day.getAttribute("day"))
                day.style.border = "5px solid red"
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
