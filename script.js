// ===== DATA TEMA PIDATO =====
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

// ===== DATA TEMA DEBAT (setiap tema 5 mosi seimbang) =====
const debatThemes = {
  lingkungan: [
    "Pemerintah harus melarang total penggunaan plastik sekali pakai",
    "Kendaraan listrik harus menggantikan seluruh kendaraan berbahan bakar fosil dalam 15 tahun",
    "Hukuman pidana berat harus diterapkan bagi pelaku pembakaran hutan",
    "Setiap perusahaan wajib mengalokasikan minimal 5% laba untuk program penghijauan",
    "Energi nuklir harus dijadikan solusi utama pengganti batu bara"
  ],
  teknologi: [
    "Penggunaan Artificial Intelligence di sekolah harus dibatasi secara ketat",
    "Media sosial harus menetapkan batas usia minimum 16 tahun",
    "Pemerintah harus mengatur perkembangan AI dengan undang-undang yang ketat",
    "Sistem kerja remote harus menjadi standar di sebagian besar perusahaan",
    "Data pribadi warga negara harus dilindungi dengan hukum yang lebih tegas"
  ],
  pendidikan: [
    "Ujian Nasional harus dihapuskan sepenuhnya",
    "Sekolah wajib memberikan pendidikan seks sejak jenjang SMP",
    "Homeschooling harus diawasi dan diatur lebih ketat oleh pemerintah",
    "Beasiswa hanya boleh diberikan berdasarkan prestasi akademik murni",
    "Kurikulum sekolah harus lebih fokus ke keterampilan praktis daripada teori"
  ],
  kesehatan: [
    "Vaksinasi harus diwajibkan bagi seluruh warga negara",
    "Rokok harus dilarang total di seluruh ruang publik",
    "Pemerintah harus menaikkan cukai rokok secara signifikan",
    "Olahraga wajib harus diterapkan setiap hari di sekolah",
    "Makanan cepat saji wajib diberi label peringatan kesehatan yang jelas"
  ],
  mediasosial: [
    "Anonimitas di media sosial harus dihilangkan sepenuhnya",
    "Pemerintah berhak memblokir konten yang dianggap berbahaya",
    "Influencer harus bertanggung jawab secara hukum atas konten yang mereka buat",
    "Anak di bawah 18 tahun harus dibatasi waktu penggunaan media sosial",
    "Platform media sosial harus dikenai pajak yang lebih tinggi"
  ],
  ekonomi: [
    "Upah minimum harus diseragamkan secara nasional",
    "Pajak kekayaan harus diterapkan untuk orang super kaya",
    "Usaha kecil harus dibebaskan dari pajak selama 3 tahun pertama",
    "Barang mewah impor harus dikenai bea masuk yang sangat tinggi",
    "Sistem kerja 4 hari dalam seminggu harus menjadi standar nasional"
  ],
  transportasi: [
    "Kendaraan pribadi harus dibatasi masuk ke pusat kota pada jam sibuk",
    "Transportasi umum harus gratis untuk pelajar dan lansia",
    "Pemerintah harus memprioritaskan pembangunan jalur sepeda di setiap kota",
    "Semua kendaraan umum wajib menggunakan bahan bakar ramah lingkungan dalam 10 tahun",
    "Parkir di pusat kota harus dibuat sangat mahal untuk mengurangi kemacetan"
  ],
  random: []
};

// Gabungkan semua mosi untuk mode Random Debat
debatThemes.random = [
  ...debatThemes.lingkungan,
  ...debatThemes.teknologi,
  ...debatThemes.pendidikan,
  ...debatThemes.kesehatan,
  ...debatThemes.mediasosial,
  ...debatThemes.ekonomi,
  ...debatThemes.transportasi
];

// ===== STATE =====
let currentTopic = "";
let currentTopicsList = [];
let currentType = "pidato"; // "pidato" atau "debat"
let researchInterval = null;
let speakingInterval = null;
let researchTimeLeft = 600;
let speakingTimeLeft = 60;
let isSpinning = false;

