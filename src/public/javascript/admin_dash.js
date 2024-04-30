now = new Date(Date.now());
console.log(now);
DisplayedMonth = now.getMonth();
DisplayedYear = now.getFullYear();

appointmentListOnDay = document.getElementById("SelectedAppointmentList")
appointmentsList = document.getElementById("AppointmentsList")
Calendar = document.getElementById("Calendar")

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

async function getProductById(Prodid){
    try {

        const response = await fetch('/api/products/' + Prodid);
        if(!response.ok) {
            throw new Error('Failed to get products form Database');
        }
    
        const product = await response.json();
        console.log(product)
        return product
      } catch (error) {
        console.error(error.message);
        alert("Failed to Fetch product")
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
            
            curProduct = getProductById(order.products[0])
            
            scheduledTime = order.startTime
             
            orderYear = parseInt(scheduledTime.substring(0, 4))
            orderMonth = parseInt(scheduledTime.substring(5, 7))
            orderDay = parseInt(scheduledTime.substring(8, 10))

            if(orderYear == year && orderMonth == parseInt(month) + 1 && orderDay == day){
                console.log("added appointment to day")
                addAppointment(appointmentListOnDay, order._id, order.products[0], order.resourceID, true)
            }    
            }    
        });
      } catch (error) {
        console.error(error.message);
        alert("Failed to Fetch orders")
      }
}


async function addAppointment(container, orderID, productID, resourceID, isSmall){
    try {
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

        // if(!orderResponse.ok || !productResponse.ok || !resourceResponse.ok) {
        //     throw new Error('Failed to get orders from Database');
        //   }
        
        const order = currentOrder
        const product = await productResponse.json();
        const resource = await resourceResponse.json();
        

        console.log(order)

        scheduledTime = order.startTime
        scheduledEndTime = order.endTime
        if(isSmall){
            let appointment = document.createElement("div");
            appointment.setAttribute("class", "AppointmentObject");
            appointment.innerHTML += '<div style="grid-area: 1/1/3/5;">' + `${product.name}` + '</div>'
            TimeRange = parseInt(scheduledTime.substring(11, 13))%12 + ":" + scheduledTime.substring(14, 16) + (parseInt(scheduledTime.substring(11, 13)) > 11 ? "pm" : "am")
            appointment.innerHTML += '<div style="grid-area: 1/5/3/8; text-align: center;">' + TimeRange + '</div>'
            appointment.innerHTML += '<div style="grid-area: 3/7/5/8; text-align: center;">' + '$' + `${product.price}` + '</div>' 
            appointment.innerHTML += '<div style="grid-area: 3/1/5/7;">' + `${order.customerID}` + '</div>' 
            appointment.setAttribute("orderID", orderID)
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
            //TimeRange += " to " + parseInt(scheduledEndTime.substring(11, 13))%12 + ":" + scheduledEndTime.substring(14, 16) + (parseInt(scheduledEndTime.substring(11, 13)) > 11 ? "pm" : "am")
            appointment.innerHTML += '<div style="grid-area: 2/1/3/8; text-align: center;">' + TimeRange + '</div>'
            appointment.innerHTML += '<div style="grid-area: 3/7/4/8; text-align: center;">' + '$' + product.price + '</div>'
            appointment.innerHTML += '<div style="grid-area: 3/1/4/7;">' + `${order.customerID}` + '</div>'
            appointment.setAttribute("orderID", orderID)
            appointment.addEventListener("click", function() {
                location.href = '/admin/order_details?ID=' + appointment.getAttribute("orderID")
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
            console.log(order)
            if(order.products[0] != "test"){
                addAppointment(appointmentsList, order._id, order.products[0], order.resourceID, false)
            }  
        });
      } catch (error) {
        console.error(error.message);
        alert("Failed to Fetch orders")
      }
}

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
                document.getElementById("selectedDay").style.border = "1px solid black"
                document.getElementById("selectedDay").removeAttribute("id")
            }
            document.getElementById("SelectedAppointmentHeader").innerHTML = "Appointments on " + monthNumToString(parseInt(day.getAttribute("month")) + 1) + ", " + day.getAttribute("day") + " " + day.getAttribute("year")
            day.setAttribute("id", "selectedDay")
            displayAppointmentsOnDay(day.getAttribute("year"), day.getAttribute("month"), day.getAttribute("day"))
            day.style.border = "5px solid red"
        })

        if(curDate.getMonth() == now.getMonth() && curDate.getFullYear() == now.getFullYear()){
            if(curDate.getDate() == now.getDate()){
                document.getElementById("SelectedAppointmentHeader").innerHTML = "Appointments on " + monthNumToString(parseInt(day.getAttribute("month")) + 1) + ", " + day.getAttribute("day") + " " + day.getAttribute("year")
                day.setAttribute("id", "selectedDay")
                displayAppointmentsOnDay(day.getAttribute("year"), day.getAttribute("month"), day.getAttribute("day"))
                day.style.border = "5px solid red"
            }
        }
        else{
            if(curDate.getDate() == 1){
                document.getElementById("SelectedAppointmentHeader").innerHTML = "Appointments on " + monthNumToString(parseInt(day.getAttribute("month")) + 1) + ", " + day.getAttribute("day") + " " + day.getAttribute("year")
                day.setAttribute("id", "selectedDay")
                displayAppointmentsOnDay(day.getAttribute("year"), day.getAttribute("month"), day.getAttribute("day"))
                day.style.border = "5px solid red"
            }
        }
        Calendar.appendChild(day);
        curDay++
        curDate = new Date(year, monthIndex, curDay);
    }
}




initCalendar(DisplayedMonth, DisplayedYear)
displayAppointments()


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
