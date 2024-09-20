
// document.addEventListener("DOMContentLoaded", () => {
//     const id = Number(sessionStorage.getItem("ID"));

//     if (!id) {
//         alert("No bike ID found. Redirecting to Manage Motorbikes.");
//         window.location.href = "manage.html";
//         return;
//     }

//     const bikes = JSON.parse(localStorage.getItem("Bike_Details")) || [];
//     const bike_data = bikes.find(item => item.ID === id);

//     if (!bike_data) {
//         alert("Bike not found. Redirecting Manage Motorbikes.");
//         window.location.href = "manage.html";
//         return;
//     }

//     const formHTML = `
//         <form id="update_form">
//             <label for="bike_img_update">Image</label><br>
//             <img src="${bike_data.Image}" width="50"><br><br>
//             <input type="file" id="bike_img_update"><br><br>

//             <label for="bike_type_update">Type</label>
//             <select name="type" id="bike_type_update">
//                 <option value="sport_Bike" ${bike_data.Type === 'sport_Bike' ? 'selected' : ''}>Sports Bike</option>
//                 <option value="youngest" ${bike_data.Type === 'youngest' ? 'selected' : ''}>Youngest</option>
//                 <option value="family" ${bike_data.Type === 'family' ? 'selected' : ''}>Family</option>
//                 <option value="ladies" ${bike_data.Type === 'ladies' ? 'selected' : ''}>Ladies</option>
//             </select><br><br>

//             <label for="bike_brand_update">Brand</label>
//             <select name="brand" id="bike_brand_update">
//                 <option value="ktm" ${bike_data.Brand === 'ktm' ? 'selected' : ''}>KTM</option>
//                 <option value="yamaha" ${bike_data.Brand === 'yamaha' ? 'selected' : ''}>Yamaha</option>
//                 <option value="scooter" ${bike_data.Brand === 'scooter' ? 'selected' : ''}>Scooter</option>
//                 <option value="hero_honda" ${bike_data.Brand === 'hero_honda' ? 'selected' : ''}>Hero Honda</option>
//             </select><br><br>

//             <label for="bike_model_update">Model</label>
//             <input type="text" id="bike_model_update" value="${bike_data.Model}" required><br><br>

//             <label for="bike_year_update">Year</label>
//             <input type="text" id="bike_year_update" value="${bike_data.Year}" required><br><br>

//             <label for="bike_reg_update">Registration Number</label>
//             <input type="text" id="bike_reg_update" value="${bike_data.Registration_Number}" required><br><br>

//             <label for="bike_price_update">Rent</label>
//             <input type="number" id="bike_price_update" value="${bike_data.Rent}" required><br><br>

//             <input type="submit" id="update_detail" value="Update">
//             <input type="button" id="update_detail_cancel" value="Cancel">
//         </form>
//     `;

//     document.getElementById("update_bike").innerHTML = formHTML;

//     document.getElementById("update_form").addEventListener("submit", function(e) {
//         e.preventDefault();

//         const bike_img = document.getElementById("bike_img_update").files[0];
//         const bike_type = document.getElementById("bike_type_update").value;
//         const bike_brand = document.getElementById("bike_brand_update").value;
//         const bike_model = document.getElementById("bike_model_update").value;
//         const bike_year = document.getElementById("bike_year_update").value;
//         const bike_reg = document.getElementById("bike_reg_update").value;
//         const bike_price = document.getElementById("bike_price_update").value;

//         const updateBikeDetails = (imageURL) => {
//             const updatedBikeDetails = {
//                 ID: id,
//                 Type: bike_type,
//                 Brand: bike_brand,
//                 Model: bike_model,
//                 Year: bike_year,
//                 Registration_Number: bike_reg,
//                 Rent: bike_price,
//                 Image: imageURL || bike_data.Image // Use new image URL or keep the old one
//             };

//             // Update the specific bike in the array
//             const updatedBikes = bikes.map(bike => bike.ID === id ? updatedBikeDetails : bike);

//             // Save updated array to localStorage
//             localStorage.setItem("Bike_Details", JSON.stringify(updatedBikes));
//             alert("Bike details updated successfully");
//             window.location.href = "manage.html"; // Redirect to inventory page
//         };

//         if (bike_img) {
//             const reader = new FileReader();
//             reader.onload = function(event) {
//                 updateBikeDetails(event.target.result);
//             };
//             reader.readAsDataURL(bike_img);
//         } else {
//             updateBikeDetails(); // Update without changing the image
//         }
//     });

//     document.getElementById("update_detail_cancel").addEventListener("click", () => {
//         window.location.href = "manage.html"; // Redirect to inventory page
//     });
// });



