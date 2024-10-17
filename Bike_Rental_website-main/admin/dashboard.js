document.querySelectorAll(".sidebar ul li a").forEach((link) => {
  link.addEventListener("click", function () {
    document.querySelectorAll(".sidebar ul li a").forEach((item) => {
      item.classList.remove("active");
    });
    this.classList.add("active");
  });
});

const BikesWithUnitsURL = "http://localhost:5263/api/Bikes/Get-All-bikes-With-Images";
const GetAllUsersURL = "http://localhost:5263/api/User/Get-All-Users";
const GetALLRentalRequestsURL = "http://localhost:5263/api/RentalRequest";
const GetRequestsForPortalURL = "http://localhost:5263/api/RentalRecord/Get-Records-For-Portal";
const GetRequestsForReturnURL = "http://localhost:5263/api/RentalRecord/Get-Records-For-Return";
const UpdateOnRentalOutURL = "http://localhost:5263/api/RentalRecord/Update-Rental-Out";
const UpdateonRentalReturnURL = "http://localhost:5263/api/RentalRecord/Complete-Rental-Record";
const GetAllRentalRecordsURL = "http://localhost:5263/api/RentalRecord/Get-Rental-records";
const PostBikeURL = "http://localhost:5263/api/Bikes";
const InventoryCreateURL = "http://localhost:5263/api/Inventory/Create-Inventory-Item";
const GetRentalRecordsURL = "http://localhost:5263/api/RentalRecord/Get-Rental-records";


//* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content - This allows the user to have multiple dropdowns without any conflict */
var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}

let dispalySection = document.getElementById("dispalySection");
let dispalySectionHead = document.getElementById("dispalySectionHead");
let dispalySectionBody = document.getElementById("dispalySectionBody");


let addModalBtn = document.getElementById("addModalBtn");
addModalBtn.addEventListener("click", () => {
  addBikeModalFunctions();
});

let viewBikesBtn = document.getElementById("viewBikes");
viewBikesBtn.addEventListener("click", displayBikes);

let viewCustomersBtn = document.getElementById('viewCustomers');
viewCustomersBtn.addEventListener('click', displayCustomers)

let viewRentalRequestsBtn = document.getElementById('viewRentalRequests');
viewRentalRequestsBtn.addEventListener('click', displayRentalRequests)

let viewRentalPortalBtn = document.getElementById('viewRentalPortal');
viewRentalPortalBtn.addEventListener('click', displayRentalPortal)

let viewRentalReturnsBtn = document.getElementById('viewRentalReturns');
viewRentalReturnsBtn.addEventListener('click', displayRentalReturns)

let viewRentalRecordsBtn = document.getElementById('viewRentalRecords');
viewRentalRecordsBtn.addEventListener('click', displayRentalRecords)

let bikeImg;

function addBikeModalFunctions() {
  const modal = document.getElementById("addBikeModal");
  modal.style.display = "block";
  const closeBtn = document.getElementById("addBikesClose");

  let addBikeForm = document.getElementById('addBikeForm');
  console.log(addBikeForm);
  addBikeForm.addEventListener('submit', (event) => {

    postBike(event)
  });
  const bikeImageInput = document.getElementById("bikeImage");
  bikeImageInput.addEventListener('change', (event) => getInputImage(event))
  closeBtn.onclick = function () {
    modal.style.display = "none";
  };
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}


// Fetch API to add bikes and required images
async function postBike(event) {
  event.preventDefault();
  const bikeBrand = document.getElementById('bikeBrand').value;
  const bikeType = document.getElementById('bikeType').value;
  const bikeModel = document.getElementById('bikeModel').value;
  const ratePerHour = document.getElementById('ratePerHour').value;
  console.log(bikeImg);
  let bike = {
    brand: bikeBrand,
    type: bikeType,
    modal: bikeModel,
    ratePerHour: ratePerHour
  }

  const response = await fetch(PostBikeURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bike)
  });
  console.log(response)
  let responseBikeId = null
  if (response.ok) {
    await response.json().then(data => {
      responseBikeId = data.id;
    })
    postImage(responseBikeId)
  }

  async function postImage(resposeBikeId) {
    let image = {
      imagePath: bikeImg,
      bikeId: resposeBikeId
    }
    if (resposeBikeId != null) {
      const response2 = await fetch("http://localhost:5263/api/Images/Add-Image", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(image)
      });
      console.log(response2)

      if (response2.ok) {
        response2.json().then(data => {
          console.log(data);
        });
      }

    } else {
      alert("error")
    }
  }
}

//Function to convert file image to Base64 string
function getInputImage(event) {

  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function (e) {
    console.log(e.target.result);
    bikeImg = e.target.result;
  };
  reader.readAsDataURL(file);

}

