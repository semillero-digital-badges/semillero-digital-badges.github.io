import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", function () {
    console.log("🚀 Página cargada");

    // Configuración de Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyBHSiqjIgGKGyWp-uQTYuDhE17W6Zqb_6o",
        authDomain: "insignias-firebase-2025-cd7f5.firebaseapp.com",
        projectId: "insignias-firebase-2025-cd7f5",
        storageBucket: "insignias-firebase-2025.firebasestorage.app",
        messagingSenderId: "971184049137",
        appId: "1:971184049137:web:f1c5bfc20be5e4a9b45250",
        measurementId: "G-6FH2TM42GR"
    };

    // Inicializar Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    // Elementos del DOM
    const guiaTab = document.getElementById('guia-tab');
    const dashboardTab = document.getElementById('dashboard-tab');
    const guiaSection = document.getElementById('guia');
    const tableroSection = document.getElementById('tablero');
    const btnInsignias = document.getElementById('btn-insignias');
    const btnParticipantes = document.getElementById('btn-participantes');
    const cuadriculaInsignias = document.getElementById('cuadricula-insignias');
    const listaParticipantes = document.getElementById('lista-participantes');
    const vistaParticipante = document.getElementById('vista-participante');
    const searchInput = document.getElementById("search-participants");

    // Funciones para mostrar y ocultar secciones
    function showSection(section) {
        document.querySelectorAll('.tab-content').forEach(s => s.style.display = 'none');
        section.style.display = 'block';
    }

    // Cargar Insignias
    async function cargarInsignias() {
        const insigniasCollection = collection(db, "Insignias");
        const gridContainer = document.getElementById("cuadricula-insignias");

        try {
            const snapshot = await getDocs(insigniasCollection);
            gridContainer.innerHTML = "";
            if (!snapshot.empty) {
                snapshot.forEach(doc => {
                    const insignia = doc.data();
                    let badgeItem = document.createElement("div");
                    badgeItem.classList.add("badge-item");
                    badgeItem.innerHTML = `
                        <img src="img/${doc.id}.png" alt="${insignia.Nombre}" class="badge-image" />
                        <p>${insignia.Nombre}</p>
                    `;
                    gridContainer.appendChild(badgeItem);
                });
            } else {
                console.log("❌ No hay insignias en la base de datos.");
            }
        } catch (error) {
            console.error("❌ Error al cargar insignias:", error);
        }
    }

    // Cargar Participantes
    async function cargarParticipantes() {
        const participantesCollection = collection(db, "Participantes");
        const listaContainer = document.getElementById("participantes-list");

        try {
            const snapshot = await getDocs(participantesCollection);
            listaContainer.innerHTML = "";
            if (!snapshot.empty) {
                snapshot.forEach(doc => {
                    const participante = doc.data();
                    let listItem = document.createElement("li");
                    listItem.textContent = participante.Nombre;
                    listItem.addEventListener("click", function () {
                        mostrarInsigniasDeParticipante(participante.Nombre);
                    });
                    listaContainer.appendChild(listItem);
                });
            } else {
                console.log("❌ No hay participantes en la base de datos.");
            }
        } catch (error) {
            console.error("❌ Error al cargar participantes:", error);
        }
    }

    function mostrarInsigniasDeParticipante(nombre) {
        vistaParticipante.style.display = "block";
        listaParticipantes.style.display = "none";
        cuadriculaInsignias.style.display = "none";
        document.getElementById("nombre-participante").textContent = nombre;
    }

    // Eventos de navegación
    guiaTab.addEventListener('click', function() {
        showSection(guiaSection);
        guiaTab.classList.add('active');
        dashboardTab.classList.remove('active');
    });

    dashboardTab.addEventListener('click', function() {
        showSection(tableroSection);
        dashboardTab.classList.add('active');
        guiaTab.classList.remove('active');
    });

    // Eventos para mostrar listas
    btnInsignias.addEventListener('click', function () {
        cuadriculaInsignias.style.display = 'block';
        listaParticipantes.style.display = 'none';
        vistaParticipante.style.display = 'none';
    });

    btnParticipantes.addEventListener('click', function () {
        listaParticipantes.style.display = 'block';
        cuadriculaInsignias.style.display = 'none';
        vistaParticipante.style.display = 'none';
    });

    // Search participants
    
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

    // Cargar datos iniciales y mostrar la sección "Guía rápida"
    Promise.all([cargarInsignias(), cargarParticipantes()]).then(() => {
        showSection(guiaSection);
        guiaTab.classList.add('active');
    });
});