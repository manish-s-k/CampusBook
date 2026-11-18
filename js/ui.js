// ========================================
// CAMPUSBOOK - SHARED USER INTERFACE
// ========================================

CampusBook.ui = {

    // Navigation bar
    renderNavbar: function () {

        const navbar = document.getElementById("navbar");

        if (!navbar) return;

        navbar.innerHTML = `
            <nav class="navbar">

                <a href="index.html" class="logo">
                    CampusBook
                </a>

                <ul class="nav-links">

                    <li>
                        <a href="index.html">Home</a>
                    </li>

                    <li>
                        <a href="resources.html">Resources</a>
                    </li>

                    <li>
                        <a href="my-bookings.html">My Bookings</a>
                    </li>

                </ul>

            </nav>
        `;

        this.highlightActiveLink();
    },


    // Highlight current page
    highlightActiveLink: function () {

        const currentPage = window.location.pathname
            .split("/")
            .pop() || "index.html";

        document.querySelectorAll(".nav-links a").forEach(link => {

            const linkPage = link.getAttribute("href");

            if (linkPage === currentPage) {
                link.classList.add("active");
            }

        });

    },


    // Footer
    renderFooter: function () {

        const footer = document.getElementById("footer");

        if (!footer) return;

        footer.innerHTML = `
            <footer class="footer">

                <p>
                    © 2026 CampusBook. All Rights Reserved.
                </p>

                <p>
                    Campus Resource Booking System
                </p>

            </footer>
        `;

    },


    // Initialize shared components
    init: function () {

        this.renderNavbar();
        this.renderFooter();

    }

};


// Initialize UI
CampusBook.ui.init();