var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// CARREGAR TODAS AS IMAGENS E SONS
var midia = {
	esquerda: "imagens/e_nave.png",
	cima: "imagens/c_nave.png",
	direita: "imagens/d_nave.png",
	baixo: "imagens/b_nave.png",
	asteroide: "imagens/asteroide.png",
	meteoro: "imagens/meteoro.png",
};
for (var i in midia) {
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

// GAME START
requestAnimationFrame(gameloop);

// MOVIMENTAÇÃO NAVE
window.onkeydown = function comando(tecla) {
	if (tecla.keyCode == 37) {
		nave.img.src = midia.esquerda;
		nave.x -= nave.vel;
		if (nave.x < 0) {
			nave.x = 0;
		}
	} else if (tecla.keyCode == 38) {
		nave.img.src = midia.cima;
		nave.y -= nave.vel;
		if (nave.y < 0) {
			nave.y = 0;
		}
	} else if (tecla.keyCode == 39) {
		nave.img.src = midia.direita;
		nave.x += nave.vel;
		if (nave.x > 800 - nave.w) {
			nave.x = 800 - nave.w;
		}
	} else if (tecla.keyCode == 40) {
		nave.img.src = midia.baixo;
		nave.y += nave.vel;
		if (nave.y > 400 - nave.w) {
			nave.y = 400 - nave.w;
		}
	}
};

// FUNÇÃO DE COLISÃO

// FUNÇÃO DO PLACAR

// FUNÇÃO AUMENTAR DIFICULDADE

// GAMELOOP

function gameloop() {
	aster1.mover();
	nave.desenhar();
	aster1.desenhar();
	aster2.desenhar();
	meteo1.desenhar();
	meteo2.desenhar();
	meteo3.desenhar();
	requestAnimationFrame(gameloop);
}

// FUNÇÃO OBJETOS
function objeto(x, y, tamanho, velocidade, tipo) {
	this.x = x;
	this.y = y;
	this.w = tamanho;
	this.h = tamanho;
	this.vel = velocidade;
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
	this.mover = function() {
		if (tipo == "aster") {

		}
	}
}
