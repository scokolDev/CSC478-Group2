
//This is a randomized service array to simulate the database
//all services are represented as json data {"service", "image extension", "description", "price", "active", "serviceID"}
RandAppointmentArray = [];
serviceArr = ["house cleaning", "personal trainer", "painting", "grocery shopping", "moving", "delivery"]
descriptionArr = ["short description", "slightly longer description", "long description that takes up a lot of room", "super long description that will be too long for the element to contain, the service listed here has to give too much information in the description field to properly fit in the container"]
imageArr = ["/img/cleaningThumbnail.jpg", "/img/movingThumbnail.jpg", "/img/paintingThumbnail.jpg"]
for(i = 0; i < 50; i++){
    month = Math.floor(Math.random() * 11)
    day = Math.floor(Math.random() * (28-1) + 1)
    startHour = Math.floor(Math.random() * 22)
    endHour = Math.floor(Math.random() * (23-startHour) + startHour)
    app1Start = new Date(2024, month, day, startHour, 30)
    app1End = new Date(2024, month, day, endHour, 45)
    RandAppointmentArray.push({"service": serviceArr[Math.floor(Math.random() * serviceArr.length)], "image": imageArr[Math.floor(Math.random() * imageArr.length)], "description": descriptionArr[Math.floor(Math.random() * descriptionArr.length)], "price": Math.floor(Math.random() * 12000), "active": Math.floor(Math.random() * 2) == 1 ? true : false,  "serviceID": Math.floor(Math.random() * 121314)})
}


//This is a preset array of service listing also used to simulate the database
//The purpose of this array is to show the modify listing capabilities of the admin_modify_listing page 
//when a listing is clicked on, the serviceID is used to load proper values into the admin_modify_listing page
PresetAppointmentArray = [];
PresetAppointmentArray.push({"service": "house cleaning", "image": "/img/cleaningThumbnail.jpg", "description": "full house cleaning", "price" : 50, "active" : true, "serviceID": "12345"})


//function used to create all html elements to display a service listing on the page
function addService(container, service, image, description, price, serviceId){
    let listing = document.createElement("div")
    listing.setAttribute("class", "listing")

    let img = document.createElement("img")
    img.setAttribute("src", image)
    img.setAttribute("style", "width: 100%; height: 100%;")
    listing.appendChild(img)

    let NameBox = document.createElement("div")
    NameBox.innerHTML = service;
    NameBox.setAttribute("style", "text-align: center; font-size: 150%;")
    listing.appendChild(NameBox)

    let descriptionBox = document.createElement("div")
    descriptionBox.innerHTML = description;
    descriptionBox.setAttribute("style", "text-align: center; overflow: auto")
    listing.appendChild(descriptionBox)

    let priceBox = document.createElement("div")
    priceBox.innerHTML = '$' + price;
    priceBox.setAttribute("style", "text-align: center;")
    listing.appendChild(priceBox)

    let wrapper = document.createElement("div")
    wrapper.setAttribute("class", "gridBox")
    wrapper.setAttribute("serviceID", serviceId)
    wrapper.appendChild(listing)
    wrapper.addEventListener("click", function() {
        location.href = '/admin/modify_listing?serviceID=' + serviceId;
    })

    container.appendChild(wrapper)
}


//function used to iterate through an array of appointments(appArr) and call the addService function to display each service in the array
function initAppointments(activeContainer, inactiveContainer, appArr){
    for(i = 0; i < appArr.length; i++){
        if(appArr[i].active == true){
            addService(activeContainer, appArr[i].service, appArr[i].image, appArr[i].description, appArr[i].price, appArr[i].serviceID);
        }else{
            addService(inactiveContainer, appArr[i].service, appArr[i].image, appArr[i].description, appArr[i].price, appArr[i].serviceID);
        }
    }
}

//active and inactive html listing containers


//PresetAppointmentArray
//initAppointments(activeListingContainer, inactiveListingContainer, RandAppointmentArray)



activeListingContainer = document.getElementById("activelistingsWrapper");
inactiveListingContainer = document.getElementById("inactivelistingsWrapper")
async function displayProducts() {
    activeListingContainer.innerHTML = '';
    inactiveListingContainer.innerHTML = '';
    try {
      // fetch all products from the database
      const response = await fetch('/api/products');
      if(!response.ok) {
        throw new Error('Failed to get products form Database');
      }

      const products = await response.json();
      products.forEach((product) => {
        addService((product.display == true ? activeListingContainer : inactiveListingContainer), `${product.name}`, "/img/cleaningthumbnail.jpg", `${product.description}`, `${product.price}`, `${product._id}`);
      });
    } catch (error) {
      console.error(error.message);
      alert("Failed to Fetch products")
    }
  }

  displayProducts();