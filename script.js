document.addEventListener("DOMContentLoaded", function() {
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

const POSITION_LIST = ["AFIRMASI", "OPOSISI"];

// ===== STATE =====
let currentTopic = "";
let currentPosition = "";
let currentTopicsList = [];
let currentType = "pidato";
let researchInterval = null;
let speakingInterval = null;
let researchTimeLeft = 600;
let speakingTimeLeft = 60;
let selectedResearchSeconds = 600;
let selectedSpeakingSeconds = 60;
let isSpinning = false;
let previousStateBeforeTime = "mode";
let isPositionSpin = false;

// ===== DOM =====
const states = {
  home: document.getElementById("state-home"),
  mode: document.getElementById("state-mode"),
  debatMode: document.getElementById("state-debat-mode"),
  custom: document.getElementById("state-custom"),
  debatCustom: document.getElementById("state-debat-custom"),
  time: document.getElementById("state-time"),
  spin: document.getElementById("state-spin"),
  position: document.getElementById("state-position"),
  topic: document.getElementById("state-topic"),
  research: document.getElementById("state-research"),
  speaking: document.getElementById("state-speaking"),
  done: document.getElementById("state-done")
};

const mainTitle = document.getElementById("main-title");
const mainSubtitle = document.getElementById("main-subtitle");
const topicText = document.getElementById("topic-text");
const topicLabel = document.getElementById("topic-label");
const positionText = document.getElementById("position-text");
const speakingTopic = document.getElementById("speaking-topic");
const researchTimerEl = document.getElementById("research-timer");
const speakingTimerEl = document.getElementById("speaking-timer");
const btnStartSpeaking = document.getElementById("btn-start-speaking");
const btnSkipResearch = document.getElementById("btn-skip-research");
const customInputsContainer = document.getElementById("custom-inputs");
const debatCustomInputsContainer = document.getElementById("debat-custom-inputs");
const customError = document.getElementById("custom-error");
const debatCustomError = document.getElementById("debat-custom-error");
const slotList = document.getElementById("slot-list");
const positionSlotList = document.getElementById("position-slot-list");
const spinThemeLabel = document.getElementById("spin-theme-label");
const btnSpin = document.getElementById("btn-spin");
const btnSpinPosition = document.getElementById("btn-spin-position");
const btnSpeakingTime = document.getElementById("btn-speaking-time");
const btnResearchTime = document.getElementById("btn-research-time");
const speakingOptions = document.getElementById("speaking-options");
const researchOptions = document.getElementById("research-options");

// ===== HELPERS =====
function showState(name) {
  Object.values(states).forEach(el => {
    if (el) el.classList.remove("active");
  });
  if (states[name]) states[name].classList.add("active");
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
}

function formatMinutesLabel(seconds) {
  const m = Math.floor(seconds / 60);
  return m + " MENIT";
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
    mainTitle.textContent = "PUBLIC SPEAKING TRAINER";
    mainSubtitle.textContent = "LATIHAN BICARA & DEBAT • TOPIK RANDOM";
  } else if (type === "pidato") {
    mainTitle.textContent = "PIDATO";
    mainSubtitle.textContent = "LATIHAN BICARA • TOPIK RANDOM";
  } else if (type === "debat") {
    mainTitle.textContent = "DEBAT";
    mainSubtitle.textContent = "LATIHAN DEBAT • MOSI RANDOM";
  }
}

// ===== SOUND (Web Audio API) =====
let audioCtx = null;

function getAudioCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

// Short clean "tit" beep
function playTit(volume = 0.14, freq = 920) {
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.1);
  } catch (e) {}
}

// Soft warning for last seconds
function playWarningBeep() {
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(740, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(520, ctx.currentTime + 0.18);
    gain.gain.setValueAtTime(0.13, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.22);
  } catch (e) {}
}

// Final chime
function playFinalChime() {
  try {
    const ctx = getAudioCtx();
    const notes = [523.25, 659.25, 783.99];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.12);
      gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.12);
      gain.gain.linearRampToValueAtTime(0.16, ctx.currentTime + i * 0.12 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.35);
      osc.start(ctx.currentTime + i * 0.12);
      osc.stop(ctx.currentTime + i * 0.12 + 0.4);
    });
  } catch (e) {}
}

// Spin sound
let spinOscillators = [];
let spinGain = null;

