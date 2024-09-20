document.addEventListener("DOMContentLoaded", function () {
    // Display existing bikes when the page loads
    displayBikes();
    
    document.getElementById("search_btn").addEventListener("click", function() {
        searchBike(); 
    });
    // Show popup when "Add Motorbike" button is clicked
    document.getElementById('addMotorbikeBtn').addEventListener('click', function () {
        document.getElementById('motorbikePopup').style.display = 'flex';
    });
    document.getElementById('motorbikeCloseBtn').addEventListener('click', function () {
        document.getElementById('motorbikePopup').style.display = 'none';
    });
    // Hide popup when close button is clicked
    document.querySelector('.close-btn').addEventListener('click', function () {
        document.getElementById('motorbikePopup').style.display = 'none';
    });

    // Add motorbike when form is submitted
    document.getElementById("motorbikeForm").addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent form from submitting the traditional way
        createBike(); // Call the function to create and store the bike
    });
    
    
});
function searchBike() {

    const type = document.getElementById("type_search").value.toLowerCase();
    const brand = document.getElementById("brand_search").value.toLowerCase();
    const model = document.getElementById("model_search").value.toLowerCase();
    const year = document.getElementById("year_search").value.toLowerCase();
    const id = Number(document.getElementById("idsearch").value);

    let bike = JSON.parse(localStorage.getItem("Bike_Details")) || [];
    bike = bike.filter(item =>
        (id === 0 || item.ID === id) &&
        (type === "" || item.Type.toLowerCase().includes(type)) &&
        (brand === "" || item.Brand.toLowerCase().includes(brand)) &&
        (model === "" || item.Model.toLowerCase().includes(model)) &&
        (year === "" || item.Year.toLowerCase().includes(year))
    );

    let table = `
        <table>  
            <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Type</th>
                <th>Brand</th>
                <th>Model</th>      
                <th>Year</th>
                <th>Registration No</th>
                <th>Rent</th>
                <th>Action</th>
            </tr>`;

    for (const data of bike) {
        table += `
            <tr>
                <td>${data.ID}</td>
                <td><img src="${data.Image}" width="50"></td>
                <td>${data.Type}</td>
                <td>${data.Brand}</td>
                 <td>${data.Model}</td>
                <td>${data.Year}</td>
                <td>${data.Registration_Number}</td>
                <td>${data.Rent}</td>
                <td>
                    <button onclick="updateData(${data.ID})">Update</button>
                    <button onclick="deleteData(${data.ID})">Delete</button>
                </td>
            </tr>`;
    }

    table += `</table>`;
    
    // Set the table HTML in the popup content
    document.getElementById("searchResultsContent").innerHTML = table;

    // Display the popup
    document.getElementById("searchResultsPopup").style.display = "flex";
}
document.querySelector('.close-btn').addEventListener('click', function () {
    closePopup();
});


// Function to close the popup
function closePopup() {
    document.getElementById("searchResultsPopup").style.display = "none";
}


console.log("lo")

function createBike() {
    const bike_type = document.getElementById("bike_type").value;
    const bike_brand = document.getElementById("bike_brand").value;
    const bike_model = document.getElementById("bike_model").value;
    const bike_year = document.getElementById("bike_year").value;
    const bike_reg = document.getElementById("bike_reg").value;
    const bike_price = document.getElementById("bike_price").value;
    const bike_img = document.getElementById("bike_img").files[0];

    const reader = new FileReader();
    reader.onload = function (event) {
        const bike_details = {
            ID: Math.floor(Math.random() * 1000000) + 1,
            Type: bike_type,
            Brand: bike_brand,
            Model: bike_model,
            Year: bike_year,
            Registration_Number: bike_reg,
            Rent: bike_price,
            Image: event.target.result
        };

        let create_bike = JSON.parse(localStorage.getItem("Bike_Details")) || [];
        create_bike.push(bike_details);
        localStorage.setItem("Bike_Details", JSON.stringify(create_bike));

        document.getElementById('motorbikePopup').style.display = 'none'; // Hide the popup after submission
        displayBikes(); // Refresh the table with the new bike
    };

    reader.readAsDataURL(bike_img); // Read the image file as a data URL
    // Reset form fields after adding bike
    document.getElementById("motorbikeForm").reset();

    // Close the popup
    document.getElementById('motorbikePopup').style.display = 'none';
}

function displayBikes() {
    const display = JSON.parse(localStorage.getItem("Bike_Details")) || [];
    const bikeCountDiv = document.getElementById("bikeCount");
    bikeCountDiv.innerText = `Total MotorBikes: ${display.length}`;

    
    let table = `
        <table class="motorbike-table">  
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Image</th>
                    <th>Type</th>
                    <th>Brand</th>
                    <th>Model</th>
                    <th>Year</th>
                    <th>Registration No</th>
                    <th>Rent</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>`;

    for (const data of display) {
        table += `
            <tr>
                <td>${data.ID}</td>
                <td><img src="${data.Image}" width="50"></td>
                <td>${data.Type}</td>
                <td>${data.Brand}</td>
                <td>${data.Model}</td>
                <td>${data.Year}</td>
                <td>${data.Registration_Number}</td>
                <td>${data.Rent}</td>
                <td>
                    <button onclick="updateData(${data.ID})">Update</button>
                    <button onclick="deleteData(${data.ID})">Delete</button>
                </td>
            </tr>`;
    }

    table += `</tbody></table>`;
    document.querySelector(".content").innerHTML = table;
}

function deleteData(id) {
    let bikes = JSON.parse(localStorage.getItem("Bike_Details")) || [];
    bikes = bikes.filter(bike => bike.ID !== id);
    localStorage.setItem("Bike_Details", JSON.stringify(bikes));
    displayBikes(); // Refresh the table after deletion
}

function updateData(id) {
    sessionStorage.setItem("ID", id);
    window.location.href = "update.html";
}