// ===== DOM =====
const states = {
  home: document.getElementById("state-home"),
  mode: document.getElementById("state-mode"),
  debatMode: document.getElementById("state-debat-mode"),
  custom: document.getElementById("state-custom"),
  debatCustom: document.getElementById("state-debat-custom"),
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
const speakingTopic = document.getElementById("speaking-topic");
const researchTimerEl = document.getElementById("research-timer");
const speakingTimerEl = document.getElementById("speaking-timer");
const btnStartSpeaking = document.getElementById("btn-start-speaking");
const customInputsContainer = document.getElementById("custom-inputs");
const debatCustomInputsContainer = document.getElementById("debat-custom-inputs");
const customError = document.getElementById("custom-error");
const debatCustomError = document.getElementById("debat-custom-error");
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

function updateHeader(type) {
  if (type === "home") {
    mainTitle.textContent = "Public Speaking Trainer";
    mainSubtitle.textContent = "Latihan bicara & debat • Topik random";
  } else if (type === "pidato") {
    mainTitle.textContent = "PIDATO";
    mainSubtitle.textContent = "Latihan bicara 1 menit • Topik random";
  } else if (type === "debat") {
    mainTitle.textContent = "DEBAT";
    mainSubtitle.textContent = "Latihan debat 1 menit • Mosi random";
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

// ===== CUSTOM INPUTS =====
function createCustomInput(container, value = "") {
  const row = document.createElement("div");
  row.className = "custom-input-row";

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = currentType === "debat" ? "Tulis mosi..." : "Tulis topik...";
  input.value = value;

  const removeBtn = document.createElement("button");
  removeBtn.className = "btn-remove";
  removeBtn.innerHTML = "×";
  removeBtn.type = "button";
  removeBtn.addEventListener("click", () => {
    if (container.children.length > 3) {
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
    customInputsContainer.appendChild(createCustomInput(customInputsContainer));
  }
}

function initDebatCustomInputs() {
  debatCustomInputsContainer.innerHTML = "";
  for (let i = 0; i < 3; i++) {
    debatCustomInputsContainer.appendChild(createCustomInput(debatCustomInputsContainer));
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
        topicLabel.textContent = currentType === "debat" ? "Mosi kamu" : "Topik kamu";
        showState("topic");
        btnSpin.disabled = false;
        btnSpin.textContent = currentType === "debat" ? "Tentukan Mosi" : "Tentukan Topik";
      }, 400);
    }
  }

  requestAnimationFrame(animate);
}

// ===== ACTIONS =====
function goHome() {
  clearTimers();
  currentType = "pidato";
  updateHeader("home");
  showState("home");
}

function goPidato() {
  currentType = "pidato";
  updateHeader("pidato");
  showState("mode");
}

function goDebat() {
  currentType = "debat";
  updateHeader("debat");
  showState("debatMode");
}

function selectMode(mode) {
  if (mode === "custom") {
    initCustomInputs();
    customError.textContent = "";
    showState("custom");
    return;
  }

  currentTopicsList = themes[mode];
  spinThemeLabel.textContent = mode === "random" ? "Mode Random" : "Tema " + mode.charAt(0).toUpperCase() + mode.slice(1);
  btnSpin.textContent = "Tentukan Topik";
  
  const finalTopic = prepareSlot(currentTopicsList);
  currentTopic = finalTopic;
  
  showState("spin");
}

function selectDebatTheme(theme) {
  currentTopicsList = debatThemes[theme];
  spinThemeLabel.textContent = theme === "random" ? "Mode Random" : "Tema " + theme.charAt(0).toUpperCase() + theme.slice(1);
  btnSpin.textContent = "Tentukan Mosi";
  
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
  btnSpin.textContent = "Tentukan Topik";
  showState("spin");
}

function startDebatCustom() {
  const inputs = debatCustomInputsContainer.querySelectorAll("input");
  const list = Array.from(inputs)
    .map(inp => inp.value.trim())
    .filter(v => v.length > 0);

  if (list.length < 3) {
    debatCustomError.textContent = "Minimal harus 3 mosi.";
    return;
  }
  if (list.length > 30) {
    debatCustomError.textContent = "Maksimal 30 mosi.";
    return;
  }

  currentTopicsList = list;
  const finalTopic = prepareSlot(currentTopicsList);
  currentTopic = finalTopic;
  spinThemeLabel.textContent = "Mode Custom";
  btnSpin.textContent = "Tentukan Mosi";
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
  if (currentType === "debat") {
    updateHeader("debat");
    showState("debatMode");
  } else {
    updateHeader("pidato");
    showState("mode");
  }
}

// ===== EVENT LISTENERS =====

// Home
document.getElementById("btn-go-pidato").addEventListener("click", goPidato);
document.getElementById("btn-go-debat").addEventListener("click", goDebat);
document.getElementById("btn-support").addEventListener("click", () => {
  window.open("https://saweria.co/dlofirim", "_blank");
});

// Back buttons
document.getElementById("btn-back-home-pidato").addEventListener("click", goHome);
document.getElementById("btn-back-home-debat").addEventListener("click", goHome);
document.getElementById("btn-back-mode").addEventListener("click", () => {
  updateHeader("pidato");
  showState("mode");
});
document.getElementById("btn-back-debat-mode").addEventListener("click", () => {
  updateHeader("debat");
  showState("debatMode");
});

// Pidato mode buttons
document.querySelectorAll("#state-mode .mode-btn").forEach(btn => {
  btn.addEventListener("click", () => selectMode(btn.dataset.mode));
});

// Debat theme buttons
document.querySelectorAll(".debat-theme").forEach(btn => {
  btn.addEventListener("click", () => selectDebatTheme(btn.dataset.theme));
});

// Debat custom
document.getElementById("btn-debat-custom").addEventListener("click", () => {
  initDebatCustomInputs();
  debatCustomError.textContent = "";
  showState("debatCustom");
});

// Custom inputs
document.getElementById("btn-add-topic").addEventListener("click", () => {
  if (customInputsContainer.children.length < 30) {
    customInputsContainer.appendChild(createCustomInput(customInputsContainer));
  }
});

document.getElementById("btn-add-mosi").addEventListener("click", () => {
  if (debatCustomInputsContainer.children.length < 30) {
    debatCustomInputsContainer.appendChild(createCustomInput(debatCustomInputsContainer));
  }
});

document.getElementById("btn-start-custom").addEventListener("click", startCustom);
document.getElementById("btn-start-debat-custom").addEventListener("click", startDebatCustom);

// Spin
document.getElementById("btn-spin").addEventListener("click", () => {
  startSpinAnimation(currentTopic);
});

// Research & Speaking
document.getElementById("btn-start-research").addEventListener("click", startResearch);
document.getElementById("btn-skip-research").addEventListener("click", skipResearch);
document.getElementById("btn-start-speaking").addEventListener("click", startSpeaking);
document.getElementById("btn-finish").addEventListener("click", finishSpeaking);
document.getElementById("btn-again").addEventListener("click", tryAgain);
