
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
  if (slideIndex > slides.length) { slideIndex = 1 }
  slides[slideIndex - 1].style.display = "block";
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
signUpBtn.addEventListener('click', loadLogInModal);


let logInBtn = document.querySelector('#logInBtn');
logInBtn.addEventListener('click', loadSignUpModal)




let verificationForm = document.getElementById("verificationForm");
let userName = document.getElementById("userName");
let userPassword = document.getElementById("userPassword");
let submitBtn = document.getElementById("submitBtn");


function loadSignUpModal() {
  modalFormDiv.innerHTML = "";
  modalFormDiv.innerHTML = `
  <form action="" class="modal-form" id="signUpForm">
  <h2>Register</h2>
  <div class="tab-1" id="registerUser">
      <p id="message1"></p>
      <div class='form-item'>
      <label for="userNIC" class="required-field">National Identity Card Number:</label>
      <input type="text" id="userNIC" placeholder="9********V/199********" required>
      </div>
      <div class='form-item'>
      <label for="firstName">First Name:</label>
      <input type="text" id="firstName" placeholder="Enter your first name" required>
      </div>
      <div class='form-item'>
      <label for="lastName">Last Name:</label>
      <input type="text" id="lastName" placeholder="Enter your last name" required>
      </div>
      
      <div class='form-item'>
      <label for="email">Email:</label>
      <input type="email" id="email" placeholder="example@gmail.com" required>
      </div>
      <div class='form-item'>
      <label for="contact">Contact NO:</label>
      <input type="text" id="contact" placeholder="770000000" required>
      </div>
      <div class='form-item'>
      <label for="address">Address:</label>
      <input type="email" id="address" placeholder="Enter the Address" required>
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
  let nextTabBtn = document.getElementById("nextTabBtn");
  let signUpForm = document.getElementById("signUpForm");
  let userNIC = document.getElementById("userNIC");
  let firstName = document.getElementById("firstName");
  let lastName = document.getElementById("lastName");
  let email = document.getElementById("email");
  let contactNO = document.getElementById("contact");
  let address = document.getElementById("address");
  let userRole = document.getElementById("userRole");
  nextTabBtn.addEventListener('click', (event) => {
    event.preventDefault();
    let userData = {
      userNIC,
      firstName,
      lastName,
      email,
      contactNO,
      address,
      userRole
    }
    getUserData(userData);
    signUpForm.reset();

    // console.log(getUserData);
  })
}

function loadLogInModal() {
  modalFormDiv.innerHTML = "";
  modalFormDiv.innerHTML = ` 
  <form action="" class="modal-form" id="logInForm">
      <h2>Login</h2>
      <div class='form-item'>
      <label for="nic">Username:</label>
  <input type="text" id="nic" placeholder="Enter your username">
  </div>
  <div class='form-item'>
  <label for="userPassword">
      Password:
  </label>
  
  <input type="password" id="userPassword" placeholder="Enter your password">
  </div>
  <h4 id="msg"></h4>
  <button type="submit" class="btn" id="submitBtn">Submit</button>
  </form>
  `
}


function getUserData(userData) {
  console.log(userData);

  userData.firstName.value.trim() == "";
  userData.lastName.value.trim() == "";
  console.log(userData.userNIC.value.length);
  if (userData.email.value.trim() == "") {
    alert("Please fill in the your email address")
    return "Please fill in the your email address"
  }

    if (isNaN(userData.userNIC.value) || userData.userNIC.value.length < 1 || userData.userNIC.value.length > 10) {
      alert("Input not valid")
      return "Input not valid"
    } else {
      alert("Input OK")
      // return "Input OK"
    }
    
  // userData.userNIC.value.trim() == "";
  userData.userRole.value.trim() == "";
    if (userData.userRole.value == "customer") {
      alert ("are you customer")
    }
    else if(userData.userRole.value == "manager"){
        alert("are you manager")
    }
 
  let U_firstName = firstName.value;
  let U_lastName = lastName.value;
  let U_userNIC = userNIC.value;
  let U_email = email.value;
  let U_userRole = userRole.value;

  let user = {
    FirstName: U_firstName,
    lastName: U_lastName,
    UserNIC: U_userNIC,
    Email: U_email,
    UserRole: U_userRole
  }
  console.log(user);
}




