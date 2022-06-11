//      
'use strict'

const BOARD_CLASS_NAME = "board";
const PIECE_CLASS_NAME = "piece";

class Movement {

    constructor(box     ) {
        this.box = box;
    }
}

class SlideMovement extends Movement {

    constructor(box     , to       ) {
        super(box);
        this.to = to;
    }
}

class MergeMovement extends SlideMovement {

    constructor(box     , to       , boxToMerge     ) {
        super(box, to);
        this.boxToMerge = boxToMerge;
    }
}

class Coord {
    constructor(line         = 0, column         = 0) {
        this.line = line;
        this.column = column;
    }
}

class Box {
    constructor(coord        = null, onBoard          = false, value         = 2048) {
        this.coord = coord;
        this.onBoard = onBoard;
        this.value = value;
    }
}


class App {
    constructor(lines        , columns        , screen        , boxes        = [], coords          = []) {
        this.lines = lines;
        this.columns = columns;
        this.screen = screen;
        this.boxes = boxes;
        this.coords = coords;
    }

    init() {
        for (let line = 0; line < this.lines; line++) {
            for (let column = 0; column < this.columns; column++) {
                this.coords.push(new Coord(line, column));
            }
        }
        for (let i = 0; i < this.lines * this.columns; i++) {
            this.boxes.push(new Box());
        }
        window.onkeydown = this.handleInput.bind(this);
        this.drawIt();
    }

    getEmptyCoords()          {
        const usedCoords = this.boxes.filter(box => box.onBoard).map(box => box.coord);
        console.trace("usedCoords", usedCoords);
        console.trace("this.coords", this.coords);
        const unusedCoords = this.coords.reduce((previousValue, currentValue       ) => {
            if (usedCoords.findIndex(coord => coord === currentValue) === -1) {
                previousValue.push(currentValue);
            }
            return previousValue;
        }, Array.of       ());
        console.trace("unusedCoords", unusedCoords);
        return unusedCoords;
    }

    giveNumber()          {
        const box = this.boxes.find((value     ) => value.onBoard === false);
        if (box) {
            const emptyCoords = this.getEmptyCoords();
            box.coord = emptyCoords[Math.floor(Math.random() * emptyCoords.length)];
            box.onBoard = true;
            box.value = Math.pow(2, Math.floor(Math.random() * 10));
            console.trace("Given number: ", box);
            return true;
        } else {
            console.trace("Game over");
            return false;
        }
    }

    getOnBoardBoxes()        {
        return this.boxes.filter(box => box.onBoard);
    }

    getBoxesGroupedByColumn()         {
        return this.getOnBoardBoxes().reduce((result, currentValue     ) => {
            (result[currentValue.coord.column] = result[currentValue.coord.column] || []).push(currentValue);
            return result;
        }, {});
    }

    getBoxesGroupedByLine()         {
        return this.getOnBoardBoxes().reduce((result, currentValue     ) => {
            (result[currentValue.coord.line] = result[currentValue.coord.line] || []).push(currentValue);
            return result;
        }, {});
    }

    slideUp() {
        const boxesGroupedByColumn = this.getBoxesGroupedByColumn();

        for (let column in boxesGroupedByColumn) {
            const boxes        = boxesGroupedByColumn[column];
            boxes.sort((box1, box2) => box1.coord.line - box2.coord.line);
            console.trace(column, boxes);
        }

        console.log("boxesGroupedByColumn", boxesGroupedByColumn);
    }

    handleInput(keyboardEvent               ) {
        console.log(keyboardEvent);
        let moves;
        let key = keyboardEvent.key;
        console.log(this);
        if (key === "w" || key === "W" || key === "i" || key === "I" || key === "ArrowUp" || key === "8") {
            this.slideUp();
            this.giveNumber();
        } else if (key === "a" || key === "A" || key === "j" || key === "J" || key === "ArrowLeft" || key === "4") {
            moves = slideLeft();
        } else if (key === "s" || key === "S" || key === "k" || key === "K" || key === "ArrowDown" || key === "2") {
            moves = slideDown();
        } else if (key === "d" || key === "D" || key === "l" || key === "L" || key === "ArrowRight" || key === "6") {
            moves = slideRight();
        } else if (key === " ") {
            for (let box of this.boxes) {
                box.onBoard = false;
            }
        }
        this.drawIt();
    }

    drawIt() {
        console.trace("drawIt");

        while (this.screen.boardElement.hasChildNodes()) {
            this.screen.boardElement.firstChild.remove();
        }

        for (let box of this.getOnBoardBoxes()) {
            const pieceDiv = document.createElement                ("div");
            pieceDiv.className = PIECE_CLASS_NAME;
            pieceDiv.style.width = (100 / this.columns) + "%";
            pieceDiv.style.height = (100 / this.lines) + "%";
            pieceDiv.style.top = (100 / this.lines * box.coord.line) + "%";
            pieceDiv.style.left = (100 / this.columns * box.coord.column) + "%";


            const numberAsString = box.value.toString();

            for (let char of numberAsString) {
                const img = document.createElement                  ("img");
                img.src = char + ".svg";
                img.style.width = (100 / numberAsString.length) + "%";
                img.style.height = "100%";
                pieceDiv.appendChild(img);
            }

            this.screen.boardElement.appendChild(pieceDiv);
        }
    }
}

class Screen {

    constructor(boardElement         ) {
        this.boardElement = boardElement;
    }
}

function game(lines        , columns        , boardElement         ) {
    let app = new App(lines, columns, new Screen(boardElement));
    app.init();
}

