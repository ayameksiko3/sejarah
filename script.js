// script.js

// Data dasar partai politik
const parties = [
    { name: "Partai Nasional Indonesia (PNI)", ideology: "Nasionalis", popularity: 30 },
    { name: "Masyumi", ideology: "Islam", popularity: 25 },
    { name: "Nahdlatul Ulama (NU)", ideology: "Islam", popularity: 20 },
    { name: "Partai Komunis Indonesia (PKI)", ideology: "Komunis", popularity: 15 },
];

// Data dasar peristiwa
const events = [
    { description: "Krisis Ekonomi", impact: { publicSupport: -10, economy: "Krisis" } },
    { description: "Keberhasilan Diplomasi", impact: { publicSupport: +5, economy: "Stabil" } },
    { description: "Pemberontakan Daerah", impact: { publicSupport: -15, economy: "Tidak Stabil" } }
];

// Status game awal
let currentGameState = {
    selectedParty: null,
    coalition: [],
    publicSupport: 50,
    economy: "Stabil",
    events: []
};

// Fungsi untuk memulai game
function startGame() {
    let gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = `
        <h2>Pilih Partai Anda</h2>
        ${parties.map((party, index) => `<button onclick="selectParty(${index})">${party.name}</button>`).join('')}
    `;
}

// Fungsi untuk memilih partai
function selectParty(index) {
    currentGameState.selectedParty = parties[index];
    updateGameState();
}

// Fungsi untuk memperbarui status game
function updateGameState() {
    let gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = `
        <h2>Anda Memimpin: ${currentGameState.selectedParty.name}</h2>
        <p>Ideologi: ${currentGameState.selectedParty.ideology}</p>
        <p>Dukungan Publik: ${currentGameState.publicSupport}%</p>
        <p>Kondisi Ekonomi: ${currentGameState.economy}</p>
        <button onclick="proposePolicy()">Usulkan Kebijakan</button>
        <button onclick="randomEvent()">Acara Acak</button>
        <button onclick="formCoalition()">Bentuk Koalisi</button>
    `;
}

// Fungsi untuk mengusulkan kebijakan (contoh sederhana)
function proposePolicy() {
    alert("Kebijakan baru diusulkan! Efeknya akan terlihat dalam beberapa saat.");
    currentGameState.publicSupport += 5; // Contoh efek kebijakan
    updateGameState();
}

// Fungsi untuk menangani acara acak
function randomEvent() {
    let event = events[Math.floor(Math.random() * events.length)];
    alert("Peristiwa terjadi: " + event.description);
    currentGameState.publicSupport += event.impact.publicSupport;
    currentGameState.economy = event.impact.economy;
    updateGameState();
}

// Fungsi untuk membentuk koalisi
function formCoalition() {
    let gameContainer = document.getElementById('game-container');
    let coalitionOptions = parties.filter(party => party !== currentGameState.selectedParty)
                                  .map((party, index) => `<button onclick="addToCoalition(${index})">${party.name}</button>`).join('');
    gameContainer.innerHTML += `
        <h3>Pilih Partai untuk Koalisi</h3>
        ${coalitionOptions}
        <button onclick="updateGameState()">Selesai</button>
    `;
}

// Fungsi untuk menambah partai ke koalisi
function addToCoalition(index) {
    let selectedParty = parties[index];
    if (!currentGameState.coalition.includes(selectedParty)) {
        currentGameState.coalition.push(selectedParty);
        alert(`${selectedParty.name} telah ditambahkan ke koalisi Anda.`);
    }
}
