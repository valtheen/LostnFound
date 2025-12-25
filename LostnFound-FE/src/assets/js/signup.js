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
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    
<<<<<<< HEAD
    // Check if passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        return;
    }
    
    const userData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        password: password
=======
    // Validate passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    // Get phone number (for display/validation, but not sent to backend)
    const phoneNumber = formData.get('phone');
    
    // Validate phone number format
    if (phoneNumber && phoneNumber.trim() !== '') {
        const phonePattern = /^[0-9+\-\s()]+$/;
        if (!phonePattern.test(phoneNumber.trim())) {
            alert("Please enter a valid phone number.");
            return;
        }
    }
    
    const userData = {
        username: formData.get('name'),
        email: formData.get('email'),
        password: password,
        phone: phoneNumber || ''
>>>>>>> devendev
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

<<<<<<< HEAD
        const result = await response.json();

        if (response.ok && result.success) {
=======
        // Check if response is ok
        if (!response.ok) {
            // Try to parse error response
            let errorMessage = 'Sign up failed. Please try again.';
            try {
                const errorResult = await response.json();
                errorMessage = errorResult.message || errorResult.error || errorMessage;
            } catch (e) {
                // If response is not JSON, use status text
                errorMessage = `HTTP ${response.status}: ${response.statusText}`;
            }
            alert(errorMessage);
            return;
        }

        // Parse successful response
        const result = await response.json();

        if (result.success) {
>>>>>>> devendev
            alert('Sign up successful! Please login.');
            window.location.href = 'login.html';
        } else {
            alert(result.message || 'Sign up failed. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
<<<<<<< HEAD
        alert('Network error. Please check your connection and try again.');
=======
        // More specific error message
        if (error.message && error.message.includes('Failed to fetch')) {
            alert('Cannot connect to server. Please make sure the backend is running on http://localhost:8080');
        } else {
            alert('Network error: ' + (error.message || 'Please check your connection and try again.'));
        }
>>>>>>> devendev
    }
});

function validateForm(data) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
<<<<<<< HEAD
    const phonePattern = /^\d{10,13}$/;
    
=======
    
    // Validate email
    if (!data.email || data.email.trim() === '') {
        alert("Email is required.");
        return false;
    }
    
    // Validate email format (all users including admin must use valid email format)
>>>>>>> devendev
    if (!emailPattern.test(data.email)) {
        alert("Please enter a valid email address.");
        return false;
    }
    
<<<<<<< HEAD
    if (data.name.length < 2) {
        alert("Name must be at least 2 characters long.");
        return false;
    }
    
    if (!phonePattern.test(data.phone)) {
        alert("Phone number must be 10-13 digits.");
=======
    // Validate username (min 3, max 20 characters as per backend)
    if (!data.username || data.username.trim() === '') {
        alert("Username is required.");
        return false;
    }
    
    if (data.username.trim().length < 3) {
        alert("Username must be at least 3 characters long.");
        return false;
    }
    
    if (data.username.trim().length > 20) {
        alert("Username must not exceed 20 characters.");
        return false;
    }
    
    // Validate password (min 6 characters as per backend)
    if (!data.password || data.password.trim() === '') {
        alert("Password is required.");
>>>>>>> devendev
        return false;
    }
    
    if (data.password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return false;
    }
    
    return true;
}
