now = new Date(Date.now());
console.log(now);

appointmentsList = document.getElementById("AppointmentsList")
appointmentListOnDay = document.getElementById("SelectedAppointmentList")
Calendar = document.getElementById("Calendar");

appointmentDates = []
DisplayedMonth = now.getMonth();
DisplayedYear = now.getFullYear();

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

//displays all appointments on a given day, fills in box under calendar when user clicks on a calendar day
async function displayAppointmentsOnDay(year, month, day){
    document.getElementById("SelectedAppointmentList").innerHTML = '';

    try {
        // fetch all orders from the database
        const response = await fetch('/api/orders');
        if(!response.ok) {
          throw new Error('Failed to get orders from Database');
        }
  
        const orders = await response.json();
        orders.forEach((order) => {
            if(order.products[0]  != "test"){
            
            scheduledTime = order.startTime
             
            orderYear = parseInt(scheduledTime.substring(0, 4))
            orderMonth = parseInt(scheduledTime.substring(5, 7))
            orderDay = parseInt(scheduledTime.substring(8, 10))

            if(orderYear == year && orderMonth == parseInt(month) + 1 && orderDay == day){
                addAppointment(appointmentListOnDay, order._id, order.products[0], order.resourceID, false)
            }    
            }    
        });
      } catch (error) {
        console.error(error.message);
        alert("Failed to Fetch orders")
      }
}

//function to add an apointment to a specified container
async function addAppointment(container, orderID, productID, resourceID, isSmall){
    try {
        //TODO Fix get order by id
        const orderResponse = await fetch('/api/orders');
        const orders = await orderResponse.json();
        let currentOrder
        orders.forEach((order) => {
            if(order._id == orderID){
                currentOrder = order
            }
        });


        const productResponse = await fetch('/api/products/' + productID);
        const resourceResponse = await fetch('/api/resources/' + resourceID);

        
        const order = currentOrder
        const product = await productResponse.json();
        const resource = await resourceResponse.json();
        

        scheduledTime = order.startTime
        startDate = new Date(parseInt(scheduledTime.substring(0,4)), parseInt(scheduledTime.substring(5, 7)), parseInt(scheduledTime.substring(8, 10))) 
        if(isSmall){
            let appointmentHeader = '';
            let isExistingDate = false
            for(i = 0; i < appointmentDates.length; i++){
                if(appointmentDates[i].getDate() == parseInt(scheduledTime.substring(8, 10)) &&
                appointmentDates[i].getMonth() == parseInt(scheduledTime.substring(5, 7)) &&
                appointmentDates[i].getFullYear() == parseInt(scheduledTime.substring(0,4))){
                    appointmentHeader = document.getElementById(appointmentDates[i].getMonth() + appointmentDates[i].getDate() + appointmentDates[i].getFullYear())
                    isExistingDate = true
                }
            }
            if(!isExistingDate){
                appointmentHeader = document.createElement("div")
                appointmentHeader.innerHTML = '-' + monthNumToString(parseInt(scheduledTime.substring(5, 7))) + ', ' + parseInt(scheduledTime.substring(8, 10)) + ' ' + parseInt(scheduledTime.substring(0,4))
                appointmentHeader.setAttribute("id", parseInt(scheduledTime.substring(5, 7)) + parseInt(scheduledTime.substring(8, 10)) + parseInt(scheduledTime.substring(0,4)))
                appointmentHeader.setAttribute("style", "text-align: left; margin-top: 5%;")
                appointmentDates.push(startDate)
            }


            let appointment = document.createElement("div")
            appointment.setAttribute("style", "text-align: center; display:flex; justify-content: space-between; margin-top: 3%; background-color:lightblue; border-radius:5px; padding-left: 5%; padding-right:5%;")

            appointmentName = document.createElement("div")
            appointmentName.innerHTML = product.name

            appointmentTime = document.createElement("div")
            appointmentTime.innerHTML = parseInt(scheduledTime.substring(11, 13))%12 + ":" + scheduledTime.substring(14, 16) + (parseInt(scheduledTime.substring(11, 13)) > 11 ? "pm" : "am")
            appointment.appendChild(appointmentName)
            appointment.appendChild(appointmentTime)
            appointment.setAttribute("orderID", orderID)
            appointment.addEventListener("click", function() {
                location.href = '/order_details?ID=' + appointment.getAttribute("orderID")
            })

            appointmentHeader.appendChild(appointment)
            if(!isExistingDate){
                container.appendChild(appointmentHeader)
            }
            
        }else{
            let appointment = document.createElement("div")
            appointment.setAttribute("style", "text-align: center; display:flex; justify-content: space-between; margin-top: 3%; background-color:lightblue; border-radius:5px; padding-left: 5%; padding-right:5%;")

            appointmentName = document.createElement("div")
            appointmentName.innerHTML = product.name

            appointmentTime = document.createElement("div")
            temptimeStr = parseInt(scheduledTime.substring(11, 13))%12 + ":" + scheduledTime.substring(14, 16) + (parseInt(scheduledTime.substring(11, 13)) > 12 ? "pm" : "am")
            appointmentTime.innerHTML = temptimeStr

            console.log(scheduledTime + " ---------- " + temptimeStr)

            appointment.appendChild(appointmentName)
            appointment.appendChild(appointmentTime)
            appointment.setAttribute("orderID", orderID)
            appointment.addEventListener("click", function() {
                location.href = '/order_details?ID=' + appointment.getAttribute("orderID")
            })
            container.appendChild(appointment)
        }
        
                   
      } catch (error) {
        console.error(error.message);
        alert("Failed to Fetch orders")
      }
}

