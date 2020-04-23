var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// CARREGAR TODAS AS IMAGENS E SONS
var midia = {
	cima: "imagens/c_nave.png",
	direita: "imagens/d_nave.png",
	baixo: "imagens/b_nave.png",
	esquerda: "imagens/e_nave.png",
	asteroide: "imagens/asteroide.png",
	meteoro: "imagens/meteoro.png",
};
for (i in midia) {
	load = new Image();
	load.src = midia[i];
	load.onload = console.log("Arquivo '" + midia[i] + "' carregado.");
}

// CRIAR OBJETOS
var nave = new objeto(50, 180, 64, 5, "nave");
var aster1 = new objeto(600, 260, 128, 5, "aster");
var aster2 = new objeto(750, 130, 128, 5, "aster");
var meteo1 = new objeto(400, 20, 64, 5, "meteo");
var meteo2 = new objeto(400, -44, 64, 5, "meteo");
var meteo3 = new objeto(700, -44, 64, 5, "meteo");

// GAMELOOP
requestAnimationFrame(gameloop);

function gameloop() {
	nave.desenhar();
	aster1.desenhar();
	aster2.desenhar();
	meteo1.desenhar();
	meteo2.desenhar();
	meteo3.desenhar();
}

// COMANDOS DO TECLADO


// FUNÇÃO DE COLISÃO


// FUNÇÃO DO PLACAR


// FUNÇÃO AUMENTAR DIFICULDADE


// FUNÇÃO OBJETOS
function objeto(x, y, wh, v, tipo) {
	this.x = x;
	this.y = y;
	this.w = wh;
	this.h = wh;
	this.v = v;
	this.tipo = tipo; // Tipos: nave, aster, meteo
	if (tipo == "nave") {
		this.img = new Image();
		this.img.src = midia.direita; //MUDAR
	} else if (tipo == "aster") {
		this.img = new Image();
		this.img.src = "imagens/asteroide.png";
	} else if (tipo == "meteo") {
		this.img = new Image();
		this.img.src = "imagens/meteoro.png";
	} else {
		console.log = "Erro! Objeto não existente.";
	}
	this.desenhar = function () {
		ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
	};
}