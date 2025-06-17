console.log('Script iniciado...');

// Animação de introdução
const introAnimation = document.getElementById('intro-animation');
const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');

if (!hasSeenIntro) {
    document.body.style.overflow = 'hidden'; // Evita rolagem durante a animação
    setTimeout(() => {
        introAnimation.classList.add('hidden');
        document.body.style.overflow = ''; // Restaura rolagem
        sessionStorage.setItem('hasSeenIntro', 'true');
    }, 2500); // 2s animação + 0.5s transição
} else {
    introAnimation.style.display = 'none';
}

// Animação de fade-in ao rolar a página
const fadeElements = document.querySelectorAll('.fade-in, .timeline-item');

const checkFade = () => {
    fadeElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
            element.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', checkFade);
window.addEventListener('load', checkFade);

// Rolagem suave para links da navegação
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        targetElement.scrollIntoView({ behavior: 'smooth' });
    });
});

// Alternância de tema claro/escuro
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

const setTheme = (theme) => {
    if (theme === 'light') {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'light');
        updateParticles('light');
    } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'dark');
        updateParticles('dark');
    }
};

// Configuração das partículas
const initParticles = (theme) => {
    particlesJS('particles-js', {
        particles: {
            number: { value: 50, density: { enable: true, value_area: 800 } },
            color: { value: theme === 'light' ? '#2563EB' : '#3B82F6' },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1 } },
            size: { value: 3, random: true, anim: { enable: true, speed: 2, size_min: 0.5 } },
            line_linked: { enable: false },
            move: { enable: true, speed: 1, direction: 'none', random: true, straight: false, out_mode: 'out' }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: true, mode: 'repulse' },
                onclick: { enable: true, mode: 'push' },
                resize: true
            },
            modes: {
                repulse: { distance: 100, duration: 0.4 },
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

// Carregar tema salvo ou preferência do sistema
const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.classList.contains('light-theme') ? 'dark' : 'light';
    setTheme(currentTheme);
});

// Filtro de projetos
const filtroButtons = document.querySelectorAll('.filtro-btn');
const projetoCards = document.querySelectorAll('.projeto-card');

const filterProjects = (filtro) => {
    projetoCards.forEach((card, index) => {
        const tecnologia = card.getAttribute('data-tecnologia');
        card.style.transitionDelay = `${index * 0.1}s`;
        if (filtro === 'todos' || tecnologia === filtro) {
            card.style.display = 'block';
            setTimeout(() => card.classList.add('visible'), 10);
        } else {
            card.classList.remove('visible');
            setTimeout(() => card.style.display = 'none', 500);
        }
    });
};

filtroButtons.forEach(button => {
    button.addEventListener('click', () => {
        filtroButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const filtro = button.getAttribute('data-filtro');
        filterProjects(filtro);
    });
});

// Efeito parallax no cabeçalho
const parallaxBg = document.querySelector('.parallax-bg');
window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    parallaxBg.style.transform = `translateY(${scrollPosition * 0.3}px)`;
});

// Botão voltar ao topo
const backToTopButton = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Inicializar visibilidade dos projetos
filterProjects('todos');