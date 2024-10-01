const bikeData = [
  {
    name: "BMW G 310 RR",
    type: "ADVENTURE",
    price: 250,
    image: "images/bike-1.png",
    tag: "Free Cancellation",
  },
  {
    name: "BMW G 310 R",
    type: "ADVENTURE",
    price: 280,
    image: "images/bike-2.png",
    tag: "Free Cancellation",
  },
  {
    name: "BMW G 310 GS",
    type: "ADVENTURE",
    price: 400,
    image: "images/bike-3.png",
    tag: "Free Cancellation",
  },
  {
    name: "BMW R 1250 GS",
    type: "ADVENTURE",
    price: 500,
    image: "images/bike-4.png",
    tag: "Free Cancellation",
  },
  {
    name: "BMW M 1000 RR",
    type: "ADVENTURE",
    price: 560,
    image: "images/bike-5.png",
    tag: "Free Cancellation",
  },
  {
    name: "BMW F 850 GS",
    type: "ADVENTURE",
    price: 780,
    image: "images/bike-6.png",
    tag: "Free Cancellation",
  },
  {
    name: "BMW C 400 GT",
    type: "ADVENTURE",
    price: 890,
    image: "images/bike-7.png",
    tag: "Free Cancellation",
  },
  {
    name: "BMW R 1300 GS",
    type: "ADVENTURE",
    price: 900,
    image: "images/bike-8.png",
    tag: "Free Cancellation",
  },
];

// Function to create bike box Element
const createBikeBox = (bike) => `
<div class="bike-box">
                <img src="${bike.image}" alt="" class="box-img" />
                <div class="title-price">
                    <div class="title-data">
                        <h2>${bike.name}</h2>
                        <p>${bike.type}</p>
                    </div>
                    <h3 class="bike-price">₹${bike.price}<span>/hour</span></h3>
                </div>
                <a href="#" class="book-btn">Book Bike</a>
                <span class="tag">${bike.tag}</span>
            </div>
`;

const bikeContent = document.querySelector(".bikes-content");
// create bike box and show in bikecontent div
bikeData.forEach((bike) => {
  const bikeBoxHtml = createBikeBox(bike);
  bikeContent.insertAdjacentHTML("beforeend", bikeBoxHtml);
});
// // Swiper
// var swiper = new Swiper(".destination-container", {
//   slidePerView: 1,
//   spaceBetween: 10,
//   autoplay: {
//     delay: 2500,
//     disableOnInteraction: false,
//   },
//   pagination: {
//     el: ".swiper-pagination",
//     dynamicBullets: true,
//     clickable: true,
//   },
//   breakpoints: {
//     280: {
//       slidesPerView: 1,
//       spaceBetween: 10,
//     },
//     320: {
//       slidesPerView: 1,
//       spaceBetween: 10,
//     },
//     510: {
//       slidesPerView: 2,
//       spaceBetween: 10,
//     },
//     750: {
//       slidesPerView: 3,
//       spaceBetween: 15,
//     },
//     900: {
//       slidesPerView: 4,
//       spaceBetween: 20,
//     },

//   }
// });


//slide show
let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}
//slide show end

// Menu
let menu = document.querySelector(".menu-icon");
let navbar = document.querySelector(".navbar");

menu.onclick = () => {
  navbar.classList.toggle("open-menu");
  menu.classList.toggle("move")
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
let modalForm = document.querySelector(".modal-form");
let signUpBtn = document.querySelector('#signUpBtn');
signUpBtn.addEventListener('click' , loadSignUpModal);


let logInBtn = document.querySelector('#logInBtn');
logInBtn.addEventListener('click' , loadLogInModal)
function loadSignUpModal(){
  modalForm.innerHTML = "";
  modalForm.innerHTML = ``
}

function loadLogInModal(){
  modalForm.innerHTML = "";
  modalForm.innerHTML = ``
}
