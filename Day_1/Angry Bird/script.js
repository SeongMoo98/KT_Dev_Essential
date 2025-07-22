// 게임 캔버스 설정
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 게임 상태
let gameState = {
    score: 0,
    birdsLeft: 5,
    gameOver: false,
    levelComplete: false
};

// 물리 상수
const GRAVITY = 0.5;
const FRICTION = 0.98;
const GROUND_Y = canvas.height - 50;

// 슬링샷 설정
const slingshot = {
    x: 150,
    y: GROUND_Y - 100,
    width: 20,
    height: 100
};

// 새 클래스
class Bird {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 15;
        this.vx = 0;
        this.vy = 0;
        this.isLaunched = false;
        this.isDragging = false;
        this.startX = x;
        this.startY = y;
        this.color = '#ff6b6b';
    }

    update() {
        if (this.isLaunched) {
            this.x += this.vx;
            this.y += this.vy;
            this.vy += GRAVITY;
            this.vx *= FRICTION;
        }
    }

    draw() {
        ctx.save();
        
        // 새 이미지 그리기
        const birdImage = new Image();
        birdImage.src = '../img/Bird.webp';
        
        // 새 이미지 크기 설정
        const birdSize = this.radius * 2;
        const birdX = this.x - this.radius;
        const birdY = this.y - this.radius;
        
        // 새 이미지 그리기
        ctx.drawImage(birdImage, birdX, birdY, birdSize, birdSize);
        
        ctx.restore();
    }

    reset() {
        this.x = this.startX;
        this.y = this.startY;
        this.vx = 0;
        this.vy = 0;
        this.isLaunched = false;
        this.isDragging = false;
    }
}

// 블록 클래스
class Block {
    constructor(x, y, width, height, type = 'wood') {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type;
        this.health = type === 'stone' ? 3 : 1;
        this.maxHealth = this.health;
        this.destroyed = false;
    }

    update() {
        if (this.health <= 0) {
            this.destroyed = true;
        }
    }

    draw() {
        if (this.destroyed) return;

        const healthPercent = this.health / this.maxHealth;
        
        if (this.type === 'wood') {
            ctx.fillStyle = `rgb(${139 + (1 - healthPercent) * 116}, ${69 + (1 - healthPercent) * 186}, ${19 + (1 - healthPercent) * 236})`;
        } else if (this.type === 'stone') {
            ctx.fillStyle = `rgb(${128 + (1 - healthPercent) * 127}, ${128 + (1 - healthPercent) * 127}, ${128 + (1 - healthPercent) * 127})`;
        }

        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // 블록 테두리
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    checkCollision(bird) {
        if (this.destroyed) return false;

        const dx = Math.abs(bird.x - (this.x + this.width / 2));
        const dy = Math.abs(bird.y - (this.y + this.height / 2));

        if (dx > (this.width / 2 + bird.radius)) return false;
        if (dy > (this.height / 2 + bird.radius)) return false;

        if (dx <= (this.width / 2)) return true;
        if (dy <= (this.height / 2)) return true;

        const cornerDistance = Math.pow(dx - this.width / 2, 2) + Math.pow(dy - this.height / 2, 2);
        return cornerDistance <= Math.pow(bird.radius, 2);
    }
}

// 돼지 클래스
class Pig {
    constructor(x, y, size = 'normal') {
        this.x = x;
        this.y = y;
        this.size = size;
        this.radius = size === 'large' ? 25 : 20;
        this.health = size === 'large' ? 2 : 1;
        this.destroyed = false;
        this.color = '#90EE90';
    }

    update() {
        if (this.health <= 0) {
            this.destroyed = true;
        }
    }

