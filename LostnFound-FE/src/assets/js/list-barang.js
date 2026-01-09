// API Configuration - Use same host as current page
const getApiBaseUrl = () => {
    const hostname = window.location.hostname;
    return `http://${hostname}:8080/api`;
};
const API_BASE_URL = getApiBaseUrl();

// DOM Elements
const tableBody = document.getElementById('table-body');
const searchInput = document.getElementById('search-input');
const paginationWrapper = document.getElementById('pagination-wrapper');
const userNameElement = document.getElementById('user-name');

// Global variables
let currentPage = 1;
let totalPages = 1;
let allItems = [];
let filteredItems = [];

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    checkAuthStatus();
    loadItems();
    setupSearch();
});

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

async function loadItems() {
    try {
        const token = localStorage.getItem('token');
        
        const response = await fetch(`${API_BASE_URL}/pelaporan`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            const result = await response.json();
            allItems = result.data || [];
            filteredItems = [...allItems];
            renderTable();
            renderPagination();
        } else {
            console.error('Failed to load items');
            // Fallback to localStorage for demo
            loadFromLocalStorage();
        }
    } catch (error) {
        console.error('Error loading items:', error);
        // Fallback to localStorage for demo
        loadFromLocalStorage();
    }
}

function loadFromLocalStorage() {
    const items = JSON.parse(localStorage.getItem('daftarBarang')) || [];
    allItems = items;
    filteredItems = [...items];
    renderTable();
    renderPagination();
}

function renderTable() {
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageItems = filteredItems.slice(startIndex, endIndex);
    
    pageItems.forEach((item, index) => {
        const row = createTableRow(item, startIndex + index + 1);
        tableBody.appendChild(row);
    });
}

function createTableRow(item, rowNumber) {
    const row = document.createElement('tr');
    
    // Format date from YYYY-MM-DD to DD-MM-YYYY
    const [year, month, day] = item.tanggal ? item.tanggal.split('-') : ['', '', ''];
    const tanggalFormatted = item.tanggal ? `${day}-${month}-${year}` : 'N/A';
    
    // Determine status class
    const statusClass = item.keterangan && item.keterangan.toLowerCase() === 'hilang' ? 'hilang' : 'ditemukan';
    
    row.innerHTML = `
        <td>${rowNumber}</td>
        <td>${item.namaBarang || 'N/A'}</td>
        <td>${tanggalFormatted}</td>
        <td><span class="status ${statusClass}">${item.keterangan || 'N/A'}</span></td>
        <td>${item.namaPemilik || 'N/A'}</td>
        <td>${item.lokasi || 'N/A'}</td>
        <td>
            <i class="fas fa-eye action-view" onclick="viewImage('${item.id || ''}')" title="View Image"></i>
            <i class="fas fa-edit action-edit" onclick="editReport('${item.id || ''}')" title="Edit"></i>
            <i class="fas fa-trash action-delete" onclick="deleteReport('${item.id || ''}')" title="Delete"></i>
        </td>
        <td><input type="checkbox" onchange="toggleSelection('${item.id || ''}')"></td>
    `;
    
    return row;
}

function renderPagination() {
    if (!paginationWrapper) return;
    
    const itemsPerPage = 10;
    totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    
    paginationWrapper.innerHTML = '';
    
    // Previous button
    const prevButton = document.createElement('a');
    prevButton.href = '#';
    prevButton.innerHTML = '&laquo;';
    prevButton.onclick = (e) => {
        e.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            renderTable();
            renderPagination();
        }
    };
    if (currentPage === 1) {
        prevButton.style.opacity = '0.5';
        prevButton.style.pointerEvents = 'none';
    }
    paginationWrapper.appendChild(prevButton);
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('a');
        pageButton.href = '#';
        pageButton.textContent = i;
        if (i === currentPage) {
            pageButton.classList.add('active');
        }
        pageButton.onclick = (e) => {
            e.preventDefault();
            currentPage = i;
            renderTable();
            renderPagination();
        };
        paginationWrapper.appendChild(pageButton);
    }
    
    // Next button
    const nextButton = document.createElement('a');
    nextButton.href = '#';
    nextButton.innerHTML = '&raquo;';
    nextButton.onclick = (e) => {
        e.preventDefault();
        if (currentPage < totalPages) {
            currentPage++;
            renderTable();
            renderPagination();
        }
    };
    if (currentPage === totalPages) {
        nextButton.style.opacity = '0.5';
        nextButton.style.pointerEvents = 'none';
    }
    paginationWrapper.appendChild(nextButton);
}

