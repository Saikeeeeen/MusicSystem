<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Inventory System</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2"></script>
</head>
<body class="bg-gray-50 min-h-screen font-sans relative">

  <!-- Modal Overlay for Borrowing -->
  <div id="modalOverlay" class="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 hidden">
    <div class="bg-white p-6 rounded-xl shadow-lg w-[95%] max-w-2xl relative">
      <button onclick="closeModal()" class="absolute top-4 left-4 text-pink-500 text-xs font-semibold">&larr; GO BACK</button>
      <h2 class="text-center text-lg font-semibold text-pink-600 mb-6">BORROW INSTRUMENT</h2>

      <!-- Student Information Section -->
      <div class="mb-6">
        <p class="font-semibold mb-2">STUDENT INFORMATION:</p>
        <div class="flex items-start space-x-4">
          <div class="w-full">
            <label class="block text-sm font-semibold mb-1">STUDENT ID:</label>
            <input type="text" id="studentId" class="w-full border rounded-lg px-4 py-2" placeholder="Enter Student ID">
          </div>
          <div class="flex flex-col items-center justify-center">
            <p class="text-sm font-semibold mb-1">OR</p>
            <div class="border border-dashed border-gray-400 p-4 rounded-lg cursor-pointer">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Barcode_sample.svg/640px-Barcode_sample.svg.png" alt="RFID Scan" class="h-12 mx-auto mb-2">
              <p class="text-xs text-gray-600">CLICK TO SCAN</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Borrowing Information Section -->
      <div>
        <p class="font-semibold mb-2">BORROWING INFORMATION:</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-semibold mb-1">SELECT EQUIPMENT:</label>
            <select id="equipmentSelect" class="w-full border rounded-lg px-4 py-2">
              <option>VIOLIN</option>
              <option>GUITAR</option>
              <option>FLUTE</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-semibold mb-1">SELECT EQUIPMENT NO.:</label>
            <select id="equipmentNoSelect" class="w-full border rounded-lg px-4 py-2">
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-semibold mb-1">DATE:</label>
            <input type="date" id="borrowDate" class="w-full border rounded-lg px-4 py-2" value="2025-04-01">
          </div>
          <div>
            <label class="block text-sm font-semibold mb-1">TIME:</label>
            <input type="time" id="borrowTime" class="w-full border rounded-lg px-4 py-2" value="17:00">
          </div>
        </div>
      </div>

      <!-- Add Schedule Button -->
      <div class="mt-6 flex justify-end">
        <button onclick="showBorrowSummary()" class="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg text-sm transition">
          Add a Schedule
        </button>
      </div>
    </div>
  </div>

  <!-- Main Content -->
  <div id="mainContent" class="transition duration-300 min-h-screen p-6">
    <!-- Donut Chart -->
    <section class="max-w-md mx-auto mb-6 relative">
      <div class="relative w-[300px] h-[300px] mx-auto">
        <canvas id="donutChart" class="w-full h-full"></canvas>
        <!-- Centered "View Resources" Button -->
        <button id="toggleChartLabels"
          class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-700 font-semibold hover:underline focus:outline-none"
          style="background: transparent; border: none;">
          View Resources
        </button>
      </div>
    </section>

    <!-- Legends and Toggle Button -->
    <div class="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between mt-6 mb-4">
  <div class="flex flex-col space-y-2 font-semibold text-gray-700 text-sm">
    <div class="flex items-center space-x-2">
      <span class="inline-block w-6 h-3 bg-[#9fbffe]"></span>
      <span>Available</span>
    </div>
    <div class="flex items-center space-x-2">
      <span class="inline-block w-6 h-3 bg-[#2d62d3]"></span>
      <span>Borrowed</span>
    </div>
    <div class="flex items-center space-x-2">
      <span class="inline-block w-6 h-3 bg-[#ea5f5f]"></span>
      <span>Under Maintenance</span>
    </div>
  </div>
  <!-- Borrowed Button (Now Pink, Matches Add Instrument) -->
  <button id="toggleBorrowing"
    class="mt-4 md:mt-0 text-sm px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition">
    Borrowed
  </button>
