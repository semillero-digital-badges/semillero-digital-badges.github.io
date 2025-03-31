import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getFirestore, collection, getDocs, query, where, doc, updateDoc, arrayUnion, arrayRemove } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", function () {
    console.log(" Página cargada");

    // Firebase Config
    const firebaseConfig = {
        apiKey: "AIzaSyBHSiqjIgGKGyWp-uQTYuDhE17W6Zqb_6o",
        authDomain: "insignias-firebase-2025-cd7f5.firebaseapp.com",
        projectId: "insignias-firebase-2025-cd7f5",
        storageBucket: "insignias-firebase-2025.firebasestorage.app",
        messagingSenderId: "971184049137",
        appId: "1:971184049137:web:f1c5bfc20be5e4a9b45250",
        measurementId: "G-6FH2TM42GR"
    };

    // Firebase Init
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    // DOM elements
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
    const loginModal = document.getElementById('login-modal');
    const participantSelect = document.getElementById('participant-select');
    const securityQuestionInput = document.getElementById('security-question');
    const securityAnswerInput = document.getElementById('security-answer');
    const loginButton = document.getElementById('login-button');

    // Functions to show and hide sections
    function showSection(section) {
        document.querySelectorAll('.tab-content').forEach(s => s.style.display = 'none');
        section.style.display = 'block';
    }

    // Load badges
    async function cargarInsignias() {
        const insigniasCollection = collection(db, "Insignias");
        const gridContainer = document.getElementById("cuadricula-insignias");

        try {
            const snapshot = await getDocs(insigniasCollection);
            gridContainer.innerHTML = "";
            if (!snapshot.empty) {
                snapshot.forEach(doc => {
                    const insignia = doc.data();
                    const nombreArchivo = insignia.nombre_archivo;

                    if (nombreArchivo) {
                        let badgeItem = document.createElement("div");
                        badgeItem.classList.add("badge-item");

                        const imageUrl = `https://semillero-digital-badges.github.io/assets/images/badges/${nombreArchivo}.png`;

                        badgeItem.innerHTML = `
                            <img src="${imageUrl}" alt="${insignia.Nombre || 'Insignia'}" class="badge-image" /> 
                            <p>${insignia.Nombre || 'Nombre no disponible'}</p> 
                            <button class="asignar-insignia" data-insignia="${insignia.Nombre}">Asignar Insignia</button>
                            <button class="reclamar-insignia" data-insignia="${insignia.Nombre}">Reclamar Insignia</button>
                        `;
                        gridContainer.appendChild(badgeItem);
                    } else {
                        console.warn(`La insignia ${insignia.Nombre || doc.id} no tiene un campo 'nombre_archivo'.`);
                    }
                });
            } else {
                console.log("❌ No hay insignias en la base de datos.");
            }
        } catch (error) {
            console.error("❌ Error al cargar insignias:", error);
        }
    }

    // Load participants
    async function cargarParticipantes() {
        const participantesCollection = collection(db, "Participantes");
        const gridContainer = document.getElementById("participantes-grid");
    
        try {
            const snapshot = await getDocs(participantesCollection);
            gridContainer.innerHTML = "";
            if (!snapshot.empty) {
                snapshot.forEach(doc => {
                    const participante = doc.data();
                    let participantDiv = document.createElement("div");
                    participantDiv.textContent = participante.Nombre;
                    participantDiv.addEventListener("click", function () {
                        mostrarInsigniasDeParticipante(participante.Nombre);
                    });
                    gridContainer.appendChild(participantDiv);
                });
            } else {
                console.log("❌ No hay participantes en la base de datos.");
            }
        } catch (error) {
            console.error("❌ Error al cargar participantes:", error);
        }
    }

    // Show participant badges
    async function mostrarInsigniasDeParticipante(nombre) {
        vistaParticipante.style.display = "block";
        listaParticipantes.style.display = "none";
        cuadriculaInsignias.style.display = "none";
        document.getElementById("nombre-participante").textContent = nombre;
    
        // Clean badge containers
        const insigniasObtenidasDiv = document.getElementById("insignias-obtenidas");
        const insigniasEnProgresoDiv = document.getElementById("insignias-en-progreso");
        insigniasObtenidasDiv.innerHTML = "";
        insigniasEnProgresoDiv.innerHTML = "";
    
        // obtain participant badges from Firestore
        const participantesCollection = collection(db, "Participantes");
        const q = query(participantesCollection, where("Nombre", "==", nombre));
        try {
            const snapshot = await getDocs(q);
            if (!snapshot.empty) {
                snapshot.forEach(docParticipante => {
                    const participante = docParticipante.data();
                    const obtenidas = participante.insignias_obtenidas || [];
                    const enProgreso = participante.insignias_en_progreso || [];
    
                    // Show obtained badges
                    if (obtenidas.length > 0) {
                        obtenidas.forEach(insignia => {
                            const insigniaElement = document.createElement("p");
                            insigniaElement.textContent = insignia;
                            insigniasObtenidasDiv.appendChild(insigniaElement);
                        });
                    } else {
                        insigniasObtenidasDiv.textContent = "No hay insignias obtenidas.";
                    }
    
                    // Show badges in progress
                    if (enProgreso.length > 0) {
                        enProgreso.forEach(insignia => {
                            const insigniaElement = document.createElement("p");
                            insigniaElement.textContent = insignia;
                            insigniasEnProgresoDiv.appendChild(insigniaElement);
                        });
                    } else {
                        insigniasEnProgresoDiv.textContent = "No hay insignias en progreso.";
                    }
                });
            } else {
                console.log("Participante no encontrado.");
            }
        } catch (error) {
            console.error("Error al obtener insignias del participante:", error);
        }
    }

    // Navigation events
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

    // Events to show lists
    btnInsignias.addEventListener('click', function () {
        document.getElementById('cuadricula-insignias-container').style.display = 'block';
        document.getElementById('lista-participantes-container').style.display = 'none';
        document.getElementById('vista-participante').style.display = 'none'; // Asegúrate de ocultar vista-participante
    });
    
    btnParticipantes.addEventListener('click', function () {
        document.getElementById('lista-participantes-container').style.display = 'block';
        document.getElementById('cuadricula-insignias-container').style.display = 'none';
        document.getElementById('vista-participante').style.display = 'none'; // Asegúrate de ocultar vista-participante
    });
    
    function mostrarInsigniasDeParticipante(nombre) {
        document.getElementById('vista-participante').style.display = 'block';
        document.getElementById('lista-participantes-container').style.display = 'none';
        document.getElementById('cuadricula-insignias-container').style.display = 'none';
        document.getElementById("nombre-participante").textContent = nombre;
    }

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

    // Load participants in the modal select
    async function cargarParticipantesLogin() {
        const participantesCollection = collection(db, "Participantes");
        try {
            const snapshot = await getDocs(participantesCollection);
            snapshot.forEach(doc => {
                const participante = doc.data();
                const option = document.createElement('option');
                option.value = participante.Nombre;
                option.textContent = participante.Nombre;
                participantSelect.appendChild(option);
            });
            // Trigger event change manually after loading participants
            if (participantSelect.options.length > 0) {
                participantSelect.dispatchEvent(new Event('change'));
            }
        } catch (error) {
            console.error("Error al cargar participantes:", error);
        }
    }

    // Show security question when selecting participant
    participantSelect.addEventListener('change', async function () {
        const selectedParticipant = this.value;
        const participantesCollection = collection(db, "Participantes");
        const q = query(participantesCollection, where("Nombre", "==", selectedParticipant));
        try {
            const snapshot = await getDocs(q);
            if (!snapshot.empty) {
                snapshot.forEach(doc => {
                    const participante = doc.data();
                    securityQuestionInput.value = participante.pregunta_seguridad;
                });
            } else {
                console.log("Participante no encontrado.");
                securityQuestionInput.value = "";
            }
        } catch (error) {
            console.error("Error al buscar pregunta de seguridad:", error);
            securityQuestionInput.value = "";
        }
    });

    // Security answer verification and Log In
    loginButton.addEventListener('click', async function () {
        const selectedParticipant = participantSelect.value;
        const securityAnswer = securityAnswerInput.value;
        const participantesCollection = collection(db, "Participantes");
        const q = query(participantesCollection, where("Nombre", "==", selectedParticipant));
        try {
            const snapshot = await getDocs(q);
            if (!snapshot.empty) {
                snapshot.forEach(doc => {
                    const participante = doc.data();
                    if (participante.respuesta_seguridad === securityAnswer) {
                        loginModal.style.display = 'none';
                    } else {
                        alert('Respuesta incorrecta.');
                    }
                });
            } else {
                console.log("Participante no encontrado.");
                alert('Participante no encontrado');
            }
        } catch (error) {
            console.error("Error al verificar respuesta de seguridad:", error);
            alert("Error al verificar la respuesta");
        }
    });
    
    // Function for assigning badges
    async function asignarInsignia(nombreInsignia) {
        const nombreParticipante = participantSelect.value;
        const participantesCollection = collection(db, "Participantes");
        const q = query(participantesCollection, where("Nombre", "==", nombreParticipante));
        try {
            const snapshot = await getDocs(q);
            if (!snapshot.empty) {
                snapshot.forEach(async docParticipante => {
                    const participanteRef = doc(db, "Participantes", docParticipante.id);
                    await updateDoc(participanteRef, {
                        insignias_en_progreso: arrayUnion(nombreInsignia)
                    });
                    alert("Insignia asignada como objetivo.");
                    actualizarListaParticipantes(); // Update list
                });
            } else {
                alert("Participante no encontrado.");
            }
        } catch (error) {
            console.error("Error al asignar insignia:", error);
            alert("Error al asignar insignia.");
        }
    }

    // Function for claiming badges
    async function reclamarInsignia(nombreInsignia) {
        const nombreParticipante = participantSelect.value;
        const participantesCollection = collection(db, "Participantes");
        const q = query(participantesCollection, where("Nombre", "==", nombreParticipante));
        try {
            const snapshot = await getDocs(q);
            if (!snapshot.empty) {
                snapshot.forEach(async docParticipante => {
                    const participanteRef = doc(db, "Participantes", docParticipante.id);
                    await updateDoc(participanteRef, {
                        insignias_en_progreso: arrayRemove(nombreInsignia),
                        insignias_obtenidas: arrayUnion(nombreInsignia)
                    });
                    alert("Insignia reclamada.");
                    actualizarListaParticipantes(); // Update list
                });
            } else {
                alert("Participante no encontrado.");
            }
        } catch (error) {
            console.error("Error al reclamar insignia:", error);
            alert("Error al reclamar insignia.");
        }
    }

    // Function for updating the list of participants
    async function actualizarListaParticipantes() {
        cargarParticipantes();
    }

    // Click events for the buttons “Assign Badge” and “Claim Badge”.
    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('asignar-insignia')) {
            const nombreInsignia = event.target.dataset.insignia;
            asignarInsignia(nombreInsignia);
        } else if (event.target.classList.contains('reclamar-insignia')) {
            const nombreInsignia = event.target.dataset.insignia;
            reclamarInsignia(nombreInsignia);
        }
    });
    
    // Load initial data and display the “Quick Guide” section.
    Promise.all([cargarInsignias(), cargarParticipantes(), cargarParticipantesLogin()])
        .then(() => {
            loginModal.style.display = 'flex';
            showSection(guiaSection);
            guiaTab.classList.add('active');
        })
        .catch(error => {
            console.error("Error al cargar datos:", error);
        });
});