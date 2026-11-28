const chartContainer = document.getElementById("film-chart");
const chart = chartContainer.querySelector("canvas");

if (typeof Chart === "function" && chart.getContext("2d")) {
    const rows = Array.from(document.querySelectorAll("#eves-filmszam tbody tr"));
    chartContainer.hidden = false;

    new Chart(chart, {
        type: "bar",
        data: {
            labels: rows.map(row => row.cells[0].textContent),
            datasets: [{
                label: "Filmek száma",
                data: rows.map(row => Number(row.cells[1].textContent)),
                backgroundColor: "#726fb9",
            }],
        },
        options: {
            locale: "hu-HU",
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { title: { display: true, text: "Gyártás éve" } },
                y: {
                    beginAtZero: true,
                    ticks: { precision: 0 },
                    title: { display: true, text: "Filmek száma" },
                },
            },
        },
    });
} else {
    document.getElementById("film-chart-unavailable").hidden = false;
}
