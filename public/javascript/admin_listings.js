activeListingContainer = document.getElementById("activelistingsWrapper");
inactiveListingContainer = document.getElementById("inactivelistingsWrapper")

//function used to create html element with product listing information and add it to a specified container
//
//container: html container to append the product listing to
//service: product name
//image: product image path
//description: product discription
//price: product price
//serviceID: product id
function addService(container, service, image, description, price, priceType, productID){
    
    //create product listing html element with given product information
    let listing = document.createElement("div")
    listing.setAttribute("class", "listing")

    let img = document.createElement("img")
    img.setAttribute("src", image)
    img.setAttribute("style", "width: 100%; height: 100%;")
    listing.appendChild(img)

    let NameBox = document.createElement("div")
    NameBox.innerHTML = service;
    NameBox.setAttribute("style", "text-align: center; font-size: 150%; overflow:hidden;")
    listing.appendChild(NameBox)

    let descriptionBox = document.createElement("div")
    descriptionBox.innerHTML = description;
    descriptionBox.setAttribute("style", "text-align: center; overflow: auto")
    listing.appendChild(descriptionBox)

    let priceBox = document.createElement("div")
    priceBox.innerHTML = '$' + price;
    switch(priceType){
      case("Per Hour"):
        priceBox.innerHTML += "/Hour"
        break
      case("Per Day"):
        priceBox.innerHTML += "/Day"
        break
    }
    priceBox.setAttribute("style", "text-align: center;")
    listing.appendChild(priceBox)

    let wrapper = document.createElement("div")
    wrapper.setAttribute("class", "gridBox")
    wrapper.setAttribute("productID", productID)
    wrapper.appendChild(listing)

    //event listener to redirect to modify listing page when user clicks on product
    wrapper.addEventListener("click", function() {
        location.href = '/admin/modify_listing?serviceID=' + productID;
    })

    //append product listing to container
    container.appendChild(wrapper)
}

//displays all products from the database on the page
async function displayProducts() {
    //clear active and inactive containers
    activeListingContainer.innerHTML = '';
    inactiveListingContainer.innerHTML = '';

    // fetch all products from the database
    try {
      const response = await fetch('/api/products');
      if(!response.ok) {
        throw new Error('Failed to get products form Database');
      }
      const products = await response.json();

      //for all products in database
      products.forEach((product) => {
        
        //add product to active or inactive listing container based on product display field
        addService((product.display == true ? activeListingContainer : inactiveListingContainer), `${product.name}`, "/img/cleaningthumbnail.jpg", `${product.description}`, `${product.price}`, `${product.priceType}`, `${product._id}`);
      });

    } catch (error) {
      console.error(error.message);
      alert("Failed to Fetch products")
    }
  }

  displayProducts();