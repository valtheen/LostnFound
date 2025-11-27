# 🔧 Cara Mengatasi Error npm di PowerShell

## ❌ Error yang Terjadi:
```
npm : File C:\Program Files\nodejs\npm.ps1 cannot be loaded because running scripts is disabled on this system.
```

## ✅ Solusi 1: Menggunakan Command Prompt (CMD) - Paling Mudah

**Langkah:**
1. Buka **Command Prompt** (bukan PowerShell)
   - Tekan `Win + R`
   - Ketik `cmd` dan tekan Enter
   - Atau cari "Command Prompt" di Start Menu

2. Masuk ke folder frontend:
   ```cmd
   cd C:\Users\PC\LostnFound\LostnFound-FE
   ```

3. Jalankan npm:
   ```cmd
   npm install
   npm run dev
   ```

---

## ✅ Solusi 2: Mengubah Execution Policy PowerShell (Temporary)

**Langkah:**
1. Buka PowerShell sebagai **Administrator**
   - Klik kanan pada PowerShell
   - Pilih "Run as Administrator"

2. Jalankan perintah ini:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

3. Ketik `Y` untuk konfirmasi

4. Sekarang npm akan berfungsi:
   ```powershell
   cd C:\Users\PC\LostnFound\LostnFound-FE
   npm install
   npm run dev
   ```

---

## ✅ Solusi 3: Bypass Execution Policy untuk Satu Command

**Langkah:**
Gunakan `-ExecutionPolicy Bypass` untuk satu command saja:

```powershell
powershell -ExecutionPolicy Bypass -Command "cd C:\Users\PC\LostnFound\LostnFound-FE; npm install"
```

Atau untuk menjalankan npm run dev:
```powershell
powershell -ExecutionPolicy Bypass -Command "cd C:\Users\PC\LostnFound\LostnFound-FE; npm run dev"
```

---

## ✅ Solusi 4: Menggunakan npx (Alternatif)

Jika npm tidak bisa digunakan, coba gunakan npx langsung:

```powershell
npx http-server src -p 3000 -o --cors
```

---

## 🎯 Rekomendasi: Gunakan Command Prompt (CMD)

**Cara termudah dan teraman:**

1. Buka **Command Prompt** (Win + R → ketik `cmd`)
2. Jalankan:
   ```cmd
   cd C:\Users\PC\LostnFound\LostnFound-FE
   npm install
   npm run dev
   ```

Command Prompt tidak memiliki masalah execution policy seperti PowerShell.

---

## 📝 Penjelasan

**Kenapa error ini terjadi?**
- PowerShell memiliki security policy untuk mencegah script berbahaya
- npm.ps1 adalah PowerShell script yang diblokir oleh policy default
- Windows default policy adalah `Restricted` yang memblokir semua script

**Mana yang paling aman?**
- ✅ Menggunakan CMD (tidak ada masalah security)
- ✅ RemoteSigned (hanya script lokal yang tidak ditandatangani yang bisa dijalankan)
- ⚠️ Bypass (melewati semua security, kurang aman)

---

## 🚀 Quick Fix (Copy-Paste)

**Buka Command Prompt dan jalankan:**
```cmd
cd C:\Users\PC\LostnFound\LostnFound-FE
npm install
npm run dev
```

Selesai! 🎉

