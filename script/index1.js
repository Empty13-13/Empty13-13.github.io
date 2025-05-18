'use strict'
import Game from "./Game.js";
import Player from "./Player.js";
import Enemy from "./Enemy.js";
import {getRandomInt, loadImage, plusCoordinates, setHidden, wrapSetEventClick} from "./functions.js";


const TheGame = new Game()
let map
let pacman
let ghosts = []
let numItems = 3

//region Создание canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');

// Адаптация размера канваса
function resizeCanvas() {
  const size = Math.min(window.innerWidth, window.innerHeight) * 0.8;
  canvas.width = TheGame.mapWidth * TheGame.tileSize;
  canvas.height = TheGame.mapHeight * TheGame.tileSize;
  // canvas.style.width = `350px`;
  // canvas.style.height = `350px`;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);
//endregion

//Размер тела для персонажей
const bodySize = 0.85
const bodySizeTile = TheGame.tileSize * bodySize

let score = 0;
let gameLoopId = null;

// Анимация Pac-Man
const spriteSheet = await loadImage('/img/PlayerAnimations/main.png')

let animationFrameIndex = 0;
let lastAnimationTime = 0;
const animationFrameDuration = 150; // Время на кадр в миллисекундах
const wallFrameWeight = 32
const wallFrameHeight = 32

//region Все функции

//Установка значений для старта игры
function setStartValues() {
  ghosts.length = 0
  pacman = null

  map = TheGame.defaultMap()
  setRandomItemsToMap(numItems)
  pacman = new Player()
  ghosts = [
    new Enemy('Blinky', '#f00', {x:12, y:1}, {x:12, y:13}),
    new Enemy('Pinky', '#ffb8ff', {x:12, y:1}, {x:13, y:13}),
    // new Enemy('Inky', '#0ff', {x:12, y:1}, {x:13, y:12,direction:'up',nextDirection:'up'}),
    // new Enemy('Clyde', '#ffb852', {x:12, y:1}, {x:13, y:11}),
  ];
  score = 0
  scoreElement.textContent = `Кальянов: ${score}/${numItems}`
}

//Установка num предметов на карте в рандомных местах, где нет стен
function setRandomItemsToMap(num) {
  const resultCoordinates = []
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map.length; x++) {
      if (map[x][y] === 0) {
        resultCoordinates.push({x, y})
      }
    }
  }
  const usedCoordinates = []
  let sigNum = 0
  while (usedCoordinates.length < num) {
    const coordinates = resultCoordinates[getRandomInt(0, resultCoordinates.length - 1)]
    if (usedCoordinates.includes(coordinates)) {
      continue
    }
    usedCoordinates.push(coordinates)
    map[coordinates.x][coordinates.y] = 10 + sigNum
    sigNum++
  }
}

