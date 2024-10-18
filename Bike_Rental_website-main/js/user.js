

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
      <input type="text" id="address" placeholder="Enter the Address" required>
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

      <div class='form-item'>
      <label for="userPassword">
          Password:
      </label>
      <input type="password" id="userPassword" required>
      </div>

      <button type="submit" class="btn" >Submit</button>
      <div id="info" class="signup-msg"></div>

  </div>  
</form>
  `

  let signUpForm = document.getElementById("signUpForm");
  let userNIC = document.getElementById("userNIC");
  let firstName = document.getElementById("firstName");
  let lastName = document.getElementById("lastName");
  let email = document.getElementById("email");
  let contactNO = document.getElementById("contact");
  let address = document.getElementById("address");
  let userRole = document.getElementById("userRole");
  let userPassword = document.getElementById("userPassword");

  signUpForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let userData = {
      userNIC,
      firstName,
      lastName,
      email,
      contactNO,
      address,
      userRole,
      userPassword,
    }

    getUserData(userData);
    signUpForm.reset();
    console.log("User data" + userData);

    let signUpMsg = document.getElementById("info");
    signUpMsg.innerHTML = `<h2>Sign Up Successfull</h2>`
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
  let logInForm = document.getElementById('logInForm');
  logInForm.addEventListener('submit', (event) => logIn(event))
  
}

function logIn(event) {
  event.preventDefault();
  let NIC = document.getElementById("nic").value;
  let password = document.getElementById('password').value;
  LogIN();
  async function LogIN() {
    let loginMsg = document.getElementById("msg");
    loginMsg.innerHTML = "";
    let response = await fetch(`http://localhost:5263/api/User/Log-In?NICno=${NIC}&Password=${password}`)
    if (response.ok) {
      await response.json().then(data => {
        sessionStorage.setItem('currentUser', JSON.stringify(data));
        if(data.isAdmin == true){
          window.location.href = "../admin/dashboard.html"
        }
        loginMsg.style.color = "green";
        loginMsg.innerHTML =  `<h2>Login Successfull</h2>`;

      }).catch((err) => {
        console.log(err);
      })
    }else{
      loginMsg.style.color = "red";
      loginMsg.innerHTML =  `<h2>Login Failed</h2>`;
    }
  }
  event.target.reset();


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
    userData.userRole.value.trim() === "" &&
    userData.userPassword.value.trim() === ""
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
    let U_password = userData.userPassword.value;

    if (U_userRole === "manager") {
      isAdmin = true;
     
    } else if (U_userRole === "customer") {
      isAdmin = false;
    }
    let user = {
      nicNumber: U_userNIC,
      firstName: U_firstName,
      lastName: U_lastName,
      email: U_email,
      contactNo: U_contactNO,
      address: U_address,
      isAdmin: isAdmin,
      password: U_password
    };

    console.log(user);
    let signUpForm = document.getElementById("signUpForm");
    signUpForm.reset();
    // setupPassword(user);

    postUser();
    async function postUser() {
      const response = await fetch("http://localhost:5263/api/User", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });
      console.log(response)

      if (response.ok) {
        await response.json().then(data => {
          console.log(data);
        })
        alert("User registration successfull!");
      }
    }

  }

}





