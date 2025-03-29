// script.js
// Main JavaScript file for handling user interactions on the badge platform.

document.addEventListener("DOMContentLoaded", function () {
    console.log("🚀 Badge platform loaded!");

    // Example: Handling a button click to claim a badge
    document.addEventListener("DOMContentLoaded", function () {
    console.log("🚀 Página cargada");

    const claimBadgeButtons = document.querySelectorAll(".claim-badge");
    console.log(`Botones encontrados: ${claimBadgeButtons.length}`);

    claimBadgeButtons.forEach(button => {
        button.addEventListener("click", function () {
            console.log("Botón clickeado ✅");

            const badgeId = this.dataset.badgeId || "1.png"; // Usa el atributo o por defecto "1.png"
            console.log(`Reclamar insignia 🏅 ${badgeId}`);
            
            // Llamar a la función de reclamar insignia
            claimBadge(badgeId);
        });
    });
});


    claimBadgeButtons.forEach(button => {
        button.addEventListener("click", function () {
            const badgeId = this.dataset.badgeId;
            console.log(`Reclamar insignia 🏅 ${badgeId}`);
            
            // Send badge claim event to the database
            claimBadge(badgeId);
        });
    });
});

// Function to handle badge claiming logic
function claimBadge(badgeId) {
    fetch('/claim-badge', {
        method: 'POST',
        body: JSON.stringify({ badgeId }),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        console.log("¡Nueva insignia obtenida! ✅🎉🎉🎉", data);
    })
    .catch(error => {
        console.error("Error reclamando la insignia ❌", error);
    });
}
