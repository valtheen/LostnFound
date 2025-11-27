// API Configuration
const API_BASE_URL = 'http://localhost:8080/api';

// DOM Elements
const signupForm = document.getElementById('signup-form');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const passwordToggle = document.querySelector('.password-toggle');
const confirmPasswordToggle = document.querySelector('.confirm-password-toggle');

// Initialize password toggle visibility
document.addEventListener('DOMContentLoaded', function() {
    setupPasswordToggle('password');
    setupPasswordToggle('confirm-password');
});

function setupPasswordToggle(inputId) {
    const inputField = document.getElementById(inputId);
    const toggleIcon = inputField.nextElementSibling;
    if(inputField && toggleIcon) {
        inputField.addEventListener('input', () => {
            if (inputField.value.length > 0) {
                toggleIcon.classList.add('visible');
            } else {
                toggleIcon.classList.remove('visible');
            }
        });
    }
}

function toggleVisibility(inputId) {
    const inputField = document.getElementById(inputId);
    const toggleIcon = inputField.nextElementSibling;
    if (inputField.type === "password") {
        inputField.type = "text";
        toggleIcon.classList.remove("fa-eye");
        toggleIcon.classList.add("fa-eye-slash");
    } else {
        inputField.type = "password";
        toggleIcon.classList.remove("fa-eye-slash");
        toggleIcon.classList.add("fa-eye");
    }
}

// Form submission handler
signupForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const formData = new FormData(signupForm);
    const userData = {
        username: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        role: 'USER'
    };

    // Client-side validation
    if (!validateForm(userData)) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });

        const result = await response.json();

        if (response.ok) {
            alert('Sign up successful! Please login.');
            window.location.href = 'login.html';
        } else {
            alert(result.message || 'Sign up failed. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Network error. Please check your connection and try again.');
    }
});

function validateForm(data) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailPattern.test(data.email)) {
        alert("Please enter a valid email address.");
        return false;
    }
    
    if (data.username.length < 2) {
        alert("Username must be at least 2 characters long.");
        return false;
    }
    
    if (data.password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return false;
    }
    
    return true;
}
