const ball = document.querySelector('.ball');

let speedX = 4;
let speedY = 4;

// 처음 시작할 때 화면 정중앙에 위치시키기
let posX = window.innerWidth / 2 - 25;
let posY = window.innerHeight / 2 - 25;

ball.style.left = posX + 'px';
ball.style.top = posY + 'px';

function updateGame() {
  posX += speedX;
  posY += speedY;

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const ballSize = 50; 

  // 벽 충돌 로직 (오른쪽/왼쪽)
  if (posX + ballSize >= screenWidth || posX <= 0) {
    speedX = -speedX;
  }

  // 벽 충돌 로직 (위/아래)
  if (posY + ballSize >= screenHeight || posY <= 0) {
    speedY = -speedY;
  }

  ball.style.left = posX + 'px';
  ball.style.top = posY + 'px';

  requestAnimationFrame(updateGame);
}

// 게임 실행
updateGame();
