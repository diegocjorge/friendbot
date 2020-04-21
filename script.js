window.onload = function () {
	var objCaixa = document.getElementById("nome");
	var objBotao = document.getElementById("botao");
	var objResult = document.getElementById("result");
	objBotao.onclick = function () {
        objResult.innerHTML = "Seu nome é: " + objCaixa.value;
	};
};