// Отрисовка карты
function drawMap(timestamp) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < TheGame.mapHeight; y++) {
    for (let x = 0; x < TheGame.mapWidth; x++) {
      if (map[y][x] === 1) {
        const centerX = x * TheGame.tileSize;
        const centerY = y * TheGame.tileSize;
        let frameType = 1

        // Поворот изображения в зависимости от направления
        ctx.save();
        ctx.translate(centerX + TheGame.tileSize / 2, centerY + TheGame.tileSize / 2);
        const dCoordinates = [
          {x:0, y:1},
          {x:0, y:-1},
          {x:1, y:0},
          {x:-1, y:0},

          {x:-1, y:1},
          {x:-1, y:-1},
          {x:1, y:-1},
          {x:1, y:1},
        ]
        const currentCoordinates = {x, y}
        const walls = []
        dCoordinates.forEach(d => {
          const coords = plusCoordinates(currentCoordinates, d)
          if (map[coords.y] === undefined || map[coords.y][coords.x] === undefined || map[coords.y][coords.x] === 1) {
            walls.push(true)
          }
          else {
            walls.push(false)
          }
        })
        if (walls[0] && walls[1] && walls[2] && walls[3]) {
          if (!walls[4] && !walls[5]) {
            frameType = 0
            ctx.rotate(90 * Math.PI / 180)
          }
          else if (!walls[5] && !walls[6]) {
            frameType = 0
            ctx.rotate(180 * Math.PI / 180)
          }
          else if (!walls[6] && !walls[7]) {
            frameType = 0
            ctx.rotate(270 * Math.PI / 180)
          }
          else if (!walls[7] && !walls[4]) {
            frameType = 0
            ctx.rotate(0)
          }
          else {
            if (!walls[4]) {
              frameType = 3
            }
            if (!walls[5]) {
              frameType = 3
              ctx.rotate(90 * Math.PI / 180)
            }
            else if (!walls[6]) {
              frameType = 3
              ctx.rotate(180 * Math.PI / 180)
            }
            else if (!walls[7]) {
              frameType = 3
              ctx.rotate(270 * Math.PI / 180)
            }
          }
        }
        else if (walls[0] && walls[1]) {
          frameType = 0
          if (!walls[2] && walls[3]) {
            ctx.rotate(-90 * Math.PI / 180)
          }
          else if (!walls[3] && walls[2]) {
            ctx.rotate(90 * Math.PI / 180)
          }
          else {
            frameType = 1
          }
        }
        else if (walls[2] && walls[3]) {
          frameType = 0
          if (!walls[0] && walls[1]) {
          }
          else if (!walls[1] && walls[0]) {
            ctx.rotate(180 * Math.PI / 180)
          }
          else {
            frameType = 1
          }
        }
        else if (walls.filter((item, index) => index < 4 && !item).length >= 3) {

        }
        else {
          if (!walls[0] && !walls[4] && !walls[3]) {
            frameType = 2
          }
          else if (!walls[3] && !walls[5] && !walls[1]) {
            frameType = 2
            ctx.rotate(90 * Math.PI / 180)
          }
          else if (!walls[1] && !walls[6] && !walls[2]) {
            frameType = 2
            ctx.rotate(-180 * Math.PI / 180)
          }
          else if (!walls[2] && !walls[6] && !walls[0]) {
            frameType = 2
            ctx.rotate(270 * Math.PI / 180)
          }
        }

        // Отрисовка текущего кадра
        const frameX = wallFrameWeight % spriteSheet.width * frameType; // Координата X первого ряда
        const frameY = 543; // Первый ряд спрайтов (сверху)
        ctx.drawImage(
          spriteSheet,
          frameX, frameY, wallFrameWeight, wallFrameHeight, // Область источника
          -TheGame.tileSize / 2, -TheGame.tileSize / 2, TheGame.tileSize, TheGame.tileSize, // Область назначения
        );

        ctx.restore();


      }
      else if (map[y][x] >= 10) {
        // Обновление кадра анимации
        // if (timestamp - lastAnimationTime >= animationFrameDuration) {
        //   animationFrameIndex = (animationFrameIndex + 1) % 4; // Только 4 кадра
        //   lastAnimationTime = timestamp;
        // }

        const centerX = x * TheGame.tileSize;
        const centerY = y * TheGame.tileSize;

        ctx.save();
        ctx.translate(centerX + bodySizeTile / 2, centerY + bodySizeTile / 2);

        // Отрисовка текущего кадра
        const frameX = ((map[y][x] % 10) * 32) % spriteSheet.width;
        let frameY = 496; // Ряд спрайтов
        ctx.drawImage(
          spriteSheet,
          frameX, frameY, 32, 48, // Область источника
          -bodySizeTile / 2 + (bodySizeTile*0.2), -bodySizeTile / 2 + (bodySizeTile*0.1), bodySizeTile * 0.8, bodySizeTile, // Область назначения
        );

        ctx.restore();
      }
      else if (map[y][x] === 3) {
        const centerX = x * TheGame.tileSize;
        const centerY = y * TheGame.tileSize;

        ctx.save();
        ctx.translate(centerX + TheGame.tileSize / 2, centerY + TheGame.tileSize / 2);

        // Отрисовка текущего кадра
        const frameX = 0;
        let frameY = 576; // Ряд спрайтов
        ctx.drawImage(
          spriteSheet,
          frameX, frameY, wallFrameWeight, wallFrameHeight, // Область источника
          -TheGame.tileSize / 2, -TheGame.tileSize / 2, TheGame.tileSize, TheGame.tileSize, // Область назначения
        );

        ctx.restore();
      }
    }
  }
}