function startSpinSound() {
  try {
    const ctx = getAudioCtx();
    stopSpinSound();

    const bufferSize = ctx.sampleRate * 0.4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.28;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(900, ctx.currentTime);
    filter.Q.value = 1.8;

    spinGain = ctx.createGain();
    spinGain.gain.setValueAtTime(0.11, ctx.currentTime);

    const osc1 = ctx.createOscillator();
    osc1.type = "sawtooth";
    osc1.frequency.setValueAtTime(140, ctx.currentTime);
    osc1.frequency.linearRampToValueAtTime(70, ctx.currentTime + 2.8);

    const osc2 = ctx.createOscillator();
    osc2.type = "square";
    osc2.frequency.setValueAtTime(70, ctx.currentTime);
    osc2.frequency.linearRampToValueAtTime(35, ctx.currentTime + 2.8);

    const oscGain = ctx.createGain();
    oscGain.gain.setValueAtTime(0.035, ctx.currentTime);
    oscGain.gain.linearRampToValueAtTime(0.008, ctx.currentTime + 2.8);

    noise.connect(filter);
    filter.connect(spinGain);
    osc1.connect(oscGain);
    osc2.connect(oscGain);
    oscGain.connect(spinGain);
    spinGain.connect(ctx.destination);

    noise.start();
    osc1.start();
    osc2.start();

    spinOscillators = [osc1, osc2, noise];

    filter.frequency.linearRampToValueAtTime(450, ctx.currentTime + 1.4);
    filter.frequency.linearRampToValueAtTime(1100, ctx.currentTime + 2.4);
    filter.frequency.linearRampToValueAtTime(280, ctx.currentTime + 2.8);
  } catch (e) {}
}

