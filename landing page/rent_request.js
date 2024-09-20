document.addEventListener('DOMContentLoaded', () => {
    const rentalRequests = JSON.parse(localStorage.getItem("RentalRequests")) || [];
    const rentalDisplay = document.getElementById("rentalRequestDisplay");

    // Generate table HTML
    let tableHTML = `
        <table>
            <thead>
                <tr>
                    <th>Date From</th>
                    <th>Date To</th>
                    <th>Customer Name</th>
                    <th>Bike ID</th>
                    <th>Bike Brand</th>
                    <th>Bike Model</th>
                    <th>Total Price</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
    `;

    rentalRequests.forEach((request, index) => {
        const bike = request.Bike || {};  // Ensure the bike object exists
        tableHTML += `
            <tr>
                <td>${request.Start}</td>
                <td>${request.End}</td>
                <td>${request.Customer.name}</td>
                 <td>${bike.id || 'N/A'}</td>
                <td>${bike.brand || 'N/A'}</td>
                <td>${bike.model || 'N/A'}</td>
                <td>${request.TotalPrice || 'N/A'}</td>

                <td>${request.Status || 'Pending'}</td>
                <td>
                    ${request.Status === 'Approved' ? 'Approved' : 
                    request.Status === 'Rejected' ? 'Rejected' : `
                        <button onclick="approveRequest(${index})">Approve</button>
                        <button onclick="rejectRequest(${index})">Reject</button>
                    `}
                </td>
            </tr>
        `;
    });

    tableHTML += `
            </tbody>
        </table>
    `;

    rentalDisplay.innerHTML = tableHTML;
    calculateAndDisplayTotalRevenue();
});

function approveRequest(index) {
    const rentalRequests = JSON.parse(localStorage.getItem("RentalRequests")) || [];
    const rentedBikes=JSON.parse(localStorage.getItem("Rented_bikes")) || [];
    
    if (index >= 0 && index < rentalRequests.length) {
        const request = rentalRequests[index];
        request.Status = 'Approved';
        localStorage.setItem("RentalRequests", JSON.stringify(rentalRequests));
        
        // Add the approved request to rented bikes in localStorage
        const rentedBike = {
            BikeID: request.Bike.id || 'N/A',
            BikeBrand: request.Bike.brand || 'N/A',
            BikeModel: request.Bike.model || 'N/A',
            From: request.Start,
            To: request.End,
            CustomerName: request.Customer.name,
            TotalPrice: request.TotalPrice || 'N/A'
        };
        
        rentedBikes.push(rentedBike);  // Add the rented bike to the rented bikes array
        localStorage.setItem("RentedBikes", JSON.stringify(rentedBikes));  // Store updated rented bikes array

        
        sendMessage(request.Customer, 'Your rental request has been approved.');
        
        alert(`Request approved for customer: ${request.Customer}`);
        location.reload(); // Reload the page to update the table
    } else {
        alert('Invalid request index');
    }
}
function calculateAndDisplayTotalRevenue() {
    const rentalRequests = JSON.parse(localStorage.getItem("RentalRequests")) || [];
    let totalRevenue = 0;

    rentalRequests.forEach(request => {
        if (request.Status === 'Approved') {
            totalRevenue += parseFloat(request.TotalPrice) || 0;
        }
    });

    document.getElementById('revenue').innerText = `Total Revenue: $${totalRevenue.toFixed(2)}`;
}
function rejectRequest(index) {
    const rentalRequests = JSON.parse(localStorage.getItem("RentalRequests")) || [];
    
    if (index >= 0 && index < rentalRequests.length) {
        const request = rentalRequests[index];
        request.Status = 'Rejected';
        localStorage.setItem("RentalRequests", JSON.stringify(rentalRequests));
        
        sendMessage(request.Customer, 'Your rental request has been rejected.');
        
        alert(`Request rejected for customer: ${request.Customer}`);
        location.reload(); // Reload the page to update the table
    } else {
        alert('Invalid request index');
    }
}

function sendMessage(customerId, messageText) {
    const messages = JSON.parse(localStorage.getItem('StatusMessages')) || [];
    const message = {
        Customer: customerId,
        Text: messageText,
        Date: new Date().toLocaleString()
    };
    messages.push(message);
    localStorage.setItem('StatusMessages', JSON.stringify(messages));
}
