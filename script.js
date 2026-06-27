* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body, html {
  width: 100%;
  height: 100%;
  overflow: hidden; 
  cursor: none; /* 실제 마우스 커서는 숨겨서 스틱만 보이게 합니다 */
}

.game-screen {
  width: 100%;
  height: 100vh;
  background-color: #1e40af;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.ball {
  width: 50px;
  height: 50px;
  background-color: #facc15;
  border-radius: 50%;
  position: absolute; 
  will-change: left, top;
}

/* 마우스 스틱 (패들) 스타일 */
#paddle {
  width: 150px;  /* 스틱 가로 길이 */
  height: 20px;  /* 스틱 두께 */
  background-color: #ffffff;
  border-radius: 10px;
  position: absolute;
  pointer-events: none; /* 마우스 이벤트를 방해하지 않도록 설정 */
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
  will-change: left, top;
}

/* 콤보 텍스트 스타일 */
#combo-display {
  position: absolute;
  top: 15%;
  font-family: 'Arial Black', sans-serif;
  font-size: 3rem;
  color: #ffffff;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5), 0 0 20px #facc15;
  pointer-events: none;
  opacity: 0;
  transition: transform 0.1s ease-out, opacity 0.3s ease-in;
  text-align: center;
  z-index: 10;
}

.combo-active {
  opacity: 1 !important;
  transform: scale(1.2);
}
