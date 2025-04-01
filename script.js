import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getFirestore, collection, getDocs, query, where, doc, updateDoc, arrayUnion, arrayRemove } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", function () {
    console.log("Página cargada");

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
    const listaParticipantesContainer = document.getElementById('lista-participantes-container');
    const cuadriculaInsigniasContainer = document.getElementById('cuadricula-insignias-container');
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

                        let participantsObtained = insignia.participantes_obtenida ? insignia.participantes_obtenida.join(', ') : 'Nadie';
                        let participantsInProgress = insignia.participantes_en_progreso ? insignia.participantes_en_progreso.join(', ') : 'Nadie';

                        badgeItem.innerHTML = `
                            <img src="${imageUrl}" alt="${insignia.Nombre || 'Insignia'}" class="badge-image" /> 
                            <p>${insignia.Nombre || 'Nombre no disponible'}</p> 
                            <p>Obtenida por: ${participantsObtained}</p>
                            <p>En progreso: ${participantsInProgress}</p>
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

    // Functions that handle sidebar button clicks.
    document.getElementById("btn-participantes").addEventListener("click", () => {
        listaParticipantesContainer.style.display = "block";
        cuadriculaInsigniasContainer.style.display = "none";
        cargarParticipantes();
    });
    
    document.getElementById("btn-insignias").addEventListener("click", () => {
        listaParticipantesContainer.style.display = "none";
        cuadriculaInsigniasContainer.style.display = "block";
    });
    
// Show participant badges (MODIFIED VERSION)
async function mostrarInsigniasDeParticipante(nombre) {
    console.log(`Mostrando insignias para: ${nombre}`); // Log para verificar nombre
    const vistaParticipanteElement = document.getElementById('vista-participante');
    const listaParticipantesContainerElement = document.getElementById('lista-participantes-container');
    const cuadriculaInsigniasContainerElement = document.getElementById('cuadricula-insignias-container');
    const nombreParticipanteElement = document.getElementById("nombre-participante");
    const insigniasObtenidasDiv = document.getElementById("insignias-obtenidas");
    const insigniasEnProgresoDiv = document.getElementById("insignias-en-progreso");

    // Show the participant view and hide others
    if (vistaParticipanteElement) vistaParticipanteElement.style.display = "block";
    if (listaParticipantesContainerElement) listaParticipantesContainerElement.style.display = "none";
    if (cuadriculaInsigniasContainerElement) cuadriculaInsigniasContainerElement.style.display = "none";

    // Set participant name
    if (nombreParticipanteElement) nombreParticipanteElement.textContent = nombre;

    // Clear previous badge displays
    if (insigniasObtenidasDiv) insigniasObtenidasDiv.innerHTML = "";
    if (insigniasEnProgresoDiv) insigniasEnProgresoDiv.innerHTML = "";

    let obtenidasEncontradas = false;
    let progresoEncontradas = false;

    // Query the ENTIRE "Insignias" collection
    const insigniasCollection = collection(db, "Insignias");
    try {
        const snapshot = await getDocs(insigniasCollection);
        console.log(`Se encontraron ${snapshot.docs.length} insignias en total.`); // Log para verificar fetch

        if (!snapshot.empty) {
            snapshot.forEach(docInsignia => {
                const insignia = docInsignia.data();
                const nombreInsignia = insignia.Nombre || 'Nombre no disponible';
                const descripcionInsignia = insignia.Descripción || 'Descripción no disponible'; // Asumiendo que el campo se llama "Descripción"
                const nombreArchivo = insignia.nombre_archivo;

                // Check if the participant obtained this badge
                const participantesObtenida = insignia.participantes_obtenida || [];
                if (participantesObtenida.includes(nombre)) {
                    obtenidasEncontradas = true;
                    console.log(` -> ${nombre} OBTUVO: ${nombreInsignia}`); // Log detallado

                    if (nombreArchivo && insigniasObtenidasDiv) {
                        const imageUrl = `https://semillero-digital-badges.github.io/assets/images/badges/${nombreArchivo}.png`;
                        const badgeElement = document.createElement('div');
                        badgeElement.classList.add('insignia-detalle-item'); // Clase para posible CSS
                        badgeElement.innerHTML = `
                            <img src="${imageUrl}" alt="${nombreInsignia}" class="badge-image-detalle" />
                            <div>
                                <h5>${nombreInsignia}</h5>
                                <p>${descripcionInsignia}</p>
                            </div>
                        `;
                        insigniasObtenidasDiv.appendChild(badgeElement);
                    } else if (insigniasObtenidasDiv) {
                         // Si no hay archivo, mostrar al menos el texto
                        const badgeElement = document.createElement('div');
                        badgeElement.classList.add('insignia-detalle-item');
                        badgeElement.innerHTML = `
                            <div>
                                <h5>${nombreInsignia}</h5>
                                <p>${descripcionInsignia}</p>
                                <p><small>(Imagen no disponible)</small></p>
                            </div>
                        `;
                        insigniasObtenidasDiv.appendChild(badgeElement);
                        if (!nombreArchivo) console.warn(`Insignia obtenida "${nombreInsignia}" no tiene 'nombre_archivo'.`);
                    }
                }

                // Check if the participant has this badge in progress
                const participantesEnProgreso = insignia.participantes_en_progreso || [];
                if (participantesEnProgreso.includes(nombre)) {
                    progresoEncontradas = true;
                     console.log(` -> ${nombre} EN PROGRESO: ${nombreInsignia}`); // Log detallado

                    if (nombreArchivo && insigniasEnProgresoDiv) {
                        const imageUrl = `https://semillero-digital-badges.github.io/assets/images/badges/${nombreArchivo}.png`;
                        const badgeElement = document.createElement('div');
                        badgeElement.classList.add('insignia-detalle-item'); // Clase para posible CSS
                        badgeElement.innerHTML = `
                            <img src="${imageUrl}" alt="${nombreInsignia}" class="badge-image-detalle" />
                            <div>
                                <h5>${nombreInsignia}</h5>
                                <p>${descripcionInsignia}</p>
                            </div>
                        `;
                        insigniasEnProgresoDiv.appendChild(badgeElement);
                    } else if (insigniasEnProgresoDiv) {
                         // Si no hay archivo, mostrar al menos el texto
                        const badgeElement = document.createElement('div');
                        badgeElement.classList.add('insignia-detalle-item');
                        badgeElement.innerHTML = `
                            <div>
                                <h5>${nombreInsignia}</h5>
                                <p>${descripcionInsignia}</p>
                                <p><small>(Imagen no disponible)</small></p>
                            </div>
                        `;
                        insigniasEnProgresoDiv.appendChild(badgeElement);
                        if (!nombreArchivo) console.warn(`Insignia en progreso "${nombreInsignia}" no tiene 'nombre_archivo'.`);
                    }
                }
            });

        } else {
            console.log("La colección de Insignias está vacía.");
        }

        // Add messages if no badges were found for the categories
        if (!obtenidasEncontradas && insigniasObtenidasDiv) {
            insigniasObtenidasDiv.textContent = "No hay insignias obtenidas.";
            console.log(`No se encontraron insignias OBTENIDAS para ${nombre}.`); // Log final
        }
        if (!progresoEncontradas && insigniasEnProgresoDiv) {
            insigniasEnProgresoDiv.textContent = "No hay insignias en progreso.";
             console.log(`No se encontraron insignias EN PROGRESO para ${nombre}.`); // Log final
        }

    } catch (error) {
        console.error("Error al obtener insignias para el participante:", error);
        if (insigniasObtenidasDiv) insigniasObtenidasDiv.textContent = "Error al cargar insignias.";
        if (insigniasEnProgresoDiv) insigniasEnProgresoDiv.textContent = "Error al cargar insignias.";
    }
}

    // Function for assigning badges
    async function asignarInsignia(nombreInsignia) {
        const nombreParticipante = participantSelect.value;
        const insigniasCollection = collection(db, "Insignias");
        const q = query(insigniasCollection, where("Nombre", "==", nombreInsignia));
        try {
            const snapshot = await getDocs(q);
            if (!snapshot.empty) {
                snapshot.forEach(async docInsignia => {
                    const insigniaRef = doc(db, "Insignias", docInsignia.id);
                    await updateDoc(insigniaRef, {
                        participantes_en_progreso: arrayUnion(nombreParticipante)
                    });
                    alert("Insignia asignada como objetivo.");
                    actualizarListaParticipantes();
                });
            } else {
                alert("Insignia no encontrada.");
            }
        } catch (error) {
            console.error("Error al asignar insignia:", error);
            alert("Error al asignar insignia.");
        }
    }

    // Function for claiming badges
    async function reclamarInsignia(nombreInsignia) {
        const nombreParticipante = participantSelect.value;
        const insigniasCollection = collection(db, "Insignias");
        const q = query(insigniasCollection, where("Nombre", "==", nombreInsignia));
        try {
            const snapshot = await getDocs(q);
            if (!snapshot.empty) {
                snapshot.forEach(async docInsignia => {
                    const insigniaRef = doc(db, "Insignias", docInsignia.id);
                    await updateDoc(insigniaRef, {
                        participantes_en_progreso: arrayRemove(nombreParticipante),
                        participantes_obtenida: arrayUnion(nombreParticipante)
                    });
                    alert("Insignia reclamada.");
                    actualizarListaParticipantes();
                });
            } else {
                alert("Insignia no encontrada.");
            }
        } catch (error) {
            console.error("Error al reclamar insignia:", error);
            alert("Error al reclamar insignia.");
        }
    }
    
    // Update badges load function.
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
    
              let participantsObtained = insignia.participantes_obtenida ? insignia.participantes_obtenida.join(', ') : 'Nadie';
              let participantsInProgress = insignia.participantes_en_progreso ? insignia.participantes_en_progreso.join(', ') : 'Nadie';
    
              badgeItem.innerHTML = `
                <img src="${imageUrl}" alt="${insignia.Nombre || 'Insignia'}" class="badge-image" /> 
                <p>${insignia.Nombre || 'Nombre no disponible'}</p> 
                <p>Obtenida por: ${participantsObtained}</p>
                <p>En progreso: ${participantsInProgress}</p>
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

    // Navigation events
    guiaTab.addEventListener('click', function () {
        showSection(guiaSection);
        guiaTab.classList.add('active');
        dashboardTab.classList.remove('active');
    });

    dashboardTab.addEventListener('click', function () {
        showSection(tableroSection);
        dashboardTab.classList.add('active');
        guiaTab.classList.remove('active');
    });

    // Function to hide vista-participante
    function ocultarVistaParticipante() {
    const vistaParticipanteElement = document.getElementById('vista-participante');
    if (vistaParticipanteElement) {
        vistaParticipanteElement.style.display = 'none';
    } else {
        console.error("No se encontró el elemento vista-participante");
    }
    }

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