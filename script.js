// ===== DATA TEMA - PIDATO =====
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

// ===== DATA TEMA - DEBAT (MOSI) =====
// Setiap mosi dibuat seimbang: bisa diambil posisi Pro maupun Kontra
const debateThemes = {
  lingkungan: [
    "Kendaraan listrik wajib menggantikan kendaraan berbahan bakar fosil",
    "Plastik sekali pakai harus dilarang total",
    "Setiap warga wajib memilah sampah rumah tangga",
    "Pembangunan pabrik baru harus dihentikan demi menjaga lingkungan",
    "Energi nuklir adalah solusi terbaik untuk krisis energi"
  ],
  teknologi_d: [
    "Kecerdasan buatan (AI) lebih banyak membawa manfaat daripada bahaya",
    "Media sosial harus dibatasi untuk anak di bawah 16 tahun",
    "Sekolah wajib mengajarkan coding sejak SD",
    "Uang tunai akan sepenuhnya digantikan oleh pembayaran digital",
    "Robot akan menggantikan sebagian besar pekerjaan manusia"
  ],
  pendidikan_d: [
    "Ujian nasional sebaiknya dihapuskan",
    "Sekolah sebaiknya menerapkan sistem 5 hari kerja",
    "Pendidikan karakter lebih penting daripada nilai akademik",
    "Seragam sekolah sebaiknya dihapuskan",
    "Pekerjaan rumah (PR) sebaiknya dihapuskan"
  ],
  kesehatan: [
    "Vaksinasi wajib bagi seluruh masyarakat",
    "Rokok sebaiknya dilarang total",
    "Jam kerja ideal adalah 4 hari seminggu demi kesehatan mental",
    "Konsultasi kesehatan mental harus ditanggung asuransi",
    "Makanan cepat saji harus dikenakan pajak tinggi"
  ],
  ekonomi: [
    "Upah minimum harus dinaikkan secara signifikan",
    "Pajak untuk orang kaya harus lebih tinggi",
    "Bekerja dari rumah lebih baik daripada bekerja di kantor",
    "Cryptocurrency akan menggantikan mata uang konvensional",
    "Usaha kecil harus mendapat prioritas dibanding investor asing"
  ],
  sosial: [
    "Media sosial membuat masyarakat semakin individualis",
    "Pernikahan usia muda harus dilarang",
    "Influencer memiliki tanggung jawab sosial yang besar",
    "Bahasa daerah harus diajarkan wajib di sekolah",
    "Budaya antre mencerminkan tingkat kedisiplinan suatu bangsa"
  ],
  pemerintahan: [
    "Usia minimum pemilih sebaiknya diturunkan menjadi 16 tahun",
    "Hukuman mati efektif menurunkan tingkat kejahatan",
    "Transportasi umum sebaiknya digratiskan",
    "Kebijakan kerja 4 hari seminggu harus diterapkan pemerintah",
    "Pemerintah harus membatasi penggunaan gadget di sekolah"
  ],
  gayahidup: [
    "Hidup minimalis lebih baik daripada hidup konsumtif",
    "Traveling lebih penting daripada menabung",
    "Kuliah bukan satu-satunya jalan menuju kesuksesan",
    "Media sosial lebih banyak merugikan daripada menguntungkan penggunanya",
    "Bekerja sesuai passion lebih penting daripada gaji tinggi"
  ]
};

const debateThemeLabels = {
  lingkungan: "Lingkungan",
  teknologi_d: "Teknologi",
  pendidikan_d: "Pendidikan",
  kesehatan: "Kesehatan",
  ekonomi: "Ekonomi",
  sosial: "Sosial",
  pemerintahan: "Pemerintahan",
  gayahidup: "Gaya Hidup"
};

// ===== STATE =====
let currentTopic = "";
let currentTopicsList = [];
let currentFlow = "pidato"; // "pidato" | "debat"
let originState = "mode";   // state tujuan tombol "Kembali" di halaman custom
let researchInterval = null;
let speakingInterval = null;
let researchTimeLeft = 600;
let speakingTimeLeft = 60;
let isSpinning = false;

// ===== DOM =====
const states = {
  landing: document.getElementById("state-landing"),
  mode: document.getElementById("state-mode"),
  debatMode: document.getElementById("state-debat-mode"),
  custom: document.getElementById("state-custom"),
  spin: document.getElementById("state-spin"),
  topic: document.getElementById("state-topic"),
  research: document.getElementById("state-research"),
  speaking: document.getElementById("state-speaking"),
  done: document.getElementById("state-done")
};

const mainTitle = document.getElementById("main-title");
const mainSubtitle = document.getElementById("main-subtitle");
const topicText = document.getElementById("topic-text");
const topicLabel = document.getElementById("topic-label");
const topicDebateHint = document.getElementById("topic-debate-hint");
const speakingTopic = document.getElementById("speaking-topic");
const researchTimerEl = document.getElementById("research-timer");
const speakingTimerEl = document.getElementById("speaking-timer");
const btnStartSpeaking = document.getElementById("btn-start-speaking");
const customInputsContainer = document.getElementById("custom-inputs");
const customTitle = document.getElementById("custom-title");
const customDesc = document.getElementById("custom-desc");
const customError = document.getElementById("custom-error");
const slotList = document.getElementById("slot-list");
const spinThemeLabel = document.getElementById("spin-theme-label");
const btnSpin = document.getElementById("btn-spin");
const doneText = document.getElementById("done-text");

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

