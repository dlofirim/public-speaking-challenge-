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
let selectedResearchSeconds = 600;
let selectedSpeakingSeconds = 60;
let isSpinning = false;
let previousStateBeforeTime = "mode"; // untuk back dari time select
let previousStateBeforeSpin = "time"; // untuk back dari spin

// ===== DOM =====
const states = {
  home: document.getElementById("state-home"),
  mode: document.getElementById("state-mode"),
  debatMode: document.getElementById("state-debat-mode"),
  custom: document.getElementById("state-custom"),
  debatCustom: document.getElementById("state-debat-custom"),
  time: document.getElementById("state-time"),
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
const btnSkipResearch = document.getElementById("btn-skip-research");
const customInputsContainer = document.getElementById("custom-inputs");
const debatCustomInputsContainer = document.getElementById("debat-custom-inputs");
const customError = document.getElementById("custom-error");
const debatCustomError = document.getElementById("debat-custom-error");
const slotList = document.getElementById("slot-list");
const spinThemeLabel = document.getElementById("spin-theme-label");
const btnSpin = document.getElementById("btn-spin");
const btnSpeakingTime = document.getElementById("btn-speaking-time");
const btnResearchTime = document.getElementById("btn-research-time");
const speakingOptions = document.getElementById("speaking-options");
const researchOptions = document.getElementById("research-options");

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

// Spin sound - continuous rising/falling noise like slot machine
let spinOscillators = [];
let spinGain = null;
let spinNoiseNode = null;

function startSpinSound() {
  try {
    const ctx = getAudioCtx();
    stopSpinSound();

    // Create noise buffer for mechanical feel
    const bufferSize = ctx.sampleRate * 0.5;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.3;
    }

    spinNoiseNode = ctx.createBufferSource();
    spinNoiseNode.buffer = buffer;
    spinNoiseNode.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(800, ctx.currentTime);
    filter.Q.value = 1.5;

    spinGain = ctx.createGain();
    spinGain.gain.setValueAtTime(0.12, ctx.currentTime);

    // Add a couple of oscillators for tonal spin feel
    const osc1 = ctx.createOscillator();
    osc1.type = "sawtooth";
    osc1.frequency.setValueAtTime(120, ctx.currentTime);
    osc1.frequency.linearRampToValueAtTime(80, ctx.currentTime + 2.8);

    const osc2 = ctx.createOscillator();
    osc2.type = "square";
    osc2.frequency.setValueAtTime(60, ctx.currentTime);
    osc2.frequency.linearRampToValueAtTime(40, ctx.currentTime + 2.8);

    const oscGain = ctx.createGain();
    oscGain.gain.setValueAtTime(0.04, ctx.currentTime);
    oscGain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 2.8);

    spinNoiseNode.connect(filter);
    filter.connect(spinGain);
    osc1.connect(oscGain);
    osc2.connect(oscGain);
    oscGain.connect(spinGain);
    spinGain.connect(ctx.destination);

    spinNoiseNode.start();
    osc1.start();
    osc2.start();

    spinOscillators = [osc1, osc2, spinNoiseNode];

    // Frequency sweep on filter for spin effect
    filter.frequency.linearRampToValueAtTime(400, ctx.currentTime + 1.5);
    filter.frequency.linearRampToValueAtTime(1200, ctx.currentTime + 2.5);
    filter.frequency.linearRampToValueAtTime(300, ctx.currentTime + 2.8);
  } catch (e) {}
}

function stopSpinSound() {
  try {
    if (spinGain) {
      spinGain.gain.exponentialRampToValueAtTime(0.001, getAudioCtx().currentTime + 0.15);
    }
    spinOscillators.forEach(node => {
      try { node.stop(getAudioCtx().currentTime + 0.2); } catch (e) {}
    });
    spinOscillators = [];
    spinGain = null;
    spinNoiseNode = null;
  } catch (e) {}
}

// Better end / warning beep - soft, pleasant tone
function playEndBeep(isFinal = false) {
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (isFinal) {
      // Final success-like chime
      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.15); // E5
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.3); // G5

      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.7);
    } else {
      // Soft warning beep
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.2);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.25);
    }
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
  btnSpin.textContent = "MENGUNDI...";

  startSpinSound();

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
      stopSpinSound();
      
      setTimeout(() => {
        isSpinning = false;
        topicText.textContent = currentTopic;
        topicLabel.textContent = currentType === "debat" ? "MOSI KAMU" : "TOPIK KAMU";
        showState("topic");
        btnSpin.disabled = false;
        btnSpin.textContent = currentType === "debat" ? "TENTUKAN MOSI" : "TENTUKAN TOPIK";
      }, 400);
    }
  }

  requestAnimationFrame(animate);
}

