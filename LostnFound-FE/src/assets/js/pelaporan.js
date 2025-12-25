// API Configuration - Use same host as current page to avoid CORS issues
const getApiBaseUrl = () => {
    const hostname = window.location.hostname;
    // Use same hostname (127.0.0.1 or localhost) as the frontend
    const apiUrl = `http://${hostname}:8080/api`;
    console.log('[INIT] API Base URL configured:', apiUrl);
    console.log('[INIT] Window hostname:', hostname);
    console.log('[INIT] Window origin:', window.location.origin);
    return apiUrl;
};
const API_BASE_URL = getApiBaseUrl();

// DOM Elements
const reportForm = document.getElementById('report-form');
const successPopup = document.getElementById('success-popup');
const fileInput = document.getElementById('gambar-barang');
const fileNameDisplay = document.getElementById('file-name-display');
const userNameElement = document.getElementById('user-name');
let submitButton = null;

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    console.log('========================================');
    console.log('📄 PAGE LOADED - Pelaporan');
    console.log('========================================');
    console.log('API Base URL:', API_BASE_URL);
    console.log('Window location:', window.location.href);
    console.log('Window hostname:', window.location.hostname);
    
    // Test backend connectivity immediately on page load
    testBackendConnectivity();
    
    // Check authentication
    checkAuthStatus();
    
    // Initialize submit button
    if (reportForm) {
        submitButton = reportForm.querySelector('button[type="submit"]');
        console.log('Submit button found:', !!submitButton);
    } else {
        console.error('ERROR: reportForm not found!');
    }
    
    // Setup file input handler
    setupFileInput();
    
    // Setup form submission
    setupFormSubmission();
    
    // Setup popup close handler
    setupPopupClose();
    
    console.log('========================================');
});

