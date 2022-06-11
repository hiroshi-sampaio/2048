const MERGE = 0;
const MOVE = 1;

const squares = document.getElementsByClassName("square");
let freeSquares = 16;
const field = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

giveNumber();

function squareAt(row, col) {
  return squares[4 * row + col];
}

document.onkeydown = function (e) {
  let moves;
  switch (e.key) {
    case "w": case "W": case "i": case "I": case "ArrowUp":case "8":
      moves = slideUp();
      break;
    case "a": case "A": case "j": case "J": case "ArrowLeft":case "4":
      moves = slideLeft();
      break;
    case "s": case "S": case "k": case "K": case "ArrowDown":case "2":
      moves = slideDown();
      break;
    case "d": case "D": case "l": case "L": case "ArrowRight":case "6":
      moves = slideRight();
      break;
  }
  if (moves) {
    giveNumber();
  }
  drawIt();
};

function drawIt() {
  let str = "";
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      // if (field[row][col] < 10 ) str += "_";
      str += field[row][col] + " ";
    }
    str += "<br>";
  }
  document.getElementById("text").innerHTML = str;
}

function giveNumber() {
  if (freeSquares > 0) {
    let p = Math.floor(Math.random() * freeSquares);
    let i = 0;
    while (true) {
      while (field[Math.floor(i / 4)][i % 4] !== 0) {
        i++;
      }
      if (p === 0) {
        break;
      }
      p--;
      i++;
    }
    field[Math.floor(i / 4)][i % 4] = 2;
    freeSquares--;
  }
}

function slideUp() {
  const moves = [];

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 4; col++) {
      if (field[row][col] !== 0) {
        let itemRow = row + 1;
        while (itemRow < 4 && field[itemRow][col] === 0) {
          itemRow++;
        }
        if (itemRow < 4 && field[row][col] === field[itemRow][col]) {
          field[row][col] *= 2;
          field[itemRow][col] = 0;
          freeSquares++;
          moves.push([MERGE, squareAt(itemRow, col), squareAt(row, col)]);
        }
      }
    }
  }

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 4; col++) {
      if (field[row][col] === 0) {
        let itemRow = row + 1;
        while (itemRow < 4 && field[itemRow][col] === 0) {
          itemRow++;
        }
        if (itemRow < 4) {
          field[row][col] = field[itemRow][col];
          field[itemRow][col] = 0;
          moves.push([MOVE, squareAt(itemRow, col), squareAt(row, col)]);
        }
      }
    }
  }

  return moves;
}

function slideDown() {
  let changed = false;

  for (let row = 3; row > 0; row--) {
    for (let col = 0; col < 4; col++) {
      if (field[row][col] !== 0) {
        let itemRow = row - 1;
        while (itemRow >= 0 && field[itemRow][col] === 0) {
          itemRow--;
        }
        if (itemRow >= 0 && field[row][col] === field[itemRow][col]) {
          field[row][col] *= 2;
          field[itemRow][col] = 0;
          freeSquares++;
          changed = true;
        }
      }
    }
  }

  for (let row = 3; row > 0; row--) {
    for (let col = 0; col < 4; col++) {
      if (field[row][col] === 0) {
        let itemRow = row - 1;
        while (itemRow >= 0 && field[itemRow][col] === 0) {
          itemRow--;
        }
        if (itemRow >= 0) {
          field[row][col] = field[itemRow][col];
          field[itemRow][col] = 0;
          changed = true;
        }
      }
    }
  }

  return changed;
}

function slideLeft() {
  let changed = false;

  for (let col = 0; col < 3; col++) {
    for (let row = 0; row < 4; row++) {
      if (field[row][col] !== 0) {
        let itemCol = col + 1;
        while (itemCol < 4 && field[row][itemCol] === 0) {
          itemCol++;
        }
        if (itemCol < 4 && field[row][col] === field[row][itemCol]) {
          field[row][col] *= 2;
          field[row][itemCol] = 0;
          freeSquares++;
          changed = true;
        }
      }
    }
  }

  for (let col = 0; col < 3; col++) {
    for (let row = 0; row < 4; row++) {
      if (field[row][col] === 0) {
        let itemCol = col + 1;
        while (itemCol < 4 && field[row][itemCol] === 0) {
          itemCol++;
        }
        if (itemCol < 4) {
          field[row][col] = field[row][itemCol];
          field[row][itemCol] = 0;
          changed = true;
        }
      }
    }
  }

  return changed;
}

function slideRight() {
  let changed = false;

  for (let col = 3; col > 0; col--) {
    for (let row = 0; row < 4; row++) {
      if (field[row][col] !== 0) {
        let itemCol = col - 1;
        while (itemCol >= 0 && field[row][itemCol] === 0) {
          itemCol--;
        }
        if (itemCol >= 0 && field[row][col] === field[row][itemCol]) {
          field[row][col] *= 2;
          field[row][itemCol] = 0;
          freeSquares++;
          changed = true;
        }
      }
    }
  }

  for (let col = 3; col > 0; col--) {
    for (let row = 0; row < 4; row++) {
      if (field[row][col] === 0) {
        let itemCol = col - 1;
        while (itemCol >= 0 && field[row][itemCol] === 0) {
          itemCol--;
        }
        if (itemCol >= 0) {
          field[row][col] = field[row][itemCol];
          field[row][itemCol] = 0;
          changed = true;
        }
      }
    }
  }

  return changed;
}