// ===== TIME SELECT =====
function resetTimeUI() {
  selectedSpeakingSeconds = 60;
  selectedResearchSeconds = 600;
  btnSpeakingTime.textContent = "1 MENIT";
  btnResearchTime.textContent = "10 MENIT";
  speakingOptions.classList.remove("show");
  researchOptions.classList.remove("show");
  btnSpeakingTime.classList.remove("active");
  btnResearchTime.classList.remove("active");

  speakingOptions.querySelectorAll(".time-opt").forEach(b => b.classList.remove("selected"));
  researchOptions.querySelectorAll(".time-opt").forEach(b => b.classList.remove("selected"));
  speakingOptions.querySelector('[data-seconds="60"]').classList.add("selected");
  researchOptions.querySelector('[data-seconds="600"]').classList.add("selected");
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
  spinThemeLabel.textContent = mode === "random" ? "MODE RANDOM" : "TEMA " + mode.toUpperCase();
  btnSpin.textContent = "TENTUKAN TOPIK";
  
  const finalTopic = prepareSlot(currentTopicsList);
  currentTopic = finalTopic;
  
  goToTimeSelect("mode");
}

function selectDebatTheme(theme) {
  currentTopicsList = debatThemes[theme];
  spinThemeLabel.textContent = theme === "random" ? "MODE RANDOM" : "TEMA " + theme.toUpperCase();
  btnSpin.textContent = "TENTUKAN MOSI";
  
  const finalTopic = prepareSlot(currentTopicsList);
  currentTopic = finalTopic;
  
  goToTimeSelect("debatMode");
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
  spinThemeLabel.textContent = "MODE CUSTOM";
  btnSpin.textContent = "TENTUKAN TOPIK";
  goToTimeSelect("custom");
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
  spinThemeLabel.textContent = "MODE CUSTOM";
  btnSpin.textContent = "TENTUKAN MOSI";
  goToTimeSelect("debatCustom");
}

function confirmTime() {
  researchTimeLeft = selectedResearchSeconds;
  speakingTimeLeft = selectedSpeakingSeconds;
  previousStateBeforeSpin = "time";
  showState("spin");
}

function startResearch() {
  clearTimers();
  researchTimeLeft = selectedResearchSeconds;
  researchTimerEl.textContent = formatTime(researchTimeLeft);
  btnStartSpeaking.disabled = true;
  btnSkipResearch.style.display = "block";
  btnStartSpeaking.textContent = "MULAI BICARA (" + formatMinutesLabel(selectedSpeakingSeconds) + ")";
  showState("research");

  researchInterval = setInterval(() => {
    researchTimeLeft--;
    researchTimerEl.textContent = formatTime(researchTimeLeft);

    if (researchTimeLeft === 5 || researchTimeLeft === 3 || researchTimeLeft === 1) {
      playEndBeep(false);
    }

    if (researchTimeLeft <= 0) {
      clearInterval(researchInterval);
      btnStartSpeaking.disabled = false;
      researchTimerEl.textContent = "00:00";
      btnSkipResearch.style.display = "none"; // hilangkan tombol lewati setelah selesai
      playEndBeep(true);
    }
  }, 1000);
}

function skipResearch() {
  clearTimers();
  researchTimeLeft = 0;
  researchTimerEl.textContent = "00:00";
  btnStartSpeaking.disabled = false;
  btnSkipResearch.style.display = "none";
}

function startSpeaking() {
  clearTimers();
  speakingTimeLeft = selectedSpeakingSeconds;
  speakingTimerEl.textContent = formatTime(speakingTimeLeft);
  speakingTopic.textContent = currentTopic;
  showState("speaking");

  speakingInterval = setInterval(() => {
    speakingTimeLeft--;
    speakingTimerEl.textContent = formatTime(speakingTimeLeft);

    if (speakingTimeLeft === 5 || speakingTimeLeft === 3 || speakingTimeLeft === 1) {
      playEndBeep(false);
    }

    if (speakingTimeLeft <= 0
