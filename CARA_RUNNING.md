# 🚀 Panduan Menjalankan Aplikasi Lost n Found

## 📋 Prerequisites (Persyaratan)

Sebelum menjalankan aplikasi, pastikan sudah terinstall:
- ✅ **Java 21** (untuk backend)
- ✅ **Maven** (untuk build backend)
- ✅ **Node.js v14+** (untuk frontend)
- ✅ **npm** (biasanya sudah termasuk dengan Node.js)

---

## 🔧 Langkah 1: Menjalankan Backend (Spring Boot)

### Opsi 1: Menggunakan Maven (Recommended)

1. **Buka terminal/command prompt** di folder root project:
   ```bash
   cd C:\Users\PC\LostnFound
   ```

2. **Jalankan aplikasi Spring Boot**:
   ```bash
   mvn spring-boot:run
   ```

3. **Tunggu hingga aplikasi selesai start**. Anda akan melihat pesan:
   ```
   Started LostnFoundApplication in X.XXX seconds
   Tomcat started on port 8080
   ```

4. **Backend sudah berjalan di**: `http://localhost:8080`

### Opsi 2: Menggunakan JAR File

1. **Build aplikasi menjadi JAR**:
   ```bash
   mvn clean package
   ```

2. **Jalankan JAR file**:
   ```bash
   java -jar target/LostnFound-0.0.1-SNAPSHOT.jar
   ```

### Verifikasi Backend

- Buka browser dan akses: `http://localhost:8080/h2-console`
- Atau test endpoint: `http://localhost:8080/api/barang`

---

## 🎨 Langkah 2: Menjalankan Frontend

### 1. Install Dependencies (Jika Belum)

Buka terminal baru dan masuk ke folder frontend:
```bash
cd C:\Users\PC\LostnFound\LostnFound-FE
npm install
```

### 2. Start Frontend Server

Jalankan salah satu perintah berikut:

**Opsi A: Development Server (dengan CORS)**
```bash
npm run dev
```

**Opsi B: Production Server**
```bash
npm start
```

**Opsi C: Server tanpa auto-open browser**
```bash
npm run serve
```

### 3. Frontend akan berjalan di: `http://localhost:3000`

Browser akan otomatis terbuka (jika menggunakan `npm start` atau `npm run dev`).

---

## 🌐 Langkah 3: Mengakses Aplikasi

### Halaman yang Tersedia:

1. **Landing Page**: `http://localhost:3000/`
2. **Login**: `http://localhost:3000/pages/login.html`
3. **Sign Up**: `http://localhost:3000/pages/signup.html`
4. **Dashboard**: `http://localhost:3000/pages/dashboard.html` (perlu login)
5. **Pelaporan**: `http://localhost:3000/pages/pelaporan.html` (perlu login)
6. **List Barang**: `http://localhost:3000/pages/list-barang.html` (perlu login)

---

## 📝 Cara Menggunakan Aplikasi

### 1. **Registrasi User Baru**
   - Buka halaman Sign Up
   - Isi form: Name, Email, Phone, Password
   - Klik "Continue"
   - Setelah berhasil, akan redirect ke halaman Login

### 2. **Login**
   - Buka halaman Login
   - Masukkan Email dan Password
   - Klik "Login"
   - Setelah berhasil, akan redirect ke Dashboard

### 3. **Dashboard**
   - Menampilkan statistik: Total Items, Lost Items, Found Items
   - Menampilkan aktivitas terbaru
   - Navigasi ke halaman lain

### 4. **Buat Pelaporan**
   - Klik menu "Pelaporan" atau akses langsung
   - Isi form: Nama Barang, Tanggal, Keterangan (Hilang/Ditemukan)
   - Isi: Nama Pemilik, Lokasi, No Handphone
   - Upload gambar (opsional)
   - Klik "Submit"
   - Akan muncul popup konfirmasi

### 5. **Lihat Daftar Barang**
   - Klik menu "List Barang"
   - Lihat semua barang yang sudah dilaporkan
   - Gunakan search untuk mencari barang
   - Klik icon mata untuk melihat gambar

---

## 🔍 Troubleshooting (Pemecahan Masalah)

### Backend tidak bisa start

**Error: Port 8080 sudah digunakan**
```bash
# Cek proses yang menggunakan port 8080
netstat -ano | findstr :8080

# Atau ubah port di application.properties
# LostnFound/src/main/resources/application.properties
# server.port=8081
```

**Error: Java version tidak sesuai**
```bash
# Cek versi Java
java -version

# Harus Java 21 atau lebih tinggi
```

### Frontend tidak bisa start

**Error: Port 3000 sudah digunakan**
```bash
# Cek proses yang menggunakan port 3000
netstat -ano | findstr :3000

# Atau ubah port di package.json
# "start": "http-server src -p 3001 -o"
```

**Error: Module tidak ditemukan**
```bash
# Hapus node_modules dan install ulang
cd LostnFound-FE
rm -rf node_modules
npm install
```

### API tidak terhubung

**CORS Error**
- Pastikan menggunakan `npm run dev` (sudah include CORS)
- Atau pastikan backend CORS sudah dikonfigurasi dengan benar

**Connection Refused**
- Pastikan backend sudah running di port 8080
- Cek di browser: `http://localhost:8080/api/barang`
- Pastikan tidak ada firewall yang memblokir

**401 Unauthorized**
- Pastikan sudah login terlebih dahulu
- Cek token di localStorage browser (F12 > Application > Local Storage)
- Token harus ada dan valid

---

## 🛠️ Development Tips

### Menjalankan Keduanya Bersamaan

**Terminal 1 - Backend:**
```bash
cd C:\Users\PC\LostnFound
mvn spring-boot:run
```

**Terminal 2 - Frontend:**
```bash
cd C:\Users\PC\LostnFound\LostnFound-FE
npm run dev
```

### Hot Reload

- **Backend**: Spring Boot DevTools sudah aktif, perubahan akan auto-reload
- **Frontend**: Refresh browser manual (http-server tidak support hot reload)

### Database H2 Console

Akses database H2 untuk melihat data:
- URL: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:testdb`
- Username: `sa`
- Password: (kosong)

---

## 📊 Status Aplikasi

✅ **Backend**: Running di `http://localhost:8080`
✅ **Frontend**: Running di `http://localhost:3000`
✅ **Database**: H2 In-Memory Database
✅ **API**: RESTful API dengan JWT Authentication

---

## 🎯 Quick Start Commands

```bash
# Terminal 1 - Backend
cd C:\Users\PC\LostnFound
mvn spring-boot:run

# Terminal 2 - Frontend  
cd C:\Users\PC\LostnFound\LostnFound-FE
npm run dev
```

Kemudian buka browser: `http://localhost:3000/pages/login.html`

---

**Selamat menggunakan aplikasi Lost n Found! 🎉**

