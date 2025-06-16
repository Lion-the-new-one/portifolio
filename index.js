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