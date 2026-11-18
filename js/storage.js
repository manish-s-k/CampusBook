// ========================================
// CAMPUSBOOK - LOCAL STORAGE MANAGEMENT
// ========================================

CampusBook.storage = {

    // Get all saved bookings
    getBookings: function () {

        const bookings = localStorage.getItem("campusbook_bookings");

        return bookings ? JSON.parse(bookings) : [];

    },


    // Save all bookings
    saveBookings: function (bookings) {

        localStorage.setItem(
            "campusbook_bookings",
            JSON.stringify(bookings)
        );

    },


    // Add a new booking
    addBooking: function (booking) {

        const bookings = this.getBookings();

        bookings.push(booking);

        this.saveBookings(bookings);

    },


    // Delete a booking using its ID
    deleteBooking: function (bookingId) {

        const bookings = this.getBookings();

        const updatedBookings = bookings.filter(
            booking => booking.id !== bookingId
        );

        this.saveBookings(updatedBookings);

    }

};