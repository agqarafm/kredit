// Təhlükəsizlik üçün real layihələrdə parolu birbaşa kodda saxlamaq məsləhət deyil.
// Bu, sadəcə tələbinizə uyğun olaraq yaradılıb.
const credentials = {
    username: "admin",
    password: "123"
};

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const errorMessage = document.getElementById('loginError');

            if (username === credentials.username && password === credentials.password) {
                // Giriş uğurlu olduqda istifadəçini yadda saxla
                sessionStorage.setItem('loggedInUser', username);
                // Ana səhifəyə yönləndir
                window.location.href = 'dashboard.html';
            } else {
                errorMessage.textContent = 'İstifadəçi adı və ya parol yanlışdır!';
            }
        });
    }
});

// Səhifələri qorumaq üçün funksiya
function protectPage() {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (!loggedInUser && window.location.pathname.split('/').pop() !== 'index.html') {
        window.location.href = 'index.html';
    }
}
