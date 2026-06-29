document.addEventListener('DOMContentLoaded', () => {
    const introAnimation = document.getElementById('intro-animation');
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (introAnimation) {
        if (!hasSeenIntro && !prefersReducedMotion) {
            document.body.classList.add('intro-lock');

            setTimeout(() => {
                introAnimation.classList.add('hidden');
                document.body.classList.remove('intro-lock');
                sessionStorage.setItem('hasSeenIntro', 'true');
            }, 2200);
        } else {
            introAnimation.style.display = 'none';
        }
    }

    const fadeElements = document.querySelectorAll('.fade-in, .timeline-item, .projeto-card');

    const checkFade = () => {
        fadeElements.forEach((element) => {
            const rect = element.getBoundingClientRect();

            if (rect.top < window.innerHeight * 0.85) {
                element.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', checkFade, { passive: true });
    window.addEventListener('load', checkFade);
    checkFade();

    document.querySelectorAll('.nav-links a, .nav-logo, .hero-actions a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (event) {
            const href = this.getAttribute('href');

            if (!href || !href.startsWith('#')) return;

            const targetElement = document.querySelector(href);

            if (targetElement) {
                event.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle?.querySelector('i');

    const initParticles = (theme) => {
        if (typeof particlesJS !== 'function') return;

        particlesJS('particles-js', {
            particles: {
                number: {
                    value: prefersReducedMotion ? 16 : 55,
                    density: { enable: true, value_area: 900 }
                },
                color: { value: theme === 'light' ? '#2563eb' : '#60a5fa' },
                shape: { type: 'circle' },
                opacity: {
                    value: 0.42,
                    random: true,
                    anim: { enable: !prefersReducedMotion, speed: 0.8, opacity_min: 0.12 }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: { enable: !prefersReducedMotion, speed: 1.5, size_min: 0.6 }
                },
                line_linked: {
                    enable: true,
                    distance: 140,
                    color: theme === 'light' ? '#2563eb' : '#60a5fa',
                    opacity: 0.14,
                    width: 1
                },
                move: {
                    enable: !prefersReducedMotion,
                    speed: 0.9,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out'
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: !prefersReducedMotion, mode: 'repulse' },
                    onclick: { enable: !prefersReducedMotion, mode: 'push' },
                    resize: true
                },
                modes: {
                    repulse: { distance: 110, duration: 0.4 },
                    push: { particles_nb: 4 }
                }
            },
            retina_detect: true
        });
    };

    const updateParticles = (theme) => {
        if (window.pJSDom && window.pJSDom.length > 0) {
            window.pJSDom[0].pJS.fn.vendors.destroypJS();
            window.pJSDom = [];
        }

        initParticles(theme);
    };

    const setTheme = (theme) => {
        const isLight = theme === 'light';

        document.body.classList.toggle('light-theme', isLight);
        document.body.classList.toggle('dark-theme', !isLight);

        if (themeIcon) {
            themeIcon.classList.toggle('fa-sun', isLight);
            themeIcon.classList.toggle('fa-moon', !isLight);
        }

        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        updateParticles(isLight ? 'light' : 'dark');
    };

    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    setTheme(savedTheme || systemTheme);

    themeToggle?.addEventListener('click', () => {
        const nextTheme = document.body.classList.contains('light-theme') ? 'dark' : 'light';
        setTheme(nextTheme);
    });

    const filtroButtons = document.querySelectorAll('.filtro-btn');
    const projetoCards = document.querySelectorAll('.projeto-card');

    const filterProjects = (filtro) => {
        projetoCards.forEach((card, index) => {
            const tecnologias = (card.getAttribute('data-tecnologia') || '').split(' ');
            const shouldShow = filtro === 'todos' || tecnologias.includes(filtro);

            card.style.transitionDelay = shouldShow ? `${index * 0.04}s` : '0s';

            if (shouldShow) {
                card.style.display = 'block';
                requestAnimationFrame(() => card.classList.add('visible'));
            } else {
                card.classList.remove('visible');
                setTimeout(() => {
                    card.style.display = 'none';
                }, 220);
            }
        });
    };

    filtroButtons.forEach((button) => {
        button.addEventListener('click', () => {
            filtroButtons.forEach((btn) => btn.classList.remove('active'));
            button.classList.add('active');
            filterProjects(button.getAttribute('data-filtro'));
        });
    });

    filterProjects('todos');

    const parallaxBg = document.querySelector('.parallax-bg');

    window.addEventListener('scroll', () => {
        if (!parallaxBg || prefersReducedMotion) return;

        parallaxBg.style.transform = `translateY(${window.scrollY * 0.16}px)`;
    }, { passive: true });

    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (!backToTopButton) return;

        backToTopButton.classList.toggle('visible', window.scrollY > 420);
    }, { passive: true });

    backToTopButton?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
