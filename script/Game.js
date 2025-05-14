import {setHidden} from "./functions.js";


export default class Game {
  //0 - не начата, 1 - идет, 2 - пауза, 3 - проиграл, 4 - выиграл
  state = 0
  //Размер клетки
  tileSize = 100;
  //Ширина карты
  mapWidth = 15;
  //Высота карты
  mapHeight = 15;
  // Карта (0 - пусто, 1 - стена, 3 - зона выгрузки, 10+ - предмет)
  defaultMap = () => [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1],
    [1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1],
    [1, 1, 0, 0, 0, 1, 3, 3, 3, 1, 0, 1, 0, 1, 1],
    [1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1],
    [1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  map = []

  constructor({state, tileSize, mapWidth, mapHeight, map} = {}) {
    this.state = state ?? this.state
    this.tileSize = tileSize ?? this.tileSize
    this.mapWidth = mapWidth ?? this.mapWidth
    this.mapHeight = mapHeight ?? this.mapHeight
    this.map = map || this.defaultMap()
  }

  changePauseGame() {
    if (this.state === 1 || this.state === 2) {
      this.state = this.state === 1?2:1
    }
  }

  /**
   * @param {'start'|'pause'|'over'|'win'} state
   */
  setState(state) {
    const stateMap = new Map([
      ['start', {
        id:1,
        startStateFunction:() => {
          setHidden('#winGame', true)
          setHidden('#gameOver', true)
          setHidden('#welcome', true)
        },
      }],
      ['pause', {id:2}],
      ['over', {
        id:3, startStateFunction:() => {
          setHidden('#gameOver', false)
        },
      }],
      ['win', {
        id:4, startStateFunction:() => {
          setHidden('#winGame', false)
        },
      }],
    ])
    const newState = stateMap.get(state)
    this.state = newState.id
    if (newState.startStateFunction) {
      newState.startStateFunction()
    }
  }

  isGameOver = () => this.state === 3
  isWin = () => this.state === 4
}