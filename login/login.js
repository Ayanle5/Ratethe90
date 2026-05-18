import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAGxcEq6lQWapbUHJitP3POcbdBG6biCy4",
  authDomain: "ratethe90.firebaseapp.com",
  projectId: "ratethe90",
  storageBucket: "ratethe90.firebasestorage.app",
  messagingSenderId: "956989893858",
  appId: "1:956989893858:web:fe3f7916a4a543dc89c2bb",
  measurementId: "G-VC6101WBRV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginBox = document.getElementById('login-box');
const signupBox = document.getElementById('signup-box');
const toSignupLink = document.getElementById('to-signup');
const toLoginLink = document.getElementById('to-login');
const messageEl = document.getElementById('auth-message');

const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

toSignupLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginBox.classList.add('hidden');
    signupBox.classList.remove('hidden');
    messageEl.textContent = ""; 
});

toLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    signupBox.classList.add('hidden');
    loginBox.classList.remove('hidden');
    messageEl.textContent = ""; 
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    messageEl.textContent = "Logging in...";
    messageEl.style.color = "gray";

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            messageEl.textContent = "Login Successful! Redirecting...";
            messageEl.style.color = "green";
            setTimeout(() => { window.location.href = "/match.html"; }, 1500);
        })
        .catch((error) => {
            messageEl.style.color = "red";
            if (error.code === 'auth/invalid-credential') {
                messageEl.textContent = "Invalid email or password.";
            } else {
                messageEl.textContent = error.message;
            }
        });
});

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    messageEl.textContent = "Creating account...";
    messageEl.style.color = "gray";

    createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            messageEl.textContent = "Account created successfully! Redirecting...";
            messageEl.style.color = "green";
            setTimeout(() => { window.location.href = "/match.html"; }, 1500);
        })
        .catch((error) => {
            messageEl.style.color = "red";
            if (error.code === 'auth/email-already-in-use') {
                messageEl.textContent = "This email is already registered.";
            } else if (error.code === 'auth/weak-password') {
                messageEl.textContent = "Password should be at least 6 characters.";
            } else {
                messageEl.textContent = error.message;
            }
        });
});

const dmBtn = document.querySelector('.navdm');

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
}

dmBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    if (document.body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});