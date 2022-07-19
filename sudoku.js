var plan = [5,6,1,3,2,7,4,8,9,9,8,4,1,5,6,3,7,2,3,7,2,4,8,9,6,1,5,1,4,9,6,3,5,8,2,7,7,3,8,2,4,1,5,9,6,2,5,6,7,9,8,1,4,3,6,9,5,8,1,2,7,3,4,4,1,7,9,6,3,2,5,8,8,2,3,5,7,4,9,6,1]
var puzzle = [0,0,0,3,0,0,0,0,9,0,0,0,0,0,0,0,7,0,3,0,2,0,8,9,0,1,5,0,4,0,0,0,5,0,2,0,0,0,8,0,0,1,0,9,6,0,0,0,7,0,8,0,0,0,6,0,0,0,1,0,0,3,4,0,0,7,0,6,3,0,0,8,0,2,0,5,7,0,0,6,0]

for (count1 = 0; count1 < 9; count1++) {
  for (count2 = 0; count2 < 9; count2++) {
    if (puzzle[count1 * 9 + count2] == 0) {
      document.getElementById("matrix").innerHTML += "<form class=\"cellContainer\" id=\"f" + (count1 * 9 + count2) + "\"><input class=\"cell\" type=\"number\" min=\"1\" max=\"9\" name=\"f" + (count1 * 9 + count2) + "\"></form>"
    }
    else {
      document.getElementById("matrix").innerHTML += "<span class=\"cellContainer\" id=\"f" + (count1 * 9 + count2) + "\"><input class=\"cell\" type=\"number\" disabled=\"True\" value=\"" + plan[count1 * 9 + count2] + "\"></input></span>"
    }
  }
  document.getElementById("matrix").innerHTML += "<br>"
}
for (count = 0; count < 81; count++) {
  thisId = "f" + count
  if (count < 9) {
    document.getElementById(thisId).style.borderTop = "3px solid black";
  }
  if (count > 26 & count < 36) {
    document.getElementById(thisId).style.borderTop = "3px solid black";
  }
  if (count > 53 & count < 63) {
    document.getElementById(thisId).style.borderTop = "3px solid black";
  }
  if (count > 71) {
    document.getElementById(thisId).style.borderBottom = "3px solid black";
  }
  if (count % 3 == 0) {
    document.getElementById(thisId).style.borderLeft = "3px solid black";
  }
  if (count % 9 == 8) {
    thisId = "f" + count
    document.getElementById(thisId).style.borderRight = "3px solid black";
  }
  if (puzzle[count] == 0) {
    document.getElementById(thisId).style.backgroundColor = "rgba(155, 155, 175, .25)";
  }
}