    draw() {
        if (this.destroyed) return;

        ctx.save();
        
        // 돼지 몸체
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // 돼지 눈
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x - 8, this.y - 8, 4, 0, Math.PI * 2);
        ctx.arc(this.x + 8, this.y - 8, 4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(this.x - 8, this.y - 8, 2, 0, Math.PI * 2);
        ctx.arc(this.x + 8, this.y - 8, 2, 0, Math.PI * 2);
        ctx.fill();
        
        // 코
        ctx.fillStyle = '#FF69B4';
        ctx.beginPath();
        ctx.arc(this.x, this.y + 2, 3, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }

    checkCollision(bird) {
        if (this.destroyed) return false;

        const dx = bird.x - this.x;
        const dy = bird.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        return distance < bird.radius + this.radius;
    }
}

// 게임 객체들
let birds = [];
let blocks = [];
let pigs = [];
let currentBird = null;
let isDragging = false;
let dragStart = { x: 0, y: 0 };

// 게임 초기화
function initGame() {
    // 새들 초기화 - 처음에는 1마리만 생성
    birds = [];
    birds.push(new Bird(slingshot.x, slingshot.y - 20));
    currentBird = birds[0];

    // 블록들 생성
    blocks = [
        // 첫 번째 구조물
        new Block(800, GROUND_Y - 120, 60, 20, 'wood'),
        new Block(800, GROUND_Y - 140, 60, 20, 'wood'),
        new Block(800, GROUND_Y - 160, 60, 20, 'wood'),
        new Block(800, GROUND_Y - 180, 60, 20, 'wood'),
        new Block(800, GROUND_Y - 200, 60, 20, 'wood'),
        
        // 두 번째 구조물
        new Block(950, GROUND_Y - 120, 60, 20, 'stone'),
        new Block(950, GROUND_Y - 140, 60, 20, 'stone'),
        new Block(950, GROUND_Y - 160, 60, 20, 'stone'),
        new Block(950, GROUND_Y - 180, 60, 20, 'wood'),
        new Block(950, GROUND_Y - 200, 60, 20, 'wood'),
        
        // 세 번째 구조물
        new Block(1100, GROUND_Y - 120, 60, 20, 'wood'),
        new Block(1100, GROUND_Y - 140, 60, 20, 'wood'),
        new Block(1100, GROUND_Y - 160, 60, 20, 'wood'),
    ];

    // 돼지들 생성
    pigs = [
        new Pig(800, GROUND_Y - 100, 'normal'),
        new Pig(950, GROUND_Y - 100, 'large'),
        new Pig(1100, GROUND_Y - 100, 'normal'),
    ];

    gameState.score = 0;
    gameState.gameOver = false;
    gameState.levelComplete = false;
    updateUI();
}

// UI 업데이트
function updateUI() {
    document.getElementById('score').textContent = gameState.score;
    document.getElementById('birds-left').textContent = gameState.birdsLeft;
}

// 충돌 감지 및 처리
function checkCollisions() {
    if (!currentBird || !currentBird.isLaunched) return;

    // 블록과의 충돌
    blocks.forEach(block => {
        if (block.checkCollision(currentBird)) {
            block.health--;
            gameState.score += 10;
            currentBird.vx *= -0.5;
            currentBird.vy *= -0.5;
        }
    });

    // 돼지와의 충돌
    pigs.forEach(pig => {
        if (pig.checkCollision(currentBird)) {
            pig.health--;
            gameState.score += 50;
            currentBird.vx *= -0.3;
            currentBird.vy *= -0.3;
        }
    });

    updateUI();
}

// 게임 상태 확인
function checkGameState() {
    // 게임이 끝났으면 더 이상 진행하지 않음
    if (gameState.gameOver || gameState.levelComplete) {
        return;
    }

    // 새가 화면 밖으로 나갔는지 확인
    if (currentBird && currentBird.isLaunched) {
        if (currentBird.x > canvas.width + 50 || currentBird.y > canvas.height + 50) {
            nextBird();
        }
    }

    // 모든 돼지가 파괴되었는지 확인
    const allPigsDestroyed = pigs.every(pig => pig.destroyed);
    if (allPigsDestroyed && !gameState.levelComplete) {
        gameState.levelComplete = true;
        gameState.score += 1000;
        updateUI();
        setTimeout(() => {
            alert('🎉 레벨 완료! 점수: ' + gameState.score);
        }, 500);
        return;
    }

    // 모든 새를 사용했는지 확인
    if (gameState.birdsLeft <= 0 && !gameState.gameOver) {
        gameState.gameOver = true;
        setTimeout(() => {
            alert('게임 오버! 최종 점수: ' + gameState.score);
        }, 500);
    }
}

// 다음 새로 전환
function nextBird() {
    if (gameState.birdsLeft > 0) {
        gameState.birdsLeft--;
        
        // 새로운 새 생성
        const newBird = new Bird(slingshot.x, slingshot.y - 20);
        birds.push(newBird);
        currentBird = newBird;
        
        updateUI();
    }
}

// 그리기 함수들
function drawSlingshot() {
    ctx.save();
    
    // 슬링샷 기둥
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(slingshot.x - slingshot.width/2, slingshot.y, slingshot.width, slingshot.height);
    
    // 고무줄
    if (currentBird && !currentBird.isLaunched) {
        ctx.strokeStyle = '#654321';
        ctx.lineWidth = 3;
        
        // 왼쪽 고무줄
        ctx.beginPath();
        ctx.moveTo(slingshot.x - 10, slingshot.y);
        ctx.lineTo(currentBird.x - 10, currentBird.y);
        ctx.stroke();
        
        // 오른쪽 고무줄
        ctx.beginPath();
        ctx.moveTo(slingshot.x + 10, slingshot.y);
        ctx.lineTo(currentBird.x + 10, currentBird.y);
        ctx.stroke();
        
        // 고무줄이 늘어날수록 색상 변화
        const stretch = Math.sqrt(
            Math.pow(currentBird.x - slingshot.x, 2) + 
            Math.pow(currentBird.y - slingshot.y, 2)
        );
        const maxStretch = 80;
        const stretchRatio = Math.min(stretch / maxStretch, 1);
        
        // 늘어날수록 빨간색으로 변화
        const red = Math.floor(101 + stretchRatio * 154); // 101(갈색) -> 255(빨강)
        const green = Math.floor(67 - stretchRatio * 67); // 67 -> 0
        const blue = Math.floor(33 - stretchRatio * 33);  // 33 -> 0
        
        ctx.strokeStyle = `rgb(${red}, ${green}, ${blue})`;
        ctx.lineWidth = 3 + stretchRatio * 2; // 늘어날수록 두꺼워짐
        
        // 왼쪽 고무줄 (색상 변화)
        ctx.beginPath();
        ctx.moveTo(slingshot.x - 10, slingshot.y);
        ctx.lineTo(currentBird.x - 10, currentBird.y);
        ctx.stroke();
        
        // 오른쪽 고무줄 (색상 변화)
        ctx.beginPath();
        ctx.moveTo(slingshot.x + 10, slingshot.y);
        ctx.lineTo(currentBird.x + 10, currentBird.y);
        ctx.stroke();
    }
    
    ctx.restore();
}

function drawGround() {
    ctx.fillStyle = '#8FBC8F';
    ctx.fillRect(0, GROUND_Y, canvas.width, canvas.height - GROUND_Y);
}

function drawBackground() {
    // 하늘 그라데이션
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(1, '#98FB98');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 구름들
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.beginPath();
    ctx.arc(200, 100, 30, 0, Math.PI * 2);
    ctx.arc(230, 100, 35, 0, Math.PI * 2);
    ctx.arc(260, 100, 30, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(800, 80, 25, 0, Math.PI * 2);
    ctx.arc(830, 80, 30, 0, Math.PI * 2);
    ctx.arc(860, 80, 25, 0, Math.PI * 2);
    ctx.fill();
}

// 메인 게임 루프
function gameLoop() {
    // 화면 클리어
    drawBackground();
    drawGround();
    drawSlingshot();

    // 게임 객체들 업데이트
    birds.forEach(bird => {
        bird.update();
        bird.draw();
    });

    blocks.forEach(block => {
        block.update();
        block.draw();
    });

    pigs.forEach(pig => {
        pig.update();
        pig.draw();
    });

    // 충돌 감지
    checkCollisions();
    
    // 게임 상태 확인
    checkGameState();

    // 다음 프레임 요청
    requestAnimationFrame(gameLoop);
}

// 마우스 이벤트 처리
canvas.addEventListener('mousedown', (e) => {
    // 게임이 끝났으면 상호작용 불가
    if (gameState.gameOver || gameState.levelComplete) {
        return;
    }

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (currentBird && !currentBird.isLaunched) {
        const dx = x - currentBird.x;
        const dy = y - currentBird.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < currentBird.radius) {
            isDragging = true;
            dragStart.x = x;
            dragStart.y = y;
        }
    }
});

canvas.addEventListener('mousemove', (e) => {
    // 게임이 끝났으면 상호작용 불가
    if (gameState.gameOver || gameState.levelComplete) {
        return;
    }

    if (isDragging && currentBird && !currentBird.isLaunched) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // 슬링샷 범위 내에서만 드래그 허용
        const maxDrag = 80;
        const dx = x - slingshot.x;
        const dy = y - slingshot.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > maxDrag) {
            const angle = Math.atan2(dy, dx);
            currentBird.x = slingshot.x + Math.cos(angle) * maxDrag;
            currentBird.y = slingshot.y + Math.sin(angle) * maxDrag;
        } else {
            currentBird.x = x;
            currentBird.y = y;
        }
    }
});

canvas.addEventListener('mouseup', (e) => {
    // 게임이 끝났으면 상호작용 불가
    if (gameState.gameOver || gameState.levelComplete) {
        return;
    }

    if (isDragging && currentBird && !currentBird.isLaunched) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // 발사 속도 계산 (속도를 많이 낮춤)
        const dx = slingshot.x - currentBird.x;
        const dy = slingshot.y - currentBird.y;
        const power = Math.sqrt(dx * dx + dy * dy) * 0.005; // 0.1에서 0.005으로 낮춤

        currentBird.vx = dx * power;
        currentBird.vy = dy * power;
        currentBird.isLaunched = true;

        isDragging = false;
    }
});

// 다시 시작 버튼
document.getElementById('restart-btn').addEventListener('click', () => {
    gameState.birdsLeft = 5;
    initGame();
});

// 게임 시작
initGame();
gameLoop(); 