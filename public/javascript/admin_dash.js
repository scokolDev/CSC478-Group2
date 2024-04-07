
now = new Date(Date.now());
console.log(now);
DisplayedMonth = now.getMonth();
DisplayedYear = now.getFullYear();



app1Start = new Date(2024, 2, 9, 13, 30);
app1End = new Date(2024, 2, 9, 14, 30);
AppointmentArray = [];
AppointmentArray.push({"service":"house cleaning", "start": app1Start, "cost": 13, "address":"123 Oak Street, Springfield IL 62629", "end": app1End})
app1Start = new Date(2024, 2, 12, 8, 30);
app1End = new Date(2024, 2, 12, 15, 0);
AppointmentArray.push({"service":"house cleaning", "start": app1Start, "cost": 234, "address":"123 Oak Street, Springfield IL 62629", "end": app1End})
app1Start = new Date(2024, 2, 3, 1, 30);
app1End = new Date(2024, 2, 3, 2, 45);
AppointmentArray.push({"service":"house cleaning", "start": app1Start, "cost": 42, "address":"123 Oak Street, Springfield IL 62629", "end": app1End})
app1Start = new Date(2024, 3, 3, 1, 30);
app1End = new Date(2024, 3, 3, 2, 45);
AppointmentArray.push({"service":"house cleaning", "start": app1Start, "cost": 320, "address":"123 Oak Street, Springfield IL 62629", "end": app1End})
app1Start = new Date(2024, 3, 24, 1, 30);
app1End = new Date(2024, 3, 24, 2, 45);
AppointmentArray.push({"service":"house cleaning", "start": app1Start, "cost": 100, "address":"123 Oak Street, Springfield IL 62629", "end": app1End})
app1Start = new Date(2024, 1, 18, 1, 30);
app1End = new Date(2024, 1, 18, 2, 45);
AppointmentArray.push({"service":"house cleaning", "start": app1Start, "cost": 100, "address":"123 Oak Street, Springfield IL 62629", "end": app1End})


