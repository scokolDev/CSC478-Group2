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

//takes a given datestring and separates the year, month, day, hour, and minute then formats data into string and returns it
//
//dateStr: date in form of string which will be processed
//
//return: date in the form month, day year - hour:minutes am/pm
function formatTime(dateStr){

    //get year, month, day, hour, and minutes from given dateString
    year = parseInt(dateStr.substring(0, 4))
    month = parseInt(dateStr.substring(5, 7))
    day = parseInt(dateStr.substring(8, 10))
    hour = parseInt(dateStr.substring(11, 13))
    minutes = dateStr.substring(14, 16)

    //return string in form month, day year - hour:minutes am/pm
    return monthNumToString(month) + ", " + day + " " + year + " - " + hour%12 + ":" + minutes + (hour > 11 ? "pm" : "am")
}

//creates an html element to represent order, fills element with all relevent order info
//
//order: order object to be displayed
async function addAppointment(order){

    //fetch product associated with order from database
    const productResponse = await fetch('/api/products/' + order.products[0]);
    const product = await productResponse.json();

    //fetch resource associated with order from database
    const resourceResponse = await fetch('/api/resources/' + order.resourceID);
    const resource = await resourceResponse.json();

    //create html object to represent order
    let appointment = document.createElement("div")
    appointment.setAttribute("style", "background-color: lightblue; display: flex; justify-content: space-between; border-radius: 1%; margin-top:2%")

    //create div to hold order number and product name
    let leftDiv = document.createElement("div")
    let orderNum = document.createElement("div")
    orderNum.innerHTML = "Order #: " + order.orderNumber
    let ProductName = document.createElement("div")
    ProductName.innerHTML = "Product Ordered: " + product.name
    leftDiv.appendChild(orderNum)
    leftDiv.innerHTML += "<br>"
    leftDiv.appendChild(ProductName)
    appointment.appendChild(leftDiv)

    //create div to hold order status and resource name
    let midDiv = document.createElement("div")
    let status = document.createElement("div")
    status.innerHTML = "Order Status: " + order.status
    let resourceName = document.createElement("div")
    resourceName.innerHTML = "Resource Reserved: " + resource.name
    midDiv.appendChild(status)
    midDiv.innerHTML += "<br>"
    midDiv.appendChild(resourceName)
    appointment.appendChild(midDiv)

    //create div to hold order start time and order end time
    let rightDiv = document.createElement("div")
    let startTime = document.createElement("div")
    startTime.innerHTML = "Order Start Time: " + formatTime(order.startTime)
    let endTime = document.createElement("div")
    endTime.innerHTML = "Order End Time: " + formatTime(order.endTime)
    rightDiv.appendChild(startTime)
    rightDiv.innerHTML += "<br>"
    rightDiv.appendChild(endTime)
    appointment.appendChild(rightDiv)

    //add event listener to html object to redirect user to order details of clicked order
    appointment.setAttribute("orderID", order._id)
    appointment.addEventListener("click", function() {
        location.href = '/customer/order_details?ID=' + appointment.getAttribute("orderID")
    })

    //append order html element to appointments list
    document.getElementById("AppointmentsList").appendChild(appointment)

}

//fills upcoming appointments box on the far left of site. Takes all appointments from appointmentArr and displays them in upcoming appointments
async function displayAppointments(){

    //clear AppointmentsList on page
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

            //call addAppointment to display order in appointment list
            addAppointment(order)
            
        });
      } catch (error) {
        console.error(error.message);
        alert("Failed to Fetch orders")
      }
}


displayAppointments()