const apiBaseUrl = "http://localhost:5263/api/Bikes/Get-All-bikes-With-Images";


fetchProducts();

async function fetchProducts() {
    const response = await fetch(apiBaseUrl);
    const products = await response.json();
    console.log(products);


    // Function to create bike box Element
    const createBikeBox = (bike) => `
<div class="bike-box">
                <p style='display:none';>${bike.bikeId}</p>
                <img src="${bike.bikeImages[0].imagePath}" alt="" class="box-img" />
                <div class="title-price">
                    <div class="title-data">
                        <h2>${bike.modal}</h2>
                        <p>${bike.type}</p>
                    </div>
                    <h3 class="bike-price">₹${bike.ratePerHour}<span>/hour</span></h3>
                </div>
                <a href="#" class="book-btn" onclick="fetchbikeById(${bike.bikeId})">Book Bike</a>
                <span class="tag">${bike.tag}</span>
            </div>

        
`;
    const bikeContent = document.querySelector(".bikes-content");
    // create bike box and show in bikecontent div
    products.forEach((bike) => {
        const bikeBoxHtml = createBikeBox(bike);
        bikeContent.insertAdjacentHTML("beforeend", bikeBoxHtml);
    });
}


// async function fetchbikeById(id) {
    
//     let confirmRent = document.getElementById('confirmRent')
//     confirmRent.style.display = "block"

//     const response = await fetch(`${apiBaseUrl}${id}`);
//     const bike = await response.json();
//     console.log(bike);
//     printConfirmRent(bike,confirmRent)
// }

// function printConfirmRent(bikeObj,rentalDiv){
//     //  rentalDiv.innerHTML = "";
//      console.log(bikeObj);     

//      rentalDiv.innerHTML =+ `
//      <div class="bike-box">
//      <p style='display:none';>${bikeObj.bikeId}</p>
//      <img src="${bikeObj.bikeImages[0].imagePath}" alt="" class="box-img" />
//      <div class="title-price">
//          <div class="title-data">
//              <h2>${bikeObj.modal}</h2>
//              <p>${bikeObj.type}</p>
//          </div>
//          <h3 class="bike-price">₹${bikeObj.ratePerHour}<span>/hour</span></h3>
//      </div>
//      <a href="#" class="book-btn" onclick="fetchbikeById(${bikeObj.bikeId})">Book Bike</a>
//      <span class="tag">${bikeObj.tag}</span>
//  </div>
//      `
// }

async function fetchbikeById(id) {
    let confirmRent = document.getElementById('confirmRent');
    confirmRent.style.display = "block";

    const response = await fetch(`${apiBaseUrl}/${id}`);
    const bike = await response.json();
    console.log(bike);
    printConfirmRent(bikeObj, rentalDiv);
}

function printConfirmRent(bikeObj, rentalDiv) {
    console.log(bikeObj);

    rentalDiv.innerHTML = `
    <div class="bike-box">
        <p style='display:none;'>${bikeObj.bikeId}</p>
        <img src="${bikeObj.bikeImages[0].imagePath}" alt="" class="box-img" />
        <div class="title-price">
            <div class="title-data">
                <h2>${bikeObj.modal}</h2>
                <p>${bikeObj.type}</p>
            </div>
            <h3 class="bike-price">₹${bikeObj.ratePerHour}<span>/hour</span></h3>
        </div>
    </div>
    `;
}