// Отрисовка Pac-Man с анимацией
function drawPacman(timestamp) {

  // Обновление кадра анимации
  if (timestamp - lastAnimationTime >= animationFrameDuration) {
    animationFrameIndex = (animationFrameIndex + 1) % 4; // Только 4 кадра
    lastAnimationTime = timestamp;
  }

  const centerX = pacman.x * TheGame.tileSize;
  const centerY = pacman.y * TheGame.tileSize;

  // Поворот изображения в зависимости от направления
  ctx.save();
  ctx.translate(centerX + bodySizeTile / 2, centerY + bodySizeTile / 2);
  switch (pacman.direction) {
    case 'right':
      ctx.rotate(0);
      break;
    case 'left':
      ctx.scale(-1, 1);
      break;
  }

  // Отрисовка текущего кадра
  if (pacman.takeObject) {
    const frameX = (animationFrameIndex * 64) % spriteSheet.width;
    let frameY = 81; // Ряд спрайтов
    ctx.drawImage(
      spriteSheet,
      frameX, frameY, 64, 96, // Область источника
      -bodySizeTile / 2 - (bodySizeTile * 0.1), -bodySizeTile / 2 - (bodySizeTile * 0.2), bodySizeTile * 1.01, bodySizeTile * 1.3, // Область
      // назначения
    );
  }
  else {
    const frameX = (animationFrameIndex * pacman.frameWidth) % spriteSheet.width;
    let frameY = 0; // Ряд спрайтов
    ctx.drawImage(
      spriteSheet,
      frameX, frameY, pacman.frameWidth, pacman.frameHeight, // Область источника
      -bodySizeTile / 2 + (bodySizeTile * 0.1), -bodySizeTile / 2, bodySizeTile * 0.7, bodySizeTile * 1.1, // Область
      // назначения
    );
  }

  ctx.restore();
}

// Отрисовка призраков
function drawGhosts(timestamp) {
  ghosts.forEach((ghost, index) => {
    // Обновление кадра анимации
    if (timestamp - ghost.lastAnimationTime >= ghost.animationFrameDuration) {
      ghost.animationFrameIndex = (ghost.animationFrameIndex + 1) % 4; // Только 4 кадра
      ghost.lastAnimationTime = timestamp;
    }

    const centerX = ghost.x * TheGame.tileSize;
    const centerY = ghost.y * TheGame.tileSize;

    // Поворот изображения в зависимости от направления
    ctx.save();
    ctx.translate(centerX + bodySizeTile / 2, centerY + bodySizeTile / 2);
    switch (ghost.direction) {
      case 'right':
        ctx.rotate(0);
        break;
      case 'left':
        ctx.scale(-1, 1);
        break;
    }

    // Отрисовка текущего кадра
    const frameX = (animationFrameIndex * ghost.frameWidth) % spriteSheet.width;
    let frameY = 175 + (index * 80); // Ряд спрайтов
    ctx.drawImage(
      spriteSheet,
      frameX, frameY, ghost.frameWidth, ghost.frameHeight, // Область источника
      -bodySizeTile / 2 + (bodySizeTile * 0.1), -bodySizeTile / 2, bodySizeTile * 0.7, bodySizeTile * 1.1, // Область
      // назначения
    );

    ctx.restore();
  });
}

// Проверка столкновений со стенами или выхода из карты
function canMove(direction, x, y) {
  if (direction === 'down') {
    y += bodySize
  }
  if (direction === 'right') {
    x += bodySize
  }
  const tileX = Math.floor(x);
  const tileY = Math.floor(y);

  return tileY >= 0
    && tileY < TheGame.mapHeight
    && tileX >= 0
    && tileX < TheGame.mapWidth
    && map[tileY][tileX] !== 1;
}

//Обработчик nextDirection
function nextDirectionHandler(nextDirection, x, y) {
  let localX = Math.floor(x)
  let localY = Math.floor(y)
  let dx = 0
  let dy = 0
  const space = 0.15

  switch (nextDirection) {
    case 'right':
      if (y - Math.floor(y) > space) {
        return null
      }
      dx = 1;
      break;
    case 'left':
      if (y - Math.floor(y) > space) {
        return null
      }
      dx = -1;
      break;
    case 'up':
      if (x - Math.floor(x) > space) {
        return null
      }
      dy = -1;
      break;
    case 'down':
      if (x - Math.floor(x) > space) {
        return null
      }
      dy = 1;
      break;
  }

  if (map[localY + dy][localX + dx] === 1) {
    return null
  }
  else {
    return nextDirection
  }
}

