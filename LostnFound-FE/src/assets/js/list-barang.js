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
<<<<<<< HEAD
=======
let selectedItems = new Set();
>>>>>>> devendev

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    checkAuthStatus();
    loadItems();
    setupSearch();
});

<<<<<<< HEAD
function checkAuthStatus() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
=======
// Get current user info
function getCurrentUser() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const role = localStorage.getItem('userRole') || user.role || 'USER';
    return {
        id: user.id,
        username: user.username,
        email: user.email,
        role: role,
        name: user.name || user.username
    };
}

// Check if current user is admin
function isAdmin() {
    const user = getCurrentUser();
    return user.role === 'ADMIN';
}

// Check if current user owns the item
function isOwner(item) {
    const user = getCurrentUser();
    if (!user.id || !item.userId) {
        return false;
    }
    return Number(user.id) === Number(item.userId);
}

// Check if user can edit/delete item
function canModifyItem(item) {
    return isAdmin() || isOwner(item);
}

function checkAuthStatus() {
    const token = localStorage.getItem('token');
    const user = getCurrentUser();
>>>>>>> devendev
    
    if (!token) {
        window.location.href = 'login.html';
        return;
    }
    
<<<<<<< HEAD
    // Display user name
    if (user.name) {
        userNameElement.textContent = user.name;
    }
=======
    // Display user name and role
    if (user.name) {
        userNameElement.textContent = user.name;
    }
    
    // Note: Delete and edit icons visibility is handled by updateDeleteButton()
    // which checks if user is admin or owns the selected items
>>>>>>> devendev
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
<<<<<<< HEAD
            if (result.success && result.data) {
                allItems = Array.isArray(result.data) ? result.data : [];
                filteredItems = [...allItems];
                renderTable();
                renderPagination();
            } else {
                console.error('Failed to load items:', result.message);
                // Fallback to localStorage for demo
                loadFromLocalStorage();
            }
=======
            // Handle ApiResponse structure: { success: true, data: [...] }
            const items = result.data || result || [];
            allItems = items;
            filteredItems = [...items];
            
            // Debug: log first item to check structure
            if (items.length > 0) {
                console.log('Sample item structure:', items[0]);
                console.log('Kategori value:', items[0].kategori);
                console.log('GambarPath value:', items[0].gambarPath);
            }
            
            renderTable();
            renderPagination();
>>>>>>> devendev
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
<<<<<<< HEAD
=======
    
    updateSelectAllCheckbox();
    updateDeleteButton();
>>>>>>> devendev
}

function createTableRow(item, rowNumber) {
    const row = document.createElement('tr');
    
    // Format date from YYYY-MM-DD to DD-MM-YYYY
    const [year, month, day] = item.tanggal ? item.tanggal.split('-') : ['', '', ''];
    const tanggalFormatted = item.tanggal ? `${day}-${month}-${year}` : 'N/A';
    
    // Determine status class
    const statusClass = item.keterangan && item.keterangan.toLowerCase() === 'hilang' ? 'hilang' : 'ditemukan';
    
<<<<<<< HEAD
=======
    const itemId = Number(item.id);
    const isSelected = selectedItems.has(itemId);
    
    // Determine kategori (if available, otherwise use default)
    // Check both camelCase and snake_case formats
    let kategori = item.kategori || item.kategoriBarang || null;
    
    // If kategori is empty string or null, use default
    if (!kategori || kategori.trim() === '' || kategori === 'null' || kategori === null) {
        kategori = 'Umum';
    }
    
    // Get gambarPath - check multiple possible field names
    const gambarPath = item.gambarPath || item.gambar_path || null;
    const hasImage = gambarPath && gambarPath.trim() !== '' && gambarPath !== 'null';
    
    // Check if user can modify this item
    const canModify = canModifyItem(item);
    
>>>>>>> devendev
    row.innerHTML = `
        <td>${rowNumber}</td>
        <td>${item.namaBarang || 'N/A'}</td>
        <td>${tanggalFormatted}</td>
        <td><span class="status ${statusClass}">${item.keterangan || 'N/A'}</span></td>
        <td>${item.namaPemilik || 'N/A'}</td>
<<<<<<< HEAD
        <td>${item.lokasi || 'N/A'}</td>
        <td><i class="fas fa-eye action-view" onclick="viewImage('${item.id || ''}')"></i></td>
        <td><input type="checkbox" onchange="toggleSelection('${item.id || ''}')"></td>
    `;
    
=======
        <td>${kategori}</td>
        <td>${item.lokasi || 'N/A'}</td>
        <td><i class="fas fa-eye action-view" onclick="viewImage('${itemId}')" title="View Detail"></i></td>
        <td>
            ${canModify ? `<input type="checkbox" ${isSelected ? 'checked' : ''} onchange="toggleSelection(${itemId}, this)">` : '<span style="color: #868e96;">-</span>'}
        </td>
    `;
    
    // Store gambarPath and item data in row for easy access
    row.dataset.gambarPath = gambarPath || '';
    row.dataset.itemId = itemId;
    row.dataset.canModify = canModify;
    
>>>>>>> devendev
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
<<<<<<< HEAD
    const item = allItems.find(i => i.id == itemId);
    if (item && item.gambarPath) {
        const imageUrl = `http://localhost:8080/uploads/${item.gambarPath}`;
        window.open(imageUrl, '_blank');
    } else {
        alert('No image available for this item.');
    }
}

