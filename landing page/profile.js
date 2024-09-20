document.addEventListener("DOMContentLoaded", () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        // Populate user details
        document.getElementById("nic").value = loggedInUser.id;
        document.getElementById("fullname").value = loggedInUser.name;
        document.getElementById("email").value = loggedInUser.email;
        document.getElementById("phone").value = loggedInUser.phoneNo;
        document.getElementById("address").value = loggedInUser.address;
        document.getElementById("drivingLicense").value = loggedInUser.drivingLicense;
    }

    document.getElementById('update-button').addEventListener("click", () => {
        toggleFormEditable(true);
    });

    document.getElementById('save-button').addEventListener('click', () => {
        saveProfile(loggedInUser);
    });

    document.getElementById('cancel-button').addEventListener('click', () => {
        toggleFormEditable(false);
    });

    document.getElementById('update-password').addEventListener('click', () => {
        updatePassword(loggedInUser);
    });

    displayRentalHistory(loggedInUser);
});

function toggleFormEditable(editable) {
    document.getElementById("fullname").disabled = !editable;
    document.getElementById("email").disabled = !editable;
    document.getElementById("phone").disabled = !editable;
    document.getElementById("address").disabled = !editable;
    document.getElementById("drivingLicense").disabled = !editable;

    document.getElementById('update-button').style.display = editable ? 'none' : 'block';
    document.getElementById('save-button').style.display = editable ? 'block' : 'none';
    document.getElementById('cancel-button').style.display = editable ? 'block' : 'none';
}

function saveProfile(user) {
    user.name = document.getElementById("fullname").value;
    user.email = document.getElementById("email").value;
    user.phoneNo = document.getElementById("phone").value;
    user.address = document.getElementById("address").value;
    user.drivingLicense = document.getElementById("drivingLicense").value;

    localStorage.setItem('loggedInUser', JSON.stringify(user));
    toggleFormEditable(false);
}

function updatePassword(user) {
    const oldPassword = btoa(document.getElementById('oldPassword').value);
    const newPassword = btoa(document.getElementById('newPassword').value);
    const confirmPassword = btoa(document.getElementById('confirmPassword').value);

    if (user.password === oldPassword) {
        if (newPassword === confirmPassword) {
            user.password = newPassword;
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            alert('Password Changed Successfully');
        } else {
            alert('New password and confirm password do not match');
        }
    } else {
        alert('Old password is incorrect');
    }
}

function displayRentalHistory(loggedInUser) {
    const rentalRequests = JSON.parse(localStorage.getItem('RentalRequests')) || [];

    // Filter rental requests for the logged-in user
    const userRequests = rentalRequests.filter(request => request.Customer.id === loggedInUser.id);

    // Display the user's rental requests on the profile
    let rentalHistoryHTML = '';
    userRequests.forEach(request => {
        rentalHistoryHTML += `
            <div class="rental-item">
                <p><strong>Bike:</strong> ${request.Bike.brand} ${request.Bike.model} (${request.Bike.id})</p>
                <p><strong>Rental Period:</strong> ${new Date(request.Start).toLocaleString()} - ${new Date(request.End).toLocaleString()}</p>
                <p><strong>Status:</strong> ${request.Status}</p>
                <p><strong>Total Price:</strong> $${request.TotalPrice}</p>
            </div>
        `;
    });

    document.getElementById('rentalStatus').innerHTML = rentalHistoryHTML;
}
