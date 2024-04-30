
//getting the serviceID that is shared through the URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('ID');

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

//fill the page elements with data from the order with id in url param
async function displayOrderDetails(){
    try {
        const orderResponse = await fetch('/api/orders');
        const orders = await orderResponse.json();
        let currentOrder
        orders.forEach((order) => {
            if(order._id == id){
                currentOrder = order
            }
        });
        const order = currentOrder
        
        console.log(order)

        orderNumber.innerHTML += `${order.orderNumber}`
        orderStatus.innerHTML += `${order.status}`

        
        const productResponse = await fetch('/api/products/' + order.products[0]);
        if(!productResponse.ok) {
            throw new Error('Failed to get product form Database');
        }
        const product = await productResponse.json();

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

        const resourceResponse = await fetch('/api/resources/' + order.resourceID);
        if(!resourceResponse.ok) {
            throw new Error('Failed to get resource form Database');
        }
        const resource = await resourceResponse.json();

        resourceName.innerHTML += `${resource.name}`

        //startTime.innerHTML = `${order.startTime}`
        startTime.innerHTML = monthNumToString(parseInt(order.startTime.substring(5, 7))) + ", " + parseInt(order.startTime.substring(8, 10)) + " " + parseInt(order.startTime.substring(0, 4))
        startTime.innerHTML += "   " + parseInt(order.startTime.substring(11, 13))%12 + ":" + order.startTime.substring(14, 16) + (parseInt(order.startTime.substring(11, 13)) > 12 ? "pm" : "am")

        endTime.innerHTML += `${order.endTime}`
        endTime.innerHTML = monthNumToString(parseInt(order.endTime.substring(5, 7))) + ", " + parseInt(order.endTime.substring(8, 10)) + " " + parseInt(order.endTime.substring(0, 4))
        endTime.innerHTML += "   " + parseInt(order.endTime.substring(11, 13))%12 + ":" + order.endTime.substring(14, 16) + (parseInt(order.endTime.substring(11, 13)) > 12 ? "pm" : "am")

        cost.innerHTML += "PLACEHOLDER"

    } catch (error) {
          console.error(error.message);
          alert("Failed to Fetch order")
    }
}

//delete order button functionality
async function deleteOrder(redirectType) {
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
    if(redirectType == "admin"){
        location.href = "/admin/dashboard"
    }else{
        location.href = "/dashboard"
    }
}

displayOrderDetails()