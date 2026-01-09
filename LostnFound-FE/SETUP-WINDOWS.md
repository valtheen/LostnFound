# Lost n Found Frontend - Setup untuk Windows

## 🚀 Cara Instalasi (Windows)

### Metode 1: Menggunakan PowerShell Script (Recommended)

1. **Buka PowerShell** di folder `LostnFound-FE`:
   ```powershell
   cd "C:\Users\PC\Downloads\LostnFound-main Final\LostnFound-main\LostnFound-main\LostnFound-FE"
   ```

2. **Jalankan script instalasi**:
   ```powershell
   .\install.ps1
   ```

   Jika muncul error tentang execution policy, jalankan:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   .\install.ps1
   ```

### Metode 2: Manual Installation

1. **Buka PowerShell atau Command Prompt**

2. **Navigasi ke folder frontend**:
   ```powershell
   cd "C:\Users\PC\Downloads\LostnFound-main Final\LostnFound-main\LostnFound-main\LostnFound-FE"
   ```

3. **Install dependencies**:
   ```powershell
   npm install
   ```

4. **Jalankan server development**:
   ```powershell
   npm run dev
   ```

## ✅ Verifikasi Instalasi

Setelah instalasi selesai, pastikan:
- ✅ Node.js terinstall (cek dengan `node --version`)
- ✅ npm terinstall (cek dengan `npm --version`)
- ✅ Dependencies terinstall (folder `node_modules` ada)
- ✅ Backend sudah running di `http://localhost:8080`

## 🎯 Menjalankan Frontend

### Development Mode (dengan CORS):
```powershell
npm run dev
```

### Production Mode:
```powershell
npm start
```

Frontend akan tersedia di: **http://localhost:3000**

## 🐛 Troubleshooting

### Error: "Cannot find path"
**Masalah**: Path tidak ditemukan

**Solusi**: 
1. Pastikan Anda berada di direktori yang benar
2. Gunakan path lengkap:
   ```powershell
   cd "C:\Users\PC\Downloads\LostnFound-main Final\LostnFound-main\LostnFound-main\LostnFound-FE"
   ```

### Error: "package.json not found"
**Masalah**: npm mencari package.json di lokasi yang salah

**Solusi**:
1. Pastikan Anda sudah masuk ke folder `LostnFound-FE`
2. Cek apakah file `package.json` ada dengan:
   ```powershell
   ls package.json
   ```

### Error: "Execution Policy"
**Masalah**: PowerShell tidak mengizinkan script dijalankan

**Solusi**:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Error: npm install gagal
**Masalah**: Dependencies tidak terinstall

**Solusi**:
1. Hapus folder `node_modules` dan `package-lock.json`
2. Jalankan lagi:
   ```powershell
   npm install
   ```

## 📝 Catatan Penting

- **Path lengkap**: `C:\Users\PC\Downloads\LostnFound-main Final\LostnFound-main\LostnFound-main\LostnFound-FE`
- **Backend harus running** sebelum frontend bisa digunakan
- **Port 3000** harus tersedia (jika sudah digunakan, ubah di `package.json`)

## 🔗 Quick Commands

```powershell
# Masuk ke folder frontend
cd "C:\Users\PC\Downloads\LostnFound-main Final\LostnFound-main\LostnFound-main\LostnFound-FE"

# Install dependencies
npm install

# Jalankan development server
npm run dev

# Atau jalankan production server
npm start
```


