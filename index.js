var MERGE = 0;
var MOVE = 1;

var squares = document.getElementsByClassName("square");
var freeSquares = 16;
var field = [ [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0] ];

giveNumber();

function squareAt(row, col) {
	return squares[4 * row + col];
}

document.onkeydown = function(e) {
	var moves;
	switch(e.keyCode) {
		case 87: case 73: case 38: case 104:	// w i up pad8
			moves = slideUp();
			break;
		case 65: case 74: case 37: case 100:	// a j left pad4
			moves = slideLeft();
			break;
		case 83: case 75: case 40: case 98:		// s k down pad2
			moves = slideDown();
			break;
		case 68: case 76: case 39: case 102:	// d l right pad6
			moves = slideRight();
			break;
	}
	if (moves) giveNumber();
	drawIt();
};

function drawIt() {
	var str = "";
	for (row = 0; row < 4; row++) {
		for (col = 0; col < 4; col++) {
			// if (field[row][col] < 10 ) str += "_";
			str += field[row][col] + " ";
		}
		str += "<br>";
	}
	document.getElementById("text").innerHTML = str;
}

function giveNumber() {
	if (freeSquares > 0) {
		var p = Math.floor(Math.random() * freeSquares);
		var i = 0;
		while (true) {
			while (field[Math.floor(i / 4)][i % 4] != 0) i++;
			if (p==0) break;
			p--; i++;
		}
		field[Math.floor(i / 4)][i % 4] = 2;
		freeSquares--;
	}
}

function slideUp() {
	var moves = [];
	
	for (row=0; row<3; row++) 
		for (col=0; col<4; col++) 
			if (field[row][col] != 0) {
				itemRow = row + 1;
				while (itemRow < 4 && field[itemRow][col] == 0) itemRow++;
				if (itemRow < 4 && field[row][col] == field[itemRow][col]) {
					field[row][col] *= 2;
					field[itemRow][col] = 0;
					freeSquares++;
					moves.push( [ MERGE, squareAt(itemRow, col), squareAt(row, col) ] );
				}
			}
	
	for (row=0; row<3; row++) 
		for (col=0; col<4; col++) 
			if (field[row][col] == 0) {
				itemRow = row + 1;
				while (itemRow < 4 && field[itemRow][col] == 0) itemRow++;
				if (itemRow < 4) {
					field[row][col] = field[itemRow][col];
					field[itemRow][col] = 0;
					moves.push( [ MOVE, squareAt(itemRow, col), squareAt(row, col) ] );
				}
			}
			
	return moves;
}

function slideDown() {
	changed = false;

	for (row=3; row>0; row--) 
		for (col=0; col<4; col++) 
			if (field[row][col] != 0) {
				itemRow = row - 1;
				while (itemRow >= 0 && field[itemRow][col] == 0) itemRow--;
				if (itemRow >= 0 && field[row][col] == field[itemRow][col]) {
					field[row][col] *= 2;
					field[itemRow][col] = 0;
					freeSquares++;
					changed = true;
				}
			}
	
	for (row=3; row>0; row--) 
		for (col=0; col<4; col++) 
			if (field[row][col] == 0) {
				itemRow = row - 1;
				while (itemRow >= 0 && field[itemRow][col] == 0) itemRow--;
				if (itemRow >= 0) {
					field[row][col] = field[itemRow][col];
					field[itemRow][col] = 0;
					changed = true;
				}
			}
			
	return changed;
}

function slideLeft() {
	changed = false;

	for (col=0; col<3; col++) 
		for (row=0; row<4; row++) 
			if (field[row][col] != 0) {
				itemCol = col + 1;
				while (itemCol < 4 && field[row][itemCol] == 0) itemCol++;
				if (itemCol < 4 && field[row][col] == field[row][itemCol]) {
					field[row][col] *= 2;
					field[row][itemCol] = 0;
					freeSquares++;
					changed = true;
				}
			}
	
	for (col=0; col<3; col++) 
		for (row=0; row<4; row++) 
			if (field[row][col] == 0) {
				itemCol = col + 1;
				while (itemCol < 4 && field[row][itemCol] == 0) itemCol++;
				if (itemCol < 4) {
					field[row][col] = field[row][itemCol];
					field[row][itemCol] = 0;
					changed = true;
				}
			}
			
	return changed;
}

function slideRight() {
	changed = false;
	
	for (col=3; col>0; col--) 
		for (row=0; row<4; row++) 
			if (field[row][col] != 0) {
				itemCol = col - 1;
				while (itemCol >= 0 && field[row][itemCol] == 0) itemCol--;
				if (itemCol >= 0 && field[row][col] == field[row][itemCol]) {
					field[row][col] *= 2;
					field[row][itemCol] = 0;
					freeSquares++;
					changed = true;
				}
			}
	
	for (col=3; col>0; col--) 
		for (row=0; row<4; row++) 
			if (field[row][col] == 0) {
				itemCol = col - 1;
				while (itemCol >= 0 && field[row][itemCol] == 0) itemCol--;
				if (itemCol >= 0) {
					field[row][col] = field[row][itemCol];
					field[row][itemCol] = 0;
					changed = true;
				}
			}
			
	return changed;
}
