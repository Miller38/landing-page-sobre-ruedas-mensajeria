/**
 * Sobre Ruedas Mensajería
 * JavaScript Principal
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ============================================
    // 1. TEMA (Claro / Oscuro)
    // ============================================
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    let currentTheme = localStorage.getItem('theme') || 'dark';

    // Aplicar tema guardado
    html.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    themeToggle.addEventListener('click', function() {
        const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Actualizar colores de partículas al cambiar tema
        updateParticlesColor(newTheme);
    });

    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-moon';
        } else {
            icon.className = 'fas fa-sun';
        }
    }

    // ============================================
    // 2. INICIALIZAR PARTÍCULAS (MÁS VISIBLES)
    // ============================================
    function initParticles() {
        const particlesContainer = document.getElementById('particles-js');
        if (!particlesContainer) {
            console.warn('⚠️ Contenedor de partículas no encontrado');
            return;
        }

        if (typeof particlesJS === 'undefined') {
            console.warn('⚠️ particlesJS no está cargado');
            return;
        }

        const currentTheme = html.getAttribute('data-theme') || 'dark';
        const particleColor = currentTheme === 'light' ? '#e74c3c' : '#fbbf24';

        const config = {
            particles: {
                number: {
                    value: 60, // Aumentado para mejor visibilidad
                    density: {
                        enable: true,
                        value_area: 700
                    }
                },
                color: {
                    value: particleColor
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.7, // Más visible
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.3,
                        sync: false
                    }
                },
                size: {
                    value: 4, // Más grandes
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1.5,
                        size_min: 2,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: particleColor,
                    opacity: 0.3, // Líneas más visibles
                    width: 1.5
                },
                move: {
                    enable: true,
                    speed: 1.8,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: true,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 180,
                        line_linked: {
                            opacity: 0.6 // Más visible al hover
                        }
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        };

        particlesJS('particles-js', config);
        
        setTimeout(optimizeParticlesForMobile, 1000);
        
        console.log('✨ Partículas visibles inicializadas');
    }

    // ============================================
    // 3. ACTUALIZAR COLOR DE PARTÍCULAS
    // ============================================
    function updateParticlesColor(theme) {
        const newColor = theme === 'light' ? '#e74c3c' : '#fbbf24';
        
        if (typeof pJSDom !== 'undefined' && pJSDom.length > 0) {
            const pJS = pJSDom[0].pJS;
            if (pJS) {
                pJS.particles.color.value = newColor;
                pJS.particles.line_linked.color = newColor;
                pJS.fn.particlesRefresh();
                console.log('🎨 Color de partículas actualizado');
            }
        }
    }

    // ============================================
    // 4. OPTIMIZACIÓN DE PARTÍCULAS PARA MÓVIL
    // ============================================
    function optimizeParticlesForMobile() {
        const isMobile = window.innerWidth < 768;
        const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
        
        if (typeof pJSDom !== 'undefined' && pJSDom.length > 0) {
            const pJS = pJSDom[0].pJS;
            if (pJS) {
                if (isMobile) {
                    pJS.particles.number.value = 60;
                    pJS.particles.move.speed = 1.8;
                    pJS.particles.size.value = 4;
                    pJS.particles.line_linked.distance = 150;
                    pJS.particles.line_linked.opacity = 0.8;
                } else if (isTablet) {
                    pJS.particles.number.value = 50;
                    pJS.particles.move.speed = 1.5;
                    pJS.particles.size.value = 3.5;
                    pJS.particles.line_linked.distance = 130;
                    pJS.particles.line_linked.opacity = 0.5;
                } else {
                    pJS.particles.number.value = 60;
                    pJS.particles.move.speed = 1.8;
                    pJS.particles.size.value = 4;
                    pJS.particles.line_linked.distance = 150;
                    pJS.particles.line_linked.opacity = 0.8;
                }
                pJS.fn.particlesRefresh();
            }
        }
    }

    // ============================================
    // 5. NAVBAR - Scroll efecto
    // ============================================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // ============================================
    // 6. MENÚ HAMBURGUESA (Mobile)
    // ============================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        const isOpen = navMenu.classList.contains('active');
        this.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ============================================
// ANIMACIÓN DE CONTADORES (Stats) CON PREFIJO
// ============================================
const statNumbers = document.querySelectorAll('.stat-number[data-target]');

const animateCounter = (element) => {
    // Obtener el texto original completo
    const originalText = element.textContent;
    // Extraer el prefijo (todo lo que no sea número)
    const prefixMatch = originalText.match(/^([^0-9]*)/);
    const prefix = prefixMatch ? prefixMatch[1] : '';
    // Extraer el sufijo (todo lo que no sea número al final)
    const suffixMatch = originalText.match(/[^0-9]*$/);
    const suffix = suffixMatch ? suffixMatch[0] : '';
    // Obtener el número objetivo
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);

        // Mostrar con prefijo y sufijo
        element.textContent = prefix + current + suffix;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = prefix + target + suffix;
        }
    };

    requestAnimationFrame(updateCounter);
};

// Intersection Observer para los contadores
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            if (!target.dataset.animated) {
                target.dataset.animated = 'true';
                animateCounter(target);
            }
        }
    });
}, observerOptions);

statNumbers.forEach(stat => {
    counterObserver.observe(stat);
});
    // ============================================
    // 8. FAQ ACORDEÓN
    // ============================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            faqItems.forEach(i => i.classList.remove('active'));
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
    }

    // ============================================
    // 9. FORMULARIO DE CONTACTO
    // ============================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            if (!data.name || !data.email || !data.phone || !data.service) {
                alert('Por favor, completa todos los campos requeridos.');
                return;
            }

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert('¡Mensaje enviado con éxito! Te contactaremos pronto.');
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // ============================================
    // 10. SCROLL SUAVE PARA ENLACES ANCLA
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // 11. AOS (Animate On Scroll)
    // ============================================
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
            easing: 'ease-out-cubic'
        });
    }

    // ============================================
    // 12. EFECTO DE PARALLAX EN HERO
    // ============================================
    const hero = document.querySelector('.hero');
    const heroBg = document.querySelector('.hero-bg');

    if (hero && heroBg) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroHeight = hero.offsetHeight;

            if (scrolled < heroHeight) {
                const speed = 0.5;
                heroBg.style.transform = `translateY(${scrolled * speed}px)`;
            }
        });
    }

    // ============================================
    // 13. EFECTO RIPPLE EN BOTONES
    // ============================================
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                pointer-events: none;
                transform: scale(0);
                animation: rippleAnim 0.6s ease-out;
            `;

            if (getComputedStyle(this).position === 'static') {
                this.style.position = 'relative';
            }
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    if (!document.getElementById('ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes rippleAnim {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // ============================================
    // 14. INICIALIZAR PARTÍCULAS
    // ============================================
    setTimeout(initParticles, 300);

    // ============================================
    // 15. OPTIMIZAR EN REDIMENSIONAMIENTO
    // ============================================
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(optimizeParticlesForMobile, 300);
    });

    console.log('🚀 Sobre Ruedas Mensajería - Landing Page cargada correctamente');
    console.log('📱 ¡Tu diligencia, nuestro compromiso!');
});