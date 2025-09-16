// login.js - Handles login form and Firebase Auth
// NOTE: Add your Firebase config below
const firebaseConfig = {
    apiKey: "AIzaSyCWGc0rXAH_byd38vtUME8EINbyzbrS5Dc",
  authDomain: "civicissue-1f098.firebaseapp.com",
  projectId: "civicissue-1f098",
  storageBucket: "civicissue-1f098.firebasestorage.app",
  messagingSenderId: "400507472339",
  appId: "1:400507472339:web:c7d2c35c14205882ba0726",
  measurementId: "G-2J2M83WT7Z"
  // TODO: Add your Firebase config here
};

// Initialize Firebase
if (typeof firebase !== 'undefined' && firebase.apps && firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const loginForm = document.getElementById('loginForm');
const loginAlert = document.getElementById('loginAlert');
const signupLink = document.getElementById('signupLink');

loginForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const email = loginForm.email.value.trim();
  const password = loginForm.password.value;
  if (!email || !password) {
    showAlert('Please enter email and password.');
    return;
  }
  // TODO: Use Firebase Auth for real login
  // For MVP, just show success and redirect
  showAlert('Login successful! (MVP placeholder)', 'success');
  setTimeout(() => window.location.href = 'my-reports.html', 1000);
});

signupLink.addEventListener('click', function(e) {
  e.preventDefault();
  showAlert('Sign up not implemented in MVP.');
});

function showAlert(msg, type = 'danger') {
  loginAlert.textContent = msg;
  loginAlert.className = 'alert mt-3 alert-' + type;
  loginAlert.classList.remove('d-none');
}
