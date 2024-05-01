//this array is used to simulate the database and is identical to the PresetAppointmentArray in the admin_listings js file
PresetAppointmentArray = [];
PresetAppointmentArray.push({"service": "house cleaning", "image": "/img/cleaningThumbnail.jpg", "description": "full house cleaning", "price" : 50, "active" : true, "serviceID": "12345"})

resourceContainer = document.getElementById("resourceHolder")
previewBox = document.getElementById("previewBox");

resourceCounter = 0;
displayTemplate = true
resourceHolder = document.getElementById("modifyListingFormResourceHolder")
resourceIdArray = [];


//getting the serviceID that is shared through the URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('serviceID');




//function to update the preview box on the upper left of the page. Creates all html elements to display
//a preview of what a listing would look like given the name, image, description, and price of the listing
//
//(Requirement 2.3.1) - updates product preview to preview how product would look with entered information
//
//name: product name
//image: image path
//description: product description
//price: product price
function updatePreview(name, image, description, price){

    //clear preview box
    previewBox.innerHTML = '';

    //create html element with all product values
    let productPreview = document.createElement("div")
    productPreview.setAttribute("class", "listing")
    productPreview.setAttribute("style", "margin-top: 0;")

    let img = document.createElement("img")
    img.setAttribute("src", image)
    img.setAttribute("style", "width: 100%; height: 100%;")
    productPreview.appendChild(img)

    let NameBox = document.createElement("div")
    NameBox.innerHTML = name;
    NameBox.setAttribute("style", "text-align: center; font-size: 150%;")
    productPreview.appendChild(NameBox)

    let descriptionBox = document.createElement("div")
    descriptionBox.innerHTML = description;
    descriptionBox.setAttribute("style", "text-align: center; overflow: auto")
    productPreview.appendChild(descriptionBox)

    let priceBox = document.createElement("div")
    priceBox.innerHTML = '$' + price;
    priceBox.setAttribute("style", "text-align: center;")
    productPreview.appendChild(priceBox)

    //display element in preview box
    previewBox.appendChild(productPreview)
}

//functionality of the preview button. takes the value entered in the service name, service description, and service price input boxes
//then calls the updatePreview function with these values to display a preview
//
//(Requirement 2.3.1) - calls updatePreview() function to update product preview
//
document.getElementById("previewButton").addEventListener("click", function(){

    //get product name, description, and price from input fields, or pass in default values if user did not enter anything
    serviceName = document.getElementById("name").value != "" ? document.getElementById("name").value : "Service Name";
    serviceDescription = document.getElementById("description").value != "" ? document.getElementById("description").value : "Description of the service";
    servicePrice = document.getElementById("price").value != "" ? document.getElementById("price").value : "1234";

    //display updated preview using updatePreview function
    updatePreview(serviceName, "/img/cleaningThumbnail.jpg", serviceDescription, servicePrice)
})

//functionality of the delete button, this button deletes the product from the database
//
//(Requirement 2.3.2) - deletes product
//
document.getElementById("deleteButton").addEventListener("click", async function(){

    //delete the product from the database
    try {
      const response = await fetch('/api/products/' + id, {
          method: 'DELETE'
      });

      if(!response.ok) {
          throw new Error('Failed to delete product from Database');
      }

    } catch (error) {
      console.error(error.message);
    }
})

