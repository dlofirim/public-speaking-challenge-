// ===== DATA TEMA =====
const themes = {
  hewan: [
    "Kucing", "Anjing", "Burung", "Cicak", "Bunglon", "Ikan", "Kelinci",
    "Hamster", "Kuda", "Sapi", "Kambing", "Ayam", "Bebek", "Ular", "Kura-kura"
  ],
  makanan: [
    "Nasi Goreng", "Sate", "Bakso", "Rendang", "Gado-gado", "Soto", "Mie Ayam",
    "Martabak", "Pisang Goreng", "Es Teh", "Kopi", "Cokelat", "Burger", "Pizza", "Sushi"
  ],
  alam: [
    "Gunung", "Pantai", "Laut", "Hutan", "Sungai", "Danau", "Air Terjun",
    "Sawah", "Kebun", "Taman", "Gua", "Bukit", "Pulau", "Rawa", "Padang Rumput"
  ],
  kehidupan: [
    "Sekolah", "Kerja", "Keluarga", "Persahabatan", "Liburan", "Olahraga",
    "Musik", "Film", "Buku", "Hobby", "Transportasi", "Belanja", "Masak", "Tidur", "Olahraga"
  ]
};

// ===== STATE =====
let currentTopic = "";
let currentTopicsList = [];
let researchInterval = null;
let speakingInterval = null;
let researchTimeLeft = 600;
let speakingTimeLeft = 60;

// ===== DOM =====
const states = {
  mode: document.getElementById("state-mode"),
  custom: document.getElementById("state-custom"),
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
const customInput = document.getElementById("custom-input");
const customError = document.getElementById("custom-error");

// ===== HELPERS =====
function showState(name) {
  Object.values(states).forEach(el => el.classList.remove("active"));
  states[name].classList.add("active");
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
}

function getRandomTopic(list) {
  const index = Math.floor(Math.random() * list.length);
  return list[index];
}

function clearTimers() {
  if (researchInterval) clearInterval(researchInterval);
  if (speakingInterval) clearInterval(speakingInterval);
  researchInterval = null;
  speakingInterval = null;
}

// ===== ACTIONS =====
function selectMode(mode) {
  if (mode === "custom") {
    customInput.value = "";
    customError.textContent = "";
    showState("custom");
    return;
  }

  currentTopicsList = themes[mode];
  currentTopic = getRandomTopic(currentTopicsList);
  topicText.textContent = currentTopic;
  showState("topic");
}

function startCustom() {
  const raw = customInput.value.trim();
  if (!raw) {
    customError.textContent = "Harap masukkan minimal 3 topik.";
    return;
  }

  const list = raw
    .split("\n")
    .map(t => t.trim())
    .filter(t => t.length > 0);

  if (list.length < 3) {
    customError.textContent = "Minimal harus 3 topik.";
    return;
  }

  if (list.length > 30) {
    customError.textContent = "Maksimal 30 topik.";
    return;
  }

  currentTopicsList = list;
  currentTopic = getRandomTopic(currentTopicsList);
  topicText.textContent = currentTopic;
  showState("topic");
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
  showState("mode");
}

// ===== EVENT LISTENERS =====
document.querySelectorAll(".mode-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    selectMode(btn.dataset.mode);
  });
});

document.getElementById("btn-back-mode").addEventListener("click", () => {
  showState("mode");
});

document.getElementById("btn-start-custom").addEventListener("click", startCustom);
document.getElementById("btn-start-research").addEventListener("click", startResearch);
document.getElementById("btn-skip-research").addEventListener("click", skipResearch);
document.getElementById("btn-start-speaking").addEventListener("click", startSpeaking);
document.getElementById("btn-finish").addEventListener("click", finishSpeaking);
document.getElementById("btn-again").addEventListener("click", tryAgain);
