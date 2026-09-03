// ===== DATA TEMA =====
const themes = {
  hewan: ["Kucing","Anjing","Burung","Cicak","Bunglon","Ikan","Kelinci","Hamster","Kuda","Sapi","Kambing","Ayam","Bebek","Ular","Kura-kura","Kupu-kupu","Lebah","Semut"],
  makanan: ["Nasi Goreng","Sate","Bakso","Rendang","Gado-gado","Soto","Mie Ayam","Martabak","Pisang Goreng","Es Teh","Kopi","Cokelat","Burger","Pizza","Sushi","Rawon","Pempek","Siomay"],
  alam: ["Gunung","Pantai","Laut","Hutan","Sungai","Danau","Air Terjun","Sawah","Kebun","Taman","Gua","Bukit","Pulau","Rawa","Padang Rumput","Puncak","Lembah"],
  kehidupan: ["Sekolah","Kerja","Keluarga","Persahabatan","Liburan","Musik","Film","Buku","Hobby","Transportasi","Belanja","Masak","Tidur","Perjalanan","Rumah"],
  teknologi: ["Smartphone","Laptop","Internet","AI","Robot","Kamera","Gaming","Aplikasi","Sosial Media","Coding","Drone","Virtual Reality","Blockchain","Cloud"],
  olahraga: ["Sepak Bola","Basket","Badminton","Renang","Lari","Gym","Yoga","Voli","Tenis","Panahan","Bersepeda","Pendakian","Futsal","Golf"],
  pendidikan: ["Guru","Siswa","Ujian","PR","Perpustakaan","Kuliah","Belajar","Pelajaran","Nilai","Ijazah","Beasiswa","Kelas","Tugas","Presentasi"],
  random: []
};

// Gabungkan semua untuk mode Random
themes.random = [
  ...themes.hewan, ...themes.makanan, ...themes.alam,
  ...themes.kehidupan, ...themes.teknologi, ...themes.olahraga, ...themes.pendidikan
];

// ===== STATE =====
let currentTopic = "";
let currentTopicsList = [];
let researchInterval = null;
let speakingInterval = null;
let researchTimeLeft = 600;
let speakingTimeLeft = 60;
let isSpinning = false;

// ===== DOM =====
const states = {
  mode: document.getElementById("state-mode"),
  custom: document.getElementById("state-custom"),
  spin: document.getElementById("state-spin"),
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
const customInputsContainer = document.getElementById("custom-inputs");
const customError = document.getElementById("custom-error");
const slotList = document.getElementById("slot-list");
const spinThemeLabel = document.getElementById("spin-theme-label");
const btnSpin = document.getElementById("btn-spin");

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
  return list[Math.floor(Math.random() * list.length)];
}

function clearTimers() {
  if (researchInterval) clearInterval(researchInterval);
  if (speakingInterval) clearInterval(speakingInterval);
  researchInterval = null;
  speakingInterval = null;
}

// ===== SOUND =====
function playDramaticSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.type = "sawtooth";
    oscillator.frequency.setValueAtTime(880, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.4);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.5);
  } catch (e) {}
}

// ===== CUSTOM INPUTS =====
function createCustomInput(value = "") {
  const row = document.createElement("div");
  row.className = "custom-input-row";

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Tulis topik...";
  input.value = value;

  const removeBtn = document.createElement("button");
  removeBtn.className = "btn-remove";
  removeBtn.innerHTML = "×";
  removeBtn.type = "button";
  removeBtn.addEventListener("click", () => {
    if (customInputsContainer.children.length > 3) {
      row.remove();
    }
  });

  row.appendChild(input);
  row.appendChild(removeBtn);
  return row;
}

function initCustomInputs() {
  customInputsContainer.innerHTML = "";
  for (let i = 0; i < 3; i++) {
    customInputsContainer.appendChild(createCustomInput());
  }
}

