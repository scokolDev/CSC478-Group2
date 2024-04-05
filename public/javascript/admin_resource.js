resourceCounter = 0;
function addResource(wrapper, id, name, amount, dayAvailability, startTime, endTime){

    resourceElement = document.createElement("div")
    resourceCounter++
    resourceElement.setAttribute("id", id)
    resourceElement.setAttribute("class", "resourceElement")
    wrapper.appendChild(resourceElement)


    resourceNameBox = document.createElement("input")
    resourceNameBox.setAttribute("type", "text")
    resourceNameBox.setAttribute("style", "width: 30%;")
    if(name != undefined){
        resourceNameBox.setAttribute("value", name)
    }else{
        resourceNameBox.setAttribute("placeholder", "Resource Name")
    }
    resourceNameBox.setAttribute("id", "name" + id)
    resourceElement.appendChild(resourceNameBox)

    amountHolder = document.createElement("div")
    amountHolder.setAttribute("style", "width: 10%;")
    amountText = document.createElement("div")
    amountText.innerHTML = "amount:";
    amountHolder.appendChild(amountText)

    amountInput = document.createElement("input")
    amountInput.setAttribute("type", "number")
    amountInput.setAttribute("min", "1")
    if(amount != undefined){
        amountInput.setAttribute("value", amount)
    }else{
        amountInput.setAttribute("value", "1")
    }
    amountInput.setAttribute("id", "amount" + id)
    amountInput.setAttribute("class", "numBox")
    amountHolder.appendChild(amountInput)
    resourceElement.appendChild(amountHolder);


    daysWrapper = document.createElement("div")
    daysWrapper.setAttribute("class", "daysWrapper")
    
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
    sundayCheckBox.setAttribute("id", "sunday" + id)
    sundayWrapper.appendChild(sunday)
    sundayWrapper.appendChild(sundayCheckBox)
    daysWrapper.appendChild(sundayWrapper)

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
    mondayCheckBox.setAttribute("id", "monday" + id)
    mondayWrapper.appendChild(monday)
    mondayWrapper.appendChild(mondayCheckBox)
    daysWrapper.appendChild(mondayWrapper)

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
    tuesdayCheckBox.setAttribute("id", "tuesday" + id)
    tuesdayWrapper.appendChild(tuesday)
    tuesdayWrapper.appendChild(tuesdayCheckBox)
    daysWrapper.appendChild(tuesdayWrapper)

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
    wednesdayCheckBox.setAttribute("id", "wednesday" + id)
    wednesdayWrapper.appendChild(wednesday)
    wednesdayWrapper.appendChild(wednesdayCheckBox)
    daysWrapper.appendChild(wednesdayWrapper)

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
    thursdayCheckBox.setAttribute("id", "thursday" + id)
    thursdayWrapper.appendChild(thursday)
    thursdayWrapper.appendChild(thursdayCheckBox)
    daysWrapper.appendChild(thursdayWrapper)

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
    fridayCheckBox.setAttribute("id", "friday" + id)
    fridayWrapper.appendChild(friday)
    fridayWrapper.appendChild(fridayCheckBox)
    daysWrapper.appendChild(fridayWrapper)

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
    saturdayCheckBox.setAttribute("id", "saturday" + id)
    saturdayWrapper.appendChild(saturday)
    saturdayWrapper.appendChild(saturdayCheckBox)
    daysWrapper.appendChild(saturdayWrapper)

    resourceElement.appendChild(daysWrapper);

    TimeWrapper = document.createElement("div")
    TimeWrapper.setAttribute("class", "timeWrapper")

    startLabel = document.createElement("label")
    startLabel.innerHTML = "Start:"
    TimeWrapper.appendChild(startLabel)

    startInput = document.createElement("input")
    startInput.setAttribute("type", "time")
    if(startTime != undefined){
        startInput.setAttribute("value", startTime)
    }
    startInput.setAttribute("id", "start" + id)
    TimeWrapper.appendChild(startInput)
    TimeWrapper.innerHTML += "<br><br>"

    endLabel = document.createElement("label")
    endLabel.innerHTML = "End:"
    TimeWrapper.appendChild(endLabel)

    endInput = document.createElement("input")
    endInput.setAttribute("type", "time")
    if(endTime != undefined){
        endInput.setAttribute("value", endTime)
    }
    endInput.setAttribute("id", "end" + id)
    TimeWrapper.appendChild(endInput)

    resourceElement.appendChild(TimeWrapper)


    deleteWrapper = document.createElement("div")
    deleteWrapper.setAttribute("class", "deleteWrapper")
    deleteButton = document.createElement("button")
    deleteButton.setAttribute("class", "deleteButton")
    deleteButton.setAttribute("type", "button")
    deleteButton.setAttribute("parentId", id)
    deleteButton.addEventListener("click", async function(){
        console.log(this.getAttribute("parentId"))
        try {
            const response = await fetch('/api/resources/' + this.getAttribute("parentId"), {
                method: 'DELETE'
            });
            if(!response.ok) {
                throw new Error('Failed to find resource in Database');
            }
        
        } catch (error) {
            console.error(error.message);
            alert("Failed to delete resource")
        }    
        document.getElementById(this.getAttribute("parentId")).remove()
    });
    deleteWrapper.appendChild(deleteButton)

    saveButton = document.createElement("button")
    saveButton.setAttribute("class", "deleteButton")
    saveButton.setAttribute("type", "button")
    saveButton.setAttribute("parentId", id)
    saveButton.addEventListener("click", async function(){
        resourceId = this.getAttribute("parentId");
        resourceName = document.getElementById("name" + resourceId).value;
        resourceAmount = document.getElementById("amount" + resourceId).value;
        resourceDayAvailability = []
        if(document.getElementById("sunday" + resourceId).checked){resourceDayAvailability[0] = true}
        if(document.getElementById("monday" + resourceId).checked){resourceDayAvailability[1] = true}
        if(document.getElementById("tuesday" + resourceId).checked){resourceDayAvailability[2] = true}
        if(document.getElementById("wednesday" + resourceId).checked){resourceDayAvailability[3] = true}
        if(document.getElementById("thursday" + resourceId).checked){resourceDayAvailability[4] = true}
        if(document.getElementById("friday" + resourceId).checked){resourceDayAvailability[5] = true}
        if(document.getElementById("saturday" + resourceId).checked){resourceDayAvailability[6] = true}
        resourceStart = document.getElementById("start" + resourceId).value;
        resourceEnd = document.getElementById("end" + resourceId).value;

        try {
            // Send a PUT request to edit the resource
            if(id.substring(0, 4) != "temp"){
              const productResponse = await fetch('/api/resources/' + resourceId, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                  name: resourceName,
                  totalQuantity: resourceAmount,
                  availableQuantity: resourceAmount,
                  dayAvailability: resourceDayAvailability,
                  start: resourceStart,
                  end: resourceEnd,
                  
                  availability: Date.now(),
                  recurrence: "test"
                })
              });
              if (!productResponse.ok) {
                throw new Error('Failed to Edit resource');
              }
              // If product edited successfully, fetch and render the updated schedule
              console.log("Successfully Edited resource");
      
      
            // Send a POST request to add the resource
            }else{
              const response = await fetch('/api/resources', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                  name: resourceName,
                  totalQuantity: resourceAmount,
                  availableQuantity: resourceAmount,
                  dayAvailability: resourceDayAvailability,
                  start: resourceStart,
                  end: resourceEnd,
                  
                  availability: Date.now(),
                  recurrence: "test"
                })
              });
              if (!response.ok) {
                throw new Error('Failed to add resource');
              }
        
              // If product added successfully, fetch and render the updated schedule
              console.log("Successfully added resource");
            }
            
          } catch (error) {
            console.error(error.message);
            alert('Failed to add product');
          }
    });
    deleteWrapper.appendChild(saveButton)
    resourceElement.appendChild(deleteWrapper)
}


resourceHolder = document.getElementById("modifyListingFormResourceHolder")
document.getElementById("addResource").addEventListener('click', async (event) => {
    addResource(resourceHolder, "test", "computer Room", 23, [true, false, false, false, true, false, true], "13:00", "17:00")
    resourceCounter++;
    addResource(resourceHolder, "temp" + resourceCounter)
});


async function displayResources() {
    try {
      // fetch all resources from the database
      const response = await fetch('/api/resources');
      if(!response.ok) {
        throw new Error('Failed to get resources form Database');
      }

      const resources = await response.json();
      resources.forEach((resource) => {
        addResource(resourceHolder, `${resource._id}`, `${resource.name}`, `${resource.totalQuantity}`, resource.dayAvailability, `${resource.start}`, `${resource.end}`)
      });
    } catch (error) {
      console.error(error.message);
      alert("Failed to Fetch resources")
    }
  }

  displayResources();