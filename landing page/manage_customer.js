document.addEventListener("DOMContentLoaded", () => {
    // Display existing customers when the page loads
    displayUsers();

    // Show popup when "Add Customer" button is clicked
    document.getElementById('addCustomerBtn').addEventListener('click', () => {
        document.getElementById('customerPopup').style.display = 'flex';
    });

    // Hide popup when close button is clicked
    document.getElementById('customerCloseBtn').addEventListener('click', () => {
        document.getElementById('customerPopup').style.display = 'none';
    });

    // Add customer when form is submitted
    document.getElementById('customerForm').addEventListener('submit', (event) => {
        event.preventDefault();
        addCustomer();
    });

    // Search customers when search button is clicked
    document.getElementById('search_btn').addEventListener('click', () => {
        searchCustomer();
    });
});

function displayUsers(users = []) {
    users = users.length > 0 ? users : JSON.parse(localStorage.getItem('user')) || [];
    const cuscountdiv = document.getElementById("cuscount");
    cuscountdiv.innerText = `Total Customers: ${users.length}`;

    let table = `
        <table class="motorbike-table">
            <thead>
                <tr>
                    <th>NIC</th>
                    <th>Name</th>
                    <th>License Number</th>
                    <th>Address</th>
                    <th>Mobile</th>
                    <th>Email</th>
                <th>Action</th>

                </tr>
            </thead>
            <tbody>`;
    
    users.forEach(user => {
        table += `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.drivingLicense}</td>
                <td>${user.address}</td>
                <td>${user.phoneNo}</td>
                <td>${user.email}</td>
                 <td>
                    <button onclick="updateData(${user.id})">Update</button>
                    <button onclick="deleteData(${user.id})">Delete</button>
                </td>
            </tr>`;
    });

    table += `</tbody></table>`;
    document.getElementById('user_table').innerHTML = table;
}

function addCustomer() {
    const id = document.getElementById('customer_id').value;
    const name = document.getElementById('customer_name').value;
    const license = document.getElementById('customer_license').value;
    const mobile = document.getElementById('customer_mobile').value;
    const address = document.getElementById('customer_address').value;
    const email = document.getElementById('customer_email').value;

    const newCustomer = {
        id,
        name,
        drivingLicense: license,
        phoneNo: mobile,
        address,
        email
    };

    let customers = JSON.parse(localStorage.getItem('user')) || [];
    customers.push(newCustomer);
    localStorage.setItem('user', JSON.stringify(customers));

    document.getElementById('customerPopup').style.display = 'none';
    displayUsers();
}

function searchCustomer() {
    const idSearch = document.getElementById('ID_search').value;
    const nameSearch = document.getElementById('UName_search').value.toLowerCase();

    let users = JSON.parse(localStorage.getItem('user')) || [];
    const filteredUsers = users.filter(user => {
        return (idSearch === '' || user.id.toString().includes(idSearch)) &&
               (nameSearch === '' || user.name.toLowerCase().includes(nameSearch));
    });

    displayUsers(filteredUsers);
}


function deleteData(id) {
    let customers = JSON.parse(localStorage.getItem("user")) || [];
    
    // Filter out the customer with the given id
    customers = customers.filter(customer => customer.id.toString() !== id.toString());

    // Update the localStorage with the filtered list
    localStorage.setItem("user", JSON.stringify(customers));

    // Refresh the table after deletion
    displayUsers();
}

customers = customers.filter(customer => customer.id.toString() !== id.toString());

function updateData(id) {
    sessionStorage.setItem("ID", id);
    window.location.href = "update_cus.html";
}