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

themes.random = [
  ...themes.hewan, ...themes.makanan, ...themes.alam,
  ...themes.kehidupan, ...themes.teknologi, ...themes.olahraga, ...themes.pendidikan
];

// ===== DATA TEMA DEBAT =====
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
let currentType = "pidato";
let researchInterval = null;
let speakingInterval = null;
let researchTimeLeft = 600;
let speakingTimeLeft = 60;
let selectedResearchTime = 600;
let selectedSpeakingTime = 60;
let isSpinning = false;
let spinSoundInterval = null;

// ===== HELPERS =====
function showState(name) {
  document.querySelectorAll(".state").forEach(el => el.classList.remove("active"));
  const target = document.getElementById("state-" + name);
  if (target) target.classList.add("active");
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
  if (spinSoundInterval) clearInterval(spinSoundInterval);
  researchInterval = null;
  speakingInterval = null;
  spinSoundInterval = null;
}

function updateHeader(type) {
  const mainTitle = document.getElementById("main-title");
  const mainSubtitle = document.getElementById("main-subtitle");
  if (!mainTitle || !mainSubtitle) return;

  if (type === "home") {
    mainTitle.textContent = "PUBLIC SPEAKING TRAINER";
    mainSubtitle.textContent = "Latihan bicara & debat • Topik random";
  } else if (type === "pidato") {
    mainTitle.textContent = "PIDATO";
    mainSubtitle.textContent = "Latihan bicara • Topik random";
  } else if (type === "debat") {
    mainTitle.textContent = "DEBAT";
    mainSubtitle.textContent = "Latihan debat • Mosi random";
  }
}

// ===== SOUND EFFECTS =====
function playTick() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "square";
    osc.frequency.setValueAtTime(800 + Math.random() * 400, ctx.currentTime);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.08);
  } catch (e) {}
}

function playSpinEnd() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(520, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(780, ctx.currentTime + 0.25);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.4);
  } catch (e) {}
}

function playCountdownBeep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.2);
  } catch (e) {}
}

function playFinishSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [523.25, 659.25, 783.99];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.12);
      gain.gain.setValueAtTime(0.14, ctx.currentTime + i * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.35);
      osc.start(ctx.currentTime + i * 0.12);
      osc.stop(ctx.currentTime + i * 0.12 + 0.35);
    });
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
  const container = document.getElementById("custom-inputs");
  if (!container) return;
  container.innerHTML = "";
  for (let i = 0; i < 3; i++) {
    container.appendChild(createCustomInput(container));
  }
}

function initDebatCustomInputs() {
  const container = document.getElementById("debat-custom-inputs");
  if (!container) return;
  container.innerHTML = "";
  for (let i = 0; i < 3; i++) {
    container.appendChild(createCustomInput(container));
  }
}