// ===== SLOT MACHINE =====
function prepareSlot(list) {
  slotList.innerHTML = "";
  const extended = [];
  for (let i = 0; i < 12; i++) {
    extended.push(...list);
  }
  const finalTopic = getRandomTopic(list);
  extended.push(finalTopic);

  extended.forEach(topic => {
    const div = document.createElement("div");
    div.className = "slot-item";
    div.textContent = topic;
    slotList.appendChild(div);
  });

  return finalTopic;
}

function startSpinAnimation(finalTopic) {
  if (isSpinning) return;
  isSpinning = true;
  btnSpin.disabled = true;
  btnSpin.textContent = "Mengundi...";

  const items = slotList.querySelectorAll(".slot-item");
  const itemHeight = 70;
  const totalItems = items.length;
  const finalIndex = totalItems - 1;

  slotList.style.transition = "none";
  slotList.style.transform = "translateY(0)";
  slotList.classList.add("spinning");

  void slotList.offsetWidth;

  const duration = 2800;
  const startTime = performance.now();

  function animate(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const totalDistance = finalIndex * itemHeight;
    const currentY = -ease * totalDistance;

    slotList.style.transform = `translateY(${currentY}px)`;

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      slotList.classList.remove("spinning");
      slotList.style.transition = "transform 0.3s ease-out";
      currentTopic = finalTopic;
      
      setTimeout(() => {
        isSpinning = false;
        topicText.textContent = currentTopic;
        showState("topic");
        btnSpin.disabled = false;
        btnSpin.textContent = "Tentukan Topik";
      }, 400);
    }
  }

  requestAnimationFrame(animate);
}

// ===== ACTIONS =====
function selectMode(mode) {
  if (mode === "custom") {
    initCustomInputs();
    customError.textContent = "";
    showState("custom");
    return;
  }

  currentTopicsList = themes[mode];
  spinThemeLabel.textContent = mode === "random" ? "Mode Random" : "Tema " + mode.charAt(0).toUpperCase() + mode.slice(1);
  
  const finalTopic = prepareSlot(currentTopicsList);
  currentTopic = finalTopic;
  
  showState("spin");
}

function startCustom() {
  const inputs = customInputsContainer.querySelectorAll("input");
  const list = Array.from(inputs)
    .map(inp => inp.value.trim())
    .filter(v => v.length > 0);

  if (list.length < 3) {
    customError.textContent = "Minimal harus 3 topik.";
    return;
  }
  if (list.length > 30) {
    customError.textContent = "Maksimal 30 topik.";
    return;
  }

  currentTopicsList = list;
  const finalTopic = prepareSlot(currentTopicsList);
  currentTopic = finalTopic;
  spinThemeLabel.textContent = "Mode Custom";
  showState("spin");
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

    if (speakingTimeLeft === 5 || speakingTimeLeft === 3 || speakingTimeLeft === 1) {
      playDramaticSound();
    }

    if (speakingTimeLeft <= 0) {
      clearInterval(speakingInterval);
      playDramaticSound();
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
  if (btn.id !== "btn-support") {
    btn.addEventListener("click", () => selectMode(btn.dataset.mode));
  }
});

document.getElementById("btn-support").addEventListener("click", () => {
  window.open("https://saweria.co/dlofirim", "_blank");
});

document.getElementById("btn-back-mode").addEventListener("click", () => showState("mode"));
document.getElementById("btn-add-topic").addEventListener("click", () => {
  if (customInputsContainer.children.length < 30) {
    customInputsContainer.appendChild(createCustomInput());
  }
});

document.getElementById("btn-start-custom").addEventListener("click", startCustom);
document.getElementById("btn-spin").addEventListener("click", () => {
  startSpinAnimation(currentTopic);
});

document.getElementById("btn-start-research").addEventListener("click", startResearch);
document.getElementById("btn-skip-research").addEventListener("click", skipResearch);
document.getElementById("btn-start-speaking").addEventListener("click", startSpeaking);
document.getElementById("btn-finish").addEventListener("click", finishSpeaking);
document.getElementById("btn-again").addEventListener("click", tryAgain);