document.addEventListener("DOMContentLoaded", () => {
    const id = Number(sessionStorage.getItem("ID"));

    if (!id) {
        alert("No bike ID found. Redirecting to Manage Motorbikes.");
        window.location.href = "manage.html";
        return;
    }

    const bikes = JSON.parse(localStorage.getItem("Bike_Details")) || [];
    const bike_data = bikes.find(item => item.ID === id);

    if (!bike_data) {
        alert("Bike not found. Redirecting Manage Motorbikes.");
        window.location.href = "manage.html";
        return;
    }

    const formHTML = `
        <form id="update_form">
            <label for="bike_img_update">Image</label><br>
            <img src="${bike_data.Image}" width="500"><br><br>
            <input type="file" id="bike_img_update"><br><br>

            <label for="bike_type_update">Type</label>
            <select name="type" id="bike_type_update">
                <option value="Standard" ${bike_data.Type === 'Standard' ? 'selected' : ''}>Standard</option>
                <option value="Cruisers" ${bike_data.Type === 'Cruisers' ? 'selected' : ''}>Cruisers</option>
                <option value="Sport Bikes" ${bike_data.Type === 'Sport Bikes' ? 'selected' : ''}>Sport Bikes</option>
                <option value="Touring Bikes" ${bike_data.Type === 'Touring Bikes' ? 'selected' : ''}>Touring Bikes</option>
                <option value="Adventure" ${bike_data.Type === 'Adventure' ? 'selected' : ''}>Adventure</option>
                <option value="Dual-Sport Bikes" ${bike_data.Type === 'Dual-Sport Bikes' ? 'selected' : ''}>Dual-Sport Bikes</option>
                <option value="Dirt Bikes" ${bike_data.Type === 'Dirt Bikes' ? 'selected' : ''}>Dirt Bikes</option>
                <option value="Scramblers" ${bike_data.Type === 'Scramblers' ? 'selected' : ''}>Scramblers</option>
                <option value="Scooters" ${bike_data.Type === 'Scooters' ? 'selected' : ''}>Scooters</option>
            </select><br><br>

            <label for="bike_brand_update">Brand</label>
            <select name="brand" id="bike_brand_update">
                <option value="Honda" ${bike_data.Brand === 'Honda' ? 'selected' : ''}>Honda</option>
                <option value="Yamaha" ${bike_data.Brand === 'Yamaha' ? 'selected' : ''}>Yamaha</option>
                <option value="Kawasaki" ${bike_data.Brand === 'Kawasaki' ? 'selected' : ''}>Kawasaki</option>
                <option value="Suzuki" ${bike_data.Brand === 'Suzuki' ? 'selected' : ''}>Suzuki</option>
                <option value="Royal Enfield" ${bike_data.Brand === 'Royal Enfield' ? 'selected' : ''}>Royal Enfield</option>
                <option value="KTM" ${bike_data.Brand === 'KTM' ? 'selected' : ''}>KTM</option>
                <option value="Triumph" ${bike_data.Brand === 'Triumph' ? 'selected' : ''}>Triumph</option>
                <option value="Ducati" ${bike_data.Brand === 'Ducati' ? 'selected' : ''}>Ducati</option>
            </select><br><br>

            <label for="bike_model_update">Model</label>
            <input type="text" id="bike_model_update" value="${bike_data.Model}" required><br><br>

            <label for="bike_year_update">Year</label>
            <input type="text" id="bike_year_update" value="${bike_data.Year}" required><br><br>

            <label for="bike_reg_update">Registration Number</label>
            <input type="text" id="bike_reg_update" value="${bike_data.Registration_Number}" required><br><br>

            <label for="bike_price_update">Rent</label>
            <input type="number" id="bike_price_update" value="${bike_data.Rent}" required><br><br>

            <input type="submit" id="update_detail" value="Update">
            <input type="button" id="update_detail_cancel" value="Cancel">
        </form>
    `;

    document.getElementById("update_bike").innerHTML = formHTML;

    document.getElementById("update_form").addEventListener("submit", function(e) {
        e.preventDefault();

        const bike_img = document.getElementById("bike_img_update").files[0];
        const bike_type = document.getElementById("bike_type_update").value;
        const bike_brand = document.getElementById("bike_brand_update").value;
        const bike_model = document.getElementById("bike_model_update").value;
        const bike_year = document.getElementById("bike_year_update").value;
        const bike_reg = document.getElementById("bike_reg_update").value;
        const bike_price = document.getElementById("bike_price_update").value;

        const updateBikeDetails = (imageURL) => {
            const updatedBikeDetails = {
                ID: id,
                Type: bike_type,
                Brand: bike_brand,
                Model: bike_model,
                Year: bike_year,
                Registration_Number: bike_reg,
                Rent: bike_price,
                Image: imageURL || bike_data.Image // Use new image URL or keep the old one
            };

            // Update the specific bike in the array
            const updatedBikes = bikes.map(bike => bike.ID === id ? updatedBikeDetails : bike);

            // Save updated array to localStorage
            localStorage.setItem("Bike_Details", JSON.stringify(updatedBikes));
            alert("Bike details updated successfully");
            window.location.href = "manage_bikes.html"; // Redirect to inventory page
        };

        if (bike_img) {
            const reader = new FileReader();
            reader.onload = function(event) {
                updateBikeDetails(event.target.result);
            };
            reader.readAsDataURL(bike_img);
        } else {
            updateBikeDetails(); // Update without changing the image
        }
    });

    document.getElementById("update_detail_cancel").addEventListener("click", () => {
        window.location.href = "manage_bikes.html"; // Redirect to inventory page
    });
});