//fetch API get method to retrive bikes
async function displayBikes() {

  const response = await fetch(BikesWithUnitsURL);
  const bikes = await response.json();

  console.log(bikes);
  dispalySectionHead.innerHTML = "";
  dispalySectionHead.innerHTML = `
  <th>ID</th>
        <th>Brand</th>
        <th>Model</th>
        <th>Type</th>
        <th>Rate per Hour</th>
        <th>Actions</th>
    `;

  dispalySectionBody.innerHTML = "";
  bikes.forEach((bike) => {
    dispalySectionBody.innerHTML += `
            <tr>
            <td>${bike.bikeId}</td>
                <td>${bike.brand}</td>
                <td>${bike.modal}</td>
                <td>${bike.type}</td>
                <td>${bike.ratePerHour}</td> 
                <td>
                    <button type="button" id="addUnitsBtn" data-index="${bike.bikeId}">Add</button>
                    <button type="button">Edit</button>
                    <button type="button">Delete</button>
                </td>
            </tr>
        `;
  });

  dispalySectionBody.addEventListener("click", (event) => {
    if (event.target.getAttribute("id") == "addUnitsBtn") {
      addUnitsModalFunctions(event); //Modal Display
    }
  })

}


// Add units to bike modal functions

function addUnitsModalFunctions(event) {
  let addUnitsModal = document.getElementById("addUnitsModal");
  addUnitsModal.style.display = "block";
  const bikeId = event.target.getAttribute("data-index");
  fetchbikeById(bikeId);
  let addUnitsClose = document.getElementById("addUnitsClose");
  addUnitsClose.onclick = function () {
    addUnitsModal.style.display = "none";
  };
  window.onclick = function (event) {
    if (event.target == addUnitsModal) {
      addUnitsModal.style.display = "none";
    }
  };
}


//fetch API get METHOD 
async function fetchbikeById(id) {
  const response = await fetch(`${BikesWithUnitsURL}${id}`);
  const bike = await response.json();

  console.log(bike);

  let AddbikeViewPage = document.getElementById("AddbikeViewPage"); //Add bike id defind

  console.log("Add Bikes: " + AddbikeViewPage);
  AddbikeViewPage.innerHTML = "";

  AddbikeViewPage.innerHTML += `
      <h3>${bike.brand} ${bike.type} ${bike.modal}</h3>
      <table id="unitsTable">
      <thead>
      <tr>
          <th>Registration Number</th>
          <th>Year of manufacture</th>
      </tr> 
      </thead>`

  let tableBody = document.createElement('tbody');
  tableBody.setAttribute('id', "unitsTBody")
  let table = document.getElementById('unitsTable');

  bike.units.forEach(element => {
    tableBody.innerHTML += `
      <tr>
      <td>${element.registrationNumber}</td>
      <td>${element.yearOfManufacture}</td>
      </tr>  
      `
  });
  table.append(tableBody);



  generateRows(id);
}

// function to generate rows on each submission
function generateRows(id) {
  let formDiv = document.getElementById('AddtoInventory');
  formDiv.innerHTML = `<form id="unitsForm">
  <input type="text"  placeholder="Enter Registration number" class="add-units-input" id="regNo" required />
  <input type="text" placeholder="Enter Manufacture year" class="add-units-input" id="manufacturedYear" required />
  <button type="submit" class="btn2">Add</button>
  </form>`

  let unitsForm = document.getElementById('unitsForm');
  unitsForm.addEventListener('submit', (event) => {

    addUnitsToBike(event, id)
  })
}


//Post  method to add units
async function addUnitsToBike(event, unitBikeId) {
  event.preventDefault();
  console.log(event.target);
  let regNo = document.getElementById('regNo').value;
  let manufacturedYear = document.getElementById('manufacturedYear').value;

  let bikeUnit = {
    registrationNumber: regNo,
    yearOfManufacture: manufacturedYear,
    bikeId: unitBikeId
  }
  const response = await fetch(InventoryCreateURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bikeUnit)
  });
  console.log(response)
  if (response.ok) {
    await response.json().then(data => {
      console.log(data);

      let tBody = document.getElementById('unitsTBody');
      let row = document.createElement('tr');
      row.innerHTML = `<td>${data.registrationNumber}</td>
    <td>${data.yearOfManufacture}</td>`;
      tBody.appendChild(row);
      generateRows(unitBikeId)
    })
  }

}

async function displayCustomers() {
  console.log('hello customers');

  const response = await fetch(GetAllUsersURL);
  const users = await response.json();
  console.log(users);
  dispalySectionHead.innerHTML = "";
  dispalySectionHead.innerHTML = `<th>N.I.C Number</th>
  <th>Full Name</th>
  <th>Email</th>
  <th>Contact No</th>
  <th>Address</th>
  <th>Password</th>`


  dispalySectionBody.innerHTML = "";
  users.forEach((user) => {
    dispalySectionBody.innerHTML += `
            <tr>
                <td>${user.nicNumber}</td>
                <td>${user.firstName} ${user.lastName}</td>
                <td>${user.email}</td>
                <td>${user.contactNo}</td> 
                <td>${user.address}</td>
                <td>${user.password}</td>
                <td>
                    <button type="button" id="" data-index="${user.bikeId}">Add</button>
                    <button type="button">Edit</button>
                    <button type="button">Delete</button>
                </td>
            </tr>
        `;
  });

}

