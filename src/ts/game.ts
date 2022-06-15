import {GameAction} from "./gameAction";
import {Banana} from "./banana";

const BOARD_CLASS_NAME = "board";
const PIECE_CLASS_NAME = "piece";

export class Game implements GameAction {

    private readonly lines: number;
    private readonly columns: number;
    private screen: Banana;
    private readonly squareToNumber: number[];

    constructor(lines: number, columns: number, screen: Banana) {
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

    slideUp(): [] {
        return [];
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
            moves = this.slideLeft();
        } else if (key === "s" || key === "S" || key === "k" || key === "K" || key === "ArrowDown" || key === "2") {
            moves = this.slideDown();
        } else if (key === "d" || key === "D" || key === "l" || key === "L" || key === "ArrowRight" || key === "6") {
            moves = this.slideRight();
        } else if (key === " ") {
        }
        this.drawIt();
    }

    drawIt() {
        console.trace("drawIt");

        while (this.screen.boardElement.hasChildNodes()) {
            this.screen.boardElement.firstChild.remove();
        }

        for (let index = 0; index < this.squareToNumber.length; index++) {
            if (!this.squareToNumber[index]) continue;

            const numberDiv: HTMLDivElement = document.createElement("div");

            const numberAsString = this.squareToNumber[index].toString();

            for (let c = 0; c < numberAsString.length; c++) {
                const img: HTMLImageElement = document.createElement("img");
                img.src = numberAsString.charAt(c) + ".svg";
                img.style.width = (100 / numberAsString.length) + "%";
                img.style.height = "100%";
                numberDiv.appendChild(img);
            }


            const pieceDiv: HTMLDivElement = document.createElement("div");
            pieceDiv.appendChild(numberDiv);
            pieceDiv.className = PIECE_CLASS_NAME;
            pieceDiv.style.width = (100 / this.columns) + "%";
            pieceDiv.style.height = (100 / this.lines) + "%";
            pieceDiv.style.top = (100 / this.lines * Math.floor(index / this.lines)) + "%";
            pieceDiv.style.left = (100 / this.columns * (index % this.lines)) + "%";
            this.screen.boardElement.appendChild(pieceDiv);
        }
    }

    slideDown(): [] {
        return [];
    }

    slideLeft(): [] {
        return [];
    }

    slideRight(): [] {
        return [];
    }

}