//Fills the Appointment Array with a bunch of random values for all fiends
serviceArr = ["house cleaning", "personal trainer", "painting", "grocery shopping", "moving", "delivery"]
addressArr = ["8221 Rose Street Lindenhurst, NY 11757", "9874 S. Pendergast Road Mableton, GA 30126", "752 Magnolia St. Longview, TX 75604", "290 Park Street Opa Locka, FL 33054", "27 Deerfield Lane Nottingham, MD 21236", "9566 Andover Drive Romulus, MI 48174"]
for(i = 0; i < 50; i++){
    month = Math.floor(Math.random() * 11)
    day = Math.floor(Math.random() * (28-1) + 1)
    startHour = Math.floor(Math.random() * 22)
    endHour = Math.floor(Math.random() * (23-startHour) + startHour)
    app1Start = new Date(2024, month, day, startHour, 30)
    app1End = new Date(2024, month, day, endHour, 45)
    AppointmentArray.push({"service": serviceArr[Math.floor(Math.random() * serviceArr.length)], "start": app1Start, "cost": Math.floor(Math.random() * 12000), "address":addressArr[Math.floor(Math.random() * addressArr.length)], "end": app1End})
}


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
    // for(i = 0; i < AppointmentArray.length; i++){
        
    //     document.getElementById("SelectedAppointmentHeader").innerHTML = "Appointments on " + monthNumToString(Math.floor(month) + 1) + " " + day + ", " + year;
    //     if(AppointmentArray[i].start.getFullYear() == year && AppointmentArray[i].start.getMonth() == month && AppointmentArray[i].start.getDate() == day){
    //         let appointment = document.createElement("div");
    //         appointment.setAttribute("class", "AppointmentObject");
    //         appointment.innerHTML += '<div style="grid-area: 1/1/3/5;">' + AppointmentArray[i].service + '</div>'
    //         TimeRange = AppointmentArray[i].start.getHours() % 12 + ":" + AppointmentArray[i].start.getMinutes() + (AppointmentArray[i].start.getHours() > 11 ? "pm" : "am") +  " - " + AppointmentArray[i].end.getHours() % 12 + ":" + AppointmentArray[i].end.getMinutes() + (AppointmentArray[i].end.getHours() > 11 ? "pm" : "am")
    //         appointment.innerHTML += '<div style="grid-area: 1/5/3/8; text-align: center;">' + TimeRange + '</div>'
    //         appointment.innerHTML += '<div style="grid-area: 3/7/5/8; text-align: center;">' + '$' + AppointmentArray[i].cost + '</div>'
    //         appointment.innerHTML += '<div style="grid-area: 3/1/5/7;">' + AppointmentArray[i].address + '</div>'
    //         document.getElementById("SelectedAppointmentList").appendChild(appointment)
    //     }
    //     console.log("hi");
    // }
    
    try {
        // fetch all orders from the database
        const response = await fetch('/api/orders');
        if(!response.ok) {
          throw new Error('Failed to get orders from Database');
        }
  
        const orders = await response.json();
        orders.forEach((order) => {
            const orderProduct = fetch('/api/products/' + order.products).json();
            
            scheduledTime = order.scheduledTime
            console.log(scheduledTime)
            if( scheduledTime.getFullYear() == year && scheduledTime.getMonth() == month && scheduledTime.getDate() == day){
                         let appointment = document.createElement("div");
                         appointment.setAttribute("class", "AppointmentObject");
                         appointment.innerHTML += '<div style="grid-area: 1/1/3/5;">' + `${orderProduct.service}` + '</div>'
                         TimeRange = scheduledTime.getHours() % 12 + ":" + scheduledTime.getMinutes() + (scheduledTime.getHours() > 11 ? "pm" : "am")
                         appointment.innerHTML += '<div style="grid-area: 1/5/3/8; text-align: center;">' + TimeRange + '</div>'
                         appointment.innerHTML += '<div style="grid-area: 3/7/5/8; text-align: center;">' + '$' + `${orderProduct.cost}` + '</div>' 
                         appointment.innerHTML += '<div style="grid-area: 3/1/5/7;">' + `${order.user}` + '</div>' 
                         document.getElementById("SelectedAppointmentList").appendChild(appointment)
            }        
        });
      } catch (error) {
        console.error(error.message);
        alert("Failed to Fetch orders")
      }
}





//fills upcoming appointments box on the far left of site. Takes all appointments from appointmentArr and displays them in upcoming appointments
async function displayAppointments(){
    document.getElementById("AppointmentsList").innerHTML = '';
    // for(i = 0; i < AppointmentArray.length; i++){
    //     let appointment = document.createElement("div");
    //     appointment.setAttribute("class", "AppointmentObjectLarge");
    //     appointment.innerHTML += '<div style="grid-area: 1/1/2/8;">' + AppointmentArray[i].service + '</div>'
    //     TimeRange = monthNumToString(Math.floor(AppointmentArray[i].start.getMonth()) + 1) + " " + AppointmentArray[i].start.getDate() + ", ";
    //     TimeRange += AppointmentArray[i].start.getFullYear() + " : "
    //     TimeRange += AppointmentArray[i].start.getHours() % 12 + ":" + AppointmentArray[i].start.getMinutes() + (AppointmentArray[i].start.getHours() > 11 ? "pm" : "am") +  " - " + AppointmentArray[i].end.getHours() % 12 + ":" + AppointmentArray[i].end.getMinutes() + (AppointmentArray[i].end.getHours() > 11 ? "pm" : "am")
    //     appointment.innerHTML += '<div style="grid-area: 2/1/3/8; text-align: center;">' + TimeRange + '</div>'
    //     appointment.innerHTML += '<div style="grid-area: 3/7/4/8; text-align: center;">' + '$' + AppointmentArray[i].cost + '</div>'
    //     appointment.innerHTML += '<div style="grid-area: 3/1/4/7;">' + AppointmentArray[i].address + '</div>'
    //     document.getElementById("AppointmentsList").appendChild(appointment)
    // }
    try {
        // fetch all orders from the database
        const response = await fetch('/api/orders');
        if(!response.ok) {
          throw new Error('Failed to get orders from Database');
        }
  
        const orders = await response.json();
        orders.forEach((order) => {
            const orderProduct = fetch('/api/products/' + order.products).json();
            
            scheduledTime = order.scheduledTime
            console.log(scheduledTime)
            if( scheduledTime.getFullYear() == year && scheduledTime.getMonth() == month && scheduledTime.getDate() == day){
                let appointment = document.createElement("div");
                appointment.setAttribute("class", "AppointmentObjectLarge");
                appointment.innerHTML += '<div style="grid-area: 1/1/2/8;">' + orderProduct.service + '</div>'
                TimeRange = monthNumToString(Math.floor(scheduledTime.getMonth()) + 1) + " " + scheduledTime.getDate() + ", ";
                TimeRange += scheduledTime.getFullYear() + " : "
                TimeRange += scheduledTime.getHours() % 12 + ":" + scheduledTime.getMinutes() + (scheduledTime.getHours() > 11 ? "pm" : "am")
                appointment.innerHTML += '<div style="grid-area: 2/1/3/8; text-align: center;">' + TimeRange + '</div>'
                appointment.innerHTML += '<div style="grid-area: 3/7/4/8; text-align: center;">' + '$' + orderProduct.cost + '</div>'
                appointment.innerHTML += '<div style="grid-area: 3/1/4/7;">' + `${order.user}` + '</div>'
                document.getElementById("AppointmentsList").appendChild(appointment)
            }        
        });
      } catch (error) {
        console.error(error.message);
        alert("Failed to Fetch orders")
      }
}

