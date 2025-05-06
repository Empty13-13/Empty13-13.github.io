/**
 *
 * @param {String} nodeName
 * @param {Boolean} value
 */
export function setHidden(nodeName, value) {
  const node = document.querySelector(nodeName)
  if (node) {
    if (value) {
      node.style.display = 'none';
    }
    else {
      node.removeAttribute('style')
    }
  }
}

/**
 * @param {String} nodeName
 * @param {Function} eventFunction
 */
export function wrapSetEventClick(nodeName, eventFunction) {
  let nodeEl = document.querySelector(nodeName)
  if (nodeEl) {
    nodeEl.addEventListener('click', eventFunction)
  }
}

/**
 *
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function getRandomInt(min, max) {
  let minVal = Math.ceil(Number(min));
  let maxVal = Math.floor(Number(max)) + 1;

  if (!Number.isFinite(minVal) || !Number.isFinite(maxVal)) {
    throw new Error('Invalid input: min and max must be finite numbers');
  }

  // Меняем местами, если min > max
  if (minVal > maxVal) {
    [minVal, maxVal] = [maxVal, minVal];
  }

  return Math.floor(Math.random() * (maxVal - minVal)) + minVal;
}

/**
 * @desc Асинхронная загрузка изображений с возможностью ожидания
 * @param {String} src
 * @returns {Promise<unknown>}
 */
export async function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;

    // Изображение уже загружено (например, из кэша)
    if (img.complete) {
      resolve(img);
      return;
    }

    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
  });
}

export function plusCoordinates(aCoord, bCoord) {
  return {x:aCoord.x + bCoord.x, y:aCoord.y + bCoord.y}
}