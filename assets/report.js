// report.js - Handles report form, validation, map, and Firebase integration
// NOTE: Replace 'YOUR_GOOGLE_MAPS_API_KEY' in report.html with your actual key
// NOTE: Add Firebase config below

// Firebase config placeholder
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

const form = document.getElementById('issueForm');
const confirmation = document.getElementById('confirmation');
const detectBtn = document.getElementById('detectLocation');
const locationInput = document.getElementById('location');
let map, marker;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 28.6139, lng: 77.209 }, // Default: New Delhi
    zoom: 13,
    disableDefaultUI: true
  });
  map.addListener('click', function(e) {
    setMarker(e.latLng.lat(), e.latLng.lng());
  });
}

function setMarker(lat, lng) {
  if (marker) marker.setMap(null);
  marker = new google.maps.Marker({
    position: { lat, lng },
    map: map
  });
  map.panTo({ lat, lng });
  locationInput.value = `${lat},${lng}`;
}

window.initMap = initMap;

detectBtn.addEventListener('click', function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(pos) {
      setMarker(pos.coords.latitude, pos.coords.longitude);
      map.setZoom(16);
    }, function() {
      alert('Unable to detect location. Please pin manually.');
    });
  } else {
    alert('Geolocation not supported.');
  }
});

form.addEventListener('submit', function(e) {
  e.preventDefault();
  // Basic validation
  const title = form.title.value.trim();
  const desc = form.description.value.trim();
  const cat = form.category.value;
  const loc = form.location.value;
  const photo = form.photo.files[0];
  if (!title || !desc || !cat || !loc) {
    alert('Please fill all required fields and select a location.');
    return;
  }
  if (photo && photo.size > 5 * 1024 * 1024) {
    alert('Photo must be less than 5MB.');
    return;
  }
  // TODO: Upload photo to Firebase Storage, then save issue to Firebase DB
  // For MVP, just show confirmation with dummy ID
  confirmation.textContent = 'Reported! ID: ' + Math.floor(Math.random() * 1000);
  confirmation.classList.remove('d-none');
  form.reset();
  if (marker) marker.setMap(null);
  locationInput.value = '';
});

// Load map after page load
window.addEventListener('DOMContentLoaded', () => {
  if (typeof google !== 'undefined') {
    initMap();
  }
});
