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
const AcceptRentalRequestURL = "http://localhost:5263/api/RentalRequest/Accept-Rental-Request";
const declineREntalRequestURL = "http://localhost:5263/api/RentalRequest/Decline-Rental-Request"
const GetRentalRequestByIdURL = "http://localhost:5263/api/RentalRequest/"


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
const paymentModal = document.getElementById("paymentModal");

dispalySectionBody.addEventListener("click", (event) => {
  if (event.target.getAttribute("id") == "addUnitsBtn") {
    addUnitsModalFunctions(event); //Modal Display
  } else if (event.target.getAttribute("id") == "acceptRequest") {
    acceptRequest(event);

  } else if (event.target.getAttribute("id") == "declineRequest") {
    declineRequest(event);
  } else if (event.target.getAttribute("class") == "cofirmRegNo") {
    confirmRent(event);
  } else if (event.target.getAttribute("id") == "returnBtn") {
    paymentModalFunctions(event);
  }
})


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
    event.preventDefault();
    postBike(event);
    event.target.reset();
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
    console.log(image);
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
  console.log(id);
  const response = await fetch(`${BikesWithUnitsURL}${id}`);
  const bike = await response.json();

  console.log(bike);
  console.log(bike.images);

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
                    <button type="button" id="blockUser" data-index="${user.bikeId}">Block User</button>
                    
                </td>
            </tr>
        `;
  });

}
// Fetch rental request details by ID
async function returnBikeById(id) {
  const response = await fetch(`${BikesWithUnitsURL}${id}`);

  if (response.ok) {
    const data = await response.json();
    console.log(data);
    return data;
  } else {
    console.error("Failed to fetch rental request:", response.status);
    return null;
  }
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
                   <button type="button" id="acceptRequest" data-index="${rentalRequest.rentalId}">Accept</button>
                   <button type="button" id="declineRequest" data-index="${rentalRequest.rentalId}">Decline</button>
               </td>
           </tr>
       `;
  });
}

async function displayRentalPortal() {
  console.log('hello rental portal')
  const response = await fetch(GetRequestsForPortalURL);
  const rentalsPortal = await response.json();
  console.log(rentalsPortal);

  dispalySectionHead.innerHTML = "";
  dispalySectionHead.innerHTML = `
 <th>Request Time</th>
 <th>Bike Id</th>
 <th>Nic Number</th>
 <th>Record Id</th>
 <th>Action</th>
 `


  dispalySectionBody.innerHTML = "";
  rentalsPortal.forEach(async (rentalPortal) => {
    dispalySectionBody.innerHTML += `
           <tr>
               <td>${rentalPortal.requestTime}</td>
               <td>${rentalPortal.bikeId}</td> 
               <td>${rentalPortal.nicNumber}</td>
               <td>${rentalPortal.recordId}</td>
               <td id="${rentalPortal.recordId}">
              
               </td>
           </tr>
       `;
    await appendUnits(rentalPortal.bikeId, rentalPortal.recordId);

  });
}


async function appendUnits(bikeId, recordId) {
  let availableUnits = await returnavailableUnits(bikeId)
  console.log(availableUnits);
  let tD = document.getElementById(`${recordId}`);
  console.log(tD);
  let selectTag = document.createElement('select');
  selectTag.setAttribute("id", `.${recordId}`);
  availableUnits.forEach(unit => {
    let option = document.createElement("option");
    option.value = unit.registrationNumber;
    option.innerText = unit.registrationNumber;
    selectTag.append(option);
  });
  console.log(selectTag);
  tD.append(selectTag);
  let confirmBtn = document.createElement('button');
  confirmBtn.setAttribute('id', recordId);
  confirmBtn.innerText = "Confirm"
  confirmBtn.addEventListener('click', (event) => confirmRent(event));
  tD.append(confirmBtn);
}


const GetAvailableUnitsByIdURL = "http://localhost:5263/api/Inventory/Get-Available-Units"
async function returnavailableUnits(BikeId) {
  const response = await fetch(`${GetAvailableUnitsByIdURL}${BikeId}`);

  if (response.ok) {
    const data = await response.json();
    // console.log(data);
    return data;
  } else {
    console.error("Failed to fetch rental request:", response.status);
    return null;
  }
}

