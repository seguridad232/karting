// Navegación suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar transparente en scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 21, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 21, 0.95)';
    }
});

// Mobile menu toggle
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Sistema de temporizadores para sorteos
function updateCountdown(element) {
    const endDate = new Date(element.dataset.end).getTime();

    function update() {
        const now = new Date().getTime();
        const distance = endDate - now;

        if (distance < 0) {
            element.innerHTML = '<div class="timer-label">¡Sorteo finalizado!</div>';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const daysEl = element.querySelector('[data-days]');
        const hoursEl = element.querySelector('[data-hours]');
        const minutesEl = element.querySelector('[data-minutes]');
        const secondsEl = element.querySelector('[data-seconds]');

        if (daysEl) daysEl.textContent = days;
        if (hoursEl) hoursEl.textContent = hours;
        if (minutesEl) minutesEl.textContent = minutes;
        if (secondsEl) secondsEl.textContent = seconds;
    }

    update();
    setInterval(update, 1000);
}

// Inicializar todos los temporizadores
document.querySelectorAll('.sorteo-timer').forEach(timer => {
    updateCountdown(timer);
});

// Toast notification
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add('active');

    setTimeout(() => {
        toast.classList.remove('active');
    }, 3000);
}

// Función para descargar APK
function downloadAPK() {
    // Crear link de descarga
    const link = document.createElement('a');
    link.href = 'Karts.apk';
    link.download = 'Karts.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Mostrar mensaje
    showToast('📱 Descargando Karts.apk...');

    // Marcar como descargado
    localStorage.setItem('kartingGamePlayed', 'true');
}

// TODOS los botones descargan APK directamente
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        downloadAPK();
    });
});

// Galería también descarga APK
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        downloadAPK();
    });
});

// Animaciones en scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animarlos
document.querySelectorAll('.kart-card, .package-card, .sorteo-card, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

console.log('🏎️ KartingGYE - Descarga directa APK activada');
