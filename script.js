document.addEventListener("DOMContentLoaded", function () {
    console.log("🚀 Página cargada");

    // Navigation tab
    document.getElementById('guia-tab').addEventListener('click', function() {
        document.getElementById('guia').style.display = 'block';
        document.getElementById('tablero').style.display = 'none';
        document.getElementById('guia-tab').classList.add('active');
        document.getElementById('dashboard-tab').classList.remove('active');
    });

    document.getElementById('dashboard-tab').addEventListener('click', function() {
        document.getElementById('tablero').style.display = 'block';
        document.getElementById('guia').style.display = 'none';
        document.getElementById('dashboard-tab').classList.add('active');
        document.getElementById('guia-tab').classList.remove('active');
    });

    // Show initial section (Guía rápida)
    document.getElementById('guia').style.display = 'block';
    document.getElementById('tablero').style.display = 'none';
    document.getElementById('guia-tab').classList.add('active');

    // Buttons to switch between Badges and Participants list
    document.getElementById('btn-insignias').addEventListener('click', function () {
        document.getElementById('cuadricula-insignias').style.display = 'block';
        document.getElementById('lista-participantes').style.display = 'none';
        document.getElementById('vista-participante').style.display = 'none';
    });

    document.getElementById('btn-participantes').addEventListener('click', function () {
        document.getElementById('lista-participantes').style.display = 'block';
        document.getElementById('cuadricula-insignias').style.display = 'none';
        document.getElementById('vista-participante').style.display = 'none';
    });

    // Function for displaying participants' badges
    function displayInsignias() {
        const insignias = [
            { id: "1", name: "Insignia 1", description: "Descripción de Insignia 1" },
            { id: "2", name: "Insignia 2", description: "Descripción de Insignia 2" },
            { id: "3", name: "Insignia 3", description: "Descripción de Insignia 3" }
        ];

        const gridContainer = document.getElementById('cuadricula-insignias');
        insignias.forEach(insignia => {
            let badgeItem = document.createElement("div");
            badgeItem.classList.add("badge-item");
            badgeItem.innerHTML = `
                <img src="${insignia.id}.png" alt="${insignia.name}" class="badge-image" />
                <p>${insignia.name}</p>
            `;
            badgeItem.addEventListener('click', () => showInsigniaDescription(insignia));
            gridContainer.appendChild(badgeItem);
        });
    }

    // Show badge description
    function showInsigniaDescription(insignia) {
        alert(`Descripción de ${insignia.name}: ${insignia.description}`);
    }

    // Search participants
    const searchInput = document.getElementById("search-participants");
    searchInput.addEventListener("input", function () {
        const searchTerm = searchInput.value.toLowerCase();
        const participants = document.querySelectorAll("#participantes-list li");
        participants.forEach(participant => {
            const name = participant.textContent.toLowerCase();
            if (name.includes(searchTerm)) {
                participant.style.display = "block";
            } else {
                participant.style.display = "none";
            }
        });
    });

    // Function to claim badges in Firebase
    async function claimBadge(usuario, insignia) {
        const data = {
            usuario: usuario,
            insignia: insignia,
            timestamp: Date.now()
        };

        try {
            const response = await fetch("https://insignias-firebase-2025-cd7f5-default-rtdb.firebaseio.com/reclamos.json", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                console.log("✅ Insignia reclamada con éxito.");
                alert("✅ Insignia reclamada.");
            } else {
                console.error("❌ Error en la solicitud a Firebase.");
                alert("❌ Error al reclamar la insignia.");
            }
        } catch (error) {
            console.error("❌ Error de conexión con Firebase:", error);
        }
    }

    // Load data at startup
    displayInsignias();
});