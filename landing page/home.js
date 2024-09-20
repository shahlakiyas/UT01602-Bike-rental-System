

  //filter in bike details
  document.addEventListener("DOMContentLoaded", () => {
    // Retrieve the logged-in user object from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    
    // Check if a user is logged in and update the welcome message
    if (loggedInUser && loggedInUser.name) {
        document.getElementById('welcomeMessage').textContent = `Welcome, ${loggedInUser.name}!`;
    } else {
        document.getElementById('welcomeMessage').textContent = '';
    }

    // Display bikes on the home page
    const bikes = JSON.parse(localStorage.getItem("Bike_Details")) || [];
    displayBikes(bikes);
});

document.addEventListener('DOMContentLoaded',function(){
    
logout.addEventListener('click', function(){
    localStorage.removeItem('loggedInUser')
    window.location.href='home.html'
})
    const profilebtn=document.getElementById("profilebtn")

    if(!localStorage.getItem('loggedInUser')){
        profilebtn.style.display='none'
    }
    if(!localStorage.getItem('loggedInUser')){
        logout.style.display='none'
    }
})

const logout=document.getElementById('logout')

// Display bikes on the home page
const bikes = JSON.parse(localStorage.getItem("Bike_Details")) || [];
displayBikes(bikes);


function displayBikes(bikes) {
    // Sort bikes by upload date in descending order
    bikes.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));

    // Limit to the 3 most recently uploaded bikes
    const latestBikes = bikes.slice(0, 3);

    let content = '';

    for (const bike of latestBikes) {
        content += `
            <div class="bike_card">
                <img src="${bike.Image}" ><br>
                <strong>Type: ${bike.Type}</strong><br>
                <em>Brand: ${bike.Brand}</em><br>
                Model: ${bike.Model}<br>
                Year: ${bike.Year}<br>
                Reg No: ${bike.Registration_Number}<br>
                Rent Per Hour: ${bike.Rent}<br>
                <button onclick="viewBike(${bike.ID})">Rent</button>
            </div>`;
    }

    document.getElementById("bike_details").innerHTML = content;
}
const userNamewelcome = localStorage.getItem('loggedInUser');

        // // Display the welcome message
        // if (userNamewelcome) {
        //     document.getElementById('welcomeMessage').textContent = `Welcome, ${userName}!`;
        // } else {
        //     document.getElementById('welcomeMessage').textContent = "Welcome!";
        // }



function searchBike() {
  const messageArea = document.getElementById("messageArea");
  const bikeType = document.getElementById("search_type").value.toLowerCase();
  const bikeBrand = document.getElementById("search_brand").value.toLowerCase();
  const bikeModel = document.getElementById("search_model").value.toLowerCase();
  const bikeYear = document.getElementById("search_year").value;

  // Clear previous messages
  messageArea.innerHTML = "";

  try {
      // Retrieve bike details from local storage
      const bikes = JSON.parse(localStorage.getItem("Bike_Details")) || [];

      // Log retrieved bikes for debugging
      console.log('Retrieved bikes:', bikes);

      // Filter bikes based on search criteria
      const filteredBikes = bikes.filter(bike => {
          const matchesType = bikeType === "" || bike.Type.toLowerCase().includes(bikeType);
          const matchesBrand = bikeBrand === "" || bike.Brand.toLowerCase().includes(bikeBrand);
          const matchesModel = bikeModel === "" || bike.Model.toLowerCase().includes(bikeModel);
          const matchesYear = bikeYear === "" || bike.Year.toString() === bikeYear;

          return matchesType && matchesBrand && matchesModel && matchesYear;
      });

      // Log filtered bikes for debugging
      // console.log('Filtered bikes:', filteredBikes);

      if (filteredBikes.length === 0) {
          throw new Error("No bikes matching the criteria were found.");
      }

      displayBikes(filteredBikes);

  } catch (error) {
      // Handle errors and update the messageArea
      messageArea.innerHTML = `<p style="color: red;">An error occurred: ${error.message}</p>`;
      alert("Error during search:", error);
  }
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


// Management added Bike details customer view 
const Id = Number(sessionStorage.getItem("BikeID"));
const userName=sessionStorage.getItem("Customer_Name");
const bike_details = JSON.parse(localStorage.getItem("Bike_Details")) || [];

// const display = bike_details.find(bike => bike.ID == Id);
// if(display) {
//     document.addEventListener("DOMContentLoaded", () => {
//         // document.getElementById("image").innerHTML = `<img src="${display.Image}" width="100">`;
//         document.getElementById("type").innerHTML = `Type:${display.Type}`;
//         document.getElementById("brand").innerHTML = `Brand:${display.Brand}`;
//         document.getElementById("model").innerHTML = `Model:${display.Model}`;
//         document.getElementById("year").innerHTML = `Year:${display.Year}`;
//         document.getElementById("Reg").innerHTML = `RegNo:${display.Registration_Number}`;
//         document.getElementById("Rent").innerHTML = `Rent:${display.Rent}`;
//         document.getElementById("From").innerHTML=`<label>From:</label><input type="date" id="date">`;
//         document.getElementById("Time").innerHTML=`<label>Time:</label><input type="time" id="time">`;
//         document.getElementById("return").innerHTML= `<button onclick="returnDate()">Confirm</button>`;
     
//         document.getElementById("To").innerHTML=`<label>Return:</label><p id="return"></p>`;
//         document.getElementById("button").innerHTML=`<button onclick="Request(Id,userName)">Request</button>`;
 
//     });
// }


