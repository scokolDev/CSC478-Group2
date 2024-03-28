//this array is used to simulate the database and is identical to the PresetAppointmentArray in the admin_listings js file
PresetAppointmentArray = [];
PresetAppointmentArray.push({"service": "house cleaning", "image": "/img/cleaningThumbnail.jpg", "description": "full house cleaning", "price" : 50, "active" : true, "serviceID": "12345"})



//getting the serviceID that is shared through the URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('serviceID');




//function to update the preview box on the upper left of the page. Creates all html elements to display
//a preview of what a listing would look like given the name, image, description, and price of the listing
previewBox = document.getElementById("previewBox");
function updatePreview(name, image, description, price){
    previewBox.innerHTML = '';
    let listing = document.createElement("div")
    listing.setAttribute("class", "listing")
    listing.setAttribute("style", "margin-top: 0;")

    let img = document.createElement("img")
    img.setAttribute("src", image)
    img.setAttribute("style", "width: 100%; height: 100%;")
    listing.appendChild(img)

    let NameBox = document.createElement("div")
    NameBox.innerHTML = name;
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

    previewBox.appendChild(listing)
}



//functionality of the preview button. takes the value entered in the service name, service description, and service price input boxes
//then calls the updatePreview function with these values to display a preview
document.getElementById("previewButton").addEventListener("click", function(){
    serviceName = document.getElementById("name").value != "" ? document.getElementById("name").value : "Service Name";
    serviceDescription = document.getElementById("description").value != "" ? document.getElementById("description").value : "Description of the service";
    servicePrice = document.getElementById("price").value != "" ? document.getElementById("price").value : "1234";
    updatePreview(serviceName, "style/cleaningThumbnail.jpg", serviceDescription, servicePrice)
})



//when the page initially loads, the given serviceID in the URL is checked against all services in the PresetAppointmentArray to check if
//a service with the given ID is within the (simulated) database. If the service is found within the database, updatePreview function is called to
//display the given service, and all input fields are updated to reflect the values of the given service
displayTemplate = true
if(id == undefined){
    console.log("no service ID")
}else{
    for(i = 0; i<PresetAppointmentArray.length; i++){
        if(PresetAppointmentArray[i].serviceID == id){
            displayTemplate = false
            updatePreview(PresetAppointmentArray[i].service, PresetAppointmentArray[i].image, PresetAppointmentArray[i].description, PresetAppointmentArray[i].price)
            document.getElementById("name").setAttribute("value", PresetAppointmentArray[i].service)
            document.getElementById("description").innerHTML = PresetAppointmentArray[i].description
            document.getElementById("price").setAttribute("value", PresetAppointmentArray[i].price)
            break
        }
    }
}
if(displayTemplate == true){
    updatePreview("Service Name", "/img/cleaningThumbnail.jpg", "Description of the service", "1234")
}
