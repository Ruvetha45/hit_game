import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const GameBoard = () => {
  const [activeBox, setActiveBox] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(true);

  const keyword = "CLICK";

  const startKeywordInterval = () => {
    const timerInterval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 1) return prevTime - 1;
        clearInterval(timerInterval);
        setIsRunning(false);
        return 0;
      });
    }, 1000);

    const keywordInterval = setInterval(() => {
      setActiveBox(Math.floor(Math.random() * 9));
      setTimeout(() => setActiveBox(null), 1000);
    }, 1500);

    return () => {
      clearInterval(timerInterval);
      clearInterval(keywordInterval);
    };
  };

  useEffect(() => {
    if (isRunning) {
      const cleanup = startKeywordInterval();
      return cleanup;
    }
  }, [isRunning]);

  const handleBoxClick = (index) => {
    if (isRunning && index === activeBox) {
      setScore((prevScore) => prevScore + 5);
    } else if (isRunning) {
      setScore((prevScore) => prevScore - 2.5);
    }
  };

  return (
    <div className="container-fluid" style={styles.container}>
      <h1 style={styles.title}>Keyword Click Game</h1>
      <div style={styles.info}>
        <h2>Score: <span style={styles.score}>{score}</span></h2>
        <h2>Time Left: <span style={styles.timer}>{timeLeft}s</span></h2>
      </div>
      <div style={styles.grid}>
        {Array.from({ length: 9 }, (_, index) => (
          <div
            key={index}
            style={{
              ...styles.box,
              backgroundColor: activeBox === index ? '#FFD700' : '#87CEEB',
              transform: activeBox === index ? 'scale(1.1)' : 'scale(1)',
            }}
            onClick={() => handleBoxClick(index)}
          >
            {activeBox === index && (
              <span style={styles.keyword}>{keyword}</span>
            )}
          </div>
        ))}
      </div>
      {!isRunning && <h2 style={styles.gameOver}>Game Over! Final Score: {score}</h2>}
    </div>
  );
  
};

// Enhanced styles
const styles = {
    container: {
      textAlign: 'center',
      height: '100vh',
      margin: 0,
      background: 'linear-gradient(to right, #6a11cb, #2575fc)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Times New Roman, serif',

      color: '#fff',
      overflow: 'hidden', // Prevents scrolling
    },
    title: {
      fontSize: '3em',
      marginBottom: '10px',
      textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
    },
    info: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '80%',
      maxWidth: '400px',
      marginBottom: '20px',
      gap: '30px', // Add space between score and time left
    },
    score: {
      color: 'white',
      fontWeight: 'bold',
    },
    timer: {
      color: 'white',
      fontWeight: 'bold',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 120px)',
      gridTemplateRows: 'repeat(3, 120px)',
      gap: '15px',
      marginTop: '20px',
    },
    box: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '4px solid #4682B4', // Darker blue border
        borderRadius: '15px',
        backgroundColor: '#87CEEB',
        fontSize: '22px',
        fontWeight: 'bold',
        color: '#fff',
        cursor: 'pointer',
        transition: 'transform 0.2s, background-color 0.3s',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
      },
    keyword: {
      fontSize: '24px',
      color: '#333',
      fontWeight: 'bold',
      textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
    },
    gameOver: {
      marginTop: '20px',
      fontSize: '2em',
      color: 'yellow',
    },
  };
  
  
  

export default GameBoard;
