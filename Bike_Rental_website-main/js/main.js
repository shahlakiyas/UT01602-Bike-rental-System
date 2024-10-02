const bikeData = [
  {
    name: "BMW G 310 RR",
    type: "ADVENTURE",
    price: 250,
    image: "images/bike-1.png",
    tag: "Free Cancellation",
  },
  {
    name: "BMW G 310 R",
    type: "ADVENTURE",
    price: 280,
    image: "images/bike-2.png",
    tag: "Free Cancellation",
  },
  {
    name: "BMW G 310 GS",
    type: "ADVENTURE",
    price: 400,
    image: "images/bike-3.png",
    tag: "Free Cancellation",
  },
  {
    name: "BMW R 1250 GS",
    type: "ADVENTURE",
    price: 500,
    image: "images/bike-4.png",
    tag: "Free Cancellation",
  },
  {
    name: "BMW M 1000 RR",
    type: "ADVENTURE",
    price: 560,
    image: "images/bike-5.png",
    tag: "Free Cancellation",
  },
  {
    name: "BMW F 850 GS",
    type: "ADVENTURE",
    price: 780,
    image: "images/bike-6.png",
    tag: "Free Cancellation",
  },
  {
    name: "BMW C 400 GT",
    type: "ADVENTURE",
    price: 890,
    image: "images/bike-7.png",
    tag: "Free Cancellation",
  },
  {
    name: "BMW R 1300 GS",
    type: "ADVENTURE",
    price: 900,
    image: "images/bike-8.png",
    tag: "Free Cancellation",
  },
];

// Function to create bike box Element
const createBikeBox = (bike) => `
<div class="bike-box">
                <img src="${bike.image}" alt="" class="box-img" />
                <div class="title-price">
                    <div class="title-data">
                        <h2>${bike.name}</h2>
                        <p>${bike.type}</p>
                    </div>
                    <h3 class="bike-price">₹${bike.price}<span>/hour</span></h3>
                </div>
                <a href="#" class="book-btn">Book Bike</a>
                <span class="tag">${bike.tag}</span>
            </div>
`;

const bikeContent = document.querySelector(".bikes-content");
// create bike box and show in bikecontent div
bikeData.forEach((bike) => {
  const bikeBoxHtml = createBikeBox(bike);
  bikeContent.insertAdjacentHTML("beforeend", bikeBoxHtml);
});



//slide show
let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}
//slide show end

// Menu
let menu = document.querySelector(".menu-icon");
let navbar = document.querySelector(".navbar");

menu.onclick = () => {
  navbar.classList.toggle("open-menu");
  menu.classList.toggle("move")
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
let modalFormDiv = document.querySelector(".form-div");
loadLogInModal();
let signUpBtn = document.querySelector('#signUpBtn');
signUpBtn.addEventListener('click' , loadLogInModal);


let logInBtn = document.querySelector('#logInBtn');
logInBtn.addEventListener('click' , loadSignUpModal)
function loadSignUpModal(){
  modalFormDiv.innerHTML = "";
  modalFormDiv.innerHTML = `
  <form action="" class="modal-form" id="signUpForm">
  <h2>Register</h2>
  <div class="tab-1" id="registerUser">
      <p id="message1"></p>
      <div class='form-item'>
      <label for="firstName">First Name:</label>
      <input type="text" id="firstName" placeholder="Enter your first name" required>
      </div>
      <div class='form-item'>
      <label for="lastName">Last Name:</label>
      <input type="text" id="lastName" placeholder="Enter your last name" required>
      </div>
      <div class='form-item'>
      <label for="userNIC" class="required-field">National Identity Card Number:</label>
      <input type="text" id="userNIC" placeholder="9********V/199********" required>
      </div>
      <div class='form-item'>
      <label for="email">Email:</label>
      <input type="email" id="email" placeholder="example@gmail.com" required>
      </div>
      <div class='form-item'>
      <label for="userRole">I am a</label>
      <select name="role" id="userRole" required>
          <option value="">Select Your Role</option>
          <a>
              <option value="customer">Customer</option>
          </a>
          <a>
              <option value="manager">Manager</option>
          </a>

      </select>
      </div>
  </div>
  <button type="submit" id="nextTabBtn" class="btn">Next &nbsp; ></button>
</form>
<form id="verificationForm" class="modal-form">
  <div class="tab-2" id="verification">
    
   <h2>Setup Your Account</h2>
      <div id="info"></div>
      <div class='form-item'>
      <label for="userName">Username:</label>
      <input type="text" id="userName" required>
      </div>
      <div class='form-item'>
      <label for="userPassword">
          Password:
      </label>
      <input type="password" id="userPassword" required>
      </div>
      <div class='form-item'>
      <label for="repeatUserPassword">
        Confirm Password:
      </label>
      <input type="password" id="repeatUserPassword" required>
      </div>
      <button type="submit" class="btn" >Submit</button>
  </div>
</form>
  `
}

function loadLogInModal(){
  modalFormDiv.innerHTML = "";
  modalFormDiv.innerHTML = ` 
  <form action="" class="modal-form" id="logInForm">
      <h2>Login</h2>
      <div class='form-item'>
      <label for="userName">Username:</label>
  <input type="text" id="userName" placeholder="Enter your username">
  </div>
  <div class='form-item'>
  <label for="userPassword">
      Password:
  </label>
  
  <input type="password" id="userPassword" placeholder="Enter your password">
  </div>
  <h4 id="msg"></h4>
  <button type="submit" class="btn">Submit</button>
  </form>
  `
}
