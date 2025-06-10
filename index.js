console.log('script iniciado...');

const inputNome = document.getElementById("inptNome");
const inputIdade = document.getElementById("inptSenha");
const btnSalvar = document.getElementById("btnSalvar");

btnSalvar.addEventListener('click', btnAction);

function btnAction(event) {
    event.preventDefault();
    alert('Botao clicado');
    console.log('teste');

    let nome = inputNome.value;
    let idade = inputIdade.value;

    console.log(nome);
    console.log(senha);
}