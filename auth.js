//Signup validation

// name validation
function validateName() {
    const nameInput = document.getElementById("name");
    const nameError = document.getElementById("nameError")

    if (nameInput.value.trim() === '') {
        nameError.textContent = 'Name is required.';
        nameError.classList.add('show');
        nameInput.classList.add('invalid');
        return false;
    }

    nameError.classList.remove('show');
    nameInput.classList.remove('invalid');
    return true;
}

//email validation
function validateEmail() {
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const value = emailInput.value.trim();

    if (value === '') {
        emailError.textContent = 'Email is required.';
        emailError.classList.add('show');
        emailInput.classList.add('invalid');
        return false;
    }

    if (!emailPattern.test(value)) {
        emailError.textContent = 'Please enter a valid email address.';
        emailError.classList.add('show');
        emailInput.classList.add('invalid');
        return false;
    }

    emailError.classList.remove('show');
    emailInput.classList.remove('invalid');
    return true;
}

//password validation
function validatePassword() {
    const passwordInput = document.getElementById("password");
    const passwordError = document.getElementById("passwordError");
    const value = passwordInput.value;

    if (value === "") {
        passwordError.textContent = 'Password is required';
        passwordError.classList.add('show');
        passwordInput.classList.add('invalid');
        return false;
    }

    if (value.length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters.';
        passwordError.classList.add('show');
        passwordInput.classList.add('invalid');
        return false;
    }

    passwordError.classList.remove('show');
    passwordInput.classList.remove('invalid');
    return true;

}

//confirmpassword
function confirmPassword() {
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const confirmPasswordError = document.getElementById("confirmPasswordError");
    const value = confirmPasswordInput.value;

    if (value === '') {
        confirmPasswordError.textContent = 'Confirm the password';
        confirmPasswordError.classList.add('show');
        confirmPasswordInput.classList.add('invalid');
        return false;
    }

    if (value !== passwordInput.value) {
        confirmPasswordError.textContent = 'Passwords do not match';
        confirmPasswordError.classList.add('show');
        confirmPasswordInput.classList.add('invalid');
        return false;
    }

    confirmPasswordError.classList.remove('show');
    confirmPasswordInput.classList.remove('invalid');
    return true;
}

//signupform validation
const signupForm = document.getElementById('signup-form');

function isEmailUnique() {
    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("emailError");
    const enteredEmail = emailInput.value.trim().toLowerCase(); 

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const emailExists = users.some(user => user.email.toLowerCase() === enteredEmail);

    if (emailExists) {
        emailError.textContent = 'An account with this email already exists.';
        emailError.classList.add('show');
        emailInput.classList.add('invalid');
        return false; 
    }

    return true; 
}
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isUnique = isEmailUnique();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = confirmPassword();
    if (!isNameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid || !isUnique) {
        return;
    }

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    const newUser = {
        name: name,
        email: email,
        password: password
    };
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    localStorage.setItem('currentUser', JSON.stringify(newUser));

    window.location.href = 'dashboard.html';
});

//correctPassword
function correctPassword() {

    const emailInput = document.getElementById("loginEmail");
    const passwordInput = document.getElementById("loginPassword");
    const passwordError = document.getElementById("loginPasswordError");
    const enteredEmail = emailInput.value.trim();
    const enteredPassword = passwordInput.value;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const foundUser = users.find(user => user.email === enteredEmail);

    if (!foundUser || foundUser.password !== enteredPassword) {
        passwordError.textContent = 'Invalid email or password.';
        passwordError.classList.add('show');
        return false;
    }

    passwordError.classList.remove('show');
    passwordInput.classList.remove('invalid');
    return true;
}

//correct email
function correctEmail() {

    const emailInput = document.getElementById("loginEmail");
    const emailError = document.getElementById("loginEmailError");
    const enteredEmail = emailInput.value.trim();

    if (enteredEmail === '') {
        emailError.textContent = 'Email is required.';
        emailError.classList.add('show');
        emailInput.classList.add('invalid');
        return false;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const emailExists = users.some(user => user.email === enteredEmail);

    if (!emailExists) {
        emailError.textContent = 'No account found with this email address.';
        emailError.classList.add('show');
        emailInput.classList.add('invalid');
        return false; 
    }

   
    emailError.classList.remove('show');
    emailInput.classList.remove('invalid');
    return true;
}

//loginform
const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const isEmailCorrect = correctEmail();
    const isPasswordCorrect = correctPassword();

   if (!isEmailCorrect || !isPasswordCorrect) {
    return; 
}

const users = JSON.parse(localStorage.getItem('users')) || [];
const loggedInUser = users.find(user => user.email.toLowerCase() === email.toLowerCase());

if (loggedInUser) {
    localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
    window.location.href = 'dashboard.html';
}
});

//showloginerror
function showLoginError(message) {
    const globalError = document.getElementById('loginError');
    globalError.textContent = message;
    globalError.classList.add('show');
}
//blur
document.getElementById('name').addEventListener('blur', validateName);
document.getElementById('email').addEventListener('blur', validateEmail);
document.getElementById('password').addEventListener('blur', validatePassword);
document.getElementById('confirmPassword').addEventListener('blur', confirmPassword);

const signupCard = document.getElementById("signup-card");
const loginCard = document.getElementById("login-card");

const showLogin = document.getElementById("show-login");
const showSignup = document.getElementById("show-signup");

showLogin.addEventListener("click", (e) => {
    e.preventDefault();

    signupCard.style.display = "none";
    loginCard.style.display = "block";
});

showSignup.addEventListener("click", (e) => {
    e.preventDefault();

    loginCard.style.display = "none";
    signupCard.style.display = "block";
});

const params = new URLSearchParams(window.location.search);

if (params.get("login") === "true") {
    signupCard.style.display = "none";
    loginCard.style.display = "block";
}