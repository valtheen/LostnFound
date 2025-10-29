// API Configuration
const API_BASE_URL = 'http://localhost:8080/api';

// DOM Elements
const reportForm = document.getElementById('report-form');
const successPopup = document.getElementById('success-popup');
const fileInput = document.getElementById('gambar-barang');
const fileNameDisplay = document.getElementById('file-name-display');
const userNameElement = document.getElementById('user-name');

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Check authentication
    checkAuthStatus();
    
    // Setup file input handler
    setupFileInput();
    
    // Setup form submission
    setupFormSubmission();
    
    // Setup popup close handler
    setupPopupClose();
});

function checkAuthStatus() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (!token) {
        window.location.href = 'login.html';
        return;
    }
    
    // Display user name
    if (user.name) {
        userNameElement.textContent = user.name;
    }
}

function setupFileInput() {
    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            fileNameDisplay.textContent = fileInput.files[0].name;
            fileNameDisplay.classList.remove('file-placeholder');
        } else {
            fileNameDisplay.textContent = 'Masukan Gambar';
            fileNameDisplay.classList.add('file-placeholder');
        }
    });
}

function setupFormSubmission() {
    reportForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const formData = new FormData(reportForm);
        
        // Validate form
        if (!validateReportForm(formData)) {
            return;
        }
        
        try {
            // Create FormData for file upload
            const submitData = new FormData();
            submitData.append('namaBarang', formData.get('namaBarang'));
            submitData.append('tanggal', formData.get('tanggal'));
            submitData.append('keterangan', formData.get('keterangan'));
            submitData.append('namaPemilik', formData.get('namaPemilik'));
            submitData.append('lokasi', formData.get('lokasi'));
            submitData.append('noHandphone', formData.get('noHandphone'));
            
            if (fileInput.files[0]) {
                submitData.append('gambarBarang', fileInput.files[0]);
            }
            
            const token = localStorage.getItem('token');
            
            const response = await fetch(`${API_BASE_URL}/pelaporan`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: submitData
            });
            
            const result = await response.json();
            
            if (response.ok) {
                showSuccessPopup();
            } else {
                alert(result.message || 'Failed to submit report. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Network error. Please check your connection and try again.');
        }
    });
}

function validateReportForm(formData) {
    const namaBarang = formData.get('namaBarang');
    const tanggal = formData.get('tanggal');
    const keterangan = formData.get('keterangan');
    const namaPemilik = formData.get('namaPemilik');
    const lokasi = formData.get('lokasi');
    const noHandphone = formData.get('noHandphone');
    
    if (!namaBarang || namaBarang.trim().length < 2) {
        alert('Nama barang harus diisi minimal 2 karakter.');
        return false;
    }
    
    if (!tanggal) {
        alert('Tanggal harus diisi.');
        return false;
    }
    
    if (!keterangan) {
        alert('Keterangan harus dipilih.');
        return false;
    }
    
    if (!namaPemilik || namaPemilik.trim().length < 2) {
        alert('Nama pemilik/penemu harus diisi minimal 2 karakter.');
        return false;
    }
    
    if (!lokasi || lokasi.trim().length < 2) {
        alert('Lokasi harus diisi minimal 2 karakter.');
        return false;
    }
    
    if (!noHandphone || !/^\d{10,13}$/.test(noHandphone)) {
        alert('Nomor handphone harus diisi dengan 10-13 digit angka.');
        return false;
    }
    
    return true;
}

function showSuccessPopup() {
    successPopup.style.display = 'flex';
    setTimeout(() => {
        successPopup.style.display = 'none';
        reportForm.reset();
        fileNameDisplay.textContent = 'Masukan Gambar';
        fileNameDisplay.classList.add('file-placeholder');
    }, 3000);
}

function setupPopupClose() {
    successPopup.addEventListener('click', function(event) {
        if (event.target === successPopup) {
            successPopup.style.display = 'none';
            reportForm.reset();
            fileNameDisplay.textContent = 'Masukan Gambar';
            fileNameDisplay.classList.add('file-placeholder');
        }
    });
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}
