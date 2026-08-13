// hamburgerbtn activation
const hamburgerBtn = document.getElementById('hamburgerBtn');
const navLinks = document.getElementById('navLinks');

hamburgerBtn.addEventListener('click', function () {
    navLinks.classList.toggle('active');
});

// form validation
function validateName() {
    const nameInput = document.getElementById('name');
    const nameError = document.getElementById('nameError');

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

function validatePhone() {
    const phoneInput = document.getElementById('phone');
    const phoneError = document.getElementById('phoneError');
    const phonePattern = /^(?:0\d{10}|\+92\d{10})$/;
    const value = phoneInput.value.trim();

    if (value === '') {
        phoneError.textContent = 'Phone is required.';
        phoneError.classList.add('show');
        phoneInput.classList.add('invalid');
        return false;
    }
    if (!phonePattern.test(value)) {
        phoneError.textContent = 'Phone must be 11 or 13 digits(in +92 case)';
        phoneError.classList.add('show');
        phoneInput.classList.add('invalid');
        return false;
    }

    phoneError.classList.remove('show');
    phoneInput.classList.remove('invalid');
    return true;
}

function validateDomain() {
    const domainInput = document.getElementById('domain');
    const domainError = document.getElementById('domainError');

    if (domainInput.value.trim() === '') {
        domainError.textContent = 'Domain is required.';
        domainError.classList.add('show');
        domainInput.classList.add('invalid');
        return false;
    }

    domainError.classList.remove('show');
    domainInput.classList.remove('invalid');
    return true;
}

function validateUniversity() {
    const universityInput = document.getElementById('university');
    const universityError = document.getElementById('universityError');

    if (universityInput.value.trim() === '') {
        universityError.textContent = 'University is required.';
        universityError.classList.add('show');
        universityInput.classList.add('invalid');
        return false;
    }

    universityError.classList.remove('show');
    universityInput.classList.remove('invalid');
    return true;
}

function validateStatement() {
    const statementInput = document.getElementById('short-statement');
    const statementError = document.getElementById('statementError');
    const value = statementInput.value.trim();

    if (value === '') {
        statementError.textContent = 'Statement is required.';
        statementError.classList.add('show');
        statementInput.classList.add('invalid');
        return false;
    }

    if (value.length < 10) {
        statementError.textContent = 'Statement must be at least 10 characters long.';
        statementError.classList.add('show');
        statementInput.classList.add('invalid');
        return false;
    }

    statementError.classList.remove('show');
    statementInput.classList.remove('invalid');
    return true;
}

// blur
document.getElementById('name').addEventListener('blur', validateName);
document.getElementById('email').addEventListener('blur', validateEmail);
document.getElementById('phone').addEventListener('blur', validatePhone);
document.getElementById('domain').addEventListener('blur', validateDomain);
document.getElementById('university').addEventListener('blur', validateUniversity);
document.getElementById('short-statement').addEventListener('blur', validateStatement);


// rendersubmission func
function renderSubmissions() {
    const list = document.getElementById('submissionsList');
    const submissions = JSON.parse(localStorage.getItem('submissions')) || [];

    if (!list) {
        return;
    }

    list.innerHTML = '';

    submissions.forEach(function (sub) {
        const li = document.createElement('li');
        li.textContent = `${sub.name} — ${sub.domain} (${sub.university})`;
        list.appendChild(li);
    });
}

// applicationformpreventionfromreloading&more
const form = document.getElementById('applicationForm');
form.addEventListener('submit', function (e) {
    e.preventDefault();
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isDomainValid = validateDomain();
    const isUniversityValid = validateUniversity();
    const isStatementValid = validateStatement();
    const isFormValid = isNameValid && isEmailValid && isPhoneValid &&
        isDomainValid && isUniversityValid &&
        isStatementValid;
    
    //submission
    if (isFormValid) {
        const submission = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            domain: document.getElementById('domain').value,
            university: document.getElementById('university').value.trim(),
            statement: document.getElementById('short-statement').value.trim(),
          
            status: "pending",
            date: new Date().toLocaleDateString()

        };

        const submissions = JSON.parse(localStorage.getItem('submissions')) || [];
        submissions.push(submission);
        localStorage.setItem('submissions', JSON.stringify(submissions));

        const thankYou = document.getElementById('thank-you-message');
        thankYou.textContent = `Thank you, ${submission.name}! Your application for ${submission.domain} has been received.`;
        thankYou.classList.remove('hidden');

        form.reset();
        renderSubmissions();
    }

});
renderSubmissions();


const params = new URLSearchParams(window.location.search);
const selectDomain = params.get("domain");

if (selectDomain) {
    const domainInput = document.getElementById("domain");
    if (domainInput){
        const target = selectDomain.toLowerCase().trim();
        
        for (const option of domainInput){
            const optionValue = option.value.toLowerCase().trim();
            const optionText = option.text.toLowerCase().trim();
            
            if (
                optionValue === target ||
                optionText === target ||
                optionValue.includes(target.replace(/\s+/g, "-"))
            ) {
                domainInput.value = option.value;
                break;
            }
        }
    }
}