// Обновление позиции Pac-Man
function updatePacman() {
  let nextX = pacman.x;
  let nextY = pacman.y;

  //Обновляем direction
  pacman.direction = nextDirectionHandler(pacman.nextDirection, pacman.x, pacman.y) || pacman.direction

  switch (pacman.direction) {
    case 'right':
      nextX += pacman.speed;
      nextY = Math.floor(nextY) + 0.1
      break;
    case 'left':
      nextX -= pacman.speed;
      nextY = Math.floor(nextY) + 0.1
      break;
    case 'up':
      nextY -= pacman.speed;
      nextX = Math.floor(nextX) + 0.1
      break;
    case 'down':
      nextX = Math.floor(nextX) + 0.1
      nextY += pacman.speed;
      break;
  }

  if (canMove(pacman.direction, nextX, nextY)) {
    pacman.x = nextX;
    pacman.y = nextY;

    let tileX = Math.floor(pacman.x);
    let tileY = Math.floor(pacman.y);
    if (pacman.direction === 'right') {
      tileX = Math.floor(pacman.x + bodySize)
    }
    else if (pacman.direction === 'down') {
      tileY = Math.floor(pacman.y + bodySize)
    }

    if (map[tileY][tileX] >= 10 && !pacman.takeObject) {
      pacman.takeObject = true
      map[tileY][tileX] = 0;
      scoreElement.textContent = `Кальянов: ${score}/${numItems}`;
    }
    if (map[tileY][tileX] === 3 && pacman.takeObject) {
      pacman.takeObject = false
      score += 1;
      scoreElement.textContent = `Кальянов: ${score}/${numItems}`;
      if (score >= numItems) {
        TheGame.setState('win')
      }
    }
  }
}

// Поиск пути (упрощенный A*)
function findPath(startX, startY, targetX, targetY) {
  const queue = [{x:Math.floor(startX), y:Math.floor(startY), path:[]}];
  const visited = new Set();
  const directions = [
    {dx:0, dy:-1, name:'up'},
    {dx:0, dy:1, name:'down'},
    {dx:-1, dy:0, name:'left'},
    {dx:1, dy:0, name:'right'},
  ];

  while (queue.length > 0) {
    const {x, y, path} = queue.shift();
    const key = `${x},${y}`;
    if (visited.has(key)) {
      continue;
    }
    visited.add(key);

    if (x === Math.floor(targetX) && y === Math.floor(targetY)) {
      return path[0] || null;
    }

    for (const dir of directions) {
      const newX = x + dir.dx;
      const newY = y + dir.dy;
      if (canMove(dir.name, newX, newY)) {
        queue.push({x:newX, y:newY, path:[...path, dir.name]});
      }
    }

    // Сортировка по расстоянию до цели
    queue.sort((a, b) => {
      const distA = Math.abs(a.x - targetX) + Math.abs(a.y - targetY);
      const distB = Math.abs(b.x - targetX) + Math.abs(b.y - targetY);
      return distA - distB;
    });
  }

  return null;
}

// Обновление призраков
function updateGhosts() {
  ghosts.forEach(ghost => {
    let targetX, targetY;

    // Определение цели в зависимости от имени призрака
    switch (ghost.name) {
      case 'Blinky':
        targetX = pacman.x;
        targetY = pacman.y;
        break;
      case 'Pinky':
        targetX = pacman.x;
        targetY = pacman.y;
        switch (pacman.direction) {
          case 'right':
            targetX += 4;
            break;
          case 'left':
            targetX -= 4;
            break;
          case 'up':
            targetY -= 4;
            break;
          case 'down':
            targetY += 4;
            break;
        }
        break;
      case 'Inky':
        const blinky = ghosts.find(g => g.name === 'Blinky');
        let offsetX = pacman.x;
        let offsetY = pacman.y;
        switch (pacman.direction) {
          case 'right':
            offsetX += 2;
            break;
          case 'left':
            offsetX -= 2;
            break;
          case 'up':
            offsetY -= 2;
            break;
          case 'down':
            offsetY += 2;
            break;
        }
        targetX = offsetX + (offsetX - blinky.x);
        targetY = offsetY + (offsetY - blinky.y);
        break;
      case 'Clyde':
        const distance = Math.sqrt((ghost.x - pacman.x) ** 2 + (ghost.y - pacman.y) ** 2);
        if (distance > 5) {
          targetX = pacman.x;
          targetY = pacman.y;
        }
        else {
          targetX = ghost.scatterTarget.x;
          targetY = ghost.scatterTarget.y;
        }
        break;
    }

    // Поиск пути к цели
    const nextDirection = findPath(ghost.x, ghost.y, targetX, targetY);
    if (nextDirection) {
      ghost.direction = nextDirectionHandler(nextDirection, ghost.x, ghost.y) || ghost.direction;
    }

    // Движение призрака
    let nextX = ghost.x;
    let nextY = ghost.y;

    switch (ghost.direction) {
      case 'right':
        nextX += ghost.speed;
        nextY = Math.floor(nextY) + 0.1
        break;
      case 'left':
        nextX -= ghost.speed;
        nextY = Math.floor(nextY) + 0.1
        break;
      case 'up':
        nextY -= ghost.speed;
        nextX = Math.floor(nextX) + 0.1
        break;
      case 'down':
        nextX = Math.floor(nextX) + 0.1
        nextY += ghost.speed;
        break;
    }

    if (canMove(ghost.direction, nextX, nextY)) {
      ghost.x = nextX;
      ghost.y = nextY;
    }
  });
}

