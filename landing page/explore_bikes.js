document.addEventListener("DOMContentLoaded", () => {
    displayBikes(JSON.parse(localStorage.getItem("Bike_Details")) || []);
});

function displayBikes(bikes) {
    let content = '';

    for (const bike of bikes) {
        content += `
            <div class="bike_card">
                <img src="${bike.Image}" alt="${bike.Type}"><br>
                <strong>Type: ${bike.Type}</strong><br>
                <em>Brand: ${bike.Brand}</em><br>
                Model: ${bike.Model}<br>
                Year: ${bike.Year}<br>
                Reg No: ${bike.Registration_Number}<br>
                Rent Per Hour: ${bike.Rent}<br>
                <button onclick="viewBike(${bike.ID})" id="rentbtn">Rent</button>
            </div>`;
    }

    document.getElementById("bike_details").innerHTML = content;
}
function viewBike(id) {
    console.log("viewBike called with ID:", id);
    sessionStorage.setItem("BikeID", id);
    
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        console.log("User not logged in. Redirecting to sign up page.");
        window.location.href = "sign_up.html";
    } else {
        console.log("User logged in. Redirecting to confirm rent page.");
        window.location.href = "confirm_rent.html";
    }
}

function applyFilters() {
    const type = document.getElementById("type").value;
    const brand = document.getElementById("brand").value;
    const year = document.getElementById("year").value;

    const bikes = JSON.parse(localStorage.getItem("Bike_Details")) || [];

    const filteredBikes = bikes.filter(bike => {
        return (bike.Type === type) ||
               ( bike.Brand === brand) ||
               ( bike.Year == year);
    });

    displayBikes(filteredBikes);
}

// function viewBike(id) {
//     // Redirect to the rentview page with bike ID as a URL parameter
//     window.location.href = `confirm_rent.html?bikeID=${id}`;
// }
function viewBike(id) {
    sessionStorage.setItem("BikeID",id);
    if(!localStorage.getItem('loggedInUser')){
        window.location.href="sign_up.html"
    }else{
    window.location.href="confirm_rent.html";

    }
  }
