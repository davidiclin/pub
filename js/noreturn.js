var Getmaps = new XMLHttpRequest(); // a new request
Getmaps.open("GET","https://davidiclin.github.io/pub/json/NRmap.json",false);
Getmaps.send(null);
const maps = JSON.parse(Getmaps.responseText);
var pick = Math.floor(Math.random() * 251);
var map = maps[pick].mapcode.split("-");
var route = maps[pick].path;
console.log(route);
var currentRow = 17;
var currentLocation;
var path = [];
var hearts = 4;
var initHTML = document.getElementById("showmap").innerHTML;
var backgroundImg = "paper" + (Math.floor(Math.random() * 5) + 1) + ".jpg";
var recon = 3;
var fireSupport = 2;
var audio1 = new Audio("https://davidiclin.github.io/pub/audio/bombard.mp3");
var audio2 = new Audio("https://davidiclin.github.io/pub/audio/cricket.mp3");
var audio3 = new Audio("https://davidiclin.github.io/pub/audio/canary.mp3");
var audio4 = new Audio("https://davidiclin.github.io/pub/audio/fight.mp3");

document.getElementById("showmap").style.backgroundImage = "url(\'NRmap_tiles/" + backgroundImg + "\')";

function startHandler(x) {
  if (currentRow < 17) {
    return;
  }
  for (count = 102; count < 108; count++) {
    document.getElementById(count).innerHTML = "<img src=\"NRmap_tiles/blank.png\">"
  }
  document.getElementById(x).innerHTML = "<img src=\"NRmap_tiles/start.png\">";
  document.getElementById("barMidLeft").src = "NRmap_tiles/recon.png";
  document.getElementById("barMidRight").src = "NRmap_tiles/fire.png";
  renderNewRow();
  focusOn(x-6);
}

function renderNewRow() {
  currentRow -= 1;
  console.log(currentRow);
  if (currentRow === -1) {
    revealAll();
    document.getElementById("topEndBack").src = "NRmap_tiles/topmost.jpg";
    document.getElementById("topEnd").style.height = "650px";
    document.getElementById("barMidLeft").src = "";
    document.getElementById("barMidRight").src = "";
    document.getElementById("barLeft").src = "";
    thisScore = getScore();
    thisRank = getRank(thisScore);
    document.getElementById("message").innerHTML = "Moves : " + path.length + "<br>" +
                                                   "Recon Dispatched : " + (3 -recon) + "<br>" +
                                                   "Fire Support Requested : " + (2 - fireSupport) + "<br>" +
                                                   "Casualties : " + Math.floor((4 - hearts) / 4 * 100) + "%" + "<br>" +
                                                   "Final Score : " + thisScore + "<br>" +
                                                   "Rank : " + thisRank;
    return;
  }
  var oldHTML = document.getElementById("showmap").innerHTML;
  var addHTML = "<tr>";
  for (var count = 0; count < 6; count++) {
    addHTML += "<td id=\"" + ((currentRow * 6) + count) + "\"></td>";
  }
  document.getElementById("showmap").innerHTML = addHTML + "</tr>" + oldHTML
}

function focusOn(x) {
  currentLocation = x;
  console.log(currentLocation);
  path.push(currentLocation);
  document.getElementById("message").innerHTML = "";
  var imgHTML = "<img src=\"NRmap_tiles/t" + map[currentLocation] + ".png\">";
  var upHTML = "<img class=\"up-arrow\" src=\"NRmap_tiles/upward.png\" onclick=\"actionHandler(\'up\')\">";
  var leftHTML = "<img class=\"left-arrow\" src=\"NRmap_tiles/left.png\" onclick=\"actionHandler(\'left\')\">";
  var rightHTML = "<img class=\"right-arrow\" src=\"NRmap_tiles/right.png\" onclick=\"actionHandler(\'right\')\">";
  var pawnHTML = "<img class=\"pawn\" src=\"NRmap_tiles/pawn.png\">"
  if (map[currentLocation][4] === "1") {
    hearts -= 1;
    audio4.play();
    document.getElementById("barLeft").src = "NRmap_tiles/heart" + hearts + ".png";
    if (hearts === 3) {
      document.getElementById("message").innerHTML = "\"We just lost a quarter of our men!\""
    }
    if (hearts === 2) {
      document.getElementById("message").innerHTML = "\"Things ain't looking good, sir!\""
    }
    if (hearts === 1) {
      document.getElementById("message").innerHTML = "\"We got hit hard! Let's get outta here!\""
    }
  }
  if (hearts === 0) {
    document.getElementById(currentLocation).innerHTML = imgHTML;
    document.getElementById("barMidLeft").src = "";
    document.getElementById("barMidRight").src = "";
  }
  else {
    if (path.includes(currentLocation - 1)) {
      leftHTML = "";
    }
    if (map[currentLocation][0] === "0") {
      leftHTML = "";
    }
    if (path.includes(currentLocation + 1)) {
      rightHTML = "";
    }
    if (map[currentLocation][2] === "0") {
      rightHTML = "";
    }
    document.getElementById(currentLocation).innerHTML = imgHTML + upHTML + leftHTML + rightHTML + pawnHTML;
  }
}

function actionHandler(m) {
  document.getElementById(currentLocation).innerHTML = "<img src=\"NRmap_tiles/t" + map[currentLocation] + ".png\">";
  if (m === "up") {
    renderNewRow();
    if (currentLocation > 5) {
    focusOn(currentLocation - 6);
    }
  }
  if (m === "left") {
    focusOn(currentLocation - 1);
  }
  if (m === "right") {
    focusOn(currentLocation + 1);
  }
}