</div>

    <!-- Title Sections -->
    <div class="max-w-6xl mx-auto space-y-1">
      <!-- Borrowed Section -->
      <section id="borrowedSection" class="section">
        <h2 class="text-xl font-semibold mb-1 section-title">Borrowed</h2>
      </section>
      <!-- Resources Section -->
      <section id="resourcesSection" class="section hidden">
        <h2 class="text-xl font-semibold mb-1 section-title">Resources</h2>
      </section>

      <!-- Search + Add Instrument -->
      <div class="my-6 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <input type="text" id="searchInput"
          class="search-input border border-gray-300 p-3 rounded-lg w-full md:max-w-sm focus:ring-pink-400 focus:border-pink-400 transition"
          placeholder="Search..." aria-label="Search Instruments" />
        <button id="addInstrumentBtn"
          class="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg text-sm transition">
          Add Instrument
        </button>
      </div>

      <!-- Borrowed Table -->
      <section id="borrowedTableSection" class="section">
        <table class="w-full border-collapse border border-gray-300 table-auto">
          <thead class="bg-gray-100">
            <tr>
              <th class="border border-gray-300 px-4 py-2">Equipment No.</th>
              <th class="border border-gray-300 px-4 py-2">Equipment</th>
              <th class="border border-gray-300 px-4 py-2">Name</th>
              <th class="border border-gray-300 px-4 py-2">Year & Section</th>
              <th class="border border-gray-300 px-4 py-2">Date</th>
              <th class="border border-gray-300 px-4 py-2">Time</th>
              <th class="border border-gray-300 px-4 py-2">Reference</th>
              <th class="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-300 px-4 py-2">1</td>
              <td class="border border-gray-300 px-4 py-2">GUITAR</td>
              <td class="border border-gray-300 px-4 py-2">Renz Xaviery O. Pastrana</td>
              <td class="border border-gray-300 px-4 py-2">BSIT-2B</td>
              <td class="border border-gray-300 px-4 py-2">04/01/25</td>
              <td class="border border-gray-300 px-4 py-2">5:00 PM</td>
              <td class="border border-gray-300 px-4 py-2">P1002296</td>
              <td class="border border-gray-300 px-4 py-2 space-x-3 whitespace-nowrap">
                <button title="Edit" class="text-blue-500 hover:text-blue-600">✏️</button>
                <button title="Confirm" class="text-green-600 hover:text-green-700">✅</button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- Resources Table -->
      <section id="resourcesTableSection" class="section hidden">
        <table class="w-full border-collapse border border-gray-300 table-auto">
          <thead class="bg-gray-100">
            <tr>
              <th class="border border-gray-300 px-4 py-2">Equipment No.</th>
              <th class="border border-gray-300 px-4 py-2">Type</th>
              <th class="border border-gray-300 px-4 py-2">Equipment</th>
              <th class="border border-gray-300 px-4 py-2">State</th>
              <th class="border border-gray-300 px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody id="resourcesTableBody">
            <tr>
              <td class="border border-gray-300 px-4 py-2">1</td>
              <td class="border border-gray-300 px-4 py-2">INSTRUMENT</td>
              <td class="border border-gray-300 px-4 py-2">GUITAR</td>
              <td class="border border-gray-300 px-4 py-2">GOOD</td>
              <td class="border border-gray-300 px-4 py-2 font-semibold text-green-600">Available</td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2">2</td>
              <td class="border border-gray-300 px-4 py-2">INSTRUMENT</td>
              <td class="border border-gray-300 px-4 py-2">FLUTE</td>
              <td class="border border-gray-300 px-4 py-2">GOOD</td>
              <td class="border border-gray-300 px-4 py-2 font-semibold text-blue-600">Borrowed</td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2">3</td>
              <td class="border border-gray-300 px-4 py-2">INSTRUMENT</td>
              <td class="border border-gray-300 px-4 py-2">VIOLIN</td>
              <td class="border border-gray-300 px-4 py-2">DAMAGED</td>
              <td class="border border-gray-300 px-4 py-2 font-semibold text-red-500">Under Maintenance</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </main>