function toggleSelection(itemId) {
    // This would handle item selection for bulk operations
    console.log('Toggled selection for item:', itemId);
=======
    const item = allItems.find(i => Number(i.id) === Number(itemId));
    
    if (!item) {
        alert('Item not found.');
        return;
    }
    
    // Check for gambarPath in different possible formats
    const gambarPath = item.gambarPath || item.gambar_path || item.gambarBarang || '';
    const hasImage = gambarPath && gambarPath.trim() !== '' && gambarPath !== 'null';
    
    // Format date from YYYY-MM-DD to DD-MM-YYYY
    const [year, month, day] = item.tanggal ? item.tanggal.split('-') : ['', '', ''];
    const tanggalFormatted = item.tanggal ? `${day}-${month}-${year}` : 'N/A';
    
    // Determine kategori
    let kategori = item.kategori || item.kategoriBarang || null;
    if (!kategori || kategori.trim() === '' || kategori === 'null' || kategori === null) {
        kategori = 'Umum';
    }
    
    // Determine status class
    const statusClass = item.keterangan && item.keterangan.toLowerCase() === 'hilang' ? 'hilang' : 'ditemukan';
    
    // Determine label for nama pemilik/penemu based on keterangan
    const isHilang = item.keterangan && item.keterangan.toLowerCase() === 'hilang';
    const pemilikLabel = isHilang ? 'Pemilik' : 'Penemu';
    
    // Create modal if it doesn't exist
    let modal = document.getElementById('image-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'image-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content image-modal-content">
                <div class="modal-header">
                    <h2>Detail Informasi</h2>
                    <span class="close-modal" onclick="closeImageModal()">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="image-container">
                        <img id="modal-image" src="" alt="Item Image">
                    </div>
                    <div class="info-container">
                        <div class="info-item">
                            <span class="info-label">Nama Barang:</span>
                            <span class="info-value" id="modal-nama-barang">-</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Tanggal:</span>
                            <span class="info-value" id="modal-tanggal">-</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Keterangan:</span>
                            <span class="info-value" id="modal-keterangan">-</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label" id="modal-pemilik-label">Nama Pemilik / Penemu:</span>
                            <span class="info-value" id="modal-nama-pemilik">-</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Kategori:</span>
                            <span class="info-value" id="modal-kategori">-</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Lokasi:</span>
                            <span class="info-value" id="modal-lokasi">-</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">No. Handphone:</span>
                            <span class="info-value" id="modal-no-handphone">-</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    // Populate information
    document.getElementById('modal-nama-barang').textContent = item.namaBarang || 'N/A';
    document.getElementById('modal-tanggal').textContent = tanggalFormatted;
    const keteranganElement = document.getElementById('modal-keterangan');
    keteranganElement.textContent = item.keterangan || 'N/A';
    keteranganElement.className = `info-value status ${statusClass}`;
    
    // Update label dynamically based on keterangan
    document.getElementById('modal-pemilik-label').textContent = `Nama ${pemilikLabel}:`;
    document.getElementById('modal-nama-pemilik').textContent = item.namaPemilik || 'N/A';
    
    document.getElementById('modal-kategori').textContent = kategori;
    document.getElementById('modal-lokasi').textContent = item.lokasi || 'N/A';
    document.getElementById('modal-no-handphone').textContent = item.noHandphone || 'N/A';
    
    const imgElement = document.getElementById('modal-image');
    
    // Set image source - construct URL properly
    if (hasImage) {
        let imageUrl;
        const cleanPath = gambarPath.trim();
        
        // If gambarPath already includes uploads/, use it directly
        if (cleanPath.startsWith('uploads/') || cleanPath.startsWith('/uploads/')) {
            imageUrl = `http://localhost:8080/${cleanPath.replace(/^\/+/, '')}`;
        } else {
            // Otherwise, prepend uploads/
            imageUrl = `http://localhost:8080/uploads/${cleanPath}`;
        }
        
        console.log('Loading image from:', imageUrl);
        console.log('Original gambarPath:', gambarPath);
        
        // Reset onerror handler
        imgElement.onerror = null;
        imgElement.onload = null;
        
        // Handle image load error
        imgElement.onerror = function() {
            console.error('Failed to load image:', imageUrl);
            console.error('Item data:', item);
            imgElement.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'400\' height=\'300\'%3E%3Crect width=\'100%25\' height=\'100%25\' fill=\'%23f8f9fa\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' text-anchor=\'middle\' dy=\'.3em\' fill=\'%23999\' font-size=\'16\'%3EGambar tidak dapat dimuat%3C/text%3E%3C/svg%3E';
        };
        
        // Handle successful image load
        imgElement.onload = function() {
            console.log('Image loaded successfully:', imageUrl);
        };
        
        // Set image source after setting up handlers
        imgElement.src = imageUrl;
    } else {
        // Show placeholder if no image
        imgElement.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'400\' height=\'300\'%3E%3Crect width=\'100%25\' height=\'100%25\' fill=\'%23f8f9fa\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' text-anchor=\'middle\' dy=\'.3em\' fill=\'%23999\' font-size=\'16\'%3ETidak ada gambar%3C/text%3E%3C/svg%3E';
    }
    
    modal.style.display = 'block';
}

function closeImageModal() {
    const modal = document.getElementById('image-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const editModal = document.getElementById('edit-modal');
    const imageModal = document.getElementById('image-modal');
    if (event.target === editModal) {
        closeEditModal();
    }
    if (event.target === imageModal) {
        closeImageModal();
    }
}

function toggleSelection(itemId, checkbox) {
    const id = Number(itemId);
    if (checkbox.checked) {
        selectedItems.add(id);
    } else {
        selectedItems.delete(id);
    }
    
    updateDeleteButton();
    updateSelectAllCheckbox();
}

function toggleSelectAllGambar() {
    const selectAllGambar = document.getElementById('select-all-gambar');
    const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]');
    
    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    
    checkboxes.forEach((checkbox, index) => {
        const item = filteredItems[startIndex + index];
        
        if (item) {
            const itemId = Number(item.id);
            checkbox.checked = selectAllGambar.checked;
            if (selectAllGambar.checked) {
                selectedItems.add(itemId);
            } else {
                selectedItems.delete(itemId);
            }
        }
    });
    
    updateDeleteButton();
}

function updateSelectAllCheckbox() {
    const selectAllGambar = document.getElementById('select-all-gambar');
    const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]');
    const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;
    
    if (checkboxes.length === 0) {
        if (selectAllGambar) {
            selectAllGambar.checked = false;
            selectAllGambar.indeterminate = false;
        }
    } else if (checkedCount === 0) {
        if (selectAllGambar) {
            selectAllGambar.checked = false;
            selectAllGambar.indeterminate = false;
        }
    } else if (checkedCount === checkboxes.length) {
        if (selectAllGambar) {
            selectAllGambar.checked = true;
            selectAllGambar.indeterminate = false;
        }
    } else {
        if (selectAllGambar) {
            selectAllGambar.checked = false;
            selectAllGambar.indeterminate = true;
        }
    }
}

