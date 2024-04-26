
//getting the serviceID that is shared through the URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('ID');

//fields on page which hold all order details
orgName = document.getElementById("orgName");
orderNumber = document.getElementById("orderNumber");
orderStatus = document.getElementById("orderStatus");
productName = document.getElementById("productName");
productDescription = document.getElementById("productDescription");
productPricing = document.getElementById("productPricing");
resourceName = document.getElementById("resourceName");
startTime = document.getElementById("startTime");
endTime = document.getElementById("endTime");
cost = document.getElementById("cost");


//returns a month name in string form given the month number
//
//monthNumber: int representing month index 1-12 inclusive
function monthNumToString(monthNumber){
    //return month name in string based off monthNumber
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

//fill the page elements with data from the order with id in url param
async function displayOrderDetails(){
    try {
        //retrieve order from database
        const orderResponse = await fetch('/api/orders/' + id);
        const order = await orderResponse.json();
        
        //retrieve order's product from database
        const productResponse = await fetch('/api/products/' + order.products[0]);
        const product = await productResponse.json();

        //retrieve order's resource from database
        const resourceResponse = await fetch('/api/resources/' + order.resourceID);
        const resource = await resourceResponse.json();

        //throw error if order, product, or resource is not found
        if(!orderResponse.ok){
            throw new Error('Order not found in database');
        }else if(!productResponse.ok){
            throw new Error('Failed to get product from Database');
        }else if(!resourceResponse.ok){
            throw new Error('Failed to get resource from Database');
        }

        //setting all order information fields to selected order details
        orderNumber.innerHTML += `${order.orderNumber}`
        orderStatus.innerHTML += `${order.status}`

        startTime.innerHTML = monthNumToString(parseInt(order.startTime.substring(5, 7))) + ", " + parseInt(order.startTime.substring(8, 10)) + " " + parseInt(order.startTime.substring(0, 4))
        startTime.innerHTML += "   " + parseInt(order.startTime.substring(11, 13))%12 + ":" + order.startTime.substring(14, 16) + (parseInt(order.startTime.substring(11, 13)) > 12 ? "pm" : "am")

        endTime.innerHTML += `${order.endTime}`
        endTime.innerHTML = monthNumToString(parseInt(order.endTime.substring(5, 7))) + ", " + parseInt(order.endTime.substring(8, 10)) + " " + parseInt(order.endTime.substring(0, 4))
        endTime.innerHTML += "   " + parseInt(order.endTime.substring(11, 13))%12 + ":" + order.endTime.substring(14, 16) + (parseInt(order.endTime.substring(11, 13)) > 12 ? "pm" : "am")
        cost.innerHTML += "PLACEHOLDER"

        //setting all product information fields to selected order's product details
        productName.innerHTML += `${product.name}`
        productDescription.innerHTML += `${product.description}`
        switch(`${product.priceType}`){
            case("Per Hour"):
                productPricing.innerHTML += "$" + `${product.price}` + "/hour"
                break;
            case("Per Day"):
                productPricing.innerHTML += "$" + `${product.price}` + "/day"
                break;
            case("Flat Rate"):
                productPricing.innerHTML += "$" + `${product.price}`
                break;
        }

        //setting resource name field to selected order's resource name
        resourceName.innerHTML += `${resource.name}`

    //error handling
    } catch (error) {
          console.error(error.message);
          alert(error.message)
          //location.href = "/dashboard"
    }
}

//delete order button functionality
async function deleteOrder(redirectPath) {

    //retrieve order by id
    const response = await fetch('/api/orders/' + id)
    orderDetails = await response.json()
    
    //get resource id associated with order
    resourceid = orderDetails.resourceID

    //retrieve associated resource from database
    const resourceResponse = await fetch('/api/resources/' + resourceid)
    resourceDetails = await resourceResponse.json()

    //find and delete bookedDate that the order was taking up within the bookedDates resource field
    UpdatedBookedDates = resourceDetails.bookedDates
    console.log(UpdatedBookedDates)
    for(i = 0; i < UpdatedBookedDates.length; i++){
        if(UpdatedBookedDates[i].orderId == id){
            console.log(UpdatedBookedDates)
            UpdatedBookedDates.splice(i, 1)
            console.log(UpdatedBookedDates)
            break
        }
    }
    
    //update resource with modified bookedDates array to remove booked date order was taking up
    await fetch('/api/resources/' + resourceid, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json'
        },
            body: JSON.stringify({ 
            bookedDates: UpdatedBookedDates
        })
    });

    //call order delete method on database
    try {
        const response = await fetch('/api/orders/' + id, {
            method: 'DELETE'
        });
        if(!response.ok) {
            throw new Error('Failed to find order in Database');
        }
    
    } catch (error) {
        console.error(error.message);
    }    

    //redirect user to redirectPath, either the admin or customer dashboard
    location.href = redirectPath
}

displayOrderDetails()