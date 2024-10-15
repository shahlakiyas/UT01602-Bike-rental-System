
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
      <input type="text" id="contact" placeholder="770000000" required minlength="10" maxlength="10" required>
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


  let verificationForm = document.getElementById("verificationForm");
  verificationForm.style.display = "none";


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
    verificationForm.style.display = "block";

  })
}

function loadLogInModal() {
  modalFormDiv.innerHTML = "";
  modalFormDiv.innerHTML = ` 
  <form action="" class="modal-form" id="logInForm">
      <h2>Login</h2>
      <div class='form-item'>
      <label for="nic">NIC Number:</label>
  <input type="text" id="nic" placeholder="Enter your NIC Number">
  </div>
  <div class='form-item'>
  <label for="userPassword">
      Password:
  </label>
  
  <input type="password" id="password" placeholder="Enter your password">
  </div>
  <h4 id="msg"></h4>
  <button type="submit" class="btn" id="submitBtn">Submit</button>
  </form>
  `
}


function getUserData(userData) {
  console.log(userData);
  if (
    userData.firstName.value.trim() === "" &&
    userData.lastName.value.trim() === "" &&
    userData.userNIC.value.trim() === "" &&
    userData.email.value.trim() === "" &&
    userData.contactNO.value.trim() === "" &&
    userData.address.value.trim() === "" &&
    userData.userRole.value.trim() === ""
  ) {
    alert('No fields can be empty');
  } else {
    let U_userNIC = userData.userNIC.value;
    let U_firstName = userData.firstName.value;
    let U_lastName = userData.lastName.value;
    let U_email = userData.email.value;
    let U_contactNO = userData.contactNO.value;
    let U_address = userData.address.value;
    let U_userRole = userData.userRole.value;
    let isAdmin;

    if (U_userRole === "manager") {
      isAdmin = true;
    } else if (U_userRole === "customer") {
      isAdmin = false;
    }
    let user = {
      UserNIC: U_userNIC,
      FirstName: U_firstName,
      LastName: U_lastName,
      Email: U_email,
      ContactNO: U_contactNO,
      Address: U_address,
      isAdmin: isAdmin
    //  Password: U_password
    };
    console.log(user);
    let verificationForm = document.getElementById("verificationForm");
    verificationForm.reset();
      setupPassword(user);
    
  }



}


function setupPassword(userObj) {
  console.log(userObj);
  let passwordFld = document.getElementById("userPassword");
  let repeatPasswordFld = document.getElementById("repeatUserPassword");
  repeatPasswordFld.addEventListener('change' , checkPassword);

  function checkPassword(){
    let U_password = passwordFld.value;
    let U_repeatPassword = repeatPasswordFld.value;
  
    if (U_password === U_repeatPassword) {
  
    
      let verificationForm = document.getElementById("verificationForm");
      console.log(verificationForm)
      verificationForm.reset()
  
      userObj.password = U_password
  
      console.log(userObj);
      alert("User registration successfull!");
    } else {
      alert("Please set up your password correctly.");
    }
  }

}





