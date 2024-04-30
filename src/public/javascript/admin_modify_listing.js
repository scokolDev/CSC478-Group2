//this array is used to simulate the database and is identical to the PresetAppointmentArray in the admin_listings js file
PresetAppointmentArray = [];
PresetAppointmentArray.push({"service": "house cleaning", "image": "/img/cleaningThumbnail.jpg", "description": "full house cleaning", "price" : 50, "active" : true, "serviceID": "12345"})

resourceCounter = 0;
resourceHolder = document.getElementById("modifyListingFormResourceHolder")
resourceIdArray = [];


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
    updatePreview(serviceName, "/img/cleaningThumbnail.jpg", serviceDescription, servicePrice)
})


document.getElementById("deleteButton").addEventListener("click", async function(){
    try {
      const response = await fetch('/api/products/' + id, {
          method: 'DELETE'
      });
      if(!response.ok) {
          throw new Error('Failed to find product in Database');
      }

    } catch (error) {
      console.error(error.message);
    }
})

document.getElementById("saveButton").addEventListener('click', async (event) => {
    event.preventDefault();

    const productName = document.getElementById("name").value;
    const productDesc = document.getElementById("description").value;
    const productPrice = document.getElementById("price").value;
    let productPriceType;
    if(document.getElementById("flatRate").checked){
        productPriceType = "Flat Rate"
    }else if(document.getElementById("perHour").checked){
        productPriceType = "Per Hour"
    }else{
        productPriceType = "Per Day"
    }
    const productImage = "/img/cleaningThumbnail.jpg";
    const productAvailable = document.getElementById("active").checked ? true : false;
    const productCategory = "cleaning";

    assignedResources = []
    Allresources = document.getElementsByClassName("resourceDisplay")
    for(i = 0; i < Allresources.length; i++){
      if(Allresources[i].getElementsByClassName("resourceCheckbox")[0].checked){
        assignedResources.push(Allresources[i].id)
      }
    }
    console.log(assignedResources)


    try {
      // Send a PUT request to edit the product
      if(id != undefined){
        const productResponse = await fetch('/api/products/' + id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            name: productName, 
            description: productDesc,
            price: productPrice,
            resources: assignedResources,
            priceType: productPriceType,
            category: productCategory,
            image: productImage,
            display: productAvailable
          })
        });
        if (!productResponse.ok) {
          throw new Error('Failed to Edit product');
        }
        // If product edited successfully, fetch and render the updated schedule
        console.log("Successfully Edited Product");


      // Send a POST request to add the product
      }else{
        const response = await fetch('/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            name: productName, 
            description: productDesc,
            price: productPrice,
            resources: assignedResources,
            priceType: productPriceType,
            category: productCategory,
            image: productImage,
            display: productAvailable
          })
        });
        if (!response.ok) {
          throw new Error('Failed to add product');
        }
  
        // If product added successfully, fetch and render the updated schedule
        console.log("Successfully added Product");
      }
      
    } catch (error) {
      console.error(error.message);
      alert('Failed to add product');
    }
  });

  resourceContainer = document.getElementById("resourceHolder")
  function addResource(resourceContainer, name, resourceID, ischecked){
    resourceElement = document.createElement("div")
    resourceElement.setAttribute("class", "resourceDisplay")
    resourceElement.setAttribute("id", resourceID)

    resourceCheckbox = document.createElement("input")
    resourceCheckbox.setAttribute("type", "checkbox")
    resourceCheckbox.setAttribute("class", "resourceCheckbox")
    if(ischecked){resourceCheckbox.setAttribute("checked", true)}
    resourceElement.appendChild(resourceCheckbox)

    resourceLabel = document.createElement("div")
    resourceLabel.innerHTML = name;
    resourceLabel.setAttribute("style", "line-height: 200%;")
    resourceElement.appendChild(resourceLabel)

    resourceContainer.appendChild(resourceElement)
  }

  async function loadResources(resourceContainer, activeResources) {
      try {
        // fetch all resources from the database
        const response = await fetch('/api/resources');
        if(!response.ok) {
          throw new Error('Failed to get resources form Database');
        }
        const resources = await response.json();
        if(resources.length == 0){resourceContainer.innerHTML = "no resources added yet"}
        resources.forEach((resource) => {
          isChecked = false;
          if(activeResources != undefined){
            for(i = 0; i < activeResources.length; i++){
              if(!isChecked){
                activeResources[i] == `${resource._id}` ? isChecked = true : isChecked = false
              }
            }
          }
          addResource(resourceContainer, `${resource.name}`, `${resource._id}`, isChecked)
        });
      } catch (error) {
        console.error(error.message);
        alert("Failed to Fetch resources")
      }
  }
  


  async function findExistingService() {
    try {
        // fetch all products from the database
        const response = await fetch('/api/products/' + id);
        if(!response.ok) {
            throw new Error('Failed to get products form Database');
        }
    
        const product = await response.json();
        
        
        updatePreview(`${product.name}`, "/img/cleaningThumbnail.jpg", `${product.description}`, `${product.price}`)
        loadResources(resourceContainer, product.resources)
        document.getElementById("name").setAttribute("value", `${product.name}`)
        switch(product.priceType[0]){
          case "Flat Rate": 
            document.getElementById("flatRate").checked = true;
            break;
          case "Per Day": 
            document.getElementById("perDay").checked = true
            break;
          case "Per Hour": 
            document.getElementById("perHour").checked = true
            break;
        }
        document.getElementById("description").innerHTML = `${product.description}`
        document.getElementById("price").setAttribute("value", `${product.price}`)
        product.display == true ? document.getElementById("active").checked = true : document.getElementById("inactive").checked = true
    } catch (error) {
          console.error(error.message);
          alert("Failed to Fetch products")
    }
  }


