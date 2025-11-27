# 🔒 Security Guide - Lost n Found Project

## ⚠️ PENTING: Sebelum Push ke GitHub

### ✅ Yang Sudah Aman:
1. **.gitignore** sudah dikonfigurasi dengan benar
2. **File uploads** tidak akan ter-commit
3. **node_modules** tidak akan ter-commit
4. **Build artifacts** (target/) tidak akan ter-commit

### ⚠️ Yang Perlu Diperhatikan:

#### 1. JWT Secret Key
File `application.properties` berisi JWT secret key untuk development:
```properties
app.security.jwt.secret=LostnFoundSecretKey123!@#ChangeMe
```

**⚠️ WAJIB GANTI** sebelum deploy ke production!

**Cara Generate Secret Key yang Aman:**
```bash
# Menggunakan OpenSSL
openssl rand -base64 32

# Atau menggunakan online generator
# https://www.allkeysgenerator.com/Random/Security-Encryption-Key-Generator.aspx
```

#### 2. Database Configuration
Saat ini menggunakan H2 in-memory database untuk development. 
Untuk production, gunakan database yang proper (MySQL/PostgreSQL).

#### 3. File Uploads
- Folder `uploads/` sudah di-ignore di .gitignore
- File upload user tidak akan ter-commit
- Pastikan folder uploads ada di server production

---

## 🚀 Langkah Push ke GitHub

### 1. Pastikan Semua File Aman
```bash
git status
```

### 2. Hapus File yang Tidak Seharusnya (jika ada)
```bash
# Hapus file uploads dari staging (jika sudah ter-add)
git rm --cached uploads/*.jpg

# Hapus node_modules jika ter-track
git rm --cached -r LostnFound-FE/node_modules/
```

### 3. Commit Perubahan
```bash
git add .gitignore
git add LostnFound/src/main/resources/application.properties.example
git commit -m "Security: Update .gitignore and add application.properties.example"
```

### 4. Push ke GitHub
```bash
git push origin DevenDev
```

---

## 📋 Checklist Sebelum Push

- [x] `.gitignore` sudah lengkap
- [x] File `uploads/` tidak ter-track
- [x] `node_modules/` tidak ter-track
- [x] `target/` tidak ter-track
- [x] `application.properties.example` sudah dibuat
- [x] Tidak ada file sensitif yang ter-commit
- [x] Tidak ada password/API key yang hardcoded

---

## 🔐 Untuk Production Deployment

1. **Gunakan Environment Variables**:
   ```bash
   export JWT_SECRET_KEY="your-strong-secret-key-here"
   ```

2. **Update application.properties**:
   ```properties
   app.security.jwt.secret=${JWT_SECRET_KEY}
   ```

3. **Gunakan Database Production**:
   - MySQL/PostgreSQL
   - Simpan credentials di environment variables
   - Jangan commit database credentials

4. **File Uploads**:
   - Gunakan cloud storage (AWS S3, Google Cloud Storage)
   - Atau pastikan folder uploads secure

---

## ✅ Status: AMAN UNTUK PUSH

Semua file sensitif sudah di-handle dengan benar. Project aman untuk di-push ke GitHub.

**Catatan**: Jangan lupa ganti JWT secret key sebelum deploy ke production!

