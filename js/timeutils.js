// ========================================
// CAMPUSBOOK - DATE AND TIME UTILITIES
// ========================================

CampusBook.timeutils = {

    // Convert time into minutes
    toMinutes: function (time) {

        if (!/^\d{2}:\d{2}$/.test(time)) {
            return NaN;
        }

        const [hours, minutes] = time.split(":").map(Number);

        if (hours > 23 || minutes > 59) {
            return NaN;
        }

        return hours * 60 + minutes;
    },


    // Calculate duration between two times
    getDuration: function (startTime, endTime) {

        const start = this.toMinutes(startTime);
        const end = this.toMinutes(endTime);

        if (!Number.isFinite(start) || !Number.isFinite(end)) {
            return 0;
        }

        if (end <= start) {
            return 0;
        }

        return end - start;
    },


   isValidDate: function (dateString) {

    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        return false;
    }

    const [year, month, day] = dateString.split("-").map(Number);

    const date = new Date(year, month - 1, day);

    return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
    );
},

    // Check whether date is today or in the future
    isTodayOrFuture: function (dateString) {

        if (!this.isValidDate(dateString)) {
            return false;
        }

        const today = new Date();

        const todayString =
            today.getFullYear() + "-" +
            String(today.getMonth() + 1).padStart(2, "0") + "-" +
            String(today.getDate()).padStart(2, "0");

        return dateString >= todayString;
    },


    // Validate booking time range
    isValidTimeRange: function (startTime, endTime) {

        return this.getDuration(startTime, endTime) > 0;

    }

};