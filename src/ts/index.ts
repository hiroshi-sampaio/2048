import {Game} from "./game";
import {Banana} from "./banana";

function game(lines: number, columns: number, boardElement: Element) {
    let app = new Game(lines, columns, new Banana(boardElement));
}

