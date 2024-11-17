let playerScore = 0;
let computerScore = 0;
let isSoundOn = true; // Variável para rastrear se o som está ligado

const pingSound = new Audio('/sounds/338939-Ping_pong_or_table_tennis_-ball_bouncing_on_table_1.wav');

document.getElementById('toggleSound').addEventListener('click', () => {
    isSoundOn = !isSoundOn; // Alterna o estado do som
    const button = document.getElementById('toggleSound');
    button.textContent = isSoundOn ? 'Desligar Som' : 'Ligar Som'; // Atualiza o texto do botão
});

function playSound() {
    if (isSoundOn) {
        pingSound.play();
    }
}

// Seleciona o canvas e define o contexto 2D
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');


// Configurações do jogo
canvas.width = 800;
canvas.height = 400;

// Configurações das raquetes e bola
const paddleWidth = 10;
const paddleHeight = 100;
const ballSize = 10;

const player = { x: 20, y: canvas.height / 2 - paddleHeight / 2, speed: 6 };
const computer = { x: canvas.width - 30, y: canvas.height / 2 - paddleHeight / 2, speed: 4 };
const ball = { x: canvas.width / 2, y: canvas.height / 2, dx: 4, dy: 4 };

// Função para desenhar o canvas
function drawCanvas() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Função para desenhar uma raquete
function drawPaddle(x, y) {
    ctx.fillStyle = 'white';
    ctx.fillRect(x, y, paddleWidth, paddleHeight);
}

// Função para desenhar a bola
function drawBall() {
    ctx.fillStyle = 'white';
    ctx.fillRect(ball.x, ball.y, ballSize, ballSize);
}

// Desenha os limitadores no topo e na parte inferior
function drawLimiters() {
    const limiterHeight = 10;
    ctx.fillStyle = 'gray';
    
    // Limite superior
    ctx.fillRect(0, 0, canvas.width, limiterHeight);
    
    // Limite inferior
    ctx.fillRect(0, canvas.height - limiterHeight, canvas.width, limiterHeight);
}

//Função que desenha o placar 
function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    
    // Desenha o placar do jogador
    ctx.fillText(`Player: ${playerScore}`, canvas.width / 4, 30);
    
    // Desenha o placar do computador
    ctx.fillText(`Computer: ${computerScore}`, (canvas.width / 4) * 3, 30);
}



// Atualiza a posição da bola
// Atualiza a posição da bola
function updateBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    const limiterHeight = 10; // Altura dos limitadores

    // Colisão com os limitadores superior e inferior
    if (ball.y <= limiterHeight || ball.y + ballSize >= canvas.height - limiterHeight) {
        ball.dy *= -1;
        playSound();
    }

    // Colisão com a raquete do jogador
    if (
        ball.x <= player.x + paddleWidth &&
        ball.y + ballSize >= player.y &&
        ball.y <= player.y + paddleHeight
    ) {
        ball.dx *= -1;
        playSound();

        // Aumenta gradativamente a velocidade da bola
        ball.dx *= 1.1; // Aumenta 10% da velocidade horizontal
        ball.dy *= 1.1; // Aumenta 10% da velocidade vertical

        // Inteligência simples para o computador
        computer.y = Math.random() * (canvas.height - paddleHeight);
    }

    // Colisão com a raquete do computador
    if (
        ball.x + ballSize >= computer.x &&
        ball.y + ballSize >= computer.y &&
        ball.y <= computer.y + paddleHeight
    ) {
        ball.dx *= -1;
        playSound();

        // Aumenta gradativamente a velocidade da bola
        ball.dx *= 1.1; // Aumenta 10% da velocidade horizontal
        ball.dy *= 1.1; // Aumenta 10% da velocidade vertical
    }

    // Gol do computador
    if (ball.x <= 0) {
        resetBall();
    }

    // Gol do jogador
    if (ball.x + ballSize >= canvas.width) {
        resetBall();
    }
}



    // Gol do computador
    if (ball.x <= 0) {
        resetBall();
    }

    // Gol do jogador
    if (ball.x + ballSize >= canvas.width) {
        resetBall();
    }



// Reseta a posição da bola
function resetBall() {
    // Atualiza o placar dependendo de quem marcou o gol
    if (ball.x <= 0) {
        computerScore++;
    } else if (ball.x + ballSize >= canvas.width) {
        playerScore++;
    }

    // Reseta a bola para o centro com movimento aleatório
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = (Math.random() > 0.5 ? 1 : -1) * 4; // Velocidade inicial padrão
    ball.dy = (Math.random() > 0.5 ? 1 : -1) * 4; // Velocidade inicial padrão
}




// Controla o jogador com o mouse
canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect(); // Obtem o tamanho e posição do canvas
    const mouseY = event.clientY - rect.top; // Calcula a posição relativa do mouse dentro do canvas

    // Atualiza a posição da raquete do jogador
    player.y = mouseY - paddleHeight / 2;

    // Garante que a raquete não ultrapasse as bordas
    if (player.y < 0) player.y = 0;
    if (player.y + paddleHeight > canvas.height) player.y = canvas.height - paddleHeight;
});

// Controla o jogador com as setas
function movePlayer(event) {
    if (event.key === 'ArrowUp' && player.y > 0) {
        player.y -= player.speed;
    } else if (event.key === 'ArrowDown' && player.y + paddleHeight < canvas.height) {
        player.y += player.speed;
    }
}

// Atualiza o movimento do computador
function updateComputer() {
    if (computer.y < ball.y - paddleHeight / 2) {
        computer.y += computer.speed;
    } else if (computer.y > ball.y - paddleHeight / 2) {
        computer.y -= computer.speed;
    }
}

// Função principal de atualização
    function update() {
        drawCanvas();
        drawLimiters(); // Desenha os limitadores
        drawScore(); // Mostra o placar
        drawPaddle(player.x, player.y);
        drawPaddle(computer.x, computer.y);
        drawBall();
        updateBall();
        updateComputer();
        requestAnimationFrame(update);
    }
    

// Adiciona o controle do teclado
document.addEventListener('keydown', movePlayer);

// Inicia o jogo
update();
