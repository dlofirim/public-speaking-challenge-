// ===== DATA TOPIK =====
const topics = [
  "Kucing",
  "Pendakian",
  "Gunung",
  "Makanan Tradisional",
  "Hari Guru",
  "Proklamasi",
  "Kopi",
  "Hujan",
  "Sepeda",
  "Liburan",
  "Sekolah",
  "Persahabatan",
  "Musik",
  "Olahraga",
  "Teknologi",
  "Keluarga",
  "Mimpi",
  "Kesuksesan",
  "Kegagalan",
  "Perjalanan",
  "Buku",
  "Film",
  "Masakan",
  "Laut",
  "Hutan",
  "Kota",
  "Desa",
  "Transportasi",
  "Pendidikan",
  "Kesehatan",
  "Lingkungan",
  "Tradisi",
  "Budaya",
  "Sejarah",
  "Seni",
  "Fotografi",
  "Traveling",
  "Hobby",
  "Pekerjaan",
  "Cita-cita",
  "Motivasi",
  "Kedisiplinan",
  "Kreativitas",
  "Inovasi",
  "Komunikasi",
  "Kepemimpinan",
  "Kerja Sama",
  "Waktu",
  "Uang",
  "Kebahagiaan"
];

// ===== STATE =====
let currentTopic = "";
let researchInterval = null;
let speakingInterval = null;
let researchTimeLeft = 600; // 10 menit
let speakingTimeLeft = 60;  // 60 detik

// ===== DOM =====
const states = {
  start: document.getElementById("state-start"),
  topic: document.getElementById("state-topic"),
  research: document.getElementById("state-research"),
  speaking: document.getElementById("state-speaking"),
  done: document.getElementById("state-done")
};

const topicText = document.getElementById("topic-text");
const speakingTopic = document.getElementById("speaking-topic");
const researchTimerEl = document.getElementById("research-timer");
const speakingTimerEl = document.getElementById("speaking-timer");
const btnStartSpeaking = document.getElementById("btn-start-speaking");

// ===== HELPERS =====
function showState(name) {
  Object.values(states).forEach(el => el.classList.remove("active"));
  states[name].classList.add("active");
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `\( {String(m).padStart(2, "0")}: \){String(s).padStart(2, "0")}`;
}

function getRandomTopic() {
  const index = Math.floor(Math.random() * topics.length);
  return topics[index];
}

function clearTimers() {
  if (researchInterval) clearInterval(researchInterval);
  if (speakingInterval) clearInterval(speakingInterval);
  researchInterval = null;
  speakingInterval = null;
}

// ===== ACTIONS =====
function startChallenge() {
  currentTopic = getRandomTopic();
  topicText.textContent = currentTopic;
  showState("topic");
}

function newTopic() {
  currentTopic = getRandomTopic();
  topicText.textContent = currentTopic;
}

function startResearch() {
  clearTimers();
  researchTimeLeft = 600;
  researchTimerEl.textContent = formatTime(researchTimeLeft);
  btnStartSpeaking.disabled = true;
  showState("research");

  researchInterval = setInterval(() => {
    researchTimeLeft--;
    researchTimerEl.textContent = formatTime(researchTimeLeft);

    if (researchTimeLeft <= 0) {
      clearInterval(researchInterval);
      btnStartSpeaking.disabled = false;
      researchTimerEl.textContent = "00:00";
    }
  }, 1000);
}

function skipResearch() {
  clearTimers();
  researchTimeLeft = 0;
  researchTimerEl.textContent = "00:00";
  btnStartSpeaking.disabled = false;
}

function startSpeaking() {
  clearTimers();
  speakingTimeLeft = 60;
  speakingTimerEl.textContent = formatTime(speakingTimeLeft);
  speakingTopic.textContent = currentTopic;
  showState("speaking");

  speakingInterval = setInterval(() => {
    speakingTimeLeft--;
    speakingTimerEl.textContent = formatTime(speakingTimeLeft);

    if (speakingTimeLeft <= 0) {
      clearInterval(speakingInterval);
      finishSpeaking();
    }
  }, 1000);
}

function finishSpeaking() {
  clearTimers();
  showState("done");
}

function tryAgain() {
  clearTimers();
  startChallenge();
}

// ===== EVENT LISTENERS =====
document.getElementById("btn-start").addEventListener("click", startChallenge);
document.getElementById("btn-new-topic").addEventListener("click", newTopic);
document.getElementById("btn-start-research").addEventListener("click", startResearch);
document.getElementById("btn-skip-research").addEventListener("click", skipResearch);
document.getElementById("btn-start-speaking").addEventListener("click", startSpeaking);
document.getElementById("btn-finish").addEventListener("click", finishSpeaking);
document.getElementById("btn-again").addEventListener("click", tryAgain);