// Test backend connectivity
async function testBackendConnectivity() {
    console.log('🔍 Testing backend connectivity...');
    try {
        const testUrl = `${API_BASE_URL}/pelaporan`;
        console.log('Test URL:', testUrl);
        
        const response = await fetch(testUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        console.log('✅ Backend is REACHABLE');
        console.log('  Status:', response.status, response.statusText);
        console.log('  URL:', testUrl);
    } catch (error) {
        console.error('❌ Backend is NOT REACHABLE');
        console.error('  Error:', error.name, error.message);
        console.error('  Test URL:', `${API_BASE_URL}/pelaporan`);
        console.error('  This means the backend at', API_BASE_URL.replace('/api', ''), 'is not accessible from the browser');
        console.error('  Possible causes:');
        console.error('    1. Backend not running');
        console.error('    2. Wrong port (should be 8080)');
        console.error('    3. Firewall blocking');
        console.error('    4. Browser security policy');
    }
}

function checkAuthStatus() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (!token) {
        window.location.href = 'login.html';
        return;
    }
    
    // Display user name
    if (user.username || user.name) {
        userNameElement.textContent = user.username || user.name;
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
    if (!reportForm) {
        console.error('ERROR: reportForm element not found!');
        return;
    }
    
    reportForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        // Immediate visible feedback
        console.log('========================================');
        console.log('🚀 FORM SUBMISSION STARTED');
        console.log('========================================');
        console.log('Timestamp:', new Date().toISOString());
        
        const formData = new FormData(reportForm);
        
        // Validate form
        if (!validateReportForm(formData)) {
            return;
        }
        
        // Disable submit button and show loading state
        if (submitButton) {
            submitButton.disabled = true;
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Mengirim...';
            
            // Re-enable button after timeout (safety measure)
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }, 30000); // 30 seconds timeout
        }
        
        try {
            // #region agent log
            fetch('http://127.0.0.1:7242/ingest/07aa9665-5ac8-44d1-a557-e227fae0a91d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'pelaporan.js:83',message:'Form submission started',data:{formId:reportForm?.id,apiBaseUrl:API_BASE_URL},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
            // #endregion
            
            // Validate tanggal format
            const tanggalValue = formData.get('tanggal');
            if (!tanggalValue) {
                alert('Tanggal harus diisi.');
                return;
            }
            
            // Create FormData for file upload
            const submitData = new FormData();
            submitData.append('namaBarang', formData.get('namaBarang'));
            submitData.append('tanggal', tanggalValue); // Format YYYY-MM-DD dari input type="date"
            submitData.append('keterangan', formData.get('keterangan'));
            submitData.append('namaPemilik', formData.get('namaPemilik'));
            submitData.append('lokasi', formData.get('lokasi'));
            submitData.append('noHandphone', formData.get('noHandphone'));
            
            if (fileInput.files[0]) {
                submitData.append('gambarBarang', fileInput.files[0]);
            }
            
            const token = localStorage.getItem('token');
            
            const requestUrl = `${API_BASE_URL}/pelaporan`;
            
            // #region agent log
            fetch('http://127.0.0.1:7242/ingest/07aa9665-5ac8-44d1-a557-e227fae0a91d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'pelaporan.js:104',message:'Before fetch - API config check',data:{apiBaseUrl:API_BASE_URL,requestUrl:requestUrl,tokenExists:!!token,windowLocation:window.location.href,windowHostname:window.location.hostname},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
            // #endregion
            console.log('========================================');
            console.log('API CONFIGURATION:');
            console.log('  API Base URL:', API_BASE_URL);
            console.log('  Request URL:', requestUrl);
            console.log('  Window hostname:', window.location.hostname);
            console.log('  Window origin:', window.location.origin);
            console.log('  Full URL:', window.location.href);
            console.log('  Has token:', !!token);
            console.log('========================================');
            
            // Test if backend is reachable with simple GET first
            console.log('[DEBUG] Testing backend connectivity to:', requestUrl);
            try {
                const testUrl = requestUrl;
                console.log('[DEBUG] Attempting GET request to:', testUrl);
                const testResponse = await fetch(testUrl, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token || ''}`,
                        'Content-Type': 'application/json'
                    }
                });
                console.log('[DEBUG] ✓ Backend is reachable - GET Status:', testResponse.status, testResponse.statusText);
                console.log('[DEBUG] Response headers:', Object.fromEntries(testResponse.headers.entries()));
            } catch (testError) {
                console.error('[DEBUG] ✗ Backend reachability test FAILED');
                console.error('[DEBUG] Error type:', testError.constructor.name);
                console.error('[DEBUG] Error name:', testError.name);
                console.error('[DEBUG] Error message:', testError.message);
                console.error('[DEBUG] Full error object:', testError);
                
                // Don't return early - let the POST attempt happen so we can see the actual error
                console.warn('[DEBUG] Continuing despite connectivity test failure - will attempt POST anyway');
            }
            
            // #region agent log
            fetch('http://127.0.0.1:7242/ingest/07aa9665-5ac8-44d1-a557-e227fae0a91d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'pelaporan.js:107',message:'Form data prepared',data:{namaBarang:formData.get('namaBarang'),tanggal:tanggalValue,keterangan:formData.get('keterangan'),namaPemilik:formData.get('namaPemilik'),lokasi:formData.get('lokasi'),noHandphone:formData.get('noHandphone'),hasFile:!!fileInput.files[0],fileSize:fileInput.files[0]?fileInput.files[0].size:0},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
            // #endregion
            
            console.log('Submitting report to:', requestUrl);
            console.log('Form data:', {
                namaBarang: formData.get('namaBarang'),
                tanggal: tanggalValue,
                keterangan: formData.get('keterangan'),
                namaPemilik: formData.get('namaPemilik'),
                lokasi: formData.get('lokasi'),
                noHandphone: formData.get('noHandphone'),
                hasFile: !!fileInput.files[0]
            });
            
            // #region agent log
            fetch('http://127.0.0.1:7242/ingest/07aa9665-5ac8-44d1-a557-e227fae0a91d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'pelaporan.js:117',message:'Fetch call initiated',data:{url:requestUrl,method:'POST',hasToken:!!token,headersSet:true},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
            // #endregion
            
            const fetchStartTime = Date.now();
            console.log('[DEBUG] About to fetch:', {
                url: requestUrl,
                method: 'POST',
                hasToken: !!token,
                formDataKeys: Array.from(submitData.keys()),
                bodyType: submitData.constructor.name
            });
            console.log('[DEBUG] FormData entries:', Array.from(submitData.entries()).map(([k, v]) => [k, v instanceof File ? `File: ${v.name} (${v.size} bytes)` : v]));
            
            let response;
            console.log('========================================');
            console.log('STARTING POST REQUEST...');
            console.log('  URL:', requestUrl);
            console.log('  Method: POST');
            console.log('  FormData keys:', Array.from(submitData.keys()));
            console.log('========================================');
            
            try {
                response = await fetch(requestUrl, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token || ''}`
                        // Don't set Content-Type for FormData, browser will set it automatically with boundary
                    },
                    body: submitData
                });
                console.log('========================================');
                console.log('✓ FETCH COMPLETED');
                console.log('  Status:', response.status, response.statusText);
                console.log('  OK:', response.ok);
                console.log('  Headers:', Object.fromEntries(response.headers.entries()));
                console.log('========================================');
            } catch (fetchError) {
                console.error('========================================');
                console.error('✗ FETCH THREW EXCEPTION');
                console.error('  Error constructor:', fetchError.constructor.name);
                console.error('  Error name:', fetchError.name);
                console.error('  Error message:', fetchError.message);
                console.error('  Error stack:', fetchError.stack);
                console.error('  Full error object:', fetchError);
                
                // Check if it's a network error
                if (fetchError.message && (fetchError.message.includes('Failed to fetch') || fetchError.message.includes('NetworkError'))) {
                    console.error('  → This is a NETWORK CONNECTIVITY ERROR');
                    console.error('  Possible causes:');
                    console.error('    1. Backend not running on', requestUrl.replace('/api/pelaporan', ''));
                    console.error('    2. CORS blocking the request');
                    console.error('    3. Firewall or network issue');
                    console.error('    4. Browser security policy');
                    console.error('  → Try opening this URL in browser:', requestUrl.replace('/api/pelaporan', ''));
                }
                console.error('========================================');
                
                throw fetchError; // Re-throw to be caught by outer catch
            }
            
            // #region agent log
            fetch('http://127.0.0.1:7242/ingest/07aa9665-5ac8-44d1-a557-e227fae0a91d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'pelaporan.js:125',message:'Fetch resolved',data:{status:response.status,statusText:response.statusText,ok:response.ok,responseTime:Date.now()-fetchStartTime,headers:Object.fromEntries(response.headers.entries())},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
            // #endregion
            
            console.log('Response status:', response.status, response.statusText);
            
            // Check if response is ok before parsing JSON
            if (!response.ok) {
                // #region agent log
                fetch('http://127.0.0.1:7242/ingest/07aa9665-5ac8-44d1-a557-e227fae0a91d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'pelaporan.js:129',message:'Response not OK',data:{status:response.status,statusText:response.statusText,url:requestUrl},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
                // #endregion
                
                let errorMessage = 'Failed to submit report. Please try again.';
                let errorData = null;
                
                try {
                    const contentType = response.headers.get('content-type');
                    if (contentType && contentType.includes('application/json')) {
                        errorData = await response.json();
                        errorMessage = errorData.message || errorData.error || errorMessage;
                    } else {
                        const textResponse = await response.text();
                        console.error('Non-JSON error response:', textResponse);
                        errorMessage = `Server error: ${response.status} ${response.statusText}`;
                    }
                } catch (e) {
                    console.error('Error parsing error response:', e);
                    errorMessage = `Server error: ${response.status} ${response.statusText}`;
                }
                
                // #region agent log
                fetch('http://127.0.0.1:7242/ingest/07aa9665-5ac8-44d1-a557-e227fae0a91d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'pelaporan.js:148',message:'Error response parsed',data:{errorMessage:errorMessage,errorData:errorData},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
                // #endregion
                
                console.error('Error details:', errorData);
                alert(errorMessage);
                // Re-enable button on error
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Submit';
                }
                return;
            }
            
            // Parse successful response
            let result;
            try {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    result = await response.json();
                } else {
                    const textResponse = await response.text();
                    console.error('Non-JSON success response:', textResponse);
                    alert('Unexpected response format from server.');
                    return;
                }
            } catch (e) {
                console.error('Error parsing success response:', e);
                alert('Failed to parse server response.');
                return;
            }
            
            console.log('Response data:', result);
            
            if (result.success) {
                showSuccessPopup();
                // Reset form after successful submission
                reportForm.reset();
                fileNameDisplay.textContent = 'Masukan Gambar';
                fileNameDisplay.classList.add('file-placeholder');
            } else {
                alert(result.message || 'Failed to submit report. Please try again.');
            }
        } catch (error) {
            // Re-enable button on error
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = 'Submit';
            }
            
            // #region agent log
            fetch('http://127.0.0.1:7242/ingest/07aa9665-5ac8-44d1-a557-e227fae0a91d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'pelaporan.js:187',message:'Fetch error caught',data:{errorName:error.name,errorMessage:error.message,errorStack:error.stack,isNetworkError:error.message.includes('Failed to fetch')||error.message.includes('NetworkError'),isCORSError:error.message.includes('CORS'),requestUrl:typeof requestUrl !== 'undefined' ? requestUrl : 'unknown'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
            // #endregion
            
            console.error('========================================');
            console.error('========== FINAL ERROR CAUGHT ==========');
            console.error('========================================');
            console.error('Error type:', error.constructor.name);
            console.error('Error name:', error.name);
            console.error('Error message:', error.message);
            console.error('Error stack:', error.stack);
            console.error('Full error object:', error);
            console.error('Request URL was:', typeof requestUrl !== 'undefined' ? requestUrl : 'unknown');
            console.error('API Base URL:', API_BASE_URL);
            console.error('Window location:', window.location.href);
            console.error('========================================');
            
            // Create detailed error message for alert
            let errorMessage = '❌ NETWORK ERROR\n\n';
            errorMessage += `Error: ${error.name || 'Unknown'}\n`;
            errorMessage += `Message: ${error.message || 'No message'}\n\n`;
            
            if (error.message && (error.message.includes('Failed to fetch') || error.message.includes('NetworkError'))) {
                errorMessage += '🔍 Kemungkinan penyebab:\n';
                errorMessage += `1. Backend tidak berjalan di ${API_BASE_URL.replace('/api', '')}\n`;
                errorMessage += '2. CORS memblokir request\n';
                errorMessage += '3. Firewall atau network issue\n';
                errorMessage += '4. Browser security policy\n\n';
                errorMessage += `💡 Coba buka di browser: ${API_BASE_URL.replace('/api', '')}/api/pelaporan\n`;
                errorMessage += `💡 Atau test dengan curl: curl ${API_BASE_URL}/pelaporan`;
            } else if (error.message && error.message.includes('CORS')) {
                errorMessage += 'CORS error. Pastikan backend mengizinkan request dari frontend.';
            } else {
                errorMessage += 'Silakan cek console browser (F12) untuk detail lebih lanjut.';
            }
            
            // Show alert with error details
            alert(errorMessage);
            
            // Also log to console with clear formatting
            console.error('ALERT SHOWN TO USER:', errorMessage);
        } finally {
            // Always re-enable button
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = 'Submit';
            }
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
    
    // Validate date format (should be YYYY-MM-DD from input type="date")
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(tanggal)) {
        alert('Format tanggal tidak valid. Gunakan format YYYY-MM-DD.');
        return false;
    }
    
    if (!keterangan || (keterangan !== 'Hilang' && keterangan !== 'Ditemukan')) {
        alert('Keterangan harus dipilih (Hilang atau Ditemukan).');
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
