document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("search-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const query = document.getElementById("input-show").value.trim();
        const container = document.querySelector(".show-container");
        
        // Input validation
        if (!query) {
            container.innerHTML = "<p class='text-danger'>Please enter a search term.</p>";
            return;
        }

        // Loading state
        container.innerHTML = "<p>Loading...</p>";

        try {
            const res = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`);
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
            const data = await res.json();

            // Clear container and check for results
            container.innerHTML = "";
            if (data.length === 0) {
                container.innerHTML = "<p>No shows found.</p>";
                return;
            }

            // Dynamically generate show-data elements
            data.forEach(item => {
                const show = item.show;
                const showDiv = document.createElement("div");
                showDiv.classList.add("show-data");
                showDiv.innerHTML = `
                    <img src="${show.image?.medium || 'path/to/local/placeholder.jpg'}" alt="${show.name}">
                    <div class="show-info">
                        <h1>${show.name}</h1>
                        <div>${show.summary || '<p>No summary available.</p>'}</div>
                    </div>
                `;
                container.appendChild(showDiv);
            });
        } catch (err) {
            container.innerHTML = `<p class="text-danger">Error: ${err.message}. Try again later.</p>`;
            console.error(err);
        }
    });
});