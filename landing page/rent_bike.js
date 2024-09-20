// Sample data - you can replace this with your localStorage data
const rentedBikes = JSON.parse(localStorage.getItem("RentedBikes")) || [];

// Function to display rented bikes and track overdue ones
function displayRentedBikes() {
    let table = `
    <table>
        <tr>
            <th>Bike ID</th>
            <th>Customer Name</th>
            <th>Rented From</th>
            <th>Expected Return</th>
            <th>Return Time</th>
            <th>Status</th>
            <th>Action</th>
        </tr>
    `;

    rentedBikes.forEach((bike, index) => {
        const rentedFrom = new Date(bike.From);
        const expectedReturn = new Date(bike.To);
        const returnTime = bike.ReturnedTime ? new Date(bike.ReturnedTime) : null;
        const now = new Date();

        let status = "On Time";
        if (!bike.ReturnedTime && now > expectedReturn) {
            status = "Overdue";
        } else if (bike.ReturnedTime) {
            status = "Returned";
        }

        table += `
        <tr>
            <td>${bike.BikeID}</td>
            <td>${bike.CustomerName || "Unknown"}</td>
            <td>${rentedFrom.toLocaleString()}</td>
            <td>${expectedReturn.toLocaleString()}</td>
            <td>${returnTime ? returnTime.toLocaleString() : "Not Returned"}</td>
            <td>${status}</td>
            <td>
                ${bike.ReturnedTime ? "N/A" : `<button onclick="markAsReturned(${index})">Mark as Returned</button>`}
            </td>
        </tr>
        `;
    });

    table += `</table>`;
    document.getElementById("table").innerHTML = table;
}

// Function to mark a bike as returned
function markAsReturned(index) {
    rentedBikes[index].ReturnedTime = new Date().toISOString();
    localStorage.setItem("Stored_Bike_Details", JSON.stringify(rentedBikes));
    alert(`Bike with ID: ${rentedBikes[index].BikeID} has been marked as returned.`);
    displayRentedBikes();
}

document.addEventListener("DOMContentLoaded", displayRentedBikes);
