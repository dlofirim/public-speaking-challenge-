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

de
... 