//when the page initially loads, the given serviceID in the URL is checked against all services in the PresetAppointmentArray to check if
//a service with the given ID is within the (simulated) database. If the service is found within the database, updatePreview function is called to
//display the given service, and all input fields are updated to reflect the values of the given service
displayTemplate = true
if(id == undefined){
    console.log("no service ID")
    loadResources(resourceContainer)
    document.getElementById("deleteButton").setAttribute("style", "visibility: hidden")
}else{
    displayTemplate = false
    findExistingService();
}
if(displayTemplate == true){
    updatePreview("Service Name", "/img/cleaningThumbnail.jpg", "Description of the service", "1234")
}



// document.getElementById("addResource").addEventListener('click', async (event) => {
//     resourceElement = document.createElement("div")
//     resourceCounter++
//     resourceElement.setAttribute("id", "resource" + resourceCounter)
//     resourceIdArray.push("resource" + resourceCounter)
//     resourceElement.setAttribute("resourceNumber", resourceCounter)
//     resourceElement.setAttribute("class", "resourceElement")
//     resourceHolder.appendChild(resourceElement)

//     amountInput = document.createElement("input")
//     amountInput.setAttribute("id", "resourceNumBox" + resourceCounter)
//     amountInput.setAttribute("type", "number")
//     amountInput.setAttribute("min", "1")
//     amountInput.setAttribute("value", "1")
//     amountInput.setAttribute("class", "numBox")
//     resourceElement.appendChild(amountInput);

//     daysWrapper = document.createElement("div")
//     daysWrapper.setAttribute("class", "daysWrapper")
    
//     sundayWrapper = document.createElement("div")
//     sunday = document.createElement("div")
//     sunday.setAttribute("class", "dayLetter")
//     sunday.innerHTML = "S"
//     sundayCheckBox = document.createElement("input")
//     sundayCheckBox.setAttribute("type", "checkbox")
//     sundayCheckBox.setAttribute("class", "dayCheckbox")
//     sundayWrapper.appendChild(sunday)
//     sundayWrapper.appendChild(sundayCheckBox)
//     daysWrapper.appendChild(sundayWrapper)

//     mondayWrapper = document.createElement("div")
//     monday = document.createElement("div")
//     monday.setAttribute("class", "dayLetter")
//     monday.innerHTML = "M"
//     mondayCheckBox = document.createElement("input")
//     mondayCheckBox.setAttribute("type", "checkbox")
//     mondayCheckBox.setAttribute("class", "dayCheckbox")
//     mondayWrapper.appendChild(monday)
//     mondayWrapper.appendChild(mondayCheckBox)
//     daysWrapper.appendChild(mondayWrapper)

