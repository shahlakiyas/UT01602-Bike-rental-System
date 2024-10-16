const getAllBikesURL = "http://localhost:5263/api/Bikes/Get-All-bikes-With-Images"
fetchBikes();
async function fetchBikes() {

  const response = await fetch(getAllBikesURL);
  const bikes = await response.json();
  console.log(bikes);

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
                <button id="book-btn" class="book-btn" data-index=${bike.bikeId}>Book Bike</button>
                <span class="tag">${bike.tag}</span>
            </div>
`;
  const bikeContent = document.querySelector(".bikes-content");
  // create bike box and show in bikecontent div
  bikes.forEach((bike) => {
    const bikeBoxHtml = createBikeBox(bike);
    bikeContent.insertAdjacentHTML("beforeend", bikeBoxHtml);
  });
  let confirmRent = document.getElementById("confirmRent");
var bookBtn = document.getElementById("book-btn");
console.log(bookBtn);
// var closeSpan = document.getElementsByClassName("closeModel")[0];

// bookBtn.onclick = function() {
//     confirmRent.style.display = "block";
// }

bookBtn.addEventListener("click", (event) => displayRentalModal(event));
function displayRentalModal(event) {
  confirmRent.style.display = "block";
  //console.log(event);
  let bikeId = event.target.getAttribute("data-index");
  console.log(bikeId);
  fetchbikeById(bikeId);
}
}



// closeSpan.onclick = function() {
//     confirmRent.style.display = "none";
// }

window.onclick = function (event) {
  if (event.target == confirmRent) {
    confirmRent.style.display = "none";
  }
};

async function fetchbikeById(id) {
   const response = await fetch(`${getAllBikesURL}${id}`);
   const bike = await response.json();
  console.log(bike);
  let modelContent = document.getElementById("modelContent");
  printConfirmRent(bike, modelContent);
}

function printConfirmRent(bikeObj, rentalDiv) {
  rentalDiv.innerHTML = "";
  rentalDiv.innerHTML += `
            
        
        <div class="bike-box">
        <div class="closeModel">&times;</div>
        <p>Hello customer</p>
        <img src="${bikeObj.bikeImages[0].imagePath}" alt="" class="rent-img""/>    
        </div> 
      `;
  var closeSpan = document.getElementsByClassName("closeModel")[0];

  closeSpan.onclick = function () {
    confirmRent.style.display = "none";
  };

  console.log(bikeObj);
}

 