function setupSearch() {
    if (!searchInput) return;
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        filteredItems = allItems.filter(item => 
            (item.namaBarang && item.namaBarang.toLowerCase().includes(searchTerm)) ||
            (item.namaPemilik && item.namaPemilik.toLowerCase().includes(searchTerm)) ||
            (item.lokasi && item.lokasi.toLowerCase().includes(searchTerm)) ||
            (item.keterangan && item.keterangan.toLowerCase().includes(searchTerm))
        );
        
        currentPage = 1;
        renderTable();
        renderPagination();
    });
}

function viewImage(itemId) {
    const item = allItems.find(i => i.id == itemId);
    if (item && item.gambarPath) {
        const imageUrl = `http://localhost:8080/api/pelaporan/file/${item.gambarPath}`;
        window.open(imageUrl, '_blank');
    } else {
        alert('No image available for this item.');
    }
}

async function editReport(itemId) {
    const item = allItems.find(i => i.id == itemId);
    if (!item) {
        alert('Item not found');
        return;
    }
    
    // Prompt for new values (you can replace this with a modal form later)
    const namaBarang = prompt('Nama Barang:', item.namaBarang || '');
    if (namaBarang === null) return; // User cancelled
    
    const keterangan = prompt('Keterangan (Hilang/Ditemukan):', item.keterangan || '');
    if (keterangan === null) return;
    
    const namaPemilik = prompt('Nama Pemilik/Penemu:', item.namaPemilik || '');
    if (namaPemilik === null) return;
    
    const lokasi = prompt('Lokasi:', item.lokasi || '');
    if (lokasi === null) return;
    
    const noHandphone = prompt('No. Handphone:', item.noHandphone || '');
    if (noHandphone === null) return;
    
    try {
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('namaBarang', namaBarang);
        formData.append('tanggal', item.tanggal || new Date().toISOString().split('T')[0]);
        formData.append('keterangan', keterangan);
        formData.append('namaPemilik', namaPemilik);
        formData.append('lokasi', lokasi);
        formData.append('noHandphone', noHandphone);
        
        const response = await fetch(`${API_BASE_URL}/pelaporan/${itemId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });
        
        if (!response.ok) {
            let errorMessage = 'Failed to update report.';
            try {
                const errorResult = await response.json();
                errorMessage = errorResult.message || errorResult.error || errorMessage;
            } catch (e) {
                errorMessage = `Server error: ${response.status}`;
            }
            alert(errorMessage);
            return;
        }
        
        const result = await response.json();
        if (result.success) {
            alert('Report updated successfully!');
            loadItems(); // Reload the list
        } else {
            alert(result.message || 'Failed to update report.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Network error. Please check your connection and try again.');
    }
}

async function deleteReport(itemId) {
    if (!confirm('Are you sure you want to delete this report?')) {
        return;
    }
    
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/pelaporan/${itemId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            let errorMessage = 'Failed to delete report.';
            try {
                const errorResult = await response.json();
                errorMessage = errorResult.message || errorResult.error || errorMessage;
            } catch (e) {
                errorMessage = `Server error: ${response.status}`;
            }
            alert(errorMessage);
            return;
        }
        
        const result = await response.json();
        if (result.success) {
            alert('Report deleted successfully!');
            loadItems(); // Reload the list
        } else {
            alert(result.message || 'Failed to delete report.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Network error. Please check your connection and try again.');
    }
}

function toggleSelection(itemId) {
    // This would handle item selection for bulk operations
    console.log('Toggled selection for item:', itemId);
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}