//     tuesdayWrapper = document.createElement("div")
//     tuesday = document.createElement("div")
//     tuesday.setAttribute("class", "dayLetter")
//     tuesday.innerHTML = "T"
//     tuesdayCheckBox = document.createElement("input")
//     tuesdayCheckBox.setAttribute("type", "checkbox")
//     tuesdayCheckBox.setAttribute("class", "dayCheckbox")
//     tuesdayWrapper.appendChild(tuesday)
//     tuesdayWrapper.appendChild(tuesdayCheckBox)
//     daysWrapper.appendChild(tuesdayWrapper)

//     wednesdayWrapper = document.createElement("div")
//     wednesday = document.createElement("div")
//     wednesday.setAttribute("class", "dayLetter")
//     wednesday.innerHTML = "W"
//     wednesdayCheckBox = document.createElement("input")
//     wednesdayCheckBox.setAttribute("type", "checkbox")
//     wednesdayCheckBox.setAttribute("class", "dayCheckbox")
//     wednesdayWrapper.appendChild(wednesday)
//     wednesdayWrapper.appendChild(wednesdayCheckBox)
//     daysWrapper.appendChild(wednesdayWrapper)

//     thursdayWrapper = document.createElement("div")
//     thursday = document.createElement("div")
//     thursday.setAttribute("class", "dayLetter")
//     thursday.innerHTML = "T"
//     thursdayCheckBox = document.createElement("input")
//     thursdayCheckBox.setAttribute("type", "checkbox")
//     thursdayCheckBox.setAttribute("class", "dayCheckbox")
//     thursdayWrapper.appendChild(thursday)
//     thursdayWrapper.appendChild(thursdayCheckBox)
//     daysWrapper.appendChild(thursdayWrapper)

//     fridayWrapper = document.createElement("div")
//     friday = document.createElement("div")
//     friday.setAttribute("class", "dayLetter")
//     friday.innerHTML = "F"
//     fridayCheckBox = document.createElement("input")
//     fridayCheckBox.setAttribute("type", "checkbox")
//     fridayCheckBox.setAttribute("class", "dayCheckbox")
//     fridayWrapper.appendChild(friday)
//     fridayWrapper.appendChild(fridayCheckBox)
//     daysWrapper.appendChild(fridayWrapper)

//     saturdayWrapper = document.createElement("div")
//     saturday = document.createElement("div")
//     saturday.setAttribute("class", "dayLetter")
//     saturday.innerHTML = "S"
//     saturdayCheckBox = document.createElement("input")
//     saturdayCheckBox.setAttribute("type", "checkbox")
//     saturdayCheckBox.setAttribute("class", "dayCheckbox")
//     saturdayWrapper.appendChild(saturday)
//     saturdayWrapper.appendChild(saturdayCheckBox)
//     daysWrapper.appendChild(saturdayWrapper)

//     resourceElement.appendChild(daysWrapper);

//     TimeWrapper = document.createElement("div")
//     TimeWrapper.setAttribute("class", "timeWrapper")

//     startLabel = document.createElement("label")
//     startLabel.innerHTML = "Start:"
//     TimeWrapper.appendChild(startLabel)

//     startInput = document.createElement("input")
//     startInput.setAttribute("type", "time")
//     TimeWrapper.appendChild(startInput)

//     TimeWrapper.innerHTML += "<br><br>"

//     endLabel = document.createElement("label")
//     endLabel.innerHTML = "End:"
//     TimeWrapper.appendChild(endLabel)

//     endInput = document.createElement("input")
//     endInput.setAttribute("type", "time")
//     TimeWrapper.appendChild(endInput)

//     resourceElement.appendChild(TimeWrapper)


//     deleteWrapper = document.createElement("div")
//     deleteWrapper.setAttribute("class", "deleteWrapper")
//     deleteButton = document.createElement("button")
//     deleteButton.setAttribute("class", "deleteButton")
//     deleteButton.setAttribute("type", "button")
//     deleteButton.setAttribute("parentId", "resource" + resourceCounter)
//     deleteButton.addEventListener("click", function(){
//         console.log(this.getAttribute("parentId"))
//         document.getElementById(this.getAttribute("parentId")).remove()
//         for(i = 0; i < resourceIdArray.length; i++){
//           if(resourceIdArray[i] == this.getAttribute("parentId")){
//             delete resourceIdArray[i]
//             break
//           }
//         }
//     });
//     deleteWrapper.appendChild(deleteButton)
//     resourceElement.appendChild(deleteWrapper)
// });


