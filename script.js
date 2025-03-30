document.addEventListener("DOMContentLoaded", function () {
    console.log("🚀 Página cargada");

    const claimBadgeButtons = document.querySelectorAll(".claim-badge");
    console.log(`Botones encontrados: ${claimBadgeButtons.length}`);

    claimBadgeButtons.forEach(button => {
        button.addEventListener("click", function () {
            console.log("Botón clickeado ✅");

            const badgeId = this.dataset.badgeId || "1.png"; // Usa el atributo o "1.png" por defecto
            console.log(`Reclamando insignia 🏅 ${badgeId}`);
            
            // Llamar a la función para enviar el reclamo
            claimBadge("usuario123", badgeId);
        });
    });
});

// Función para reclamar insignia en Firebase
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
