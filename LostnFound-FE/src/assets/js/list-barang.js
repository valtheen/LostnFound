// API Configuration
const API_BASE_URL = 'http://localhost:8080/api';

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
    if (user.name) {
        userNameElement.textContent = user.name;
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
        <td><i class="fas fa-eye action-view" onclick="viewImage('${item.id || ''}')"></i></td>
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
    // This would typically open a modal or navigate to a detail page
    alert('Image viewer functionality will be implemented soon.');
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