function stopSpinSound() {
  try {
    if (spinGain) {
      spinGain.gain.exponentialRampToValueAtTime(0.001, getAudioCtx().currentTime + 0.12);
    }
    spinOscillators.forEach(node => {
      try { node.stop(getAudioCtx().currentTime + 0.18); } catch (e) {}
    });
    spinOscillators = [];
    spinGain = null;
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
    if (container.children.length > 3) row.remove();
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

// ===== SLOT MACHINE (shared) =====
function prepareSlot(list, targetListEl) {
  targetListEl.innerHTML = "";
  const extended = [];
  for (let i = 0; i < 14; i++) {
    extended.push(...list);
  }
  const finalItem = getRandomTopic(list);
  extended.push(finalItem);

  extended.forEach(item => {
    const div = document.createElement("div");
    div.className = "slot-item";
    div.textContent = item;
    targetListEl.appendChild(div);
  });

  return finalItem;
}

function runSpinAnimation(targetListEl, finalItem, onComplete) {
  if (isSpinning) return;
  isSpinning = true;

  startSpinSound();

  const items = targetListEl.querySelectorAll(".slot-item");
  const itemHeight = 70;
  const finalIndex = items.length - 1;

  targetListEl.style.transition = "none";
  targetListEl.style.transform = "translateY(0)";
  targetListEl.classList.add("spinning");
  void targetListEl.offsetWidth;

  const duration = 2800;
  const startTime = performance.now();

  function animate(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const currentY = -ease * finalIndex * itemHeight;
    targetListEl.style.transform = `translateY(${currentY}px)`;

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      targetListEl.classList.remove("spinning");
      targetListEl.style.transition = "transform 0.3s ease-out";
      stopSpinSound();
      setTimeout(() => {
        isSpinning = false;
        onComplete(finalItem);
      }, 350);
    }
  }

  requestAnimationFrame(animate);
}

// ===== TIME SELECT =====
function resetTimeUI() {
  selectedSpeakingSeconds = 60;
  selectedResearchSeconds = 600;
  if (btnSpeakingTime) {
    btnSpeakingTime.textContent = "1 MENIT";
    btnSpeakingTime.classList.remove("active");
  }
  if (btnResearchTime) {
    btnResearchTime.textContent = "10 MENIT";
    btnResearchTime.classList.remove("active");
  }
  if (speakingOptions) {
    speakingOptions.classList.remove("show");
    speakingOptions.querySelectorAll(".time-opt").forEach(b => b.classList.remove("selected"));
    const def = speakingOptions.querySelector('[data-seconds="60"]');
    if (def) def.classList.add("selected");
  }
  if (researchOptions) {
    researchOptions.classList.remove("show");
    researchOptions.querySelectorAll(".time-opt").forEach(b => b.classList.remove("selected"));
    const def = researchOptions.querySelector('[data-seconds="600"]');
    if (def) def.classList.add("selected");
  }
}

function goToTimeSelect(fromState) {
  previousStateBeforeTime = fromState;
  resetTimeUI();
  showState("time");
}

// ===== ACTIONS =====
function goHome() {
  clearTimers();
  currentType = "pidato";
  currentPosition = "";
  updateHeader("home");
  showState("home");
}

function goPidato() {
  currentType = "pidato";
  currentPosition = "";
  updateHeader("pidato");
  showState("mode");
}

function goDebat() {
  currentType = "debat";
  currentPosition = "";
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
  spinThemeLabel.textContent = mode === "random" ? "MODE RANDOM" : "TEMA " + mode.toUpperCase();
  btnSpin.textContent = "TENTUKAN TOPIK";
  const finalTopic = prepareSlot(currentTopicsList, slotList);
  currentTopic = finalTopic;
  goToTimeSelect("mode");
}

function selectDebatTheme(theme) {
  currentTopicsList = debatThemes[theme];
  spinThemeLabel.textContent = theme === "random" ? "MODE RANDOM" : "TEMA " + theme.toUpperCase();
  btnSpin.textContent = "TENTUKAN MOSI";
  const finalTopic = prepareSlot(currentTopicsList, slotList);
  currentTopic = finalTopic;
  goToTimeSelect("debatMode");
}

function startCustom() {
  const inputs = customInputsContainer.querySelectorAll("input");
  const list = Array.from(inputs).map(inp => inp.value.trim()).filter(v => v.length > 0);
  if (list.length < 3) {
    customError.textContent = "Minimal harus 3 topik.";
    return;
  }
  if (list.length > 30) {
    customError.textContent = "Maksimal 30 topik.";
    return;
  }
  currentTopicsList = list;
  const finalTopic = prepareSlot(currentTopicsList, slotList);
  currentTopic = finalTopic;
  spinThemeLabel.textContent = "MODE CUSTOM";
  btnSpin.textContent = "TENTUKAN TOPIK";
  goToTimeSelect("custom");
}

function startDebatCustom() {
  const inputs = debatCustomInputsContainer.querySelectorAll("input");
  const list = Array.from(inputs).map(inp => inp.value.trim()).filter(v => v.length > 0);
  if (list.length < 3) {
    debatCustomError.textContent = "Minimal harus 3 mosi.";
    return;
  }
  if (list.length > 30) {
    debatCustomError.textContent = "Maksimal 30 mosi.";
    return;
  }
  currentTopicsList = list;
  const finalTopic = prepareSlot(currentTopicsList, slotList);
  currentTopic = finalTopic;
  spinThemeLabel.textContent = "MODE CUSTOM";
  btnSpin.textContent = "TENTUKAN MOSI";
  goToTimeSelect("debatCustom");
}

function confirmTime() {
  researchTimeLeft = selectedResearchSeconds;
  speakingTimeLeft = selectedSpeakingSeconds;
  showState("spin");
}

function showTopicResult() {
  topicText.textContent = currentTopic;
  if (currentType === "debat") {
    topicLabel.textContent = "MOSI KAMU";
    if (currentPosition) {
      positionText.style.display = "inline-block";
      positionText.textContent = currentPosition;
      positionText.className = "position-badge" + (currentPosition === "OPOSISI" ? " oposisi" : "");
    } else {
      positionText.style.display = "none";
    }
  } else {
    topicLabel.textContent = "TOPIK KAMU";
    positionText.style.display = "none";
  }
  showState("topic");
}

function startPositionSpin() {
  const finalPos = prepareSlot(POSITION_LIST, positionSlotList);
  currentPosition = finalPos;
  showState("position");
}

function onMosiSpinComplete(finalItem) {
  currentTopic = finalItem;
  btnSpin.disabled = false;
  btnSpin.textContent = currentType === "debat" ? "TENTUKAN MOSI" : "TENTUKAN TOPIK";

  if (currentType === "debat") {
    // Lanjut ke spin posisi
    startPositionSpin();
  } else {
    showTopicResult();
  }
}

function onPositionSpinComplete(finalItem) {
  currentPosition = finalItem;
  btnSpinPosition.disabled = false;
  btnSpinPosition.textContent = "TENTUKAN POSISI";
  showTopicResult();
}

function startResearch() {
  clearTimers();
  researchTimeLeft = selectedResearchSeconds;
  researchTimerEl.textContent = formatTime(researchTimeLeft);
  btnStartSpeaking.disabled = true;
  if (btnSkipResearch) btnSkipResearch.style.display = "block";
  btnStartSpeaking.textContent = "MULAI BICARA (" + formatMinutesLabel(selectedSpeakingSeconds) + ")";
  showState("research");

  // 3 detik pertama: tit setiap detik
  let startTicks = 0;
  const startInterval = setInterval(() => {
    startTicks++;
    playTit(0.15, 880 + startTicks * 40);
    if (startTicks >= 3) clearInterval(startInterval);
  }, 1000);

  researchInterval = setInterval(() => {
    researchTimeLeft--;
    researchTimerEl.textContent = formatTime(researchTimeLeft);

    // 10 detik terakhir
    if (researchTimeLeft <= 10 && researchTimeLeft > 0) {
      if (researchTimeLeft <= 3) {
        playTit(0.18, 1000);
      } else {
        playWarningBeep();
      }
    }

    if (researchTimeLeft <= 0) {
      clearInterval(researchInterval);
      btnStartSpeaking.disabled = false;
      researchTimerEl.textContent = "00:00";
      if (btnSkipResearch) btnSkipResearch.style.display = "none";
      playFinalChime();
    }
  }, 1000);
}

function skipResearch() {
  clearTimers();
  researchTimeLeft = 0;
  researchTimerEl.textContent = "00:00";
  btnStartSpeaking.disabled = false;
  if (btnSkipResearch) btnSkipResearch.style.display = "none";
}

function startSpeaking() {
  clearTimers();
  speakingTimeLeft = selectedSpeakingSeconds;
  speakingTimerEl.textContent = formatTime(speakingTimeLeft);

  if (currentType === "debat" && currentPosition) {
    speakingTopic.textContent = currentPosition + " — " + currentTopic;
  } else {
    speakingTopic.textContent = currentTopic;
  }
  showState("speaking");

  // 3 detik pertama: tit
  let startTicks = 0;
  const startInterval = setInterval(() => {
    startTicks++;
    playTit(0.15, 880 + startTicks * 40);
    if (startTicks >= 3) clearInterval(startInterval);
  }, 1000);

  speakingInterval = setInterval(() => {
    speakingTimeLeft--;
    speakingTimerEl.textContent = formatTime(speakingTimeLeft);

    // 10 detik terakhir
    if (speakingTimeLeft <= 10 && speakingTimeLeft > 0) {
      if (speakingTimeLeft <= 3) {
        playTit(0.2, 1050);
      } else {
        playWarningBeep();
      }
    }

    if (speakingTimeLeft <= 0) {
      clearInterval(speakingInterval);
      playFinalChime();
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
  currentPosition = "";
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
const btnGoPidato = document.getElementById("btn-go-pidato");
const btnGoDebat = document.getElementById("btn-go-debat");
const btnSupport = document.getElementById("btn-support");
if (btnGoPidato) btnGoPidato.addEventListener("click", goPidato);
if (btnGoDebat) btnGoDebat.addEventListener("click", goDebat);
if (btnSupport) btnSupport.addEventListener("click", () => {
  window.open("https://saweria.co/dlofirim", "_blank");
});

// Back buttons
document.getElementById("btn-back-home-pidato")?.addEventListener("click", goHome);
document.getElementById("btn-back-home-debat")?.addEventListener("click", goHome);
document.getElementById("btn-back-mode")?.addEventListener("click", () => {
  updateHeader("pidato");
  showState("mode");
});
document.getElementById("btn-back-debat-mode")?.addEventListener("click", () => {
  updateHeader("debat");
  showState("debatMode");
});
document.getElementById("btn-back-time")?.addEventListener("click", () => {
  if (previousStateBeforeTime === "mode") {
    updateHeader("pidato");
    showState("mode");
  } else if (previousStateBeforeTime === "debatMode") {
    updateHeader("debat");
    showState("debatMode");
  } else if (previousStateBeforeTime === "custom") {
    showState("custom");
  } else if (previousStateBeforeTime === "debatCustom") {
    showState("debatCustom");
  }
});
document.getElementById("btn-back-spin")?.addEventListener("click", () => {
  showState("time");
});
document.getElementById("btn-back-position")?.addEventListener("click", () => {
  // Kembali ke hasil mosi (tapi karena mosi sudah di-spin, cukup ke spin lagi atau topic)
  // Paling aman: kembali ke halaman spin mosi
  showState("spin");
});

// Mode buttons
document.querySelectorAll("#state-mode .mode-btn").forEach(btn => {
  btn.addEventListener("click", () => selectMode(btn.dataset.mode));
});
document.querySelectorAll(".debat-theme").forEach(btn => {
  btn.addEventListener("click", () => selectDebatTheme(btn.dataset.theme));
});
document.getElementById("btn-debat-custom")?.addEventListener("click", () => {
  initDebatCustomInputs();
  debatCustomError.textContent = "";
  showState("debatCustom");
});

// Custom
document.getElementById("btn-add-topic")?.addEventListener("click", () => {
  if (customInputsContainer.children.length < 30) {
    customInputsContainer.appendChild(createCustomInput(customInputsContainer));
  }
});
document.getElementById("btn-add-mosi")?.addEventListener("click", () => {
  if (debatCustomInputsContainer.children.length < 30) {
    debatCustomInputsContainer.appendChild(createCustomInput(debatCustomInputsContainer));
  }
});
document.getElementById("btn-start-custom")?.addEventListener("click", startCustom);
document.getElementById("btn-start-debat-custom")?.addEventListener("click", startDebatCustom);

// Time select
if (btnSpeakingTime && speakingOptions) {
  btnSpeakingTime.addEventListener("click", () => {
    const isOpen = speakingOptions.classList.contains("show");
    speakingOptions.classList.toggle("show");
    if (researchOptions) researchOptions.classList.remove("show");
    btnSpeakingTime.classList.toggle("active", !isOpen);
    if (btnResearchTime) btnResearchTime.classList.remove("active");
  });
  speakingOptions.querySelectorAll(".time-opt").forEach(btn => {
    btn.addEventListener("click", () => {
      selectedSpeakingSeconds = parseInt(btn.dataset.seconds);
      btnSpeakingTime.textContent = formatMinutesLabel(selectedSpeakingSeconds);
      speakingOptions.querySelectorAll(".time-opt").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      speakingOptions.classList.remove("show");
      btnSpeakingTime.classList.remove("active");
    });
  });
}
if (btnResearchTime && researchOptions) {
  btnResearchTime.addEventListener("click", () => {
    const isOpen = researchOptions.classList.contains("show");
    researchOptions.classList.toggle("show");
    if (speakingOptions) speakingOptions.classList.remove("show");
    btnResearchTime.classList.toggle("active", !isOpen);
    if (btnSpeakingTime) btnSpeakingTime.classList.remove("active");
  });
  researchOptions.querySelectorAll(".time-opt").forEach(btn => {
    btn.addEventListener("click", () => {
      selectedResearchSeconds = parseInt(btn.dataset.seconds);
      btnResearchTime.textContent = formatMinutesLabel(selectedResearchSeconds);
      researchOptions.querySelectorAll(".time-opt").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      researchOptions.classList.remove("show");
      btnResearchTime.classList.remove("active");
    });
  });
}
document.getElementById("btn-confirm-time")?.addEventListener("click", confirmTime);

// Spin mosi / topik
btnSpin?.addEventListener("click", () => {
  if (isSpinning) return;
  btnSpin.disabled = true;
  btnSpin.textContent = "MENGUNDI...";
  const final = currentTopic; // already prepared
  // re-prepare to get new random each time user clicks
  const newFinal = prepareSlot(currentTopicsList, slotList);
  runSpinAnimation(slotList, newFinal, onMosiSpinComplete);
});

// Spin position
btnSpinPosition?.addEventListener("click", () => {
  if (isSpinning) return;
  btnSpinPosition.disabled = true;
  btnSpinPosition.textContent = "MENGUNDI...";
  const newFinal = prepareSlot(POSITION_LIST, positionSlotList);
  runSpinAnimation(positionSlotList, newFinal, onPositionSpinComplete);
});

// Research & Speaking
document.getElementById("btn-start-research")?.addEventListener("click", startResearch);
document.getElementById("btn-skip-research")?.addEventListener("click", skipResearch);
document.getElementById("btn-start-speaking")?.addEventListener("click", startSpeaking);
document.getElementById("btn-finish")?.addEventListener("click", finishSpeaking);
document.getElementById("btn-again")?.addEventListener("click", tryAgain);

}); // end DOMContentLoaded