// ===== SLOT MACHINE =====
function prepareSlot(list) {
  const slotList = document.getElementById("slot-list");
  if (!slotList) return list[0];

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

  const btnSpin = document.getElementById("btn-spin");
  const slotList = document.getElementById("slot-list");
  if (!btnSpin || !slotList) return;

  btnSpin.disabled = true;
  btnSpin.textContent = "Mengundi...";

  let tickCount = 0;
  spinSoundInterval = setInterval(() => {
    playTick();
    tickCount++;
    if (tickCount > 35) {
      clearInterval(spinSoundInterval);
      spinSoundInterval = null;
    }
  }, 70);

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
      playSpinEnd();
      
      setTimeout(() => {
        isSpinning = false;
        const topicText = document.getElementById("topic-text");
        const topicLabel = document.getElementById("topic-label");
        if (topicText) topicText.textContent = currentTopic;
        if (topicLabel) topicLabel.textContent = currentType === "debat" ? "Mosi kamu" : "Topik kamu";
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
  showState("debat-mode");
}

function goToSettings() {
  document.querySelectorAll("#speaking-options .time-btn").forEach(btn => {
    btn.classList.toggle("active", parseInt(btn.dataset.seconds) === selectedSpeakingTime);
  });
  document.querySelectorAll("#research-options .time-btn").forEach(btn => {
    btn.classList.toggle("active", parseInt(btn.dataset.seconds) === selectedResearchTime);
  });
  showState("settings");
}

function selectMode(mode) {
  if (mode === "custom") {
    initCustomInputs();
    const err = document.getElementById("custom-error");
    if (err) err.textContent = "";
    showState("custom");
    return;
  }

  currentTopicsList = themes[mode];
  const spinThemeLabel = document.getElementById("spin-theme-label");
  const btnSpin = document.getElementById("btn-spin");
  if (spinThemeLabel) spinThemeLabel.textContent = mode === "random" ? "Mode Random" : "Tema " + mode.charAt(0).toUpperCase() + mode.slice(1);
  if (btnSpin) btnSpin.textContent = "Tentukan Topik";
  
  const finalTopic = prepareSlot(currentTopicsList);
  currentTopic = finalTopic;
  
  goToSettings();
}

function selectDebatTheme(theme) {
  currentTopicsList = debatThemes[theme];
  const spinThemeLabel = document.getElementById("spin-theme-label");
  const btnSpin = document.getElementById("btn-spin");
  if (spinThemeLabel) spinThemeLabel.textContent = theme === "random" ? "Mode Random" : "Tema " + theme.charAt(0).toUpperCase() + theme.slice(1);
  if (btnSpin) btnSpin.textContent = "Tentukan Mosi";
  
  const finalTopic = prepareSlot(currentTopicsList);
  currentTopic = finalTopic;
  
  goToSettings();
}

function startCustom() {
  const container = document.getElementById("custom-inputs");
  const err = document.getElementById("custom-error");
  if (!container) return;

  const inputs = container.querySelectorAll("input");
  const list = Array.from(inputs)
    .map(inp => inp.value.trim())
    .filter(v => v.length > 0);

  if (list.length < 3) {
    if (err) err.textContent = "Minimal harus 3 topik.";
    return;
  }
  if (list.length > 30) {
    if (err) err.textContent = "Maksimal 30 topik.";
    return;
  }

  currentTopicsList = list;
  const finalTopic = prepareSlot(currentTopicsList);
  currentTopic = finalTopic;
  const spinThemeLabel = document.getElementById("spin-theme-label");
  const btnSpin = document.getElementById("btn-spin");
  if (spinThemeLabel) spinThemeLabel.textContent = "Mode Custom";
  if (btnSpin) btnSpin.textContent = "Tentukan Topik";
  goToSettings();
}

function startDebatCustom() {
  const container = document.getElementById("debat-custom-inputs");
  const err = document.getElementById("debat-custom-error");
  if (!container) return;

  const inputs = container.querySelectorAll("input");
  const list = Array.from(inputs)
    .map(inp => inp.value.trim())
    .filter(v => v.length > 0);

  if (list.length < 3) {
    if (err) err.textContent = "Minimal harus 3 mosi.";
    return;
  }
  if (list.length > 30) {
    if (err) err.textContent = "Maksimal 30 mosi.";
    return;
  }

  currentTopicsList = list;
  const finalTopic = prepareSlot(currentTopicsList);
  currentTopic = finalTopic;
  const spinThemeLabel = document.getElementById("spin-theme-label");
  const btnSpin = document.getElementById("btn-spin");
  if (spinThemeLabel) spinThemeLabel.textContent = "Mode Custom";
  if (btnSpin) btnSpin.textContent = "Tentukan Mosi";
  goToSettings();
}

function startResearch() {
  clearTimers();
  researchTimeLeft = selectedResearchTime;
  const researchTimerEl = document.getElementById("research-timer");
  const btnStartSpeaking = document.getElementById("btn-start-speaking");
  const btnSkipResearch = document.getElementById("btn-skip-research");

  if (researchTimerEl) researchTimerEl.textContent = formatTime(researchTimeLeft);
  if (btnStartSpeaking) btnStartSpeaking.disabled = true;
  if (btnSkipResearch) btnSkipResearch.style.display = "block";
  showState("research");

  researchInterval = setInterval(() => {
    researchTimeLeft--;
    if (researchTimerEl) researchTimerEl.textContent = formatTime(researchTimeLeft);

    if (researchTimeLeft === 10 || researchTimeLeft === 5 || researchTimeLeft === 3 || researchTimeLeft === 1) {
      playCountdownBeep();
    }

    if (researchTimeLeft <= 0) {
      clearInterval(researchInterval);
      if (btnStartSpeaking) btnStartSpeaking.disabled = false;
      if (btnSkipResearch) btnSkipResearch.style.display = "none";
      if (researchTimerEl) researchTimerEl.textContent = "00:00";
      playFinishSound();
    }
  }, 1000);
}

function skipResearch() {
  clearTimers();
  researchTimeLeft = 0;
  const researchTimerEl = document.getElementById("research-timer");
  const btnStartSpeaking = document.getElementById("btn-start-speaking");
  const btnSkipResearch = document.getElementById("btn-skip-research");

  if (researchTimerEl) researchTimerEl.textContent = "00:00";
  if (btnStartSpeaking) btnStartSpeaking.disabled = false;
  if (btnSkipResearch) btnSkipResearch.style.display = "none";
}

function startSpeaking() {
  clearTimers();
  speakingTimeLeft = selectedSpeakingTime;
  const speakingTimerEl = document.getElementById("speaking-timer");
  const speakingTopic = document.getElementById("speaking-topic");

  if (speakingTimerEl) speakingTimerEl.textContent = formatTime(speakingTimeLeft);
  if (speakingTopic) speakingTopic.textContent = currentTopic;
  showState("speaking");

  speakingInterval = setInterval(() => {
    speakingTimeLeft--;
    if (speakingTimerEl) speakingTimerEl.textContent = formatTime(speakingTimeLeft);

    if (speakingTimeLeft === 10 || speakingTimeLeft === 5 || speakingTimeLeft === 3 || speakingTimeLeft === 1) {
      playCountdownBeep();
    }

    if (speakingTimeLeft <= 0) {
      clearInterval(speakingInterval);
      playFinishSound();
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
    showState("debat-mode");
  } else {
    updateHeader("pidato");
    showState("mode");
  }
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", function () {
  // Home
  const btnGoPidato = document.getElementById("btn-go-pidato");
  const btnGoDebat = document.getElementById("btn-go-debat");
  const btnSupport = document.getElementById("btn-support");

  if (btnGoPidato) btnGoPidato.addEventListener("click", goPidato);
  if (btnGoDebat) btnGoDebat.addEventListener("click", goDebat);
  if (btnSupport) {
    btnSupport.addEventListener("click", () => {
      window.open("https://saweria.co/dlofirim", "_blank");
    });
  }

  // Back buttons
  const btnBackHomePidato = document.getElementById("btn-back-home-pidato");
  const btnBackHomeDebat = document.getElementById("btn-back-home-debat");
  const btnBackMode = document.getElementById("btn-back-mode");
  const btnBackDebatMode = document.getElementById("btn-back-debat-mode");
  const btnBackSettings = document.getElementById("btn-back-settings");
  const btnBackSpin = document.getElementById("btn-back-spin");

  if (btnBackHomePidato) btnBackHomePidato.addEventListener("click", goHome);
  if (btnBackHomeDebat) btnBackHomeDebat.addEventListener("click", goHome);
  if (btnBackMode) {
    btnBackMode.addEventListener("click", () => {
      updateHeader("pidato");
      showState("mode");
    });
  