//functionality for the save button, this button saves the product with all user updated values to the database
//
//(Requirement 2.3.2) - saves product with updated information to database
//
document.getElementById("saveButton").addEventListener('click', async function(){
    
    //retrieve all product attributes from user input fields
    const productName = document.getElementById("name").value;
    const productDesc = document.getElementById("description").value;
    const productPrice = document.getElementById("price").value;
    const uploadedImage = document.getElementById("image").files[0]
    let productImage
    let productPriceType;
    if(document.getElementById("flatRate").checked){
        productPriceType = "Flat Rate"
    }else if(document.getElementById("perHour").checked){
        productPriceType = "Per Hour"
    }else{
        productPriceType = "Per Day"
    }
    
    const productAvailable = document.getElementById("active").checked ? true : false;
    const productCategory = "cleaning";

    //iterate through all resources and add assigned resources to assignedResources array
    assignedResources = []
    Allresources = document.getElementsByClassName("resourceDisplay")
    for(i = 0; i < Allresources.length; i++){
      if(Allresources[i].getElementsByClassName("resourceCheckbox")[0].checked){
        assignedResources.push(Allresources[i].id)
      }
    }


    console.log(uploadedImage.path)
    const formdata = new FormData();
    formdata.append("file", uploadedImage);

    
    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow"
    };
    
    try {
      const response = await fetch("/upload", requestOptions)
      const result = await response.json()
      console.log(result.data.Location)
      productImage = result.data.Location;
    } catch (error) {
      console.error(error);
    };
    

    // imgResponse = await fetch("localhost:3000/upload", requestOptions)
    //   .then((response) => response.text())
    //   .then((result) => console.log(result))
    //   .catch((error) => console.error(error));

    //console.log(imgResponse)
      
    // try {
    //     const imageResponse = await fetch('/upload', uploadedImage);
    // } catch (error) {
    //   console.error(error.message);
    //   alert('Failed to add product');
    // }



    try {

      //if id is defined, send a put request to update product information
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
        console.log(await productResponse.json())
        if (!productResponse.ok) {
          throw new Error('Failed to Edit product');
        }
        console.log("Successfully Edited Product");
        
      //id is not defined, send a post request to create a new product
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
        console.log(await response.json())
        if (!response.ok) {
          throw new Error('Failed to add product');
        }
        console.log("Successfully added Product");
      }
    } catch (error) {
      console.error(error.message);
      alert('Failed to add product');
    }

    //location.href = "/admin/listings"
});

//creates an html element to represent a resource and adds the element to a specified resourceContainer
//
//resourceContainer: container to add the resource element to
//name: resource name
//resourceID: resource id
//ischecked: boolean to represent if the product has assigned this resource
function addResource(resourceContainer, name, resourceID, ischecked){
    
    //create html elements to represent a resource
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

    //append resource html element to given resource container
    resourceContainer.appendChild(resourceElement)
}

//loads all resources from database and calls addResource function to display them in the resourceContainer
//
//resourceContainer: html element which holds onto all resources
//activeResources: array that holds onto all resources currently coupled with the displayed product
async function loadResources(resourceContainer, activeResources) {

    // fetch all resources from the database
    try {
      const response = await fetch('/api/resources');
      if(!response.ok) {
        throw new Error('Failed to get resources form Database');
      }
      const resources = await response.json();

      //if company has no resources, display no resources message in container
      if(resources.length == 0){resourceContainer.innerHTML = "no resources added yet"}

      //iterate through all resources in database
      resources.forEach((resource) => {

        isChecked = false;
        if(activeResources != undefined){

          //iterate through all active resources
          for(i = 0; i < activeResources.length; i++){

            //if resource id from database is equal to a resource in active resources, set ischecked to true
            if(!isChecked){
              activeResources[i] == `${resource._id}` ? isChecked = true : isChecked = false
            }
          }
        }

        //call addResources function to display each resource in the resource container
        addResource(resourceContainer, `${resource.name}`, `${resource._id}`, isChecked)
      });
    } catch (error) {
      console.error(error.message);
      alert("Failed to Fetch resources")
    }
}
  
//checks to see if there is a product in the database which has the same id as the id provided in the url parameter
//and if so, update user input fields with product's information and update preview
async function findExistingService() {

    //fetch product by id from database
    try {
        const response = await fetch('/api/products/' + id);
        if(!response.ok) {
            throw new Error('Failed to get product from Database');
        }
        const product = await response.json();
        
        //call updatePreview method update preview object with product's information
        updatePreview(`${product.name}`, product.image, `${product.description}`, `${product.price}`)

        //set all form input fields to product's information
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



//when page loads, check to see if id is defined, and if so find the existing product and update preview
//if not, display a template preview
if(id == undefined){
    console.log("no service ID")
    document.getElementById("deleteButton").setAttribute("style", "visibility: hidden")
}else{
    displayTemplate = false
    findExistingService();
}
loadResources(resourceContainer)
if(displayTemplate == true){
    updatePreview("Service Name", "/img/cleaningThumbnail.jpg", "Description of the service", "1234")
}