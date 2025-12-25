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
<<<<<<< HEAD
=======
            
            // Get kategori value - ensure it's sent even if empty
            const kategoriValue = formData.get('kategori');
            submitData.append('kategori', kategoriValue && kategoriValue.trim() !== '' ? kategoriValue : 'Umum');
            
>>>>>>> devendev
            submitData.append('lokasi', formData.get('lokasi'));
            submitData.append('noHandphone', formData.get('noHandphone'));
            
            if (fileInput.files[0]) {
                submitData.append('gambarBarang', fileInput.files[0]);
            }
            
<<<<<<< HEAD
=======
            // Debug: log form data
            console.log('Submitting form with kategori:', kategoriValue || 'Umum');
            
>>>>>>> devendev
            const token = localStorage.getItem('token');
            
            const response = await fetch(`${API_BASE_URL}/pelaporan`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: submitData
            });
            
<<<<<<< HEAD
            const result = await response.json();
            
            if (response.ok) {
                showSuccessPopup();
            } else {
                alert(result.message || 'Failed to submit report. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Network error. Please check your connection and try again.');
=======
            // Check if response is OK before parsing JSON
            if (response.ok) {
                let result;
                try {
                    result = await response.json();
                } catch (e) {
                    console.error('Error parsing response:', e);
                    // If JSON parsing fails but response is OK, assume success
                    showSuccessPopup();
                    setTimeout(() => {
                        window.location.href = 'list-barang.html';
                    }, 3000);
                    return;
                }
                
                showSuccessPopup();
                // Optionally redirect to list-barang after 3 seconds
                setTimeout(() => {
                    window.location.href = 'list-barang.html';
                }, 3000);
            } else {
                // Try to parse error response
                let errorMessage = 'Failed to submit report. Please try again.';
                try {
                    const errorResult = await response.json();
                    errorMessage = errorResult.message || errorMessage;
                } catch (e) {
                    // If response is not JSON, use status text
                    errorMessage = `Error ${response.status}: ${response.statusText || 'Server error'}`;
                }
                alert(errorMessage);
            }
        } catch (error) {
            console.error('Error:', error);
            let errorMessage = 'Network error. Please check your connection and try again.';
            
            // More specific error messages
            if (error.message && error.message.includes('Failed to fetch')) {
                errorMessage = 'Tidak dapat terhubung ke server. Pastikan backend sudah berjalan di http://localhost:8080';
            } else if (error.message) {
                errorMessage = `Error: ${error.message}`;
            }
            
            alert(errorMessage);
>>>>>>> devendev
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