// Проверка столкновений с призраками
function checkCollisions() {
  ghosts.forEach(ghost => {
    const dx = pacman.x - ghost.x;
    const dy = pacman.y - ghost.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 1) {
      TheGame.setState('over');
      scoreElement.textContent = `Собрано кальянов: ${score}`;
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.sendData(JSON.stringify({score}));
      }
    }
  });
}

//endregion

// Игровой цикл
let lastTime = 0;

function gameLoop(timestamp) {
  if (TheGame.isGameOver() || TheGame.isWin()) {
    cancelAnimationFrame(gameLoopId);
    return;
  }

  const deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  if (TheGame.state !== 2) {
    updatePacman();
    updateGhosts();
    checkCollisions();
  }

  drawMap(timestamp);
  drawPacman(timestamp);
  drawGhosts();

  gameLoopId = requestAnimationFrame(gameLoop);
}

function startGame() {
  if (gameLoopId) {
    cancelAnimationFrame(gameLoopId);
  }
  setStartValues()
  TheGame.setState('start')
  requestAnimationFrame(gameLoop);
}

// Управление
window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowRight':
      pacman.nextDirection = 'right';
      break;
    case 'ArrowLeft':
      pacman.nextDirection = 'left';
      break;
    case 'ArrowUp':
      pacman.nextDirection = 'up';
      break;
    case 'ArrowDown':
      pacman.nextDirection = 'down';
      break;
    case 'Escape':
      TheGame.changePauseGame()
      break;
  }
});
let startX, startY, endX, endY;

const touchStartHandler = (event) => {
  const touch = event.touches[0];
  startX = touch.clientX;
  startY = touch.clientY;
};

const touchEndHandler = (event) => {
  const touch = event.changedTouches[0];
  endX = touch.clientX;
  endY = touch.clientY;

  handleSwipe();
};

const handleSwipe = () => {
  const deltaX = endX - startX;
  const deltaY = endY - startY;

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    // Горизонтальный свайп
    if (deltaX > 0) {
      pacman.nextDirection = 'right';
    } else {
      pacman.nextDirection = 'left';
    }
  } else {
    // Вертикальный свайп
    if (deltaY > 0) {
      pacman.nextDirection = 'down';
    } else {
      pacman.nextDirection = 'up';
    }
  }
};

const element = document.querySelector('body');
element.addEventListener('touchstart', touchStartHandler);
element.addEventListener('touchend', touchEndHandler);

// Очистка при выходе
window.addEventListener('beforeunload', () => {
  if (gameLoopId) {
    cancelAnimationFrame(gameLoopId);
  }
});

//Запуск игры при полной загрузке документа
window.addEventListener("load", function() {
  wrapSetEventClick('#restartBtn', startGame)
  wrapSetEventClick('#startGame', startGame)
  wrapSetEventClick('#upStick', () => pacman.nextDirection = 'up')
  wrapSetEventClick('#leftStick', () => pacman.nextDirection = 'left')
  wrapSetEventClick('#rightStick', () => pacman.nextDirection = 'right')
  wrapSetEventClick('#downStick', () => pacman.nextDirection = 'down')


  setHidden('#gameOver', true)
  setHidden('#winGame', true)

  setStartValues()

  drawMap()
  drawPacman()
  drawGhosts()

  if (window.Telegram?.WebApp) {
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.expand(); // Разворачиваем приложение
    // Настройка поведения свайпов
    window.Telegram.WebApp.postEvent('web_app_setup_swipe_behavior', false, {
      allow_vertical_swipe: false
    });
  }
});