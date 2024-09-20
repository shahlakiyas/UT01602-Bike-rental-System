document.addEventListener("DOMContentLoaded", () => {
    const id = sessionStorage.getItem("ID");

    if (!id) {
        alert("No Customer ID found. Redirecting to Manage Customers.");
        window.location.href = "manage_customer.html";
        return;
    }

    const customers = JSON.parse(localStorage.getItem("user")) || [];
    const customer_data = customers.find(item => item.id === id);

    if (!customer_data) {
        alert("Customer not found. Redirecting to Manage Customers.");
        window.location.href = "manage_customers.html";
        return;
    }

    const formHTML = `
        <form id="update_form">
            <label for="nic_update">NIC</label>
            <input type="text" id="nic_update" value="${customer_data.id}" required><br><br>

            <label for="name_update">Name</label>
            <input type="text" id="name_update" value="${customer_data.name}" required><br><br>

            <label for="licence_update">Licence Number</label>
            <input type="text" id="licence_update" value="${customer_data.drivingLicense}" required><br><br>

            <label for="address_update">Address</label>
            <input type="text" id="address_update" value="${customer_data.address}" required><br><br>

            <label for="phone_update">Mobile</label>
            <input type="text" id="phone_update" value="${customer_data.phoneNo}" required><br><br>

            <label for="email_update">Email</label>
            <input type="text" id="email_update" value="${customer_data.email}" required><br><br>

            <input type="submit" id="update_detail" value="Update">
            <input type="button" id="update_detail_cancel" value="Cancel">
        </form>
    `;

    document.getElementById("update_customer").innerHTML = formHTML;

    document.getElementById("update_form").addEventListener("submit", function(e) {
        e.preventDefault();

        const updatedCustomer = {
            id: document.getElementById("nic_update").value,
            name: document.getElementById("name_update").value,
            drivingLicense: document.getElementById("licence_update").value,
            address: document.getElementById("address_update").value,
            phoneNo: document.getElementById("phone_update").value,
            email: document.getElementById("email_update").value
        };

        const updatedCustomers = customers.map(customer => customer.id === id ? updatedCustomer : customer);

        localStorage.setItem("user", JSON.stringify(updatedCustomers));
        alert("Customer details updated successfully");
        window.location.href = "manage_customer.html";
    });

    document.getElementById("update_detail_cancel").addEventListener("click", () => {
        window.location.href = "manage_customer.html";
    });
});
