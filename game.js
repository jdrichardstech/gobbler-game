let gameLoad = () => {
  location.reload();
};

(function() {
  const CANVAS_HEIGHT = 500;
  const CANVAS_WIDTH = 1000;

  const NUM_SQUARES_HORIZONTAL = 40;
  const NUM_SQUARES_VERTICAL = 20;

  const CANVAS = document.getElementById("gameBoard");
  const CTX = CANVAS.getContext("2d");

  const SQUARE = 25;

  let gameSpeed = 110;
  let score = 0;

  CANVAS.style.display = "block";
  CANVAS.style.marginLeft = "auto";
  CANVAS.style.marginRight = "auto";
  CANVAS.style.marginTop = 25;

  const BEACH = new Image();
  const SMILER = new Image();
  const SNAKEHEAD = new Image();
  const SNAKEBODY = new Image();
  const BUBBLES = new Audio();
  const CRASH = new Audio();

  BEACH.src = "img/aquarium.jpg";
  SMILER.src = "img/egg_25.png";
  SNAKEHEAD.src = "img/blue_25.png";
  SNAKEBODY.src = "img/reddot_25.png";
  BUBBLES.src = "audio/bubbles.mp3";
  CRASH.src = "audio/crash.mp3";

  let dir; //direction variable
  let snake = [];
  snake[0] = {
    x: 15 * SQUARE,
    y: 10 * SQUARE
  };

  let snake_Xaxis = snake[0].x;
  let snake_Yaxis = snake[0].y;

  let xRandom = () => {
    return Math.floor(Math.random() * NUM_SQUARES_HORIZONTAL) * SQUARE;
  };

  let yRandom = () => {
    return Math.floor(Math.random() * NUM_SQUARES_VERTICAL) * SQUARE;
  };
  let food = {
    x: xRandom(),
    y: yRandom()
  };

  let direction = e => {
    let keyCode = e.keyCode;

    if (keyCode === 37 && dir !== "right") {
      dir = "left";
    } else if (keyCode === 38 && dir !== "down") {
      dir = "up";
    }
    if (keyCode === 39 && dir !== "left") {
      dir = "right";
    }
    if (keyCode === 40 && dir !== "up") {
      dir = "down";
    }
  };

  document.addEventListener("keydown", direction);

  let createImages = () => {
    CTX.drawImage(BEACH, 0, 0);
    CTX.drawImage(SMILER, food.x, food.y);
  };

  let createSnake = () => {
    snake.forEach(item => {
      item === snake[0]
        ? CTX.drawImage(SNAKEHEAD, item.x, item.y)
        : CTX.drawImage(SNAKEBODY, item.x, item.y);
    });
  };

  let checkFood = (snakeX, snakeY) => {
    if (snakeX === food.x && snakeY === food.y) {
      score++;
      food = {
        x: xRandom(),
        y: yRandom()
      };
    } else {
      snake.pop();
    }
    return;
  };

  let collision = (head, arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (head.x === arr[i].x && head.y === arr[i].y) {
        return true;
      }
    }

    return false;
  };

  let gameover = head => {
    if (
      snake_Xaxis === -50 ||
      snake_Xaxis > NUM_SQUARES_HORIZONTAL * SQUARE ||
      snake_Yaxis < SQUARE - 50 ||
      snake_Yaxis > NUM_SQUARES_VERTICAL * SQUARE ||
      collision(head, snake)
    ) {
      clearInterval(game);
      CRASH.play();
      BUBBLES.pause();
      CTX.fillStyle = "#eee8d5";
      CTX.font = "40px Do Hyeon";
      CTX.textAlign = "center";
      CTX.fillText(`GAME OVER`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 100);
      CTX.fillText(`Your score: ${score}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
      CTX.fillText(
        `Click PLAY to try again`,
        CANVAS_WIDTH / 2,
        CANVAS_HEIGHT / 2 + 50
      );
    } else {
      snake.unshift(head);
    }
  };

  let checkDirection = direction => {
    switch (direction) {
      case "left":
        snake_Xaxis -= SQUARE;
        break;
      case "right":
        snake_Xaxis += SQUARE;
        break;
      case "up":
        snake_Yaxis -= SQUARE;
        break;
      case "down":
        snake_Yaxis += SQUARE;
        break;
      default:
        snake_Xaxis = snake_Xaxis;
        snake_Yaxis = snake_Yaxis;
    }
  };

  let initSound = () => {
    const bublesPromise = Promise.resolve(BUBBLES.play());
    bublesPromise.then(() => console.log("audio running")).catch(err => {
      console.log(err);
    });
  };

  let playGame = () => {
    initSound();
    createImages();
    createSnake();
    checkDirection(dir);
    checkFood(snake_Xaxis, snake_Yaxis);
    let newHead = {
      x: snake_Xaxis,
      y: snake_Yaxis
    };
    gameover(newHead);
  };

  let game = setInterval(playGame, gameSpeed);
})();