async function  isOrderOnDay(day){
    try {
        // fetch all orders from the database
        const response = await fetch('/api/orders');
        if(!response.ok) {
          throw new Error('Failed to get orders from Database');
        }
  
        const orders = await response.json();
        orders.forEach((order) => {
            scheduledTime = order.scheduledTime  
            if(scheduledTime.getFullYear() == day.getFullYear() && scheduledTime.getMonth() == day.getMonth() && scheduledTime.getDate() == day.getDate()){
                return true;
            }
        });
      } catch (error) {

        console.error(error.message);
        alert("Failed to Fetch orders")
      }
}

//initializes calendar with all days for a given month in a given year
//handles coloring 
Calendar = document.getElementById("Calendar");
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
        

        // for(i = 0; i < AppointmentArray.length; i++){
        //     if(AppointmentArray[i].start.getFullYear() == curDate.getFullYear() && AppointmentArray[i].start.getMonth() == curDate.getMonth() && AppointmentArray[i].start.getDate() == curDate.getDate()){
        //         day.style.backgroundColor = "green"
        //     }
        // }
        if(isOrderOnDay(curDate) == true){
            day.style.backgroundColor = "green"
        }

        day.innerHTML = curDate.getDate();
        day.setAttribute("year", curDate.getFullYear())
        day.setAttribute("month", curDate.getMonth())
        day.setAttribute("day", curDate.getDate())
        
        day.addEventListener("click", function(){
            if(document.getElementById("selectedDay") != null){
                document.getElementById("selectedDay").style.border = "1px solid black"
                document.getElementById("selectedDay").removeAttribute("id")
            }
            day.setAttribute("id", "selectedDay")
            displayAppointmentsOnDay(day.getAttribute("year"), day.getAttribute("month"), day.getAttribute("day"))
            day.style.border = "5px solid red"
        })

        if(curDate.getMonth() == now.getMonth() && curDate.getFullYear() == now.getFullYear()){
            if(curDate.getDate() == now.getDate()){
                day.setAttribute("id", "selectedDay")
                displayAppointmentsOnDay(day.getAttribute("year"), day.getAttribute("month"), day.getAttribute("day"))
                day.style.border = "5px solid red"
            }
        }
        else{
            if(curDate.getDate() == 1){
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
displayAppointmentsOnDay(now.getFullYear(), now.getMonth(), now.getDate())
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
