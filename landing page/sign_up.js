document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    function encryptPassword(password) {
        return btoa(password); // Simple encryption using base64 encoding
    }

    // Get form data
    const name = document.getElementById('insertname').value;
    const id = document.getElementById('inputNIC/Passport').value;
    const phoneNo = document.getElementById('insertPhoneNo').value;
    const address = document.getElementById('insertAddress').value;
    const email = document.getElementById('email').value;
    const drivingLicense = document.getElementById('drivingLicence').value;
    const password = document.getElementById('password').value;
    const repeatPassword = document.getElementById('repeatPassword').value;

    // Validation for Email
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Validation for Phone Number (only digits)
    const phonePattern = /^\d+$/;
    if (!phonePattern.test(phoneNo)) {
        alert('Please enter a valid phone number.');
        return;
    }

    // Validation for NIC/Passport (customize as needed)
    if (id.length < 5) {
        alert('Please enter a valid NIC/Passport number.');
        return;
    }

    // Validation for Passwords
    if (password.length < 8) {
        alert('Password must be at least 8 characters long.');
        return;
    }

    // Check if passwords match
    if (password !== repeatPassword) {
        alert('Passwords do not match. Please try again.');
        return;
    }

    // Encrypt the password
    const encryptedPassword = encryptPassword(password);

    // Create user object
    const users = JSON.parse(localStorage.getItem('user')) || [];
    const user = {
        name: name,
        id: id,
        address: address,
        phoneNo: phoneNo,
        email: email,
        drivingLicense: drivingLicense,
        password: encryptedPassword
    };
    users.push(user);

    // Store user data in local storage
    localStorage.setItem('user', JSON.stringify(users));

    // Clear form fields
    document.getElementById('userForm').reset();

    // Notify user
    alert('User data stored successfully!');

    // Redirect to the sign-in page
    window.location.href = "li.html";
});

function redirectToHome() {
    window.location.href = "home.html";
}
