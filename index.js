console.log('Script iniciado...');

const formContato = document.getElementById('formContato');
const inputNome = document.getElementById('inptNome');
const inputMensagem = document.getElementById('inptMensagem');
const formFeedback = document.getElementById('formFeedback');

formContato.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const nome = inputNome.value.trim();
    const mensagem = inputMensagem.value.trim();

    if (nome && mensagem) {
        formFeedback.textContent = `Obrigado, ${nome}! Sua mensagem foi enviada.`;
        formFeedback.classList.remove('feedback-hidden');
        formFeedback.classList.add('feedback-visible');
        
        console.log(`Nome: ${nome}, Mensagem: ${mensagem}`);
        formContato.reset();
        
        setTimeout(() => {
            formFeedback.classList.remove('feedback-visible');
            formFeedback.classList.add('feedback-hidden');
        }, 5000);
    } else {
        formFeedback.textContent = 'Por favor, preencha todos os campos.';
        formFeedback.classList.remove('feedback-hidden');
        formFeedback.classList.add('feedback-visible');
        
        setTimeout(() => {
            formFeedback.classList.remove('feedback-visible');
            formFeedback.classList.add('feedback-hidden');
        }, 3000);
    }
});

// Scroll animation for fade-in effect
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