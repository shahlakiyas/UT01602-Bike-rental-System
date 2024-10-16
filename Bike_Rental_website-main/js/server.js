const getAllBikesURL =
  "http://localhost:5263/api/Bikes/Get-All-bikes-With-Images";
fetchBikes();

const userNIC = "1";
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
      <h1>${bikeObj.brand}  ${bikeObj.modal}</h1>  
      <div class="row-items">
      <span class="closeModel">&times;</span>

      <span id="iconSpan"><img src="./images/27-513.webp" style="" /></span>
      <div>
        <img src="./images/bike-1.png" class="rent-img" />
        <span id="iconSpan"><img src="./images/27-512.webp" /></span>

        <div>
        <form>
          <label>Rent Date: </label>
          <input
            id="datepicker"
            onchange="checkDate()"
            required
            class="datepicker-input"
            type="date"
            required
          />
          <button  type="submit" class="btn RequestRentBtn" id="RequestRentBtn" data-index="${bikeObj.bikeId}">Request Rent</button>
        </form>
        </div>
        <br /><br />
      </div>

      <br />
    </div>

        
        <div id="showBikeRent" class="showBikeRent">

        </div>
        <br>        
      `;

  var closeSpan = document.getElementsByClassName("closeModel")[0];

  closeSpan.onclick = function () {
    confirmRent.style.display = "none";
  };

  console.log(bikeObj);

  let RequestRentBtn = document.getElementById("RequestRentBtn");
  RequestRentBtn.addEventListener("click", (event) => RentalRequest(event));
}

function checkDate() {
  var selectedText = document.getElementById("datepicker").value;
  var selectedDate = new Date(selectedText);
  var now = new Date();

  if (selectedDate < now) {
    alert("Date must be in the future");
  } else if (selectedText == "") {
    alert("Empty value");
  }
}

function RentalRequest(event) {
  event.preventDefault();
  let bikeId = event.target.getAttribute("data-index");
  let bike;
  returnBikeById();
  async function returnBikeById() {
    const response = await fetch(`${getAllBikesURL}${bikeId}`);
    if (response.ok) {
      await response.json().then((data) => {
        bike = data;
      });
      printDetails(bike);
    }
  }
}
function printDetails(bikeObj) {
  console.log(bikeObj);
  let showBikeRent = document.getElementById("showBikeRent");

  showBikeRent.innerHTML = "";
  showBikeRent.innerHTML += `
      <h3>Bike ID: ${bikeObj.bikeId}</h3>
      <p>Rent Price Per Hour : ${bikeObj.ratePerHour}</p>
      <button class="btn" id="confirmRent">Confirm Rent</button>
    `;

  let submitBtn = document.getElementById("confirmRent");
  submitBtn.addEventListener("click", (event) => getData(event, bikeObj));
}

function getData(event, bikeObj) {
  let datepicker = document.getElementById("datepicker").value;
  console.log(datepicker);
  console.log(bikeObj);
  let bikeID = bikeObj.bikeId;

  let rentalRequest = {
    datepicker,
    userNIC,
    bikeID,
  };
  console.log(rentalRequest);
}
