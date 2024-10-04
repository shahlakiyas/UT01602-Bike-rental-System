document.querySelectorAll('.sidebar ul li a').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelectorAll('.sidebar ul li a').forEach(item => {
            item.classList.remove('active');
        });
        this.classList.add('active');
    });
});

const apiBaseUrl = "http://localhost:5263/api/Bikes/Get-All-bikes-With-Images";

let dispalySection = document.getElementById('dispalySection');
let dispalySectionHead = document.getElementById('dispalySectionHead');
let dispalySectionBody = document.getElementById('dispalySectionBody');

let viewBikesBtn = document.getElementById('viewBikes');
viewBikesBtn.addEventListener('click' , displayBikes);

async function displayBikes(){
  const response = await fetch(apiBaseUrl);
  const bikes = await response.json();
  console.log(bikes);
  dispalySectionHead.innerHTML = "";
  dispalySectionHead.innerHTML = `<td>Brand</td>
  <td>Modal</td>
  <td>Type</td>
  <td>Rate per Hour</td>` 
  dispalySectionBody.innerHTML = "";
  bikes.forEach(bike => {
    dispalySectionBody.innerHTML += `<tr>
    <td>${bike.bikeId}</td>
    <td>${bike.brand}</td>
    <td>${bike.modal}</td>
    <td>${bike.ratePerHour}</td>
   
    </tr>`
  });
  // dispalySectionHead.innerHTML = ''

}

//* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content - This allows the user to have multiple dropdowns without any conflict */
var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}