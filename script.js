/**
 * Café Lemon - Huvud JavaScript-fil
 * Innehåller alla interaktiva funktioner för webbplatsen
 */

// Smooth scrolling för interna länkar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Uppdatera URL utan att ladda om sidan
            if (history.pushState) {
                history.pushState(null, null, targetId);
            } else {
                location.hash = targetId;
            }
        }
    });
});

// Aktiverar aktiv navbar-länk vid scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPosition = window.scrollY + 200;
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id') || '';
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        if (current && (linkHref === `#${current}` || linkHref.includes(current))) {
            link.classList.add('active');
        }
    });
});

// Dark mode-toggle
function initDarkMode() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    
    if (!darkModeToggle) return;

    // Kontrollera användarens preferenser
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedMode = localStorage.getItem('darkMode');
    
    // Applicera tema vid sidladdning
    if (savedMode === 'true' || (savedMode === null && prefersDarkMode)) {
        document.body.classList.add('dark-mode');
        darkModeToggle.textContent = 'Light Mode';
    }
    
    // Hantera klick
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        darkModeToggle.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
    });
}

// Ladda alla funktioner när DOM är redo
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    
    // Kontrollera hash vid laddning (för interna länkar)
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
            setTimeout(() => {
                target.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }
});