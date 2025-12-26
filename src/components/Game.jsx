import React, { useState, useRef, useEffect } from 'react';

const Game = ({ onComplete }) => {
  const [gameState, setGameState] = useState('idle'); // idle, waiting, ready, clicked
  const [message, setMessage] = useState('시작하려면 화면을 클릭하세요.');
  const [attempts, setAttempts] = useState([]);
  const [startTime, setStartTime] = useState(0);
  const timeoutRef = useRef(null);

  const startAttempt = () => {
    setGameState('waiting');
    setMessage('초록색이 되면 클릭하세요!');
    
    const randomTime = Math.floor(Math.random() * 3000) + 2000; // 2000ms ~ 5000ms

    timeoutRef.current = setTimeout(() => {
      setGameState('ready');
      setMessage('지금 클릭하세요!!');
      setStartTime(Date.now());
    }, randomTime);
  };

  const handleClick = () => {
    if (gameState === 'idle') {
      startAttempt();
    } else if (gameState === 'waiting') {
      // Too early (Anti-cheat)
      clearTimeout(timeoutRef.current);
      setGameState('idle');
      setMessage('너무 빠릅니다! 다시 시도하려면 클릭하세요.');
    } else if (gameState === 'ready') {
      // Success
      const endTime = Date.now();
      const reactionTime = endTime - startTime;
      
      const newAttempts = [...attempts, reactionTime];
      setAttempts(newAttempts);
      setGameState('idle');

      if (newAttempts.length >= 3) {
        setMessage(`완료! 평균 기록: ${calculateAverage(newAttempts)}ms`);
        onComplete(newAttempts);
      } else {
        setMessage(`${reactionTime}ms! 클릭하여 다음 시도를 진행하세요.`);
      }
    }
  };

  const calculateAverage = (times) => {
    const sum = times.reduce((a, b) => a + b, 0);
    return (sum / times.length).toFixed(2);
  };

  const getClassName = () => {
    if (gameState === 'waiting') return 'game-area game-ready-wait';
    if (gameState === 'ready') return 'game-area game-now';
    return 'game-area game-waiting';
  };

  return (
    <div className='flex-center'>
      <h2>반응 속도 테스트 ({attempts.length}/3)</h2>
      <div 
        className={getClassName()} 
        onClick={handleClick}
      >
        {message}
      </div>
      {attempts.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          <h3>기록:</h3>
          <ul>
            {attempts.map((time, index) => (
              <li key={index}>{index + 1}차: {time}ms</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Game;
