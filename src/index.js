// @flow
'use strict'

const BOARD_CLASS_NAME = "board";
const PIECE_CLASS_NAME = "piece";

interface GameAction {

    slideUp();

    slideDown();

    slideLeft();

    slideRight();
}

class Game implements GameAction {
    constructor(lines: number, columns: number, screen: Screen) {
        this.lines = lines;
        this.columns = columns;
        this.screen = screen;
        this.squareToNumber = Array<number>(lines * columns);

        for (let i = 0; i < this.squareToNumber.length; i++) {
            this.squareToNumber[i] = NaN;
        }
        window.onkeydown = this.handleInput.bind(this);
        this.drawIt();
    }

    getEmptySquares(): number[] {
        console.trace("this.squareToNumber", this.squareToNumber);
        return this.squareToNumber.reduce((previousValue: number[], currentValue: number, currentIndex: number) => {
            if (!currentValue) previousValue.push(currentIndex);
            return previousValue;
        }, []);
    }

    giveNumber(): boolean {
        const emptySquares = this.getEmptySquares();
        console.trace("emptySquares", emptySquares);
        if (emptySquares.length > 0) {
            const index = emptySquares[Math.floor(Math.random() * emptySquares.length)];
            this.squareToNumber[index] = Math.pow(2, Math.floor(Math.random() * 10));
            console.trace("Given number: ", this.squareToNumber[index]);
            return true;
        } else {
            console.trace("Game over");
            return false;
        }
    }

    slideUp() {

    }

    handleInput(keyboardEvent: KeyboardEvent) {
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

        for (let i = 0; i < this.squareToNumber.length; i++) {
            if (!this.squareToNumber[i]) continue;

            const numberDiv = document.createElement<HTMLDivElement>("div");

            const numberAsString = this.squareToNumber[i].toString();

            for (let char of numberAsString) {
                const img = document.createElement<HTMLImageElement>("img");
                img.src = char + ".svg";
                img.style.width = (100 / numberAsString.length) + "%";
                img.style.height = "100%";
                numberDiv.appendChild(img);
            }


            const pieceDiv = document.createElement<HTMLDivElement>("div");
            pieceDiv.appendChild(numberDiv);
            pieceDiv.className = PIECE_CLASS_NAME;
            pieceDiv.style.width = (100 / this.columns) + "%";
            pieceDiv.style.height = (100 / this.lines) + "%";
            pieceDiv.style.top = (100 / this.lines * Math.floor(i / this.lines)) + "%";
            pieceDiv.style.left = (100 / this.columns * (i % this.lines)) + "%";
            this.screen.boardElement.appendChild(pieceDiv);
        }
    }
}

class Screen {

    constructor(boardElement: Element) {
        this.boardElement = boardElement;
    }
}

function game(lines: number, columns: number, boardElement: Element) {
    let app = new Game(lines, columns, new Screen(boardElement));
}

