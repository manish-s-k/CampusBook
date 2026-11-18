// ========================================
// CAMPUSBOOK - BOOKING SYSTEM
// ========================================

const resourceSelect = document.getElementById("resourceSelect");
const resourceDetails = document.getElementById("resourceDetails");
const bookingForm = document.getElementById("bookingForm");
const bookingMessage = document.getElementById("bookingMessage");

const bookingDate = document.getElementById("bookingDate");


// ========================================
// SET MINIMUM BOOKING DATE
// ========================================

const today = new Date();

const localToday = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0")
].join("-");

bookingDate.min = localToday;


// ========================================
// LOAD RESOURCES
// ========================================

function loadResources() {

    resourceSelect.innerHTML = `
        <option value="">Select a resource</option>
    `;

    CampusBook.resources.forEach(resource => {

        const option = document.createElement("option");

        option.value = resource.id;
        option.textContent = resource.name;

        resourceSelect.appendChild(option);

    });

    // Read resource ID from URL

    const params = new URLSearchParams(window.location.search);

    const selectedID = params.get("resource");

    if (selectedID) {

        const resourceExists = CampusBook.resources.some(
            resource => resource.id === selectedID
        );

        if (resourceExists) {
            resourceSelect.value = selectedID;
            displaySelectedResource();
        }

    }

}


// ========================================
// DISPLAY SELECTED RESOURCE
// ========================================

function displaySelectedResource() {

    const selectedID = resourceSelect.value;

    const resource = CampusBook.resources.find(
        item => item.id === selectedID
    );

    if (!resource) {

        resourceDetails.innerHTML = `
            <p>Please select a resource.</p>
        `;

        return;

    }

    resourceDetails.innerHTML = `
        <h3>${resource.name}</h3>

        <p>
            <strong>Category:</strong>
            ${resource.category}
        </p>

        <p>
            <strong>Location:</strong>
            ${resource.location}
        </p>

        ${resource.capacityMin && resource.capacityMax ? `
            <p>
                <strong>Capacity:</strong>
                ${resource.capacityMin}-${resource.capacityMax} people
            </p>
        ` : ""}
    `;

}


// ========================================
// RESOURCE SELECTION EVENT
// ========================================

resourceSelect.addEventListener(
    "change",
    displaySelectedResource
);


// ========================================
// CHECK BOOKING CONFLICTS
// ========================================

function checkBookingConflict(
    resourceID,
    date,
    startTime,
    endTime
) {

    const bookings = CampusBook.storage.getBookings();

    return bookings.some(booking => {

        if (
            booking.resourceId !== resourceID ||
            booking.date !== date
        ) {
            return false;
        }

        // Check overlapping time slots

        return (
            startTime < booking.endTime &&
            endTime > booking.startTime
        );

    });

}


// ========================================
// DISPLAY MESSAGE
// ========================================

function showMessage(message, success) {

    bookingMessage.textContent = message;

    bookingMessage.style.color = success
        ? "green"
        : "red";

}


// ========================================
// SUBMIT BOOKING
// ========================================

bookingForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const resourceID = resourceSelect.value;

    const studentName = document
        .getElementById("studentName").value.trim();

    const studentId = document
        .getElementById("studentId").value.trim();

    const studentEmail = document
        .getElementById("studentEmail").value.trim();

    const date = bookingDate.value;

    const startTime = document
        .getElementById("startTime").value;

    const endTime = document
        .getElementById("endTime").value;

    const purpose = document
        .getElementById("purpose").value.trim();


    // Check resource

    if (!resourceID) {
        showMessage("Please select a resource.", false);
        return;
    }


    // Check date

    if (date < localToday) {
        showMessage("Please select a valid future date.", false);
        return;
    }


    // Check time

    if (startTime >= endTime) {
        showMessage(
            "End time must be later than start time.",
            false
        );
        return;
    }


    // Check resource existence

    const resource = CampusBook.resources.find(
        item => item.id === resourceID
    );

    if (!resource) {
        showMessage("Resource not found.", false);
        return;
    }


    // Check booking conflicts

    if (
        checkBookingConflict(
            resourceID,
            date,
            startTime,
            endTime
        )
    ) {

        showMessage(
            "This resource is already booked during that time.",
            false
        );

        return;
    }


    // Create booking

    const booking = {

        id: "booking_" + Date.now(),

        resourceId: resourceID,

        resourceName: resource.name,

        studentName: studentName,

        studentId: studentId,

        studentEmail: studentEmail,

        date: date,

        startTime: startTime,

        endTime: endTime,

        purpose: purpose,

        createdAt: new Date().toISOString()

    };


    // Save booking

    CampusBook.storage.addBooking(booking);


    showMessage(
        "Booking confirmed successfully!",
        true
    );


    // Reset form

    bookingForm.reset();

    resourceDetails.innerHTML = `
        <p>Please select a resource.</p>
    `;

    bookingDate.min = localToday;


    // Redirect after confirmation

    setTimeout(() => {

        window.location.href = "my-bookings.html";

    }, 1500);

});


// ========================================
// INITIALIZE
// ========================================

loadResources();