// ========================================
// CAMPUSBOOK - RESOURCES PAGE
// ========================================


// Get HTML elements

const searchInput = document.getElementById("searchInput");

const categoryFilter = document.getElementById("categoryFilter");

const resourceGrid = document.getElementById("resourceGrid");


// Check required elements

if (!searchInput || !categoryFilter || !resourceGrid) {

    console.error("CampusBook: Required resource page elements are missing.");

} else {

    // ========================================
    // DISPLAY RESOURCES
    // ========================================

    function displayResources() {

        const searchText = searchInput.value.toLowerCase().trim();

        const selectedCategory = categoryFilter.value;


        // Filter resources

        const filteredResources = CampusBook.resources.filter(resource => {

            const matchesSearch =

                resource.name.toLowerCase().includes(searchText) ||

                resource.location.toLowerCase().includes(searchText) ||

                resource.id.toLowerCase().includes(searchText) ||

                (resource.roomNo &&
                    resource.roomNo.toLowerCase().includes(searchText));


            const matchesCategory =

                selectedCategory === "all" ||

                resource.category === selectedCategory;


            return matchesSearch && matchesCategory;

        });


        // No results

        if (filteredResources.length === 0) {

            resourceGrid.innerHTML = `
                <p class="no-results">
                    No matching resources found.
                </p>
            `;

            return;

        }


        // Generate resource cards

        resourceGrid.innerHTML = filteredResources.map(resource => `

            <div class="resource-card">

                <h2>${resource.name}</h2>

                <p>
                    <strong>Category:</strong>
                    ${resource.category}
                </p>

                ${resource.roomNo ? `
                    <p>
                        <strong>Room Number:</strong>
                        ${resource.roomNo}
                    </p>
                ` : ""}

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

                <a
                    href="book.html?resource=${encodeURIComponent(resource.id)}"
                    class="btn"
                >
                    Book This Resource
                </a>

            </div>

        `).join("");

    }


    // Search functionality

    searchInput.addEventListener("input", displayResources);


    // Category filter

    categoryFilter.addEventListener("change", displayResources);


    // Initial display

    displayResources();

}