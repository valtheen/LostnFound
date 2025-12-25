// API Configuration
const API_BASE_URL = 'http://localhost:8080/api';

// DOM Elements
const userNameElement = document.getElementById('user-name');
const totalItemsElement = document.getElementById('total-items');
const lostItemsElement = document.getElementById('lost-items');
const foundItemsElement = document.getElementById('found-items');
const totalReportsElement = document.getElementById('total-reports');
const activityListElement = document.getElementById('activity-list');

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    checkAuthStatus();
    loadDashboardData();
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

async function loadDashboardData() {
    try {
        await Promise.all([
            loadStats(),
            loadRecentActivity()
        ]);
    } catch (error) {
        console.error('Error loading dashboard data:', error);
        // Fallback to demo data
        loadDemoData();
    }
}

async function loadStats() {
    try {
        const token = localStorage.getItem('token');
        
<<<<<<< HEAD
        const response = await fetch(`${API_BASE_URL}/barang/stats`, {
=======
        const response = await fetch(`${API_BASE_URL}/pelaporan/stats`, {
>>>>>>> devendev
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            const result = await response.json();
<<<<<<< HEAD
            if (result.success) {
                updateStatsDisplay(result);
            } else {
                throw new Error(result.message || 'Failed to load stats');
=======
            if (result.success && result.data) {
                updateStatsDisplay(result.data);
            } else {
                throw new Error('Invalid response format');
>>>>>>> devendev
            }
        } else {
            throw new Error('Failed to load stats');
        }
    } catch (error) {
        console.error('Error loading stats:', error);
        // Load from localStorage as fallback
        loadStatsFromLocalStorage();
    }
}

function loadStatsFromLocalStorage() {
    const items = JSON.parse(localStorage.getItem('daftarBarang')) || [];
    const stats = {
        totalItems: items.length,
        lostItems: items.filter(item => item.keterangan === 'Hilang').length,
        foundItems: items.filter(item => item.keterangan === 'Ditemukan').length,
        totalReports: items.length
    };
    updateStatsDisplay(stats);
}

function updateStatsDisplay(stats) {
    totalItemsElement.textContent = stats.totalItems || 0;
    lostItemsElement.textContent = stats.lostItems || 0;
    foundItemsElement.textContent = stats.foundItems || 0;
    totalReportsElement.textContent = stats.totalReports || 0;
}

async function loadRecentActivity() {
    try {
        const token = localStorage.getItem('token');
        
<<<<<<< HEAD
        const response = await fetch(`${API_BASE_URL}/barang/recent`, {
=======
        const response = await fetch(`${API_BASE_URL}/pelaporan/recent?limit=5`, {
>>>>>>> devendev
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            const result = await response.json();
            if (result.success && result.data) {
<<<<<<< HEAD
                renderRecentActivity(result.data);
            } else {
                throw new Error(result.message || 'Failed to load recent activity');
=======
                const activities = result.data.map(item => ({
                    id: item.id,
                    type: item.keterangan === 'Hilang' ? 'lost' : 'found',
                    title: `${item.keterangan === 'Hilang' ? 'Lost' : 'Found'}: ${item.namaBarang}`,
                    description: `Reported by ${item.namaPemilik} at ${item.lokasi}`,
                    time: item.tanggal || new Date().toISOString().split('T')[0]
                }));
                renderRecentActivity(activities);
            } else {
                throw new Error('Invalid response format');
>>>>>>> devendev
            }
        } else {
            throw new Error('Failed to load recent activity');
        }
    } catch (error) {
        console.error('Error loading recent activity:', error);
        // Load from localStorage as fallback
        loadRecentActivityFromLocalStorage();
    }
}

function loadRecentActivityFromLocalStorage() {
    const items = JSON.parse(localStorage.getItem('daftarBarang')) || [];
    const recentItems = items.slice(-5).reverse(); // Get last 5 items
    
    const activities = recentItems.map(item => ({
        id: item.id || Math.random().toString(36).substr(2, 9),
        type: item.keterangan === 'Hilang' ? 'lost' : 'found',
        title: `${item.keterangan === 'Hilang' ? 'Lost' : 'Found'}: ${item.namaBarang}`,
        description: `Reported by ${item.namaPemilik} at ${item.lokasi}`,
        time: item.tanggal || new Date().toISOString().split('T')[0]
    }));
    
    renderRecentActivity(activities);
}

function renderRecentActivity(activities) {
    if (!activityListElement) return;
    
    activityListElement.innerHTML = '';
    
<<<<<<< HEAD
    if (!activities || activities.length === 0) {
=======
    if (activities.length === 0) {
>>>>>>> devendev
        activityListElement.innerHTML = '<p style="text-align: center; color: #6c757d; padding: 20px;">No recent activity</p>';
        return;
    }
    
<<<<<<< HEAD
    // Convert backend format to frontend format if needed
    const formattedActivities = activities.map(activity => {
        if (activity.namaBarang) {
            // Backend format - convert to frontend format
            return {
                id: activity.id || Math.random().toString(36).substr(2, 9),
                type: activity.keterangan && activity.keterangan.toLowerCase() === 'hilang' ? 'lost' : 'found',
                title: `${activity.keterangan === 'Hilang' ? 'Lost' : 'Found'}: ${activity.namaBarang}`,
                description: `Reported by ${activity.namaPemilik || 'Unknown'} at ${activity.lokasi || 'Unknown location'}`,
                time: activity.tanggal || new Date().toISOString().split('T')[0]
            };
        }
        return activity; // Already in frontend format
    });
    
    formattedActivities.forEach(activity => {
=======
    activities.forEach(activity => {
>>>>>>> devendev
        const activityItem = createActivityItem(activity);
        activityListElement.appendChild(activityItem);
    });
}

function createActivityItem(activity) {
    const item = document.createElement('div');
    item.className = 'activity-item';
    
    const iconClass = activity.type === 'lost' ? 'fa-exclamation-triangle' : 'fa-check-circle';
    const iconBg = activity.type === 'lost' ? '#f5576c' : '#4facfe';
    
    item.innerHTML = `
        <div class="activity-icon" style="background: ${iconBg};">
            <i class="fas ${iconClass}"></i>
        </div>
        <div class="activity-content">
            <h4>${activity.title}</h4>
            <p>${activity.description}</p>
        </div>
        <div class="activity-time">
            ${formatDate(activity.time)}
        </div>
    `;
    
    return item;
}

function formatDate(dateString) {
    if (!dateString) return 'Just now';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    
    return date.toLocaleDateString();
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

// Load demo data if no real data is available
function loadDemoData() {
    const demoStats = {
        totalItems: 15,
        lostItems: 8,
        foundItems: 7,
        totalReports: 15
    };
    
    const demoActivities = [
        {
            id: '1',
            type: 'lost',
            title: 'Lost: iPhone 13',
            description: 'Reported by John Doe at Campus Library',
            time: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        },
        {
            id: '2',
            type: 'found',
            title: 'Found: Wallet',
            description: 'Reported by Jane Smith at Parking Lot',
            time: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        },
        {
            id: '3',
            type: 'lost',
            title: 'Lost: Backpack',
            description: 'Reported by Mike Johnson at Cafeteria',
            time: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        }
    ];
    
    updateStatsDisplay(demoStats);
    renderRecentActivity(demoActivities);
}