function updateDeleteButton() {
    const deleteIcon = document.getElementById('delete-icon');
    const editIcon = document.getElementById('edit-icon');
    
    // User biasa: hanya bisa edit, tidak bisa delete
    if (!isAdmin()) {
        // Hide delete icon untuk user biasa (mereka tidak bisa delete)
        if (deleteIcon) deleteIcon.style.display = 'none';
        
        // Untuk edit icon, hanya tampilkan jika user memiliki item yang dipilih
        const selectedItemsArray = Array.from(selectedItems);
        const canModifyAny = selectedItemsArray.some(itemId => {
            const item = allItems.find(i => Number(i.id) === Number(itemId));
            return item && canModifyItem(item);
        });
        
        if (selectedItems.size === 0 || !canModifyAny) {
            if (editIcon) editIcon.style.display = 'none';
        } else if (selectedItems.size === 1) {
            // Edit hanya untuk 1 item
            if (editIcon) editIcon.style.display = 'inline-block';
        } else {
            // Multiple items selected, tidak bisa edit
            if (editIcon) editIcon.style.display = 'none';
        }
        return;
    }
    
    // Admin: bisa melakukan semua operasi (edit dan delete)
    if (selectedItems.size === 0) {
        if (deleteIcon) deleteIcon.style.display = 'none';
        if (editIcon) editIcon.style.display = 'none';
    } else if (selectedItems.size === 1) {
        if (deleteIcon) deleteIcon.style.display = 'inline-block';
        if (editIcon) editIcon.style.display = 'inline-block';
    } else {
        // Multiple items: bisa delete, tapi edit hanya untuk 1 item
        if (deleteIcon) deleteIcon.style.display = 'inline-block';
        if (editIcon) editIcon.style.display = 'none';
    }
}


