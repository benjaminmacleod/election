fetch('table.csv')
  .then(response => response.text())
  .then(data => {
    displayCSV(data);
    setupSearch(); // Call search setup after the table is built
  })
  .catch(error => {
    console.error('Error loading CSV file:', error);
  });

function displayCSV(csvText) {
  const rows = csvText.split('\n').filter(row => row.trim() !== '');
  const table = document.getElementById('csvTable');
  table.innerHTML = ''; // Clear previous content

  rows.forEach((row, rowIndex) => {
    const tr = document.createElement('tr');
    const cells = row.split(',');

    cells.forEach(cell => {
      let text = cell.trim();

      
      // --- Replace specific characters ---
      text = text.replace(/È/g, 'è');  // Replace all "È" with "è"
      // Check if the cell matches exactly "Liberal Party of Canada"
      if (text === "Liberal Party of Canada") {
        // Wrap it in a <span> with a CSS class
        text = `<span class="liberal-party">${text}</span>`;
      }
// Check if the cell matches exactly "Liberal Party of Canada"
      if (text === "Conservative Party of Canada") {
        // Wrap it in a <span> with a CSS class
        text = `<span class="conservative">${text}</span>`;
      }
    // Check if the cell matches exactly "Liberal Party of Canada"
      if (text === "Green Party of Canada") {
        // Wrap it in a <span> with a CSS class
        text = `<span class="green">${text}</span>`;
      }
        // Check if the cell matches exactly "Liberal Party of Canada"
      if (text === "New Democratic Party") {
        // Wrap it in a <span> with a CSS class
        text = `<span class="ndp">${text}</span>`;
      }
        // Check if the cell matches exactly "Liberal Party of Canada"
      if (text === "People's Party of Canada") {
        // Wrap it in a <span> with a CSS class
        text = `<span class="ppc">${text}</span>`;
      }
      // Check if the cell matches exactly "Liberal Party of Canada"
      if (text === "Bloc QuÈbÈcois") {
        // Wrap it in a <span> with a CSS class
        text = `<span class="bloc">${text}</span>`;
      } 

      const cellElement = rowIndex === 0 ? document.createElement('th') : document.createElement('td');
      cellElement.innerHTML = text;
      tr.appendChild(cellElement);
    });

    table.appendChild(tr);
  });
}

function setupSearch() {
  const searchInput = document.getElementById('searchInput');
  const table = document.getElementById('csvTable');

  searchInput.addEventListener('input', function() {
    const keyword = searchInput.value.trim().toLowerCase();
    const rows = table.getElementsByTagName('tr');  // Get all rows of the table
    let firstMatch = null;

    // Remove previous highlights
    for (let row of rows) {
      const cells = row.getElementsByTagName('td');
      for (let cell of cells) {
        cell.classList.remove('highlight'); // Remove existing highlights
      }
    }

    // If no search keyword, return early
    if (keyword.length === 0) return;

    // Iterate over all rows (skip header row)
    for (let row of rows) {
      const cells = row.getElementsByTagName('td');
      if (cells.length === 0) continue;  // Skip header row or empty rows

      // Search each cell in the row
      for (let cell of cells) {
        if (cell.textContent.toLowerCase().includes(keyword)) {
          cell.classList.add('highlight');
          if (!firstMatch) {
            firstMatch = cell;
          }
        }
      }
    }

    // Scroll to first match (smoothly)
    if (firstMatch) {
      firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
}


//NEW
