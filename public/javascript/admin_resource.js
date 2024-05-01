resourceCounter = 0;
resourceHolder = document.getElementById("modifyListingFormResourceHolder")


//saves a resource to the database given a resource id, if the resource already exists in the database,
//a put request is sent to edit the resource, otherwise a post request is sent to create the resource
//
//(Requirement 3.1.0) - creates a new company resource in database with new resource information
//(Requirement 3.2.0) - updates an existing resource with updated information
//
//rID: resource id to be saved
async function saveById(rID){

  //get resource html element and get all resource inputs
  resourceElement = document.getElementById(rID)
  resourceName = resourceElement.getElementsByClassName("resourceNameInput")[0].value;
  resourceAmount = resourceElement.getElementsByClassName("resourceAmountInput")[0].value;
  resourceStart = resourceElement.getElementsByClassName("resourceStartAvailability")[0].value;
  resourceEnd = resourceElement.getElementsByClassName("resourceEndAvailability")[0].value;

  //create day availability array to hold all days resource is available on
  resourceDayAvailability = []
  resourceElement.getElementsByClassName("dayCheckbox")[0].checked ? resourceDayAvailability[0] = true : resourceDayAvailability[0] = false
  resourceElement.getElementsByClassName("dayCheckbox")[1].checked ? resourceDayAvailability[1] = true : resourceDayAvailability[1] = false
  resourceElement.getElementsByClassName("dayCheckbox")[2].checked ? resourceDayAvailability[2] = true : resourceDayAvailability[2] = false
  resourceElement.getElementsByClassName("dayCheckbox")[3].checked ? resourceDayAvailability[3] = true : resourceDayAvailability[3] = false
  resourceElement.getElementsByClassName("dayCheckbox")[4].checked ? resourceDayAvailability[4] = true : resourceDayAvailability[4] = false
  resourceElement.getElementsByClassName("dayCheckbox")[5].checked ? resourceDayAvailability[5] = true : resourceDayAvailability[5] = false
  resourceElement.getElementsByClassName("dayCheckbox")[6].checked ? resourceDayAvailability[6] = true : resourceDayAvailability[6] = false

  //retrieve resource by id to see if resource already exists in database
  const ResourceIDresponse = await fetch('/api/resources/' + rID)
  
  try {
      //Send a PUT request to edit the resource if resource already exists in database
      if(ResourceIDresponse.ok){
        const response = await fetch('/api/resources/' + rID, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            name: resourceName,
            totalQuantity: resourceAmount,
            availableQuantity: resourceAmount,
            availability: resourceDayAvailability,

            start: resourceStart,
            end: resourceEnd,
            recurrence: "test"
          })
        });
        if (!response.ok) {
          throw new Error('Failed to Edit resource');
        }

        console.log("Successfully Edited resource");

      // Send a POST request to add the resource if resource is not found in database
      }else{
        const response = await fetch('/api/resources', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({ 
            name: resourceName,
            totalQuantity: resourceAmount,
            availableQuantity: resourceAmount,
            availability: resourceDayAvailability,

            start: resourceStart,
            end: resourceEnd,
            recurrence: "test"
          })
        });
        if (!response.ok) {
          throw new Error('Failed to add resource');
        }

        console.log("Successfully added resource");
      }
    } catch (error) {
      console.error(error.message);
      alert('Failed to add resource');
    }
}


//functionality for the save button to save all resources on page to database
//
//(Requirement 3.4.0) - calls saveById() function to save all resources
//
document.getElementById("saveResources").addEventListener("click", async function(){
  
  //get all resources on page and store them in array
  allResources = document.getElementsByClassName("resourceElement")

  //save all resource from page by calling saveById function
  for(i = 0; i < allResources.length; i++){
      await saveById(allResources[i].id)
  }

  location.href = "/admin/dashboard"
});


