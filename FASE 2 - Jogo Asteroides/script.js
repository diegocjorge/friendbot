var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var gameover = false;
var placar = 0;
var tempo = 0;
var penalidade = 0;
var tempo_penalidade = 2 * 50;
var dificuldade = 1;

// CARREGAR TODAS AS IMAGENS
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
var aster1 = new objeto(600, 260, 128, 1, "aster");
var aster2 = new objeto(800, 130, 128, 0, "aster");
var meteo1 = new objeto(400, 20, 64, 1, "meteo");
var meteo2 = new objeto(400, -64, 64, 0, "meteo");
var meteo3 = new objeto(700, -64, 64, 0, "meteo");
console.log("Game Start");

// GAME START
requestAnimationFrame(gameloop);

// MOVIMENTAÇÃO NAVE
window.onkeydown = function comando(tecla) {
	switch (tecla.keyCode) {
		case 37:
			nave.img.src = midia.esquerda;
			nave.x -= nave.vel;
			if (nave.x < 0) {
				nave.x = 0;
			} else {
				penalidade = 0;
			}
			break;
		case 38:
			nave.img.src = midia.cima;
			nave.y -= nave.vel;
			if (nave.y < 0) {
				nave.y = 0;
			} else {
				penalidade = 0;
			}
			break;
		case 39:
			nave.img.src = midia.direita;
			nave.x += nave.vel;
			if (nave.x > 800 - nave.tam) {
				nave.x = 800 - nave.tam;
			} else {
				penalidade = 0;
			}
			break;
		case 40:
			nave.img.src = midia.baixo;
			nave.y += nave.vel;
			if (nave.y > 400 - nave.tam) {
				nave.y = 400 - nave.tam;
			} else {
				penalidade = 0;
			}
			break;
		case 10:
		case 13:
			gameover = true;
			console.log("Jogo interrompido");
			break;
	}
};

// GAMELOOP
function gameloop() {
	calculos();
	mover_obstaculos();
	ctx.clearRect(0, 0, 800, 400);
	desenhar_objetos();
	checar_colisoes();
	mostrar_placar();
	if (gameover == true) {
		clearTimeout();
		ctx.font = "150px Arial";
		ctx.textBaseline = "middle";
		ctx.fillStyle = "Red";
		ctx.fillText("Game Over", 10, 200);
		console.log("Game Over");
	} else {
		tempo++;
		penalidade++;
		requestAnimationFrame(gameloop);
	}
}

// FUNÇÃO OBJETOS
function objeto(x, y, tamanho, velocidade, tipo) {
	this.x = x;
	this.y = y;
	this.tam = tamanho;
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
		ctx.drawImage(this.img, this.x, this.y, this.tam, this.tam);
	};
	this.mover = function () {
		if (tipo == "aster") {
			this.x -= this.vel;
			if (this.x < 0 - this.tam) {
				this.x = 800;
				this.y = Math.random() * (400 + this.tam * 2 - this.tam);
			}
		} else if (tipo == "meteo") {
			this.x -= this.vel;
			this.y += this.vel;
			if (this.x < 0 - this.tam || this.y > 400) {
				this.x = Math.random() * (800 + this.tam * 5);
				this.y = 0 - this.tam;
			}
		}
	};
	// Função fornecida nos materiais de estudo
	this.colisao = function () {
		if (nave.x + nave.tam > this.x && nave.x < this.x + this.tam && nave.y + nave.tam > this.y && nave.y < this.y + this.tam) {
			gameover = true;
		}
	};
}

// PLACAR, PENALIDADES E AUMENTO DA DIFICULDADE
function mostrar_placar() {
	ctx.font = "20px Arial";
	ctx.textBaseline = "top";
	ctx.fillStyle = "Red";
	ctx.fillText("Pontos: " + placar, 5, 370);
}
function calculos() {
	if (penalidade >= tempo_penalidade) {
		placar -= 10;
		penalidade = 0;
		if (placar < 0) {
			placar = 0;
		}
	}
	// Realizado a cada segundo
	if (tempo >= 50) {
		tempo = 0;
		dificuldade++;
		placar += Math.ceil(dificuldade / 10);
		if (dificuldade % 15 == 0) {
			nave.vel++;
			console.log("Velocidade: " + nave.vel);
		}
		if (dificuldade % 10 == 0) {
			switch (probabilidade()) {
				case 1:
					if (aster1.vel >= 5) {
						break;
					}
					aster1.vel++;
					console.log("Asteroide 1: " + aster1.vel);
					break;
				case 2:
					if (aster2.vel >= 4) {
						break;
					}
					aster2.vel++;
					console.log("Asteroide 2: " + aster2.vel);
					break;
				case 3:
					if (meteo1.vel >= 5) {
						break;
					}
					meteo1.vel++;
					console.log("Meteoro 1: " + meteo1.vel);
					break;
				case 4:
					if (meteo2.vel >= 4) {
						break;
					}
					meteo2.vel++;
					console.log("Meteoro 2: " + meteo2.vel);
					break;
				case 5:
					if (meteo3.vel >= 3) {
						break;
					}
					meteo3.vel++;
					console.log("Meteoro 3: " + meteo3.vel);
					break;
			}
		}
	}
}

// FUNÇÃO DA PROBABILIDADE
function probabilidade() {
	var p = Math.random() * 25;
	if (p < 5) {
		return 1;
	} else if (p < 10) {
		return 2;
	} else if (p < 16) {
		return 3;
	} else if (p < 21) {
		return 4;
	} else {
		return 5;
	}
}

// AGRUPAMENTOS
function desenhar_objetos() {
	nave.desenhar();
	aster1.desenhar();
	aster2.desenhar();
	meteo1.desenhar();
	meteo2.desenhar();
	meteo3.desenhar();
}

function mover_obstaculos() {
	aster1.mover();
	aster2.mover();
	meteo1.mover();
	meteo2.mover();
	meteo3.mover();
}

function checar_colisoes() {
	aster1.colisao();
	aster2.colisao();
	meteo1.colisao();
	meteo2.colisao();
	meteo3.colisao();
}