async function displayRentalRequests() {

  console.log('hello rental requests')
  const response = await fetch(GetALLRentalRequestsURL);
  const rentalRequests = await response.json();

  dispalySectionHead.innerHTML = "";
  dispalySectionHead.innerHTML =
    `
 <th>Rental Id</th>
 <th>Request Time</th>
 <th>Status</th>
 <th>Bike Id</th>
 <th>User Nic Number</th>
 <th>Action</th>
 `


  dispalySectionBody.innerHTML = "";
  rentalRequests.forEach((rentalRequest) => {
    dispalySectionBody.innerHTML += `
           <tr>
               <td>${rentalRequest.rentalId}</td>
               <td>${rentalRequest.requestTime}</td>
               <td>${rentalRequest.status}</td>
               <td>${rentalRequest.bikeId}</td> 
               <td>${rentalRequest.nicNumber}</td>
               <td>
                   <button type="button" id="" data-index="${rentalRequest.bikeId}">Add</button>
                   <button type="button">Edit</button>
                   <button type="button">Delete</button>
               </td>
           </tr>
       `;
  });
}

async function displayRentalPortal() {
  console.log('hello rental portal')
  const response = await fetch(GetRequestsForPortalURL);
  const rentalsPortal = await response.json();

  dispalySectionHead.innerHTML = "";
  dispalySectionHead.innerHTML = `
 <th>Request Time</th>
 <th>Bike Id</th>
 <th>Nic Number</th>
 <th>Record Id</th>
 <th>Action</th>
 `


  dispalySectionBody.innerHTML = "";
  rentalsPortal.forEach((rentalPortal) => {
    dispalySectionBody.innerHTML += `
           <tr>
               <td>${rentalPortal.requestTime}</td>
               <td>${rentalPortal.bikeId}</td> 
               <td>${rentalPortal.nicNumber}</td>
               <td>${rentalPortal.recordId}</td>
               <td>
                   <button type="button" id="" data-index="${rentalPortal.bikeId}">Add</button>
                   <button type="button">Edit</button>
                   <button type="button">Delete</button>
               </td>
           </tr>
       `;
  });
}

async function displayRentalReturns() {
  console.log('hello rental returns')
  const response = await fetch(GetRequestsForReturnURL);
  const rentalReturns = await response.json();

  dispalySectionHead.innerHTML = "";
  dispalySectionHead.innerHTML = `
 <th>Bike Id</th>
 <th>Nic Number</th>
 <th>Record Id</th>
 <th>Registration Number</th>
 <th>Action</th>`


  dispalySectionBody.innerHTML = "";
  rentalReturns.forEach((rentalReturn) => {
    dispalySectionBody.innerHTML += `
           <tr>
               <td>${rentalReturn.bikeId}</td> 
               <td>${rentalReturn.nicNumber}</td>
               <td>${rentalReturn.recordId}</td>
               <td>${rentalReturn.registrationNumber}</td> 
               <td>
                   <button type="button" id="" data-index="${rentalReturn.bikeId}">Add</button>
                   <button type="button">Edit</button>
                   <button type="button">Delete</button>
               </td>
           </tr>
       `;
  });
}

async function displayRentalRecords() {
  console.log('hello rental records')
  const response = await fetch(GetRentalRecordsURL);
  const returnRecords = await response.json();
  console.log(returnRecords);
  dispalySectionHead.innerHTML = "";
  dispalySectionHead.innerHTML = `
 <th>Bike Id</th>
 <th>Nic Number</th>
 <th>Record Id</th>
 <th>Registration Number</th>
 <th>Rental Out</th>
 <th>Rental Return</th>
 <th>Payment</th>
 <th>Action</th>`


  dispalySectionBody.innerHTML = "";
  returnRecords.forEach((returnRecords) => {
    dispalySectionBody.innerHTML += `
           <tr>
               <td>${returnRecords.bikeId}</td> 
               <td>${returnRecords.nicNumber}</td>
               <td>${returnRecords.recordId}</td>
               <td>${returnRecords.registrationNumber}</td> 
               <td>${returnRecords.rentalOut}</td>
               <td>${returnRecords.rentalReturn}</td>
               <td>${returnRecords.payment}</td> 
               <td>
                   <button type="button" id="" data-index="${returnRecords.bikeId}">Add</button>
                   <button type="button">Edit</button>
                   <button type="button">Delete</button>
               </td>
           </tr>
       `;
  });
}

