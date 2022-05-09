
import React, {useEffect, useState} from 'react';
import Snake from './components/Snake';
import Food from './components/Food';
import Modal from './components/Modal';
import { getRandomPosition } from './helpers/helpers';
import snake from './assets/images/snake.gif'
import coin from './assets/images/coin.gif'
import './App.css';


function App() {
  const [snakePosition, setSnakePosition] = useState([[0, 0], [2, 0]])
  const [foodPosition, setFoodPosition] = useState(getRandomPosition());
  const [snakeDirection, setSnakeDirection] = useState('right');
  const [speed, setSpeed] = useState(500)
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0)
  
  
  function onKeyDown (e){
    //e = e || window.event;
    switch (e.keyCode) {
      case 37:
        setSnakeDirection('left');
        break;
      case 38:
        setSnakeDirection('up');
        break;
      case 39:
        setSnakeDirection('right');
        break;
      case 40:
        setSnakeDirection('down');
        break;
    }
  }

  function moveSnake() {
    let box = [...snakePosition];
    //console.log(box);
    let head = box[box.length - 1]
    // console.log(head);

    switch (snakeDirection) {
      case 'left':
        head = [head[0] - 2, head[1]];
        break;
      case 'right':
        head = [head[0] + 2, head[1]];
        break;
      case 'up':
        head = [head[0], head[1] - 2];
        break;
      case 'down':
        head = [head[0], head[1] + 2];
        break;
    }
    box.push(head)
      
    box.shift();
    //console.log(box);
    setSnakePosition([...box]
    )
  }

  useEffect(() => {
  if(isPlaying){
   document.onkeydown = onKeyDown;
   let move =  setInterval(()=> moveSnake(), speed);   
  return () => {
    clearInterval(move);
      }}
  });
  
  useEffect(() => {
    checkIftouchBorders();
    checkIfTouchSelf();
    checkIfSnakeEatFood()
  }, [snakePosition])
  
  function checkIfSnakeEatFood() {
    let head = snakePosition[snakePosition.length - 1];
    let food = foodPosition;
    if (head[0] === food[0] && head[1] === food[1]) {
      setFoodPosition(getRandomPosition())
      snakeEnlarge();
      increaseSpeed()
      setScore(score + 100)
    }
  };

  function snakeEnlarge() {
    let newSnake = [...snakePosition];
    newSnake.unshift([]);
    setSnakePosition([...newSnake])
  }

  function increaseSpeed() {
    
      setSpeed(speed + 10)
    
  }
  
  function checkIftouchBorders() {
    let head = snakePosition[snakePosition.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      gameOver();
    }
  }

  function checkIfTouchSelf(){
    let snake = [...snakePosition];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach(box => {
      if (head[0] === box[0] && head[1] === box[1]) {
        gameOver()
      }
    })
   }
  
  function gameOver() {

    setIsPlaying(false)
    setSnakePosition([[0, 0], [2, 0]])
    setFoodPosition(getRandomPosition());
    setSnakeDirection('right');
    setSpeed(500)
    
  }
 
  const startGame =()=> {
    setIsPlaying(true)
    setScore(0)
  }
// console.log(snakePosition);
// console.log(score);
// console.log(speed);
  return (
    <div className="container">
       <img style={{width: "50px", margin: "5px auto", display: "block"}}  src={snake} alt="Snake Gif"/>
       
    <div className="snake-container">
     
      
      <Snake snakePosition={snakePosition} />
      <Food foodPosition={foodPosition}/>
    </div>
    <div className="snake-score">
      <img src={coin} alt="Coing-gif"/>
      <span>Points: {score}</span>
      </div>
      {!isPlaying && <Modal setIsGameStart={startGame} score={score}/>}
    </div>
  );
}

export default App;