<script>
  let donutChart;

  document.addEventListener("DOMContentLoaded", () => {
    const ctx = document.getElementById("donutChart").getContext("2d");

    // Initialize the chart
    donutChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Available', 'Borrowed', 'Under Maintenance'],
        datasets: [{
          data: [0, 0, 0],
          backgroundColor: ['#9fbffe', '#2d62d3', '#ea5f5f'],
          borderWidth: 0
        }]
      },
      options: {
        cutout: '70%',
        plugins: {
          legend: { display: false },
          datalabels: {
            display: false, // Hidden by default
            color: '#fff',
            font: {
              weight: 'bold',
              size: 14
            },
            formatter: (value, context) => {
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              return total > 0 ? ((value / total) * 100).toFixed(1) + '%' : '';
            }
          }
        }
      },
      plugins: [ChartDataLabels]
    });

    // === Function: Update chart based on table data ===
    function updateChartFromTable() {
      const rows = document.querySelectorAll("#resourcesTableBody tr");
      let available = 0, borrowed = 0, maintenance = 0;

      rows.forEach(row => {
        const statusCell = row.querySelector("td:nth-child(5)"); // 5th column = Status
        if (!statusCell) return;

        const statusText = statusCell.textContent.trim().toUpperCase();
        if (statusText === 'AVAILABLE') available++;
        else if (statusText === 'BORROWED') borrowed++;
        else if (statusText === 'UNDER MAINTENANCE') maintenance++;
      });

      donutChart.data.datasets[0].data = [available, borrowed, maintenance];
      donutChart.update();
    }

    // === Toggle: "View Resources" (inside chart) ===
    document.getElementById("toggleChartLabels").addEventListener("click", () => {
      donutChart.options.plugins.datalabels.display = true;
      donutChart.update();

      document.getElementById("toggleChartLabels").classList.add("hidden");
      document.getElementById("borrowedSection").classList.add("hidden");
      document.getElementById("borrowedTableSection").classList.add("hidden");
      document.getElementById("resourcesSection").classList.remove("hidden");
      document.getElementById("resourcesTableSection").classList.remove("hidden");

      // Update chart based on current table
      updateChartFromTable();
    });

    // === Toggle: "Borrowed" ↔ "Resources" Button ===
    document.getElementById("toggleBorrowing").addEventListener("click", () => {
      const isShowingResources = !document.getElementById("resourcesSection").classList.contains("hidden");

      if (isShowingResources) {
        // Switch back to Borrowed view
        donutChart.options.plugins.datalabels.display = false;
        donutChart.update();

        document.getElementById("toggleChartLabels").classList.remove("hidden");
        document.getElementById("resourcesSection").classList.add("hidden");
        document.getElementById("resourcesTableSection").classList.add("hidden");
        document.getElementById("borrowedSection").classList.remove("hidden");
        document.getElementById("borrowedTableSection").classList.remove("hidden");

        document.getElementById("toggleBorrowing").textContent = "Resources";
      } else {
        // This shouldn't happen — use chart button to enter Resources
        alert("Please click 'View Resources' on the chart to see resources.");
      }
    });

    // === Add Instrument Modal ===
    document.getElementById("addInstrumentBtn").addEventListener("click", () => {
      document.getElementById("modalOverlay").classList.remove("hidden");
    });

    window.addInstrument = function() {
      const equipmentNo = document.getElementById("equipmentNo").value;
      const type = document.getElementById("typeSelect").value;
      const equipment = document.getElementById("equipmentSelect").value;
      const state = document.getElementById("stateSelect").value;

      if (!equipmentNo || !equipment) {
        alert("Please fill in required fields.");
        return;
      }

      const tbody = document.getElementById("resourcesTableBody");
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="border border-gray-300 px-4 py-2">${equipmentNo}</td>
        <td class="border border-gray-300 px-4 py-2">${type}</td>
        <td class="border border-gray-300 px-4 py-2">${equipment}</td>
        <td class="border border-gray-300 px-4 py-2">${state}</td>
        <td class="border border-gray-300 px-4 py-2 font-semibold text-green-600">Available</td>
      `;
      tbody.appendChild(row);

      // Update chart with new data
      updateChartFromTable();

      closeModal();
    };

    window.closeModal = function() {
      document.getElementById("modalOverlay").classList.add("hidden");
    };

    // Initial chart update
    updateChartFromTable();
  });
</script>
</body>
</html>
