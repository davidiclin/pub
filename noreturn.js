var Getmaps = new XMLHttpRequest(); // a new request
Getmaps.open("GET","https://davidiclin.github.io/pub/NRmap.json",false);
Getmaps.send(null);
const maps = JSON.parse(Getmaps.responseText);
var pick = Math.floor(Math.random() * 252);
var map = maps[pick].mapcode.split("-");
var route = maps[pick].path;
console.log(route);
var currentRow = 17;
var currentLocation;
var path = [];
var hearts = 3;
var initHTML = document.getElementById("showmap").innerHTML;
var backgroundImg = "paper" + (Math.floor(Math.random() * 4) + 1) + ".jpg";
var recon = 2;
var fireSupport = 1;
var helpOpen = false;

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
    document.getElementById("barMidLeft").src = "";
    document.getElementById("barMidRight").src = "";
    document.getElementById("barLeft").src = "";
    document.getElementById("message").style.position = "relative";
    thisScore = getScore();
    thisRank = getRank(thisScore);
    document.getElementById("message").innerHTML = "Moves : " + path.length + "<br>" +
                                                   "Recon Dispatched : " + (2 -recon) + "<br>" +
                                                   "Fire Support Requested : " + (1 - fireSupport) + "<br>" +
                                                   "Casualties : " + Math.floor((3 - hearts) / 3 * 100) + "%" + "<br>" +
                                                   "Final Score : " + thisScore + "<br>" +
                                                   "Rank : " + thisRank;
    return;
  }
  var oldHTML = document.getElementById("showmap").innerHTML;
  var addHTML = "<tr>";
  for (var count = 0; count < 6; count++) {
    addHTML += "<td id=\"" + ((currentRow * 6) + count) + "\">";
  }
  document.getElementById("showmap").innerHTML = addHTML + "</tr>" + oldHTML
}

function focusOn(x) {
  currentLocation = x;
  path.push(currentLocation);
  document.getElementById("message").innerHTML = "";
  var imgHTML = "<img src=\"NRmap_tiles/t" + map[currentLocation] + ".png\">";
  var upHTML = "<img class=\"up-arrow\" src=\"NRmap_tiles/upward.png\" onclick=\"actionHandler(\'up\')\">";
  var leftHTML = "<img class=\"left-arrow\" src=\"NRmap_tiles/left.png\" onclick=\"actionHandler(\'left\')\">";
  var rightHTML = "<img class=\"right-arrow\" src=\"NRmap_tiles/right.png\" onclick=\"actionHandler(\'right\')\">";
  var pawnHTML = "<img class=\"pawn\" src=\"NRmap_tiles/pawn.png\">"
  if (map[currentLocation][4] === "1") {
    hearts -= 1;
    document.getElementById("barLeft").src = "NRmap_tiles/heart" + hearts + ".png";
    if (hearts === 2) {
      document.getElementById("message").innerHTML = "\"We just lost one third of our men!\""
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
  fireSupport -= 1;
  if (fireSupport < 0) {
    return;
  }
  document.getElementById("message").innerHTML = "\"Fire support incoming!\""
  document.getElementById("barMidRight").src = "NRmap_tiles/boom.gif";
  setTimeout(function(){
    document.getElementById("barMidRight").src = "NRmap_tiles/fire0.png";
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
  recon -= 1;
  if (recon < 0) {
    return;
  }
  else {
    document.getElementById("barMidLeft").src = "NRmap_tiles/recon" + recon + ".png";
  }
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
  }
  else {
    document.getElementById("message").innerHTML = "\"No sign of enemy movement, sir.\""
  }
  enemySpotted = false;
}

function getScore() {
  var penalty;
  switch (hearts) {
    case 3:
      penalty = 0;
      break;
    case 2:
      penalty = -400;
      break;
    case 1:
      penalty = -1200;
      break;
  }
  var score = 5000 + (25 - path.length) * 100 + (recon - 2) * 100 + (fireSupport - 1) * 200 + penalty;
  return score;
}

function getRank(x) {
  var rank = "SECOND LIEUTENANT";
  if (x > 4000) {rank = "FIRST LIEUTENANT"};
  if (x > 4100) {rank = "CAPTAIN"};
  if (x > 4200) {rank = "MAJOR"};
  if (x > 4400) {rank = "LIEUTENANT COLONEL"};
  if (x > 4600) {rank = "COLONEL"};
  if (x > 4800) {rank = "BRIGADIER GENERAL"};
  if (x > 5000) {rank = "MAJOR GENERAL"};
  if (x > 5200) {rank = "LIEUTENANT GENERAL"};
  if (x > 5400) {rank = "GENERAL"};
  if (x > 5600) {rank = "GENERAL OF THE ARMY"};
  return rank
}

function openHelp() {
  if (helpOpen === false) {
    helpOpen = true;
    document.getElementById("helpBlock").src = "NRmap_tiles/mapkey.jpg";
    document.getElementById("help").src = "NRmap_tiles/close.png";
  }
  else {
    helpOpen = false;
    document.getElementById("helpBlock").src = "";
    document.getElementById("help").src = "NRmap_tiles/help.png";
  }
}

function tryAgain() {
  document.getElementById("topEndBack").src = "NRmap_tiles/roll.jpg";
  document.getElementById("barLeft").src = "NRmap_tiles/heart3.png";
  document.getElementById("showmap").innerHTML = initHTML;
  currentRow = 17;
  currentLocation = null;
  path = [];
  hearts = 3;
  recon = 2;
  document.getElementById("message").style.position = "absolute";
  document.getElementById("message").innerHTML = "\"Onward, soldiers!\" -- Pick your start point";
  document.getElementById("barMidLeft").src = "";
  fireSupport = 1;
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
