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
  console.log(bikeObj);
  rentalDiv.innerHTML += `
            
        
        <div class="bike-box">
          <div class="closeModel">&times;</div>
          <div class="flex-modal">
              <div>
              <h3>${bikeObj.brand}  ${bikeObj.modal}</h3><br>
              <div class="img-box"></div>
              </div>
              <div>
                <form>
                  <br><br>
                    <label>Rent Date: </label>
                    <input id="datepicker" onchange="checkDate()" class="datepicker-input" type="date" required />
                    <button type="submit" class="requestBtn">Request</button>
                </form>
              </div>
              <div></div>
       
        </div>    
        </div> 
      `;
  var closeSpan = document.getElementsByClassName("closeModel")[0];

  closeSpan.onclick = function () {
    confirmRent.style.display = "none";

    ;
  };
  let bikeImagesBox = document.querySelector(".img-box");
  bikeImagesBox.addEventListener('click' , (event)=> changeImage(event))
 let index = 0
  bikeObj.bikeImages.forEach(image => {
    let img = document.createElement('img');
   
    img.setAttribute('data-index' , index);
    img.src = `${image.imagePath}`;
    bikeImagesBox.append(img);
    console.log(`${image.imagePath}`);
    index++;
  })
  console.log(bikeObj);
  
}

function changeImage(event){
  console.log(event.target);
}




