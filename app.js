document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  let squares = Array.from(document.querySelectorAll(".grid div"));
  const scoreDispaly = document.querySelector("#score");
  const startBtn = document.querySelector("#start-button");
  const width = 10;
  let nextRandom = 0;
  let timerId;

  // made shapes
  const lShapes = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2],
  ];

  const zShapes = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
  ];

  const tShapes = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 2, width * 2 + 1],
  ];

  const oShapes = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
  ];

  const iShapes = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
  ];

  const theShapes = [lShapes, oShapes, zShapes, tShapes, iShapes];
  console.log(theShapes);
  let currntPosition = 4;
  let currntRotaition = 0;

  // chose random shape
  let random = Math.floor(Math.random() * theShapes.length);
  console.log(random);
  let current = theShapes[random][currntRotaition];
  console.log(current);

  function drow() {
    current.forEach((index) => {
      squares[currntPosition + index].classList.add("tetromino");
    });
  }

  drow();

  // undrow the shape
  function undrow() {
    current.forEach((index) => {
      squares[currntPosition + index].classList.remove("tetromino");
    });
  }

  // // make the shape move down
  // timerId = setInterval(moveDown, 1000);

  // move move down function
  function moveDown() {
    undrow();
    currntPosition += width;
    drow();
    freeze();
  }

  // freeze function
  function freeze() {
    if (
      current.some((index) =>
        squares[currntPosition + index + width].classList.contains("taken")
      )
    ) {
      current.forEach((index) =>
        squares[currntPosition + index].classList.add("taken")
      );
      // start a new shape
      random = nextRandom;
      nextRandom = Math.floor(Math.random() * theShapes.length);
      current = theShapes[random][currntRotaition];
      currntPosition = 4;
      drow();
      displayShape();
    }
  }

  // prease keybord
  function control(e) {
    if (e.keyCode == 37) {
      // 37 is code of left movement
      moveLeft();
    } else if (e.keyCode == 38) {
      // 37 is code of up movement
      rotate();
    } else if (e.keyCode == 39) {
      // 37 is code of right movement
      moveRight();
    } else if (e.keyCode == 40) {
      // 37 is code of down movement
      moveDown();
    }
  }
  document.addEventListener("keyup", control);

  // moving the shape

  // move left
  function moveLeft() {
    undrow();
    const isAtLeftEdge = current.some(
      (index) => (currntPosition + index) % width == 0
    );
    if (!isAtLeftEdge) {
      currntPosition -= 1;
    }
    if (
      current.some((index) =>
        squares[currntPosition + index].classList.contains("taken")
      )
    ) {
      currntPosition += 1;
    }
    drow();
  }

  // move right
  function moveRight() {
    undrow();
    const isAtRightEdge = current.some(
      (index) => (currntPosition + index) % width == width - 1
    );
    if (!isAtRightEdge) {
      currntPosition += 1;
    }
    if (
      current.some((index) =>
        squares[currntPosition + index].classList.contains("taken")
      )
    ) {
      currntPosition -= 1;
    }
    drow();
  }

  // rotate the shape
  function rotate() {
    undrow();
    currntRotaition++;
    if (currntRotaition === current.length) {
      // if the currnt rota
      currntRotaition = 0;
    }
    current = theShapes[random][currntRotaition];
    drow();
  }

  // show up what the next shape in mini-grid
  const displaySquares = document.querySelectorAll(".mini-grid div");
  const displayWidth = 4;
  let displayIndex = 0;

  const upNextTetrominoes = [
    [1, displayWidth + 1, displayWidth * 2 + 1, 2],
    [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1],
    [1, displayWidth, displayWidth + 1, displayWidth + 2],
    [0, 1, displayWidth, displayWidth + 1],
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1],
  ];

  // display the next shape in the mini-grid
  function displayShape() {
    // reomve any active shape from mini-grid
    displaySquares.forEach((square) => {
      square.classList.remove("tetromino");
    });
    upNextTetrominoes[nextRandom].forEach(index => {
      displaySquares[displayIndex + index].classList.add("tetromino");
    });
  }

  // add functionality to the button
  startBtn.addEventListener('click',()=>{
    if(timerId){
      clearInterval(timerId);
      timerId = null;
    }else{
      drow();
      timerId = setInterval(moveDown , 1000);
      nextRandom = Math.floor(Math.random() * theShapes.length);
      displayShape();
    }
  })
});