async function confirmRent(event) {
  let selRecordId = event.target.getAttribute("id");
  console.log(selRecordId);
  let bikeRegNo = document.getElementById(`.${selRecordId}`).value;
  console.log(bikeRegNo);
  let URLpart = "http://localhost:5263/api/RentalRecord/Update-Rental-Out"

  const response = await fetch(`${URLpart}?BikeRegNo=${bikeRegNo}&RecordId=${selRecordId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({})
  });

  if (response.ok) {
    console.log(`Request with ID ${selRecordId} accepted successfully.`);
  } else {
    console.error("Failed to accept rental request:", response.status);
  }

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
                   <button type="button" id="returnBtn" data-index="${rentalReturn.recordId}" data="${rentalReturn.registrationNumber}">Return</button>            
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
 <th>Payment</th>`


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
           </tr>
       `;
  });
}

// Fetch rental request details by ID
async function getRentalRequestById(id) {
  const response = await fetch(`${GetRentalRequestByIdURL}${id}`);

  if (response.ok) {
    const data = await response.json();
    console.log(data);
    return data;
  } else {
    console.error("Failed to fetch rental request:", response.status);
    return null;
  }
}

// Accept a rental request
async function acceptRequest(event) {
  const requestId = event.target.getAttribute("data-index");
  console.log(`Accepting request with ID: ${requestId}`);

  const rentalRequest = await getRentalRequestById(requestId);
  if (rentalRequest) {
    await updateRentalOnAccept(requestId);
  }
}

// Decline a rental request
async function declineRequest(event) {
  const requestId = event.target.getAttribute("data-index");
  console.log(`Declining request with ID: ${requestId}`);

  await updateRentalOnDecline(requestId);
}

// Update rental on acceptance (PUT request)
async function updateRentalOnAccept(requestId) {
  const response = await fetch(`${AcceptRentalRequestURL}${requestId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status: true })
  });

  if (response.ok) {
    console.log(`Request with ID ${requestId} accepted successfully.`);
  } else {
    console.error("Failed to accept rental request:", response.status);
  }
}


async function updateRentalOnDecline(requestId) {
  const response = await fetch(`${declineREntalRequestURL}${requestId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status: false })
  });

  if (response.ok) {
    console.log(`Request with ID ${requestId} declined successfully.`);
  } else {
    console.error("Failed to decline rental request:", response.status);
  }
}


const GetRecordByIdURL = "http://localhost:5263/api/RentalRecord?"

async function paymentModalFunctions(event) {

  paymentModal.style.display = "block";
  let RecordId = event.target.getAttribute("data-index");
  let registrationNumber = event.target.getAttribute('data');
  console.log(RecordId);
  console.log(registrationNumber);

  let rentalRecord = await returnRent(RecordId);
  let paymentProcessing = document.getElementById('paymentProcessing');
  paymentProcessing.innerHTML = `<h3>Record Id : ${rentalRecord.recordId}</h3>

  <h4 id="rentDuration${rentalRecord.recordId}"> </h4>
  <h5>Payment : ${rentalRecord.rentalPayment} </h5>

  <button id="btn${rentalRecord.recordId}" class="paymentBtn">Confirm Payment</button>`;
  let rentDuration = document.getElementById(`rentDuration${rentalRecord.recordId}`);
  rentDuration.innerText = "";
  const d = new Date();
  let text = d.toLocaleString();
  rentDuration.innerText = "Duration : " + rentalRecord.rentalOut.toLocaleString() + " - " + text;
  let confirmRecord = document.getElementById(`btn${rentalRecord.recordId}`);
  confirmRecord.addEventListener('click', (event) => completeRecord(RecordId, rentalRecord.rentalPayment,registrationNumber ))
}
paymentClose.onclick = function () {
  paymentModal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == paymentModal) {
    paymentModal.style.display = "none";
  }
}
const paymentURL = 'http://localhost:5263/api/RentalRecord/Complete-Rental-Record?'

async function completeRecord(selRecordId, selPayment , selUnit) {
  console.log(selRecordId);
  const response = await fetch(`${paymentURL}payment=${selPayment}&RecordId=${selRecordId}&RegistrationNo=${selUnit}`);

  if (response.ok) {
    const data = await response.json();
    console.log(data);
    return data;
  } else {
    console.error("Failed to fetch rental record:", response.status);
    return null;
  }

}


async function returnRent(recordId) {
  const response = await fetch(`${GetRecordByIdURL}recordId=${recordId}`);

  if (response.ok) {
    const data = await response.json();
    console.log(data);
    return data;
  } else {
    console.error("Failed to fetch rental record:", response.status);
    return null;
  }

}