function revealAll() {
  for (count = 0; count < 102; count++) {
    if (path.includes(count)) {
      continue;
    }
    if (map[count][4] === "1") {
      document.getElementById(count).innerHTML = "<img src=\"NRmap_tiles/t" + map[count].slice(0,4) + "2" + ".png\" class = \"unvisited\">";
    }
    else {
      document.getElementById(count).innerHTML = "<img src=\"NRmap_tiles/t" + map[count] + ".png\" class = \"unvisited\">";
    }
  }
}

function fireSupp() {
  if (fireSupport < 1) {
    return;
  }
  fireSupport -= 1;
  document.getElementById("message").innerHTML = "\"Fire support incoming!\""
  audio1.play();
  document.getElementById("barMidRight").src = "NRmap_tiles/boom.gif";
  setTimeout(function(){
    document.getElementById("barMidRight").src = "NRmap_tiles/fire" + fireSupport + ".png";
  }, 1500);
  if (currentLocation % 6 > 0) {
    if (! path.includes(currentLocation - 1)) {
      if (map[currentLocation - 1][4] === "1") {
        map[currentLocation - 1] = map[currentLocation - 1].slice(0,4) + "2";
      }
    }
  }
  if (currentLocation % 6 < 5) {
    if (! path.includes(currentLocation + 1)) {
      if (map[currentLocation + 1][4] === "1") {
        map[currentLocation + 1] = map[currentLocation + 1].slice(0,4) + "2";
      }
    }
  }
  if (currentRow > 0) {
    if (map[currentLocation - 6][4] === "1") {
      map[currentLocation - 6] = map[currentLocation - 6].slice(0,4) + "2";
    }
  }
}

function sendRecon() {
  var enemySpotted;
  if (recon < 1) {
    return;
  }
  recon -= 1;
  document.getElementById("barMidLeft").src = "NRmap_tiles/recon" + recon + ".png";
  if (currentLocation > 0) {
    if (map[currentLocation - 1][4] === "1") {
      for (count = 0; count < document.getElementsByClassName("left-arrow").length; count++) {
        document.getElementsByClassName("left-arrow")[count].src = "NRmap_tiles/leftr.png";
        enemySpotted = true;
      }
    }
    else {
      for (count = 0; count < document.getElementsByClassName("left-arrow").length; count++) {
        document.getElementsByClassName("left-arrow")[count].src = "NRmap_tiles/left.png";
      }
    }
  }
  if (currentLocation < 101) {
    if (map[currentLocation + 1][4] === "1") {
      for (count = 0; count < document.getElementsByClassName("right-arrow").length; count++) {
        document.getElementsByClassName("right-arrow")[count].src = "NRmap_tiles/rightr.png";
        enemySpotted = true;
      }
    }
    else {
      for (count = 0; count < document.getElementsByClassName("right-arrow").length; count++) {
        document.getElementsByClassName("right-arrow")[count].src = "NRmap_tiles/right.png";
      }
    }
  }
  if (currentRow > 0) {
    if (map[currentLocation - 6][4] === "1") {
      for (count = 0; count < document.getElementsByClassName("up-arrow").length; count++) {
        document.getElementsByClassName("up-arrow")[count].src = "NRmap_tiles/upwardr.png";
        enemySpotted = true;
      }
    }
    else {
      for (count = 0; count < document.getElementsByClassName("up-arrow").length; count++) {
        document.getElementsByClassName("up-arrow")[count].src = "NRmap_tiles/upward.png";
      }
    }
  }
  if (enemySpotted === true) {
    document.getElementById("message").innerHTML = "\"Enemy spotted!\"";
    audio3.play();
  }
  else {
    document.getElementById("message").innerHTML = "\"No sign of enemy movement, sir.\"";
    audio2.play();
  }
  enemySpotted = false;
}

function getScore() {
  var penalty;
  switch (hearts) {
    case 4:
      penalty = 0;
      break;
    case 3:
      penalty = -250;
      break;
    case 2:
      penalty = -550;
      break;
    case 1:
      penalty = -1200;
      break;
  }
  var score = 5000 + (25 - path.length) * 100 + (recon - 3) * 100 + (fireSupport - 2) * 150 + penalty;
  if (path.length < 21) {
    score += (21 - path.length) * 100;
  }
  return score;
}

function getRank(x) {
  var rank = "SECOND LIEUTENANT";
  if (x > 3899) {rank = "FIRST LIEUTENANT"};
  if (x > 4049) {rank = "CAPTAIN"};
  if (x > 4199) {rank = "MAJOR"};
  if (x > 4399) {rank = "LIEUTENANT COLONEL"};
  if (x > 4599) {rank = "COLONEL"};
  if (x > 4799) {rank = "BRIGADIER GENERAL"};
  if (x > 5049) {rank = "MAJOR GENERAL"};
  if (x > 5299) {rank = "LIEUTENANT GENERAL"};
  if (x > 5549) {rank = "GENERAL"};
  if (x > 5799) {rank = "GENERAL OF THE ARMY"};
  return rank
}

function tryAgain() {
  document.getElementById("topEnd").style.height = "197px";
  document.getElementById("topEndBack").src = "NRmap_tiles/roll.jpg";
  document.getElementById("barLeft").src = "NRmap_tiles/heart4.png";
  document.getElementById("showmap").innerHTML = initHTML;
  currentRow = 17;
  currentLocation = null;
  path = [];
  hearts = 4;
  recon = 3;
  document.getElementById("message").innerHTML = "\"Onward, soldiers!\" => Pick a start point";
  document.getElementById("barMidLeft").src = "";
  fireSupport = 2;
  document.getElementById("barMidRight").src = "";
  for (count = 0; count < map.length; count++) {
    if (map[count][4] === "2") {
      map[count] = map[count].slice(0,4) + "1"
    }
  }
}

function newGame() {
  window.location.reload();
}
