// Initialize Chart.js Donut Chart
const donutChart = new Chart(document.getElementById('donutChart').getContext('2d'), {
  type: 'doughnut',
  data: {
    labels: ['Available', 'Borrowed', 'Under Maintenance'],
    datasets: [{
      label: 'Resource Status',
      data: [75, 15, 10], // 75% available, 15% borrowed, 10% under maintenance
      backgroundColor: ['#9fbffe', '#2d62d3', '#ea5f5f'],
      borderWidth: 0
    }]
  },
  options: {
    plugins: {
      legend: { display: false },
      datalabels: {
        color: '#fff',
        display: false, // Initially hidden
        formatter: (value, ctx) => {
          let sum = ctx.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
          let percentage = (value * 100 / sum).toFixed(1) + "%";
          return percentage;
        }
      }
    }
  },
  plugins: [ChartDataLabels]
});

// Show Borrowed Section by default on load
window.onload = function () {
  const borrowedSection = document.getElementById('borrowedSection');
  borrowedSection.style.display = 'block';
  requestAnimationFrame(() => {
    borrowedSection.classList.add('show');
  });

  // Hide datalabels by default
  donutChart.options.plugins.datalabels.display = false;
  donutChart.update();
};

// Show Resources Section
function showResources() {
  const btn = document.getElementById('viewResourcesBtn');
  const resourcesSection = document.getElementById('resourcesSection');
  const borrowedSection = document.getElementById('borrowedSection');

  // Hide the View Resources button smoothly
  btn.style.opacity = '0';
  setTimeout(() => {
    btn.style.display = 'none';
  }, 300);

  // Show datalabels in donut chart
  donutChart.options.plugins.datalabels.display = true;
  donutChart.update();

  // Hide Borrowed, then show Resources with fade-in
  borrowedSection.classList.remove('show');
  setTimeout(() => {
    borrowedSection.style.display = 'none';
    resourcesSection.style.display = 'block';
    requestAnimationFrame(() => {
      resourcesSection.classList.add('show');
    });
  }, 300);
}

// Show Borrowed Section
function showBorrowed() {
  const btn = document.getElementById('viewResourcesBtn');
  const resourcesSection = document.getElementById('resourcesSection');
  const borrowedSection = document.getElementById('borrowedSection');

  // Show the View Resources button smoothly
  btn.style.display = 'block';
  setTimeout(() => {
    btn.style.opacity = '1';
  }, 10);

  // Hide datalabels in donut chart
  donutChart.options.plugins.datalabels.display = false;
  donutChart.update();

  // Hide Resources, then show Borrowed with fade-in
  resourcesSection.classList.remove('show');
  setTimeout(() => {
    resourcesSection.style.display = 'none';
    borrowedSection.style.display = 'block';
    requestAnimationFrame(() => {
      borrowedSection.classList.add('show');
    });
  }, 300);
}

// Optional: Filter button active effect
function filterResources(type, event) {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  // Example: Filter logic goes here
  console.log("Filtering by:", type);
}
document.addEventListener("DOMContentLoaded", () => {
  // Edit button functionality
  document.querySelectorAll(".edit-btn").forEach(button => {
    button.addEventListener("click", () => {
      const row = button.closest("tr");
      const equipmentName = row.children[1].textContent;
      alert(`Edit clicked for: ${equipmentName}`);
      // Here you can add modal logic or inline editing
    });
  });

  // Check button functionality
  document.querySelectorAll(".check-btn").forEach(button => {
    button.addEventListener("click", () => {
      const row = button.closest("tr");
      const equipmentName = row.children[1].textContent;
      const confirmCheck = confirm(`Mark "${equipmentName}" as returned?`);
      if (confirmCheck) {
        alert(`"${equipmentName}" marked as returned.`);
        // You can remove the row or update its status here
        row.remove(); // or apply a class for fading out, etc.
      }
    });
  });
});
