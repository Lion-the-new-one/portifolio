console.log('Script iniciado...');

// Animação de fade-in ao rolar a página
const fadeElements = document.querySelectorAll('.fade-in');

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