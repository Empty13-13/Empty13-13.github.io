export default class Enemy {
  name
  color
  scatterTarget
  x = 1
  y = 1
  direction = 'right'
  nextDirection = 'right'
  speed = 0.1
  image = ''
  lastAnimationTime = 0
  animationFrameIndex = 0
  animationFrameDuration = 150
  frameWidth = 48
  frameHeight = 80

  /**
   * @param {String} name
   * @param {String<'Hex'>} color
   * @param {{x:number,y:number}} scatterTarget
   * @param x
   * @param y
   * @param direction
   * @param nextDirection
   * @param speed
   */
  constructor(name, color, scatterTarget, {
    x,
    y,
    direction,
    nextDirection,
    speed,
  } = {}) {
    this.name = name
    this.color = color
    this.scatterTarget = scatterTarget
    this.x = x ?? this.x
    this.y = y ?? this.y
    this.direction = direction ?? this.direction
    this.nextDirection = nextDirection ?? this.nextDirection
    this.speed = speed ?? this.speed

  }
}