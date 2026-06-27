const ball = document.querySelector('.ball');
const paddle = document.getElementById('paddle');
const comboDisplay = document.getElementById('combo-display');

// [콘솔 명령어 연동용 객체] 브라우저 개발자 도구(F12) 콘솔에서 언제든 변경 가능합니다!
// 예: gameSettings.gravity = 0.5; 또는 gameSettings.airFriction = 0.01;
window.gameSettings = {
  bounceVelocity: 1.0,  // 마우스 패들에 부딪혔을 때 기본 반사 탄성 (1.0 = 유지)
  gravity: 0,           // 중력 (기본값 0)
  airFriction: 0,       // 공기 저항 (0이면 저항 없음, 0.01 이면 프레임당 1% 감속)
};

// 공의 기본 물리 데이터
let posX = window.innerWidth / 2 - 25;
let posY = window.innerHeight / 2 - 25;
let speedX = 5;
let speedY = -5;
const ballSize = 50;

// 마우스 스틱(패들) 크기 정보
const paddleWidth = 150;
const paddleHeight = 20px;
let paddleX = 0;
let paddleY = 0;

// 콤보 시스템 변수들
let comboCount = 0;
let lastWallHitTime = 0;
const comboWindow = 500; // 0.5초 (밀리초 단위)

// 콤보 단계별 텍스트 배열
const comboTexts = [
  "", // 0
  "alright. x1",
  "nice! x2",
  "woah! x3",
  "great! x4",
  "exelent! x5",
  "spectacular! x6",
  "extreme! x7",
  "Godly! x8",
  "PERFECTION! x9",
  "ABSOLUTE! x10"
];

// 마우스 움직임 감지하여 스틱 위치 업데이트
window.addEventListener('mousemove', (e) => {
  paddleX = e.clientX - paddleWidth / 2;
  paddleY = e.clientY - paddleHeight / 2;
  
  paddle.style.left = paddleX + 'px';
  paddle.style.top = paddleY + 'px';
});

// [기능] '4' 키를 누른 상태에서 스크롤 하면 공 속도 제어
let isFourPressed = false;
window.addEventListener('keydown', (e) => {
  if (e.key === '4') isFourPressed = true;
});
window.addEventListener('keyup', (e) => {
  if (e.key === '4') isFourPressed = false;
});

window.addEventListener('wheel', (e) => {
  if (isFourPressed) {
    // 스크롤 방향에 따라 속도 증감 (기본 축 방향 기준 비례 연산)
    const factor = e.deltaY > 0 ? 0.9 : 1.1;
    speedX *= factor;
    speedY *= factor;
    console.log(`공 속도 조절됨: speedX=${speedX.toFixed(2)}, speedY=${speedY.toFixed(2)}`);
  }
});

// 콤보 발동 및 가속 함수
function triggerCombo() {
  const currentTime = Date.now();
  
  // 0.5초(500ms) 안에 다시 벽을 쳤는지 확인
  if (currentTime - lastWallHitTime <= comboWindow) {
    comboCount++;
  } else {
    comboCount = 1; // 0.5초가 지났다면 다시 x1 콤보부터 시작
  }
  
  lastWallHitTime = currentTime;

  // 콤보 텍스트 선택 (11단계 이후로는 x무한대 무한 루프 처리)
  let text = "";
  if (comboCount <= 10) {
    text = comboTexts[comboCount];
  } else {
    text = `idk what to put so this is the end. x${comboCount}`;
  }

  // 화면에 콤보 띄우기 및 이펙트 애니메이션
  comboDisplay.innerText = text;
  comboDisplay.classList.remove('combo-active');
  void comboDisplay.offsetWidth; // 브라우저 리플로우 강제 유발 (애니메이션 초기화)
  comboDisplay.classList.add('combo-active');

  // 첫 충돌(x1) 시 1.5배 가속, x2부터는 1.1 ~ 2.0배 사이 램덤 가속
  let boost = 1.5;
  if (comboCount > 1) {
    boost = Math.random() * (2.0 - 1.1) + 1.1;
  }

  speedX *= boost;
  speedY *= boost;
  
  console.log(`콤보 달성! 현재: ${text} | 속도 가속: ${boost.toFixed(2)}배`);
}

// 메인 게임 물리 루프
function updateGame() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  // 1. 외부 설정 적용 (중력 및 공기마찰)
  speedY += window.gameSettings.gravity;
  speedX *= (1 - window.gameSettings.airFriction);
  speedY *= (1 - window.gameSettings.airFriction);

  // 위치 이동
  posX += speedX;
  posY += speedY;

  let hitWall = false;

  // 2. 벽 충돌 검사 (X축)
  if (posX + ballSize >= screenWidth) {
    posX = screenWidth - ballSize;
    speedX = -speedX;
    hitWall = true;
  } else if (posX <= 0) {
    posX = 0;
    speedX = -speedX;
    hitWall = true;
  }

  // 3. 벽 충돌 검사 (Y축)
  if (posY + ballSize >= screenHeight) {
    posY = screenHeight - ballSize;
    speedY = -speedY;
    hitWall = true;
  } else if (posY <= 0) {
    posY = 0;
    speedY = -speedY;
    hitWall = true;
  }

  // 벽에 부딪혔다면 콤보 체크 트리거 실행
  if (hitWall) {
    triggerCombo();
  }

  // 4. 마우스 스틱(패들) 충돌 검사 (AABB 알고리즘 변형)
  // 공의 중심 좌표
  const ballCenterX = posX + ballSize / 2;
  const ballCenterY = posY + ballSize / 2;

  // 패들 영역 내부로 공이 들어왔는지 판정
  if (
    posX + ballSize >= paddleX &&
    posX <= paddleX + paddleWidth &&
    posY + ballSize >= paddleY &&
    posY <= paddleY + paddleHeight
  ) {
    // 위나 아래에서 패들을 쳤을 때 튕겨내기
    if (ballCenterY < paddleY || ballCenterY > paddleY + paddleHeight) {
      speedY = -speedY * window.gameSettings.bounceVelocity;
      // 공이 패들에 박히는 버그 방지 처리를 위해 살짝 밀어내기
      posY = ballCenterY < paddleY ? paddleY - ballSize : paddleY + paddleHeight;
    } 
    // 옆면에서 패들을 쳤을 때 튕겨내기
    else {
      speedX = -speedX * window.gameSettings.bounceVelocity;
      posX = ballCenterX < paddleX ? paddleX - ballSize : paddleX + paddleWidth;
    }
    
    // 스틱에 부딪히면 연쇄 벽 콤보 초기화
    comboCount = 0;
    comboDisplay.classList.remove('combo-active');
  }

  // 5. 화면 좌표 갱신
  ball.style.left = posX + 'px';
  ball.style.top = posY + 'px';

  requestAnimationFrame(updateGame);
}

// 최초 실행
updateGame();
