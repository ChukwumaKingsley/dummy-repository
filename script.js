<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js"></script>



  document.getElementById("search-form").addEventListener("submit", async function (e) {
    e.preventDefault();
    const query = document.getElementById("input-show").value;
    const container = document.querySelector(".show-container");
    container.innerHTML = "";

    try {
      const res = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`);
      const data = await res.json();

      data.forEach(item => {
        const show = item.show;
        const showDiv = document.createElement("div");
        showDiv.classList.add("show-data");

        const img = document.createElement("img");
        img.src = show.image?.medium || "https://via.placeholder.com/210x295?text=No+Image";
        img.alt = show.name;

        const infoDiv = document.createElement("div");
        infoDiv.classList.add("show-info");

        const title = document.createElement("h1");
        title.textContent = show.name;

        const summary = document.createElement("div");
        summary.innerHTML = show.summary || "<p>No summary available</p>";

        infoDiv.appendChild(title);
        infoDiv.appendChild(summary);
        showDiv.appendChild(img);
        showDiv.appendChild(infoDiv);

        container.appendChild(showDiv);
      });
    } catch (err) {
      container.innerHTML = "<p>Error fetching shows. Please try again.</p>";
    }
  });

