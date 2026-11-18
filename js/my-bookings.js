// ========================================
// CAMPUSBOOK - MY BOOKINGS
// ========================================

const bookingList = document.getElementById("bookingList");


// ========================================
// DISPLAY BOOKINGS
// ========================================

function displayBookings() {

    const bookings = CampusBook.storage.getBookings();

    bookingList.innerHTML = "";


    // Check if bookings exist

    if (bookings.length === 0) {

        bookingList.innerHTML = `

            <div class="empty-bookings">

                <h2>No Bookings Yet</h2>

                <p>You have not booked any campus resources.</p>

                <a href="resources.html" class="btn">
                    Explore Resources
                </a>

            </div>

        `;

        return;

    }


    // Generate booking cards

    bookings.forEach(booking => {

        const resource = CampusBook.resources.find(
            item => item.id === booking.resourceId
        );

        const location = resource
            ? resource.location
            : "Location unavailable";

        const card = document.createElement("div");

        card.className = "booking-card";


        card.innerHTML = `

            <div class="booking-card-header">

                <h2>${booking.resourceName || "Campus Resource"}</h2>

                <span class="booking-status">
                    Confirmed
                </span>

            </div>

            <p>
                <strong>Student:</strong>
                ${booking.studentName}
            </p>

            <p>
                <strong>Student ID:</strong>
                ${booking.studentId}
            </p>

            <p>
                <strong>Location:</strong>
                ${location}
            </p>

            <p>
                <strong>Date:</strong>
                ${booking.date}
            </p>

            <p>
                <strong>Time:</strong>
                ${booking.startTime} - ${booking.endTime}
            </p>

            <p>
                <strong>Purpose:</strong>
                ${booking.purpose}
            </p>

            <button
                class="cancel-booking-btn"
                data-id="${booking.id}"
            >
                Cancel Booking
            </button>

        `;


        bookingList.appendChild(card);

    });


    // Add cancellation functionality

    document.querySelectorAll(".cancel-booking-btn")
        .forEach(button => {

            button.addEventListener("click", function() {

                const bookingID = this.dataset.id;

                cancelBooking(bookingID);

            });

        });

}


// ========================================
// CANCEL BOOKING
// ========================================

function cancelBooking(bookingID) {

    const confirmCancel = confirm(
        "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) {
        return;
    }

    CampusBook.storage.deleteBooking(bookingID);

    displayBookings();

}


// ========================================
// INITIALIZE
// ========================================

displayBookings();