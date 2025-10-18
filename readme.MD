 
# 🤖 Bit-Ty: Rencana Proyek Asisten Desktop Interaktif

![Status Proyek](https://img.shields.io/badge/status-Perencanaan-blue)

Selamat datang di repositori **Bit-Ty**! Ini adalah dokumen perencanaan untuk membuat robot asisten desktop interaktif DIY. Dokumen ini menguraikan ide, arsitektur yang diusulkan, dan komponen yang direncanakan untuk proyek ini.

---

## 💡 Ide & Tujuan Utama

Tujuan proyek ini adalah merancang dan membangun **Bit-Ty**, sebuah robot kecil yang diletakkan di meja untuk berinteraksi dengan desktop/laptop.

**Prinsip Desain Utama:**
1.  **Kenyamanan Pengguna:** Robot harus terhubung ke laptop hanya dengan **satu kabel USB**.
2.  **Stabilitas:** Koneksi harus stabil tanpa mengorbankan fungsionalitas.
3.  **Responsif:** Robot harus memberikan umpan balik instan, baik secara fisik maupun digital.

Bit-Ty akan berfungsi sebagai "teman" fisik untuk komputermu, mampu mengekspresikan "emosi", merespon sentuhan gestur, dan bahkan membantumu mengontrol volume secara fisik.

---

## ✨ Fitur yang Direncanakan

* **Ekspresi Wajah:** Menampilkan berbagai ekspresi di layar OLED.
* **Kontrol Gestur:** Menggunakan sensor APDS-9960 untuk mendeteksi gestur (geser kanan/kiri/atas/bawah) yang akan dipetakan ke *shortcut* OS (misal: Alt+Tab).
* **Kontrol Volume Fisik:** Sebuah fitur unik di mana servo tangan "di-hack" untuk membaca putaran manual dari pengguna, yang kemudian diterjemahkan menjadi kontrol volume desktop.
* **Monitoring Suhu:** Membaca dan menampilkan suhu ruangan saat ini via DHT11.
* **Perintah Suara:** Implementasi *Keyword Spotting* (KWS) di ESP32. Setelah kata kunci terdeteksi, audio akan di-stream ke desktop untuk diproses lebih lanjut (ASR).
* **4-Axis Gerakan:** Memiliki 4 servo (2 tangan, 1 kepala, 1 badan) untuk gerakan yang ekspresif.

---

## 🛠️ Rencana Tech Stack

* **Firmware (Robot):** **C++** (Arduino Framework)
* **Backend (Desktop):** **Python** & **Flask**
* **Frontend (Desktop):** **Electron** (sebagai *wrapper* aplikasi)
* **UI (Frontend):** **Next.js** (diekspor sebagai file statis)

---

## 🏗️ Arsitektur yang Diusulkan

Arsitektur Bit-Ty dirancang untuk dua hal: **stabilitas daya** dan **koneksi data yang responsif**.

### 1. Arsitektur Fisik & Power (Satu Kabel)

Rancangan ini sengaja menghindari *buck converter* atau kebutuhan dua kabel.
* **Sumber:** 1x Port USB Laptop.
* **Fungsi Kabel:** Kabel USB ini akan membawa **Power (5V)** dan **Data (Serial)** sekaligus.
* **Stabilizer (Krusial!):** Sebuah **Kapasitor 1000µF** (atau lebih besar) akan dipasang paralel di jalur 5V dan GND. Ini berfungsi sebagai "ember" penampung daya untuk menangani **lonjakan arus (peak current)** dari servo, mencegah ESP32 dari *brownout* atau *restart*.

### 2. Arsitektur Logika & Data (Serial-First)

Sistem ini akan memiliki 3 pemain utama yang berkomunikasi:

1.  **Frontend (UI Electron):** Ini adalah "wajah" aplikasi yang dilihat pengguna. Tugasnya hanya mengirim perintah (misal: "ubah ekspresi") ke Backend di `localhost`.
2.  **Backend (Flask):** Ini adalah "otak" dan "jembatan" utama.
    * Saat dimulai, Backend akan **mencari Bit-Ty di port Serial (USB)** terlebih dahulu.
    * Jika ketemu, semua komunikasi akan super cepat via Serial (`pyserial`).
    * Jika tidak ketemu (misal: kabel dicabut), dia akan beralih ke mode *fallback* dan **mencari Bit-Ty di jaringan WiFi**.
    * Dia juga yang akan mengeksekusi *shortcut* OS (via `pyautogui`) saat menerima event gestur.
3.  **Firmware (ESP32):** Ini adalah "pekerja".
    * Di dalam `loop()`, dia akan selalu **mengecek koneksi Serial** terlebih dahulu.
    * Jika Serial terhubung, semua data sensor (suhu, gestur) akan dikirim via `Serial.println()`.
    * Jika Serial tidak terhubung, barulah dia mengaktifkan WiFi dan mengirim data via WebSocket.

---

## 🔌 Rencana Komponen Hardware

| Kategori | Komponen | Catatan |
| :--- | :--- | :--- |
| **MCU** | Wemos D1 Mini ESP32 | Otak utama (Dual-Core) |
| **Servo** | 4x Servo (SG90) | 2 Tangan, 1 Kepala, 1 Badan |
| **Layar** | OLED SSD106 (I2C) | Untuk ekspresi wajah |
| **Sensor** | APDS-9960 (I2C) | Sensor gestur |
| **Sensor** | DHT11 | Sensor suhu & kelembaban |
| **Audio In** | INMP441 (I2S) | Microphone untuk KWS (Keyword Spotting)|
| **Audio Out** | PAM8403 + Speaker | Untuk respon suara |
| **Power** | **Kapasitor 1000µF 16V** | Penstabil daya servo |

---

## 🔴 Prinsip Desain 🔴

Rencana ini hanya akan berhasil jika dua prinsip desain ini diikuti dengan ketat dalam implementasinya:

1.  **Pemasangan Kapasitor:** Kegagalan memasang kapasitor 1000µF akan membuat ESP32 *brownout* setiap kali servo bergerak. Ini adalah komponen non-opsional dalam desain ini.
2.  **Manajemen Antrian Servo:** Karena keterbatasan daya USB, *firmware* **HARUS** diprogram untuk **tidak pernah** menggerakkan 2 servo atau lebih secara bersamaan. Harus ada sistem antrian (queue) untuk semua perintah gerak yang dieksekusi satu per satu. **Fitur "joged" (gerak bersamaan) sengaja ditiadakan demi stabilitas.**

---

## 🗺️ Roadmap Implementasi

- [ ] **Fase 1 – Prototipe Hardware Minimum:** Rangkaian servo, sensor, OLED, dan kapasitor 1000µF terpasang rapi di breadboard/chassis.
- [ ] **Fase 2 – Firmware Serial-First:** Implementasi antrian servo, pembacaan sensor berkala, dan fallback WiFi sesuai diagram `diagram-serial-connection.svg`.
- [ ] **Fase 3 – Backend & UI Desktop:** Flask mendeteksi Bit-Ty via serial, menyediakan WebSocket untuk Electron, serta memaparkan kontrol gestur/volume.
- [ ] **Fase 4 – Pengalaman Pengguna & QA:** Penyempurnaan ekspresi, pemetaan gestur ke hotkey OS, pengujian stres daya dan long-run test.

Roadmap ini dapat diperluas dengan menandai status (`[x]`) setiap fase setelah selesai.

## 🔄 Alur Sistem Interaktif

Bit-Ty memiliki dua jalur interaksi utama antara pengguna, aplikasi desktop, dan robot fisik. Diagram kasarnya tersimpan di `/docs/diagram`.

1. **User → Sistem:** Pengguna mengirim perintah melalui UI Electron, backend mengeksekusi perintah ke firmware, dan robot menyikapi secara fisik. Diagram lengkap: `diagram-user-to-system.svg`.
2. **Sistem → User:** Perubahan sensor atau aksi otomatis robot diteruskan ke backend, lalu ditampilkan kembali sebagai feedback visual/OS. Diagram lengkap: `diagram-system-to-user.svg`.

![Alur User ke Sistem](docs/diagram/diagram-user-to-system.svg)

![Alur Sistem ke User](docs/diagram/diagram-system-to-user.svg)

## 🔗 Logika Koneksi Serial-First

Prioritas koneksi dijelaskan di `diagram-serial-connection.svg` dan merangkum strategi berikut:

- Backend selalu memindai port serial terlebih dahulu dan mengunci mode `SERIAL` saat Bit-Ty terdeteksi.
- Jika serial gagal, backend menetapkan mode `WIFI` dan mencari Bit-Ty via mDNS sebagai fallback.
- Firmware melakukan pengecekan `Serial.available()` di dalam `loop()`; jika tidak ada koneksi serial, barulah modul WiFi diaktifkan untuk mengirim data melalui WebSocket.
- Seluruh telemetri sensor dikirim via `Serial.println()` saat kabel USB terhubung sehingga latensi tetap rendah.

## ⚡ Manajemen Daya & Distribusi Beban

Diagram `diagram-power-arcitecture.svg` mendokumentasikan strategi distribusi daya dari satu port USB:

- Kabel USB tunggal memasok 5V dan data serial ke ESP32 (Wemos D1 Mini).
- Kapasitor 1000µF paralel pada rel 5V menjadi penyangga lonjakan arus servo; komponen ini wajib.
- Jalur PWM ke empat servo harus dijadwalkan bergantian untuk mencegah arus puncak simultan.
- Sensor I2C/I2S (OLED, APDS-9960, DHT11, INMP441) serta amplifier PAM8403 berbagi sumber 5V yang distabilkan kapasitor.
- Pertimbangkan uji beban bertahap: mulai dari satu servo bergerak, lalu tambah perangkat untuk memastikan port USB laptop tidak melebihi batas arus.

## 🧪 Rencana Pengujian Awal

- **Uji Daya Static & Dynamic:** Monitor tegangan 5V saat servo bergerak bergantian untuk memastikan tidak terjadi brownout.
- **Verifikasi Antrian Servo:** Jalankan skrip yang memicu banyak perintah gerak dan pastikan servo selalu bergerak satu per satu.
- **Tes Gestur ke Hotkey:** Simulasikan setiap gestur APDS-9960 dan pastikan backend memetakan ke hotkey OS yang benar.
- **Pengujian Serial→WiFi Fallback:** Cabut kabel USB saat sistem berjalan untuk memastikan backend dan firmware berpindah ke mode WiFi tanpa crash.
- **Latency Check UI:** Ukur waktu perubahan sensor ditampilkan di UI guna memastikan pengalaman responsif (&lt;200 ms target awal).

## 🤝 Kontribusi

1. Buka *issue* baru untuk setiap ide fitur atau temuan bug.
2. Lampirkan referensi diagram atau log yang relevan agar diskusi terarah.
3. Buat *pull request* dengan deskripsi singkat perubahan, langkah uji yang dijalankan, dan update checklist roadmap bila perlu.

## 📄 Lisensi

Lisensi belum ditentukan. Tambahkan berkas lisensi (mis. MIT/BSD) sebelum rilis publik agar hak distribusi jelas.