//creates an html element to hold all relevent resource information and displays it on the page
//
//(Requirement 3.0.0) - creates html element to represent resource and displays it for user
//(Requirement 3.3.0) - adds delete button to resource element to delete resource from database
//
//wrapper: container to store resource html element in
//id: resource id
//name: resource name
//amount: resource amount
//dayAvailability: resource availablilty on each day, boolean array for sunday-saturday
//startTime: resource availablilty start time
//endTime: resource availablilty end time
function addResource(wrapper, id, name, amount, dayAvailability, startTime, endTime){

    //creating resource element
    resourceElement = document.createElement("div")
    resourceCounter++
    resourceElement.setAttribute("id", id)
    resourceElement.setAttribute("class", "resourceElement")
    wrapper.appendChild(resourceElement)

    //input box for resource name
    resourceNameBox = document.createElement("input")
    resourceNameBox.setAttribute("type", "text")
    resourceNameBox.setAttribute("style", "width: 30%;")
    if(name != undefined){
        resourceNameBox.setAttribute("value", name)
    }else{
        resourceNameBox.setAttribute("placeholder", "Resource Name")
    }
    resourceNameBox.setAttribute("class", "resourceNameInput")
    resourceElement.appendChild(resourceNameBox)


    //resource amount label and input box
    amountHolder = document.createElement("div")
    amountHolder.setAttribute("style", "width: 10%;")
    //resource amount label
    amountText = document.createElement("div")
    amountText.innerHTML = "amount:";
    amountHolder.appendChild(amountText)
    //resources amount input box
    amountInput = document.createElement("input")
    amountInput.setAttribute("type", "number")
    amountInput.setAttribute("min", "1")
    if(amount != undefined){
        amountInput.setAttribute("value", amount)
    }else{
        amountInput.setAttribute("value", "1")
    }
    amountInput.setAttribute("class", "resourceAmountInput")
    amountHolder.appendChild(amountInput)
    resourceElement.appendChild(amountHolder);

    //day availablitiy of resource
    daysWrapper = document.createElement("div")
    daysWrapper.setAttribute("class", "daysWrapper")
    //sunday wrapper for sunday label and checkbox
    sundayWrapper = document.createElement("div")
    sunday = document.createElement("div")
    sunday.setAttribute("class", "dayLetter")
    sunday.innerHTML = "S"
    sundayCheckBox = document.createElement("input")
    sundayCheckBox.setAttribute("type", "checkbox")
    sundayCheckBox.setAttribute("class", "dayCheckbox")
    if(dayAvailability != undefined){
        if(dayAvailability[0]){sundayCheckBox.setAttribute("checked", "true")}
    }
    sundayWrapper.appendChild(sunday)
    sundayWrapper.appendChild(sundayCheckBox)
    daysWrapper.appendChild(sundayWrapper)
    //monday wrapper for monday label and checkbox
    mondayWrapper = document.createElement("div")
    monday = document.createElement("div")
    monday.setAttribute("class", "dayLetter")
    monday.innerHTML = "M"
    mondayCheckBox = document.createElement("input")
    mondayCheckBox.setAttribute("type", "checkbox")
    mondayCheckBox.setAttribute("class", "dayCheckbox")
    if(dayAvailability != undefined){
        if(dayAvailability[1]){mondayCheckBox.setAttribute("checked", "true")}
    }
    mondayWrapper.appendChild(monday)
    mondayWrapper.appendChild(mondayCheckBox)
    daysWrapper.appendChild(mondayWrapper)
    //tuesday wrapper for tuesday label and checkbox
    tuesdayWrapper = document.createElement("div")
    tuesday = document.createElement("div")
    tuesday.setAttribute("class", "dayLetter")
    tuesday.innerHTML = "T"
    tuesdayCheckBox = document.createElement("input")
    tuesdayCheckBox.setAttribute("type", "checkbox")
    tuesdayCheckBox.setAttribute("class", "dayCheckbox")
    if(dayAvailability != undefined){
        if(dayAvailability[2]){tuesdayCheckBox.setAttribute("checked", "true")}
    }
    tuesdayWrapper.appendChild(tuesday)
    tuesdayWrapper.appendChild(tuesdayCheckBox)
    daysWrapper.appendChild(tuesdayWrapper)
    //wednesday wrapper for wednesday label and checkbox
    wednesdayWrapper = document.createElement("div")
    wednesday = document.createElement("div")
    wednesday.setAttribute("class", "dayLetter")
    wednesday.innerHTML = "W"
    wednesdayCheckBox = document.createElement("input")
    wednesdayCheckBox.setAttribute("type", "checkbox")
    wednesdayCheckBox.setAttribute("class", "dayCheckbox")
    if(dayAvailability != undefined){
        if(dayAvailability[3]){wednesdayCheckBox.setAttribute("checked", "true")}
    }
    wednesdayWrapper.appendChild(wednesday)
    wednesdayWrapper.appendChild(wednesdayCheckBox)
    daysWrapper.appendChild(wednesdayWrapper)
    //thursday wrapper for thursday label and checkbox
    thursdayWrapper = document.createElement("div")
    thursday = document.createElement("div")
    thursday.setAttribute("class", "dayLetter")
    thursday.innerHTML = "T"
    thursdayCheckBox = document.createElement("input")
    thursdayCheckBox.setAttribute("type", "checkbox")
    thursdayCheckBox.setAttribute("class", "dayCheckbox")
    if(dayAvailability != undefined){
        if(dayAvailability[4]){thursdayCheckBox.setAttribute("checked", "true")}
    }
    thursdayWrapper.appendChild(thursday)
    thursdayWrapper.appendChild(thursdayCheckBox)
    daysWrapper.appendChild(thursdayWrapper)
    //friday wrapper for friday label and checkbox
    fridayWrapper = document.createElement("div")
    friday = document.createElement("div")
    friday.setAttribute("class", "dayLetter")
    friday.innerHTML = "F"
    fridayCheckBox = document.createElement("input")
    fridayCheckBox.setAttribute("type", "checkbox")
    fridayCheckBox.setAttribute("class", "dayCheckbox")
    if(dayAvailability != undefined){
        if(dayAvailability[5]){fridayCheckBox.setAttribute("checked", "true")}
    }
    fridayWrapper.appendChild(friday)
    fridayWrapper.appendChild(fridayCheckBox)
    daysWrapper.appendChild(fridayWrapper)
    //saturday wrapper for saturday label and checkbox
    saturdayWrapper = document.createElement("div")
    saturday = document.createElement("div")
    saturday.setAttribute("class", "dayLetter")
    saturday.innerHTML = "S"
    saturdayCheckBox = document.createElement("input")
    saturdayCheckBox.setAttribute("type", "checkbox")
    saturdayCheckBox.setAttribute("class", "dayCheckbox")
    if(dayAvailability != undefined){
        if(dayAvailability[6]){saturdayCheckBox.setAttribute("checked", "true")}
    }
    saturdayWrapper.appendChild(saturday)
    saturdayWrapper.appendChild(saturdayCheckBox)
    daysWrapper.appendChild(saturdayWrapper)
    resourceElement.appendChild(daysWrapper);

    //start and end time input
    TimeWrapper = document.createElement("div")
    TimeWrapper.setAttribute("class", "timeWrapper")
    //start time label
    startLabel = document.createElement("label")
    startLabel.innerHTML = "Start:"
    TimeWrapper.appendChild(startLabel)
    //start time input
    startInput = document.createElement("input")
    startInput.setAttribute("type", "time")
    startInput.setAttribute("class", "resourceStartAvailability")
    if(startTime != undefined){
        startInput.setAttribute("value", startTime)
    }
    TimeWrapper.appendChild(startInput)
    TimeWrapper.innerHTML += "<br><br>"
    //end time label
    endLabel = document.createElement("label")
    endLabel.innerHTML = "End:"
    TimeWrapper.appendChild(endLabel)
    //end time input
    endInput = document.createElement("input")
    endInput.setAttribute("type", "time")
    endInput.setAttribute("class", "resourceEndAvailability")
    if(endTime != undefined){
        endInput.setAttribute("value", endTime)
    }
    TimeWrapper.appendChild(endInput)
    resourceElement.appendChild(TimeWrapper)

    //delete button
    deleteWrapper = document.createElement("div")
    deleteWrapper.setAttribute("class", "deleteWrapper")
    //delete button
    deleteButton = document.createElement("button")
    deleteButton.setAttribute("class", "deleteButton")
    deleteButton.setAttribute("type", "button")
    deleteButton.setAttribute("parentId", id)

    //delete button functionality deletes resource from page and resource when clicked
    deleteButton.addEventListener("click", async function(){
        
        //call delete function on resource in database
        try {
            const response = await fetch('/api/resources/' + this.getAttribute("parentId"), {
                method: 'DELETE'
            });

        } catch (error) {
            console.error(error.message);
        }    
        document.getElementById(this.getAttribute("parentId")).remove()
    });

    //remove resource html element on page
    deleteWrapper.appendChild(deleteButton)
    resourceElement.appendChild(deleteWrapper)
}


//functionality for add resource button, calls addResource function to create a new blank resource html object on page
//
//(Requirement 3.1.0) - creates a new company resource
//
document.getElementById("addResource").addEventListener('click', async function(){

    //increment amount of temporary resources on page
    resourceCounter++;

    //call addResource function to add new resource to resourceHolder with a unique temporary id
    addResource(resourceHolder, "temp" + resourceCounter)
});


//gets all resources from the database and calls addResource function to create a new resource html element for each resource in database
//
//(Requirement 3.0.0) - calls addResources to display all company resources
//
async function displayResources() {

    // fetch all resources from the database
    try {
      const response = await fetch('/api/resources');
      if(!response.ok) {
        throw new Error('Failed to get resources form Database');
      }
      const resources = await response.json();

      //iterate through all resources in database
      resources.forEach((resource) => {

        //call addResource method to create resource html object
        addResource(resourceHolder, `${resource._id}`, `${resource.name}`, `${resource.totalQuantity}`, resource.availability, `${resource.start}`, `${resource.end}`)
      });

    } catch (error) {
      console.error(error.message);
      alert("Failed to Fetch resources")
    }
}

displayResources();