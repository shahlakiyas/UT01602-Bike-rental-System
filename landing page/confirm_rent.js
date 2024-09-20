


document.addEventListener('DOMContentLoaded', () => {
    const rentalForm = document.getElementById('rentalForm');
    const startDateInput = document.getElementById("startDate");
    const endDateInput = document.getElementById("endDate");
    const hourlyPriceField = document.getElementById("hourlyPrice");
    const totalPriceField = document.getElementById("totalPrice");
    const messageBox = document.getElementById("rent_Confirm_message");
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    let bikeObj = null; // To store the selected bike details

    // Load bike info when the page is loaded
    getBikeInfo();

    function getBikeInfo() {
        const currentBikeId = JSON.parse(sessionStorage.getItem('BikeID')) || {};
        const bikes = JSON.parse(localStorage.getItem('Bike_Details')) || [];
        bikeObj = bikes.find(b => b.ID == currentBikeId);
        
        if (bikeObj) {
            const bikeInfoBox = document.getElementById('bikeInfoBox');
            bikeInfoBox.value = bikeObj.Model;
            hourlyPriceField.value = bikeObj.Rent; // Set the hourly price
        }
    }

    function calculateTotalPrice() {
        const startDate = new Date(startDateInput.value);
        const endDate = new Date(endDateInput.value);
        const hourlyPrice = parseFloat(hourlyPriceField.value);

        // Check if startDate and endDate are valid and if start date is before end date
        if (isValidDate(startDate) && isValidDate(endDate) && startDate < endDate) {
            const rentalDurationHours = (endDate - startDate) / (1000 * 60 * 60);
            const totalPrice = rentalDurationHours * hourlyPrice;
            totalPriceField.value = totalPrice.toFixed(2);
            messageBox.innerHTML = `Rental duration: ${rentalDurationHours.toFixed(2)} hours<br>Total price: $${totalPrice.toFixed(2)}`;
        } else {
            totalPriceField.value = "";
            messageBox.innerHTML = "Please select valid start and end dates.";
        }
    }

    // Event listeners to update the total price when the user changes the date/time
    startDateInput.addEventListener('change', calculateTotalPrice);
    endDateInput.addEventListener('change', calculateTotalPrice);

    rentalForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const startDate = new Date(startDateInput.value);
        const endDate = new Date(endDateInput.value);
        const hourlyPrice = parseFloat(hourlyPriceField.value);

        // Validate dates
        if (!isValidDate(startDate) || !isValidDate(endDate) || startDate >= endDate) {
            messageBox.innerHTML = "Please select valid start and end dates.";
            return;
        }

        const rentalDurationHours = (endDate - startDate) / (1000 * 60 * 60);

        if (rentalDurationHours <= 0 || rentalDurationHours > 24) {
            messageBox.innerHTML = "Rental duration must be between 1 hour and 24 hours.";
            return;
        }

        const totalPrice = rentalDurationHours * hourlyPrice;

        // Ensure bikeObj is properly retrieved
        if (!bikeObj) {
            messageBox.innerHTML = "Error: Bike details not found.";
            return;
        }

        // Create a rental request object
        const rentalRequest = {
            Customer: {
                name: loggedInUser.name,
                id: loggedInUser.id,
                address: loggedInUser.address,
                phoneNo: loggedInUser.phoneNo
            },
            Start: startDate,
            End: endDate,
            TotalPrice: totalPrice,
            Bike: {
                brand: bikeObj.Brand, // Make sure these properties match your bike object
                model: bikeObj.Model,
                registrationNumber: bikeObj.RegistrationNumber,
                id: bikeObj.ID
            },
            Status: 'Pending'
        };

        // Add to rentalRequests and save to localStorage
        const rentalRequests = JSON.parse(localStorage.getItem("RentalRequests")) || [];
        rentalRequests.push(rentalRequest);
        localStorage.setItem("RentalRequests", JSON.stringify(rentalRequests));

        // Reset the form fields
        rentalForm.reset();
        messageBox.innerHTML = "Rental request submitted successfully!";
    });

    // Function to validate the date
    function isValidDate(date) {
        return !isNaN(date.getTime());
    }
});

