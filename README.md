# NextGen Mini Applicant Dashboard

A modern, responsive, client-side web application built to help applicants track their internship applications. Features user authentication, persistent browser storage, interactive dynamic rendering, and a sleek dark-mode aesthetic! 

---

##  Features

- Complete client-side sign-up and login flow with input validation and session persistence via `localStorage`.
- Dynamic welcome banner greeting logged-in users directly.
- Seamlessly submit and manage internship applications in real-time.
- Beautiful custom CSS styling integrated with Bootstrap 5 for responsiveness across desktop and mobile screens.
- Friendly UI state handling when a user hasn't submitted any applications yet.
- Instant Log Out functionality that safely clears active sessions.

---

## Tech Stack

* **HTML5**: Semantic page structures and dynamic template forms
* **CSS3 & Bootstrap 5**: Custom styling, dark mode theme, flexbox/grid layout, and responsive utility classes
* **JavaScript**: DOM manipulation, dynamic page rendering, event handling, and data storage logic
* **Browser Storage**: `localStorage` API for managing multi-user data and active sessions

---

##  Project Structure

```text
nextgen-MiniApplicantDashboard/
│
├── index.html          # Application Submission Form / Landing Page 📝
├── login.html          # Authentication (Sign In & Sign Up) Page 🔑
├── dashboard.html      # User Dashboard for viewing submitted applications 📊
├── style.css           # Custom Dark Theme & UI Layout Styles 🎨
├── script.js          # Authentication logic & Form Validation ⚡
└── dashboard.js       # Dynamic Dashboard rendering & card logic 🖥️
