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

// Função que desenha o placar com estilo digital LED
function drawScore() {
    const playerX = canvas.width / 4; // Posição X do placar do jogador
    const computerX = (canvas.width / 4) * 3; // Posição X do placar do computador
    const rectWidth = 220; // Largura do retângulo de fundo
    const rectHeight = 80; // Altura do retângulo de fundo
    const rectYOffset = 10; // Distância do retângulo a partir do topo
    const scoreYOffset = 55; // Distância do texto da pontuação dentro do retângulo

    // Fundo do placar do jogador
    ctx.fillStyle = 'black'; // Cor de fundo (preto)
    ctx.fillRect(playerX - rectWidth / 2, rectYOffset, rectWidth, rectHeight);

    // Fundo do placar do computador
    ctx.fillRect(computerX - rectWidth / 2, rectYOffset, rectWidth, rectHeight);

    // Estilo do texto (placa digital)
    ctx.fillStyle = '#FF0000'; // Cor vermelha brilhante (estilo LED)
    ctx.font = '50px "Digital-7 Mono", Arial, sans-serif';
    ctx.textAlign = 'center';

    // Nome do jogador
    ctx.fillText(playerScore.toString().padStart(2, '0'), playerX, rectYOffset + scoreYOffset);

    // Nome do computador
    ctx.fillText(computerScore.toString().padStart(2, '0'), computerX, rectYOffset + scoreYOffset);
}


    // Linhas brancas da quadra
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 4;

    // Linha central (divisão)
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();

    // Linhas de borda da quadra
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40); // Limite externo

    // Área das raquetes
    const paddleAreaWidth = 80; // Distância das áreas de saque
    ctx.strokeRect(20, 20, paddleAreaWidth, canvas.height - 40); // Área do jogador
    ctx.strokeRect(canvas.width - paddleAreaWidth - 20, 20, paddleAreaWidth, canvas.height - 40); // Área do computador


    function drawCanvas() {
        // Limpa o canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        // Fundo da quadra (grama)
        ctx.fillStyle = '#2e8b57'; // Verde semelhante à grama
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    
        // Linhas da quadra
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 4;
    
        // Linha central
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.stroke();
    
        // Bordas externas
        ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
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
