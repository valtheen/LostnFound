// API Configuration
const API_BASE_URL = 'http://localhost:8080/api';

// DOM Elements
const loginForm = document.getElementById('login-form');
const passwordInput = document.getElementById('password');
const passwordToggle = document.querySelector('.password-toggle');

// Initialize password toggle visibility
document.addEventListener('DOMContentLoaded', function() {
    passwordInput.addEventListener('input', () => {
        if (passwordInput.value.length > 0) {
            passwordToggle.classList.add('visible');
        } else {
            passwordToggle.classList.remove('visible');
        }
    });
});

function togglePassword() {
    const password = document.getElementById("password");
    const toggle = document.querySelector(".password-toggle");
    if (password.type === "password") {
        password.type = "text";
        toggle.classList.remove("fa-eye");
        toggle.classList.add("fa-eye-slash");
    } else {
        password.type = "password";
        toggle.classList.remove("fa-eye-slash");
        toggle.classList.add("fa-eye");
    }
}

// Form submission handler
loginForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const formData = new FormData(loginForm);
    const loginData = {
        username: formData.get('email'),
        password: formData.get('password')
    };

    // Client-side validation
    if (!validateLoginForm(loginData)) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData)
        });

        const result = await response.json();

        if (response.ok) {
            // Store user data in localStorage
            localStorage.setItem('user', JSON.stringify(result.data));
            localStorage.setItem('token', result.data.accessToken);
            
            alert('Login successful!');
            window.location.href = 'dashboard.html';
        } else {
            alert(result.message || 'Login failed. Please check your credentials.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Network error. Please check your connection and try again.');
    }
});

function validateLoginForm(data) {
    if (data.username.length < 2) {
        alert("Please enter a valid username.");
        return false;
    }
    
    if (data.password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return false;
    }
    
    return true;
}

// Google Login (placeholder function)
function loginWithGoogle() {
    alert('Google login functionality will be implemented soon.');
}

// Check if user is already logged in
function checkAuthStatus() {
    const token = localStorage.getItem('token');
    if (token) {
        window.location.href = 'dashboard.html';
    }
}

// Initialize auth check
checkAuthStatus();
