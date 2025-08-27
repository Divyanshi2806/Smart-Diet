 
// API Base URL - Update this to your server URL
const API_BASE_URL = 'http://localhost:5000/api';

// ========== LOGIN MODAL ==========
function openLogin() {
  document.getElementById("loginModal").style.display = "block";
}

function closeLogin() {
  document.getElementById("loginModal").style.display = "none";
}

// ========== REGISTER MODAL ==========
function openRegister() {
  document.getElementById("registerModal").style.display = "block";
}

function closeRegister() {
  document.getElementById("registerModal").style.display = "none";
}

// Switch from Login → Register
function switchToRegister(event) {
  if (event) event.preventDefault();
  closeLogin();
  openRegister();
}

// Switch from Register → Login
function switchToLogin(event) {
  if (event) event.preventDefault();
  closeRegister();
  openLogin();
}

// Close modal if clicking outside of box
window.onclick = function(event) {
  if (event.target.classList.contains("modal")) {
    closeLogin();
    closeRegister();
  }
};

// ========== REGISTER FORM SUBMISSION ==========
document.getElementById('registerForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const username = document.getElementById('reg-username').value;
  const email = document.getElementById('reg-email').value;
  const password = document.getElementById('reg-password').value;
  const confirmPassword = document.getElementById('reg-confirm').value;
  const responseDiv = document.getElementById('registerResponse');
  
  // Basic validation
  if (!username || !email || !password || !confirmPassword) {
    showResponse(responseDiv, 'Please fill in all fields', 'error');
    return;
  }
  
  if (password !== confirmPassword) {
    showResponse(responseDiv, 'Passwords do not match', 'error');
    return;
  }
  
  if (password.length < 6) {
    showResponse(responseDiv, 'Password must be at least 6 characters', 'error');
    return;
  }
  
  try {
    const submitBtn = document.querySelector('#registerForm .btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Registering...';
    submitBtn.disabled = true;

    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ username, email, password, confirmPassword })
    });

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }
    const data = await response.json();
    document.getElementById("registerResponse").textContent = data.message;

    showResponse(responseDiv, 'Registration successful! Redirecting...', 'success');
    
    // Save token to localStorage
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    
    setTimeout(() => {
      closeRegister();
      alert(`Welcome ${data.user.username}! Registration successful.`);
      // You can redirect or update UI here
    }, 1500);
    
  } catch (error) {
    console.error('Registration error:', error);
    showResponse(responseDiv, error.message, 'error');
  } finally {
    const submitBtn = document.querySelector('#registerForm .btn');
    submitBtn.textContent = 'Register';
    submitBtn.disabled = false;
  }
});

// ========== LOGIN FORM SUBMISSION ==========
document.getElementById('loginForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const apiResponse = document.getElementById('apiResponse');
  
  if (!username || !password) {
    showResponse(apiResponse, 'Please fill in all fields', 'error');
    return;
  }
  
  try {
    const submitBtn = document.querySelector('#loginForm .btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Logging in...';
    submitBtn.disabled = true;

    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }
    
    showResponse(apiResponse, 'Login successful! Redirecting...', 'success');
    
    // Save token to localStorage
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    
    setTimeout(() => {
      closeLogin();
      alert(`Welcome back ${data.user.username}!`);
      // You can redirect or update UI here
    }, 1500);
    
  } catch (error) {
    console.error('Login error:', error);
    showResponse(apiResponse, error.message, 'error');
  } finally {
    const submitBtn = document.querySelector('#loginForm .btn');
    submitBtn.textContent = 'Login';
    submitBtn.disabled = false;
  }
});

// Helper: Show API response
function showResponse(element, message, type) {
  element.textContent = message;
  element.className = type;
  element.style.display = 'block';
  
  setTimeout(() => {
    element.style.display = 'none';
  }, 5000);
}

// Check if user is logged in on page load
window.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  if (token && user.username) {
    // Update UI to show logged in state
    console.log(`User ${user.username} is logged in`);
    // You can update the login button to show user info
  }
});
 