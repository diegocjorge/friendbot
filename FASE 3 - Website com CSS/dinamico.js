window.onload = function () {
    document.getElementById("relogio").innerHTML = dataHora();
};

// Boas Vindas
function bemVindo() {
    var bemVindo = document.getElementById("bemvindo");
    var seuNome = prompt("Digite seu nome");
    console.log(seuNome);
    bemVindo.innerHTML = "Bem Vindo(a), " + seuNome + "!";
}

// Data e Hora
function dataHora() {
    var data = new Date();
    var ano = data.getFullYear();
    var mes = data.getMonth();
    var dia = data.getDay();
    var hora = data.getHours();
    var min = data.getMinutes();
    mes = mes < 10 ? "0" + mes : mes;
    dia = dia < 10 ? "0" + dia : dia;
    min = min < 10 ? "0" + min : min;
    var data_e_hora = dia + "/" + mes + "/" + ano + " - " + hora + ":" + min;
    return data_e_hora;
}

// Formulário
function validar() {
    var nome = document.forms.formulario.nome.value;
    var email = document.forms.formulario.email.value;
    var sugestao = document.forms.formulario.sugestao.value;
    var erro = false;
    if (nome == "") {
        document.getElementById("erroNome").innerHTML = "Por favor, inserira o seu nome.";
        document.getElementById("nome").style.boxShadow = "0 0 5px 5px red";
        erro = true;
    }
    if (email == "") {
        document.getElementById("erroEmail").innerHTML = "Por favor, inserira o seu e-mail.";
        document.getElementById("email").style.boxShadow = "0 0 5px 5px red";
        erro = true;
    }
    if (sugestao == "") {
        document.getElementById("erroSugestao").innerHTML = "Sua sugestão está em branco.";
        document.getElementById("sugestao").style.boxShadow = "0 0 5px 5px red";
        erro = true;
    }
    if (erro == true) {
        return false;
    } else {
        return true;
    }
}

function limpaNome() {
    document.getElementById("erroNome").innerHTML = null;
    document.getElementById("nome").style.boxShadow = "none";
}

function limpaEmail() {
    document.getElementById("erroEmail").innerHTML = null;
    document.getElementById("email").style.boxShadow = "none";
}

function limpaSugestao() {
    document.getElementById("erroSugestao").innerHTML = null;
    document.getElementById("sugestao").style.boxShadow = "none";
}