//fills upcoming appointments box on the far left of site. Takes all appointments from appointmentArr and displays them in upcoming appointments
async function displayAppointments(){
    document.getElementById("AppointmentsList").innerHTML = '';
    try {
        // fetch all orders from the database
        const response = await fetch('/api/orders');
        if(!response.ok) {
          throw new Error('Failed to get orders from Database');
        }
  
        const orders = await response.json();
        
        orders.forEach((order) => {
            //addAppointment(appointmentsList, order._id, order.products[0], order.resourceID, true)
            if(parseInt(order.startTime.substring(0, 4)) >= now.getFullYear()){
                 if(parseInt(order.startTime.substring(5, 7)) >= now.getMonth()){
                     if(parseInt(order.startTime.substring(8, 10)) >= now.getDate()){
                         addAppointment(appointmentsList, order._id, order.products[0], order.resourceID, true)
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
async function OrderOnDay(dayDate, dayElement){
    try {
        // fetch all orders from the database
        const response = await fetch('/api/orders');
        if(!response.ok) {
          throw new Error('Failed to get orders from Database');
        }
  
        const orders = await response.json();
        orders.forEach((order) => {
            scheduledTime = order.startTime 

            orderYear = parseInt(scheduledTime.substring(0, 4))
            orderMonth = parseInt(scheduledTime.substring(5, 7))
            orderDay = parseInt(scheduledTime.substring(8, 10))

            
            if(orderYear == dayDate.getFullYear() && orderMonth == dayDate.getMonth() + 1 && orderDay == dayDate.getDate()){
                dayElement.style.color  = "green"
            }
        });
      } catch (error) {

        console.error(error.message);
        alert("Failed to Fetch orders")
      }
}

//initialize the Calendar to display the given month index on the given year
function initCalendar(monthIndex, year){
    Calendar.innerHTML = '';
    document.getElementById("monthMarker").innerHTML = monthNumToString(monthIndex+1) + ", " + year;
    curDay = 1;
    curDate = new Date(year, monthIndex, curDay);
    
    
    for(i = 0; i < curDate.getDay(); i++){
        Calendar.innerHTML += '<div></div>';
    }
    
    while(curDate.getMonth() == monthIndex){
        let day = document.createElement("button");
        day.setAttribute("class", "CalDayActive");
        
        OrderOnDay(curDate, day)

        day.innerHTML = curDate.getDate();
        day.setAttribute("year", curDate.getFullYear())
        day.setAttribute("month", curDate.getMonth())
        day.setAttribute("day", curDate.getDate())
        
        day.addEventListener("click", function(){
            if(document.getElementById("selectedDay") != null){
                document.getElementById("selectedDay").style.backgroundColor = "white"
                document.getElementById("selectedDay").removeAttribute("id")
            }
            day.setAttribute("id", "selectedDay")
            displayAppointmentsOnDay(day.getAttribute("year"), day.getAttribute("month"), day.getAttribute("day"))
            day.style.backgroundColor = "lightblue"
        })

        if(curDate.getMonth() == now.getMonth() && curDate.getFullYear() == now.getFullYear()){
            if(curDate.getDate() == now.getDate()){
                day.setAttribute("id", "selectedDay")
                displayAppointmentsOnDay(day.getAttribute("year"), day.getAttribute("month"), day.getAttribute("day"))
                day.style.backgroundColor = "lightblue"
            }
        }
        else{
            if(curDate.getDate() == 1){
                day.setAttribute("id", "selectedDay")
                displayAppointmentsOnDay(day.getAttribute("year"), day.getAttribute("month"), day.getAttribute("day"))
                day.style.backgroundColor = "lightblue"
            }
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
    initCalendar(DisplayedMonth, DisplayedYear);
})

//functionality for next button above calander; goes forward one month and updates calander object
document.getElementById("CalNext").addEventListener("click", function() {
    if(DisplayedMonth == 11){
        DisplayedMonth = 0;
        DisplayedYear = DisplayedYear + 1;
    }else{
        DisplayedMonth++;
    }
    initCalendar(DisplayedMonth, DisplayedYear);
})





initCalendar(DisplayedMonth, DisplayedYear)
displayAppointments()
