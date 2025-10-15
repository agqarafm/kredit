// BURA FIREBASE-DƏN GÖTÜRDÜYÜNÜZ KODU YAPIŞDIRIN
const firebaseConfig = {
  apiKey: "AIzaSyBWy_6SlyUfp4br0G1lkKOpqubuh8-3zvQ",
  authDomain: "kredit-sistemi-arzu.firebaseapp.com",
  projectId: "kredit-sistemi-arzu",
  storageBucket: "kredit-sistemi-arzu.firebasestorage.app",
  messagingSenderId: "288244259599",
  appId: "1:288244259599:web:85ca5aedb0010210bdbc7a"
};

// Firebase-i başladırıq
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Səhifənin yolunu yoxlayırıq (login yoxsa dashboard)
const path = window.location.pathname;

if (path.includes("index.html") || path === "/") {
    // Giriş Səhifəsinin Məntiqi
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = loginForm.email.value;
        const password = loginForm.password.value;

        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Giriş uğurludur, dashboard səhifəsinə yönləndir
                window.location.href = 'dashboard.html';
            })
            .catch((error) => {
                // Xəta baş verərsə
                errorMessage.textContent = "E-poçt və ya şifrə yanlışdır.";
                console.error("Giriş xətası:", error);
            });
    });
} else if (path.includes("dashboard.html")) {
    // Dashboard Səhifəsinin Məntiqi
    const userEmailSpan = document.getElementById('userEmail');
    const logoutBtn = document.getElementById('logoutBtn');

    // İstifadəçinin giriş edib-etmədiyini yoxlayır
    auth.onAuthStateChanged(user => {
        if (user) {
            // İstifadəçi giriş edib, e-poçtunu göstər
            userEmailSpan.textContent = user.email;
        } else {
            // İstifadəçi giriş etməyib, onu giriş səhifəsinə qaytar
            window.location.href = 'index.html';
        }
    });

    // Çıxış düyməsi
    logoutBtn.addEventListener('click', () => {
        auth.signOut().then(() => {
            console.log('İstifadəçi çıxış etdi.');
            window.location.href = 'index.html';
        });
    });
}
