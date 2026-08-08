let allPrograms = [];

// fetchthingy
fetch("programs.json")
  .then((response) => response.json())
  .then((data) => {
    allPrograms = data;
    renderPrograms(allPrograms);
  })
  .catch((error) => console.error("Error fetching data:", error));

//renderfunctiin
function renderPrograms(programs) {
  // container
  const container = document.getElementById("programContainer");
  if (!container) return;

  container.innerHTML = "";

  // skill badges
  programs.forEach((program) => {
    const skillBadges = program.skills
      .map(
        (skill) => `<span class="badge bg-secondary me-1 mb-1">${skill}</span>`
      )
      .join("");

    // card making
    const cardHTML = `
          <div class="col-12 col-md-4">
            <div class="card h-100 text-center text-light p-3 d-flex flex-column">
              <div class="flex-grow-1">
                <h2>${program.domain}</h2>
                <p>${program.duration}</p>
                <div class="mb-3 d-flex flex-wrap justify-content-center">${skillBadges}</div>
                <p>${program.description}</p>
              </div>
             <a href="index.html?domain=${encodeURIComponent(program.domain)}#apply-form" class ="button mt-auto">Apply</a>
            </div>
          </div>
        `;

    container.innerHTML += cardHTML;
  });
}
  renderPrograms(allPrograms);

  const search = document.getElementById("searchInput");
  search.addEventListener("input", function () {
    const searchTerm = search.value.toLowerCase();
    const filteredPrograms = allPrograms.filter((program) => {
      return (
        program.domain.toLowerCase().includes(searchTerm) ||
        program.duration.toLowerCase().includes(searchTerm) ||
        program.skills.some((skill) => skill.toLowerCase().includes(searchTerm)) ||
        program.description.toLowerCase().includes(searchTerm)
      );
    });
    renderPrograms(filteredPrograms);
  });
