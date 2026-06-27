const ball = document.querySelector('.ball');
const comboDisplay = document.getElementById('combo-display');

// [콘솔 명령어 연동용 객체]
window.gameSettings = {
  bounceVelocity: 1.0,  
  gravity: 0,           
  airFriction: 0,       
};

// 공의 초기 위치 (화면 정중앙)
let posX = window.innerWidth / 2 - 25;
let posY = window.innerHeight / 2 - 25;

// 스타트 전에는 속도 0 (멈춤 상태)
let speedX = 0;
let speedY = 0;
const ballSize = 50;
const ballRadius = ballSize / 2;

// 게임 시작 상태 체크 변수
let isGameStarted = false;

// 콤보 시스템 변수들
let comboCount = 0;
let lastWallHitTime = 0;
const comboWindow = 500; 

const comboTexts = [
  "", "alright. x1", "nice! x2", "woah! x3", "great! x4", 
  "exelent! x5", "spectacular! x6", "extreme! x7", "Godly! x8", 
  "PERFECTION! x9", "ABSOLUTE! x10"
];

// 초기 위치 적용
ball.style.left = posX + 'px';
ball.style.top = posY + 'px';

// [시작 기능] 클릭하면 공이 움직이기 시작합니다!
window.addEventListener('click', () => {
  if (!isGameStarted) {
    isGameStarted = true;
    speedX = 5;  // 첫 발사 X 속도
    speedY = -5; // 첫 발사 Y 속도
    console.log("게임 시작! 공이 발사되었습니다.");
  }
});

// 마우스 커서 위치 실시간 추적 (공과의 충돌 감지용)
let mouseX = 0;
let mouseY = 0;
window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// '4' 키 누르고 스크롤 속도 제어
let isFourPressed = false;
window.addEventListener('keydown', (e) => { if (e.key === '4') isFourPressed = true; });
window.addEventListener('keyup', (e) => { if (e.key === '4') isFourPressed = false; });

window.addEventListener('wheel', (e) => {
  if (isFourPressed && isGameStarted) {
    const factor = e.deltaY > 0 ? 0.9 : 1.1;
    speedX *= factor;
    speedY *= factor;
  }
});

// 콤보 함수
function triggerCombo() {
  const currentTime = Date.now();
  if (currentTime - lastWallHitTime <= comboWindow) {
    comboCount++;
  } else {
    comboCount = 1;
  }
  lastWallHitTime = currentTime;

  let text = comboCount <= 10 ? comboTexts[comboCount] : `idk what to put so this is the end. x${comboCount}`;

  comboDisplay.innerText = text;
  comboDisplay.classList.remove('combo-active');
  void comboDisplay.offsetWidth; 
  comboDisplay.classList.add('combo-active');

  let boost = comboCount === 1 ? 1.5 : Math.random() * (2.0 - 1.1) + 1.1;
  speedX *= boost;
  speedY *= boost;
}

// 메인 루프
function updateGame() {
  if (isGameStarted) {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    speedY += window.gameSettings.gravity;
    speedX *= (1 - window.gameSettings.airFriction);
    speedY *= (1 - window.gameSettings.airFriction);

    posX += speedX;
    posY += speedY;

    let hitWall = false;

    // 벽 충돌 (X축)
    if (posX + ballSize >= screenWidth) { posX = screenWidth - ballSize; speedX = -speedX; hitWall = true; }
    else if (posX <= 0) { posX = 0; speedX = -speedX; hitWall = true; }

    // 벽 충돌 (Y축)
    if (posY + ballSize >= screenHeight) { posY = screenHeight - ballSize; speedY = -speedY; hitWall = true; }
    else if (posY <= 0) { posY = 0; speedY = -speedY; hitWall = true; }

    if (hitWall) triggerCombo();

    // 마우스 커서(점)와 공(원)의 충돌 검사
    const ballCenterX = posX + ballRadius;
    const ballCenterY = posY + ballRadius;
    
    // 마우스 커서와 공 중심 사이의 거리 계산 (피타고라스 정리)
    const diffX = ballCenterX - mouseX;
    const diffY = ballCenterY - mouseY;
    const distance = Math.sqrt(diffX * diffX + diffY * diffY);

    // 거리가 공의 반지름보다 작으면 마우스가 공을 친 것임!
    if (distance < ballRadius) {
      // 마우스가 들어온 방향의 반대로 공을 밀어내며 튕김 처리
      const angle = Math.atan2(diffY, diffX);
      const currentSpeed = Math.sqrt(speedX * speedX + speedY * speedY);
      
      // 최소 튕김 속도 보장
      const finalSpeed = Math.max(currentSpeed, 6) * window.gameSettings.bounceVelocity;
      
      speedX = Math.cos(angle) * finalSpeed;
      speedY = Math.sin(angle) * finalSpeed;

      // 공이 마우스에 달라붙지 않게 약간 떨어트림
      posX = mouseX + Math.cos(angle) * (ballRadius + 2) - ballRadius;
      posY = mouseY + Math.sin(angle) * (ballRadius + 2) - ballRadius;

      // 마우스로 치면 콤보 리셋
      comboCount = 0;
      comboDisplay.classList.remove('combo-active');
    }
  }

  ball.style.left = posX + 'px';
  ball.style.top = posY + 'px';

  requestAnimationFrame(updateGame);
}

updateGame();
