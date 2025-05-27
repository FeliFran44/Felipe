// script.js
document.addEventListener('DOMContentLoaded', () => {

    // ===== PRELOADER =====
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => { // Un pequeño delay extra para asegurar que todo cargue
                preloader.classList.add('fade-out');
            }, 500);
             setTimeout(() => {
                preloader.style.display = 'none'; // Ocultar completamente después de la animación
            }, 1300); // Debe coincidir con la duración de la animación + delay
        });
    }

    // ===== HEADER SCROLL EFFECT & ACTIVE LINK =====
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function scrollHeader() {
        if (window.scrollY >= 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', scrollHeader);

    function highlightNavLink() {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - header.offsetHeight - 50; // Ajuste para el header
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href').substring(1) === currentSection) {
                link.classList.add('active-link');
            }
        });
    }
    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink(); // Initial call

    // ===== SMOOTH SCROLL FOR NAV LINKS =====
    navLinks.forEach(link => {
        if (link.getAttribute('href').startsWith('#')) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerOffset = header.offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
                 // Cerrar menú móvil si está abierto
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            });
        }
    });
    
    // ===== MOBILE MENU TOGGLE =====
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // ===== THEME TOGGLE (DARK/LIGHT MODE) =====
    const themeToggleBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', currentTheme);

    // Helper para actualizar los colores RGB para CSS (si los necesitas dinámicamente)
    function updateRootColorsRGB() {
        const styles = getComputedStyle(document.documentElement);
        const accentColor = styles.getPropertyValue('--accent-color').trim();
        // Similar para otros colores si es necesario
        // Ejemplo: document.documentElement.style.setProperty('--accent-color-rgb', hexToRgb(accentColor).join(', '));
    }
    // updateRootColorsRGB(); // Llama si es necesario

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            let newTheme = document.body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            document.body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            // updateRootColorsRGB(); // Actualiza si los usas
        });
    }
    
    // ===== AOS INITIALIZATION =====
    AOS.init({
        duration: 1000, // Duración de la animación
        once: true,     // Si la animación debe ocurrir solo una vez
        offset: 50,     // Offset (en px) desde el borde original del elemento
        delay: 100,     // Valores de 0 a 3000, con paso 50ms
    });

    // ===== PARTICLES.JS INITIALIZATION (Hero Background) =====
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": (document.body.getAttribute('data-theme') === 'dark' ? '#00aeff' : '#007bff') }, // Color dinámico
                "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" }, "polygon": { "nb_sides": 5 } },
                "opacity": { "value": 0.5, "random": false, "anim": { "enable": false, "speed": 1, "opacity_min": 0.1, "sync": false } },
                "size": { "value": 3, "random": true, "anim": { "enable": false, "speed": 40, "size_min": 0.1, "sync": false } },
                "line_linked": { "enable": true, "distance": 150, "color": (document.body.getAttribute('data-theme') === 'dark' ? '#00aeff' : '#007bff') , "opacity": 0.4, "width": 1 },
                "move": { "enable": true, "speed": 4, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 } }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
                "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 1 } }, "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 }, "repulse": { "distance": 200, "duration": 0.4 }, "push": { "particles_nb": 4 }, "remove": { "particles_nb": 2 } }
            },
            "retina_detect": true
        });
        // Actualizar color de partículas si cambia el tema
        if (themeToggleBtn) {
            themeToggleBtn.addEventListener('click', () => {
                const pJS = window.pJSDom[0].pJS;
                const newParticlesColor = document.body.getAttribute('data-theme') === 'dark' ? '#00aeff' : '#007bff';
                pJS.particles.color.value = newParticlesColor;
                pJS.particles.line_linked.color = newParticlesColor;
                pJS.fn.particlesRefresh();
            });
        }
    }

    // ===== VANILLA-TILT.JS INITIALIZATION (Project Cards) =====
    const tiltElements = document.querySelectorAll('.tilt-effect');
    if (tiltElements.length > 0 && typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(tiltElements, {
            max: 15,      // Max tilt rotation (degrees)
            speed: 400,   // Speed of the enter/exit transition
            glare: true,  // If it should have a "glare" effect
            "max-glare": 0.2 // Glare opacity (0 - 1)
        });
    } else if (tiltElements.length > 0) {
        console.warn("VanillaTilt.js no está cargado, pero hay elementos .tilt-effect.");
    }

    // ===== HERO TITLE LETTER ANIMATION (si no se hace solo con CSS) =====
    // El CSS ya maneja esto con :nth-child, pero aquí un ejemplo si fuera dinámico:
    // const heroTitle = document.querySelector('.hero-title');
    // if (heroTitle) {
    //     const text = heroTitle.textContent;
    //     heroTitle.innerHTML = '';
    //     text.split('').forEach((char, index) => {
    //         const span = document.createElement('span');
    //         span.className = 'char';
    //         span.textContent = char === ' ' ? '\u00A0' : char; // Non-breaking space
    //         span.style.animationDelay = `${0.05 * index}s`;
    //         heroTitle.appendChild(span);
    //     });
    // }

    // ===== BACK TO TOP BUTTON =====
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===== CURRENT YEAR IN FOOTER =====
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ===== CONTACT FORM LABEL ANIMATION (handled by CSS :focus/:valid) =====
    // No JS needed if using the CSS :focus and :valid trick for labels

    // ===== CUSTOM CURSOR =====
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');
    if (cursor && cursorDot) {
        document.addEventListener('mousemove', e => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
        });

        document.addEventListener('mousedown', () => {
            if (cursor) cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
            if (cursorDot) cursorDot.style.transform = 'translate(-50%, -50%) scale(1.2)';
        });
        document.addEventListener('mouseup', () => {
            if (cursor) cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            if (cursorDot) cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        });
         // Ocultar en móviles o tablets donde no hay :hover real
        if ('ontouchstart' in window) {
            cursor.style.display = 'none';
            cursorDot.style.display = 'none';
        }
    }
    
    // ===== CHATBOT TOGGLE =====
    const chatContainer = document.getElementById('chat-container');
    const toggleChatBtn = document.getElementById('toggle-chat-btn');
    // const chatWidget = document.getElementById('chat-widget'); // Ya no es necesario para solo el toggle

    if (chatContainer && toggleChatBtn) {
        toggleChatBtn.addEventListener('click', () => {
            chatContainer.classList.toggle('open');
        });
    }
    // Aquí iría la lógica de tu chatbot.js si la tuvieras
    // Por ejemplo, para enviar mensajes y recibir respuestas
    // const sendBtn = document.getElementById('send-btn');
    // const userInput = document.getElementById('user-input');
    // const chatBox = document.getElementById('chat-box');
    // if (sendBtn && userInput && chatBox) {
    //     sendBtn.addEventListener('click', () => { /* ... tu lógica de chat ... */ });
    //     userInput.addEventListener('keypress', (e) => { 
    //         if (e.key === 'Enter') { /* ... tu lógica de chat ... */ }
    //     });
    // }

    // ===== LIGHTBOX FOR GALLERY (en páginas de detalle de proyecto) =====
    const galleryImages = document.querySelectorAll('.galeria img');
    if (galleryImages.length > 0) {
        const lightbox = document.createElement('div');
        lightbox.classList.add('lightbox');
        document.body.appendChild(lightbox);

        const lightboxImg = document.createElement('img');
        lightbox.appendChild(lightboxImg);

        const lightboxClose = document.createElement('a');
        lightboxClose.classList.add('lightbox-close');
        lightboxClose.innerHTML = '×';
        lightbox.appendChild(lightboxClose);

        galleryImages.forEach(image => {
            image.addEventListener('click', e => {
                lightboxImg.src = image.src;
                lightbox.classList.add('show');
                document.body.style.overflow = 'hidden'; // Evitar scroll de fondo
            });
        });

        lightboxClose.addEventListener('click', e => {
            lightbox.classList.remove('show');
            document.body.style.overflow = 'auto';
        });

        lightbox.addEventListener('click', e => { // Cerrar al hacer clic fuera de la imagen
            if (e.target === lightbox) {
                lightbox.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Aplicar la clase al body para páginas de detalle si es necesario
    if (document.querySelector('.detalle-proyecto')) {
        document.body.classList.add('detalle-proyecto-page');
    }

}); // Fin de DOMContentLoaded