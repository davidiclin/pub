currentLevel = 1;
var plan = []
var puzzle = []
var getSudoku = new XMLHttpRequest(); // a new request
sudokuFile = "https://davidiclin.github.io/pub/json/sudoku_bank/Level_" + currentLevel + ".json";
getSudoku.open("GET", sudokuFile, false);
getSudoku.send(null);
const bank = JSON.parse(getSudoku.responseText);
var pick = Math.floor(Math.random() * bank.length);
plan = bank[pick].plan;
puzzle = bank[pick].puzzle;

shufflePuzzle()

for (var count1 = 0; count1 < 9; count1++) {
  for (var count2 = 0; count2 < 9; count2++) {
    if (puzzle[count1 * 9 + count2] == 0) {
      document.getElementById("matrix").innerHTML += "<form class=\"cellContainer\" id=\"f" + (count1 * 9 + count2) + "\"><input class=\"cell\" type=\"number\" min=\"1\" max=\"9\" name=\"f" + (count1 * 9 + count2) + "\"></form>"
    }
    else {
      document.getElementById("matrix").innerHTML += "<span class=\"cellContainer\" id=\"f" + (count1 * 9 + count2) + "\"><input class=\"cell\" type=\"number\" disabled=\"True\" value=\"" + plan[count1 * 9 + count2] + "\"></input></span>"
    }
  }
  document.getElementById("matrix").innerHTML += "<br>"
}
for (var count = 0; count < 81; count++) {
  thisId = "f" + count
  if (count < 9) {
    document.getElementById(thisId).style.borderTop = "3px outset MediumAquaMarine";
  }
  if (count > 26 & count < 36) {
    document.getElementById(thisId).style.borderTop = "3px outset MediumAquaMarine";
  }
  if (count > 53 & count < 63) {
    document.getElementById(thisId).style.borderTop = "3px outset MediumAquaMarine";
  }
  if (count > 71) {
    document.getElementById(thisId).style.borderBottom = "3px outset MediumAquaMarine";
  }
  if (count % 3 == 0) {
    document.getElementById(thisId).style.borderLeft = "3px outset MediumAquaMarine";
  }
  if (count % 9 == 8) {
    document.getElementById(thisId).style.borderRight = "3px outset MediumAquaMarine";
  }
  if (puzzle[count] == 0) {
    document.getElementById(thisId).style.backgroundColor = "rgba(72, 209, 204, .25)";
  }
}

function shufflePuzzle() {
  var rotateCount = Math.floor(Math.random() * 3);
  for (var count = 0; count < rotateCount; count++) {
    rotateIt()
  }

  var swapTokenCount = Math.floor(Math.random() * 3);
  for (var count = 0; count < swapTokenCount; count++) {
    swapToken()
  }

  swapBigRows();

  var swapTokenCount = Math.floor(Math.random() * 3);
  for (var count = 0; count < swapTokenCount; count++) {
    swapRows()
  }
}

function rotateIt() {
  var newPl = [];
  var newPz = [];
  for (var count1 = 72; count1 < 81; count1++) {
    for (var count2 = 0; count2 < 9; count2++) {
      newPl.push(plan[count1 - count2 * 9]);
      newPz.push(puzzle[count1 - count2 * 9]);
    }
  }
  plan = newPl;
  puzzle = newPz;
}

function swapToken() {
  var swap1 = Math.floor(Math.random() * 9);
  var swap2 = Math.floor(Math.random() * 9);
  if (swap1 == swap2) {
    return
  }
  for (var count = 0; count < 81; count ++) {
    if (plan[count] == swap1) {
      plan[count] = 10;
      if (puzzle[count] != 0) {
        puzzle[count] = 10;
      }
    }
  }
  for (var count = 0; count < 81; count ++) {
    if (plan[count] == swap2) {
      plan[count] = swap1;
      if (puzzle[count] != 0) {
        puzzle[count] = swap1;
      }
    }
  }
  for (var count = 0; count < 81; count ++) {
    if (plan[count] == 10) {
      plan[count] = swap2;
      if (puzzle[count] == 10) {
        puzzle[count] = swap2;
      }
    }
  }
}

function swapBigRows() {
  var newPl = []
  var newPz = []
  var swap1 = Math.floor(Math.random() * 3);
  var swap2 = Math.floor(Math.random() * 3);
  if (swap1 == swap2) {
    return
  }
  var swap3 = [0,1,2].filter(x => x != swap1 & x != swap2)[0]
  for (var count = 0; count < 27; count++) {
    newPl.push(plan[count + swap1 * 27])
    newPz.push(puzzle[count + swap1 * 27])
  }
  for (var count = 0; count < 27; count++) {
    newPl.push(plan[count + swap2 * 27])
    newPz.push(puzzle[count + swap2 * 27])
  }
  for (var count = 0; count < 27; count++) {
    newPl.push(plan[count + swap3 * 27])
    newPz.push(puzzle[count + swap3 * 27])
  }
  plan = newPl;
  puzzle = newPz
}

function swapRows() {
  var seed = Math.floor(Math.random() * 3);
  var swap1 = Math.floor(Math.random() * 3) + seed * 3;
  var swap2 = Math.floor(Math.random() * 3) + seed * 3;
  if (swap1 == swap2) {
    return
  }
  for (count = 0; count < 9; count++) {
    var tempPl = plan[swap1 * 9 + count];
    var tempPz = puzzle[swap1 * 9 + count];
    plan[swap1 * 9 + count] = plan[swap2 * 9 + count];
    puzzle[swap1 * 9 + count] = puzzle[swap2 * 9 + count];
    plan[swap2 * 9 + count] = tempPl;
    puzzle[swap2 * 9 + count] = tempPz
  }
}
