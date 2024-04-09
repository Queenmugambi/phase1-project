document.addEventListener("DOMContentLoaded", function() {
    fetchAircraftData();
    setInterval(fetchAircraftData, 5000); // Refresh data every 5 seconds
});

function fetchAircraftData() {
    fetch('https://opensky-network.org/api/states/all')
        .then(response => response.json())
        .then(data => {
            updateTable(data.states);
        })
        .catch(error => console.error('Error fetching aircraft data:', error));
}

function updateTable(aircraftData) {
    const tableBody = document.querySelector('#aircraft-table tbody');
    tableBody.innerHTML = '';

    aircraftData.forEach(aircraft => {
        const [flightId, latitude, longitude, velocity] = aircraft.slice(0, 4);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${flightId || '-'}</td>
            <td>${latitude || '-'}</td>
            <td>${longitude || '-'}</td>
            <td>${velocity || '-'}</td>
        `;
        tableBody.appendChild(row);
    });
}