function editSelectedItem() {
    if (selectedItems.size === 0) {
        alert('Please select an item to edit.');
        return;
    }
    
    if (selectedItems.size > 1) {
        alert('Please select only one item to edit.');
        return;
    }
    
    const itemId = Array.from(selectedItems)[0];
    const item = allItems.find(i => Number(i.id) === itemId);
    
    if (!item) {
        alert('Item not found.');
        return;
    }
    
    // Check if user can modify this item
    if (!canModifyItem(item)) {
        alert('You don\'t have permission to edit this item.');
        return;
    }
    
    openEditModal(item);
}

function openEditModal(item) {
    // Check if user can modify this item
    if (!canModifyItem(item)) {
        alert('You don\'t have permission to edit this item.');
        return;
    }
    
    // Create modal if it doesn't exist
    let modal = document.getElementById('edit-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'edit-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Edit Informasi Barang</h2>
                    <span class="close-modal" onclick="closeEditModal()">&times;</span>
                </div>
                <form id="edit-form" onsubmit="saveEdit(event)">
                    <input type="hidden" id="edit-item-id">
                    <div class="form-group">
                        <label>Nama Barang *</label>
                        <input type="text" id="edit-nama-barang" required>
                    </div>
                    <div class="form-group">
                        <label>Tanggal *</label>
                        <input type="date" id="edit-tanggal" required>
                    </div>
                    <div class="form-group">
                        <label>Keterangan *</label>
                        <select id="edit-keterangan" required>
                            <option value="Hilang">Hilang</option>
                            <option value="Ditemukan">Ditemukan</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Nama Pemilik / Penemu *</label>
                        <input type="text" id="edit-nama-pemilik" required>
                    </div>
                    <div class="form-group">
                        <label>Kategori</label>
                        <select id="edit-kategori">
                            <option value="Elektronik">Elektronik</option>
                            <option value="Pakaian">Pakaian</option>
                            <option value="Aksesoris">Aksesoris</option>
                            <option value="Dokumen">Dokumen</option>
                            <option value="Kendaraan">Kendaraan</option>
                            <option value="Lainnya">Lainnya</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Lokasi *</label>
                        <input type="text" id="edit-lokasi" required>
                    </div>
                    <div class="form-group">
                        <label>No. Handphone *</label>
                        <input type="text" id="edit-no-handphone" required>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn-cancel" onclick="closeEditModal()">Cancel</button>
                        <button type="submit" class="btn-save">Save Changes</button>
                    </div>
                </form>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    // Populate form with item data
    document.getElementById('edit-item-id').value = item.id;
    document.getElementById('edit-nama-barang').value = item.namaBarang || '';
    document.getElementById('edit-tanggal').value = item.tanggal || '';
    document.getElementById('edit-keterangan').value = item.keterangan || 'Hilang';
    document.getElementById('edit-nama-pemilik').value = item.namaPemilik || '';
    document.getElementById('edit-kategori').value = item.kategori || 'Lainnya';
    document.getElementById('edit-lokasi').value = item.lokasi || '';
    document.getElementById('edit-no-handphone').value = item.noHandphone || '';
    
    modal.style.display = 'block';
}

function closeEditModal() {
    const modal = document.getElementById('edit-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

async function saveEdit(event) {
    event.preventDefault();
    
    const itemId = document.getElementById('edit-item-id').value;
    const item = allItems.find(i => Number(i.id) === Number(itemId));
    
    // Check if user can modify this item
    if (!item || !canModifyItem(item)) {
        alert('You don\'t have permission to edit this item.');
        closeEditModal();
        return;
    }
    
    const formData = {
        namaBarang: document.getElementById('edit-nama-barang').value,
        tanggal: document.getElementById('edit-tanggal').value,
        keterangan: document.getElementById('edit-keterangan').value,
        namaPemilik: document.getElementById('edit-nama-pemilik').value,
        kategori: document.getElementById('edit-kategori').value,
        lokasi: document.getElementById('edit-lokasi').value,
        noHandphone: document.getElementById('edit-no-handphone').value
    };
    
    try {
        const token = localStorage.getItem('token');
        
        const response = await fetch(`${API_BASE_URL}/pelaporan/${itemId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            const result = await response.json();
            alert(result.message || 'Item updated successfully');
            
            closeEditModal();
            await loadItems();
        } else {
            let errorMessage = 'Unknown error';
            try {
                const error = await response.json();
                errorMessage = error.message || error.error || 'Failed to update item';
            } catch (e) {
                errorMessage = `HTTP ${response.status}: ${response.statusText}`;
            }
            alert('Failed to update item: ' + errorMessage);
        }
    } catch (error) {
        console.error('Error updating item:', error);
        alert('Error updating item: ' + (error.message || 'Network error. Please check your connection and try again.'));
    }
}


function deleteSelectedItems() {
    if (selectedItems.size === 0) {
        alert('Please select at least one item to delete.');
        return;
    }
    
    const count = selectedItems.size;
    if (!confirm(`Are you sure you want to delete ${count} item(s)?`)) {
        return;
    }
    
    performDelete();
}

async function performDelete() {
    // User biasa tidak bisa delete sama sekali
    if (!isAdmin()) {
        alert('You don\'t have permission to delete items. Only administrators can delete reports.');
        return;
    }
    
    // Filter selected items to only those the user can delete
    const deletableItems = Array.from(selectedItems).filter(itemId => {
        const item = allItems.find(i => Number(i.id) === Number(itemId));
        return item && canModifyItem(item);
    }).map(id => Number(id));
    
    if (deletableItems.length === 0) {
        alert('You don\'t have permission to delete any of the selected items.');
        return;
    }
    
    try {
        const token = localStorage.getItem('token');
        
        const response = await fetch(`${API_BASE_URL}/pelaporan/bulk`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ids: deletableItems })
        });
        
        if (response.ok) {
            const result = await response.json();
            alert(result.message || 'Items deleted successfully');
            
            // Clear selection
            selectedItems.clear();
            updateDeleteButton();
            
            // Reload items
            await loadItems();
        } else {
            let errorMessage = 'Unknown error';
            try {
                const error = await response.json();
                errorMessage = error.message || error.error || 'Failed to delete items';
            } catch (e) {
                errorMessage = `HTTP ${response.status}: ${response.statusText}`;
            }
            alert('Failed to delete items: ' + errorMessage);
        }
    } catch (error) {
        console.error('Error deleting items:', error);
        alert('Error deleting items: ' + (error.message || 'Network error. Please check your connection and try again.'));
    }
}

async function deleteSingleItem(itemId) {
    const item = allItems.find(i => Number(i.id) === Number(itemId));
    
    if (!item) {
        alert('Item not found.');
        return;
    }
    
    // Check if user can modify this item
    if (!canModifyItem(item)) {
        alert('You don\'t have permission to delete this item.');
        return;
    }
    
    if (!confirm('Are you sure you want to delete this item?')) {
        return;
    }
    
    try {
        const token = localStorage.getItem('token');
        const id = Number(itemId);
        
        const response = await fetch(`${API_BASE_URL}/pelaporan/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            const result = await response.json();
            alert(result.message || 'Item deleted successfully');
            
            // Remove from selection if selected
            selectedItems.delete(Number(itemId));
            updateDeleteButton();
            
            // Reload items
            await loadItems();
        } else {
            let errorMessage = 'Unknown error';
            try {
                const error = await response.json();
                errorMessage = error.message || error.error || 'Failed to delete item';
            } catch (e) {
                errorMessage = `HTTP ${response.status}: ${response.statusText}`;
            }
            alert('Failed to delete item: ' + errorMessage);
        }
    } catch (error) {
        console.error('Error deleting item:', error);
        alert('Error deleting item: ' + (error.message || 'Network error. Please check your connection and try again.'));
    }
>>>>>>> devendev
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}