function setHeader(flow) {
  if (flow === "pidato") {
    mainTitle.textContent = "PIDATO";
    mainSubtitle.textContent = "Latihan bicara 1 menit • Topik random";
  } else if (flow === "debat") {
    mainTitle.textContent = "DEBAT";
    mainSubtitle.textContent = "Latihan berargumen • Mosi random";
  } else {
    mainTitle.textContent = "Public Speaking Trainer";
    mainSubtitle.textContent = "Latihan Pidato & Debat";
  }
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

// ===== NAVIGASI =====
function goLanding() {
  clearTimers();
  setHeader("landing");
  showState("landing");
}

function enterPidato() {
  currentFlow = "pidato";
  originState = "mode";
  setHeader("pidato");
  showState("mode");
}

function enterDebat() {
  currentFlow = "debat";
  originState = "debatMode";
  setHeader("debat");
  showState("debatMode");
}

// ===== CUSTOM INPUTS =====
function createCustomInput(value = "") {
  const row = document.createElement("div");
  row.className = "custom-input-row";

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = currentFlow === "debat" ? "Tulis mosi..." : "Tulis topik...";
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

function showTopic() {
  topicText.textContent = currentTopic;
  if (currentFlow === "debat") {
    topicLabel.textContent = "Mosi kamu";
    topicDebateHint.style.display = "block";
  } else {
    topicLabel.textContent = "Topik kamu";
    topicDebateHint.style.display = "none";
  }
  showState("topic");
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
        showTopic();
        btnSpin.disabled = false;
        btnSpin.textContent = currentFlow === "debat" ? "Tentukan Mosi" : "Tentukan Topik";
      }, 400);
    }
  }

  requestAnimationFrame(animate);
}

// ===== ACTIONS: PIDATO =====
function selectMode(mode) {
  if (mode === "custom") {
    openCustom("pidato");
    return;
  }

  currentFlow = "pidato";
  originState = "mode";
  currentTopicsList = themes[mode];
  spinThemeLabel.textContent = mode === "random" ? "Mode Random" : "Tema " + mode.charAt(0).toUpperCase() + mode.slice(1);
  btnSpin.textContent = "Tentukan Topik";

  const finalTopic = prepareSlot(currentTopicsList);
  currentTopic = finalTopic;

  showState("spin");
}

// ===== ACTIONS: DEBAT =====
function selectDebateMode(themeKey) {
  if (themeKey === "custom") {
    openCustom("debat");
    return;
  }

  currentFlow = "debat";
  originState = "debatMode";
  currentTopicsList = debateThemes[themeKey];
  spinThemeLabel.textContent = "Tema " + debateThemeLabels[themeKey];
  btnSpin.textContent = "Tentukan Mosi";

  const finalTopic = prepareSlot(currentTopicsList);
  currentTopic = finalTopic;

  showState("spin");
}

// ===== CUSTOM (dipakai bersama Pidato & Debat) =====
function openCustom(flow) {
  currentFlow = flow;
  originState = flow === "debat" ? "debatMode" : "mode";

  initCustomInputs();
  customError.textContent = "";

  if (flow === "debat") {
    customTitle.textContent = "Mosi Custom";
    customDesc.textContent = "Masukkan mosi (minimal 3 • maksimal 30)";
  } else {
    customTitle.textContent = "Mode Custom";
    customDesc.textContent = "Masukkan topik (minimal 3 • maksimal 30)";
  }

  showState("custom");
}

function startCustom() {
  const inputs = customInputsContainer.querySelectorAll("input");
  const list = Array.from(inputs)
    .map(inp => inp.value.trim())
    .filter(v => v.length > 0);

  if (list.length < 3) {
    customError.textContent = currentFlow === "debat" ? "Minimal harus 3 mosi." : "Minimal harus 3 topik.";
    return;
  }
  if (list.length > 30) {
    customError.textContent = currentFlow === "debat" ? "Maksimal 30 mosi." : "Maksimal 30 topik.";
    return;
  }

  currentTopicsList = list;
  spinThemeLabel.textContent = currentFlow === "debat" ? "Mosi Custom" : "Mode Custom";
  btnSpin.textContent = currentFlow === "debat" ? "Tentukan Mosi" : "Tentukan Topik";

  const finalTopic = prepareSlot(currentTopicsList);
  currentTopic = finalTopic;

  showState("spin");
}

// ===== RESEARCH / SPEAKING / DONE =====
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
  doneText.textContent = currentFlow === "debat"
    ? "Kamu sudah menyelesaikan 1 sesi latihan debat."
    : "Kamu sudah menyelesaikan 1 sesi public speaking.";
  showState("done");
}

function tryAgain() {
  goLanding();
}

// ===== EVENT LISTENERS =====
document.getElementById("btn-go-pidato").addEventListener("click", enterPidato);
document.getElementById("btn-go-debat").addEventListener("click", enterDebat);
document.getElementById("btn-support").addEventListener("click", () => {
  window.open("https://saweria.co/dlofirim", "_blank");
});

document.querySelectorAll(".btn-back").forEach(btn => {
  btn.addEventListener("click", goLanding);
});

document.querySelectorAll("#state-mode .mode-btn").forEach(btn => {
  btn.addEventListener("click", () => selectMode(btn.dataset.mode));
});

document.querySelectorAll("#state-debat-mode .mode-btn").forEach(btn => {
  btn.addEventListener("click", () => selectDebateMode(btn.dataset.mode));
});

document.getElementById("btn-back-mode").addEventListener("click", () => {
  showState(originState);
});

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

// Header awal
setHeader("landing");
  
