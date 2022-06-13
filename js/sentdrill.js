var getText = new XMLHttpRequest(); // a new request
getText.open("GET","https://davidiclin.github.io/pub/json/sentdrill.json",false);
getText.send(null);
const units = JSON.parse(getText.responseText)[0].units;
const contentAll = JSON.parse(getText.responseText)[1].questions;
var audio2 = new Audio("https://davidiclin.github.io/pub/audio/beep.mp3");
currentItem = 0;
doneList = [];

// Set up the navigation buttons
for (var count = 0; count < 10; count ++) {
  document.getElementsByClassName("navBtn")[count].addEventListener("click", handleNav);
}

// Set up the unit menu
for (count = 0; count < units.length; count ++) {
  document.getElementById("unitList").innerHTML += "<option value=\"" + units[count].unitId + "\">" + units[count].title + "</option>"
}

refresh(0);

// Shuffle the blocks!
function showBlocks() {
  shuffled = contentAll[currentItem].key.replace(contentAll[currentItem].hint, "").slice(0,-1).split(" ");
  for (var count = 0; count < shuffled.length; count++) {  // Shuffling
    var n1 = Math.floor(Math.random() * shuffled.length);
    var n2 = Math.floor(Math.random() * shuffled.length);
    tmp = shuffled[n1];
    shuffled[n1] = shuffled[n2];
    shuffled[n2] = tmp;
  }
  var blocksHTML = "";
  for (var count = 0; count < shuffled.length; count++) {
    blocksHTML += "<span class=\"block col-3\">" + shuffled[count] + "</span>";
  }
  return blocksHTML;
}

function handleClick() {
  var elmnt = this;
  if (elmnt.innerHTML === blocks[0]) {
    document.getElementById("userInput").innerHTML += " " + elmnt.innerHTML;
    elmnt.style.backgroundColor = "yellow";
    blocks.shift();
    setTimeout(function(){
      elmnt.remove();
    }, 200);
    if (blocks.length === 0) {
      document.getElementById("userInput").innerHTML = ">>> " + contentAll[currentItem].key;
      document.getElementsByClassName("navBtn")[currentItem].style.backgroundColor = "lime";
      doneList.push(currentItem);
    }
  }
  else {
    audio2.play();
    elmnt.style.color = "white";
    elmnt.style.backgroundColor = "red";
    setTimeout(function(){
      elmnt.style.color = "black";
      elmnt.style.backgroundColor = "lightgrey";
    }, 200);
  }
}

function handleNav() {
  for (var count = 0; count < 10; count ++) {
    document.getElementsByClassName("navBtn")[count].style.border = "2px solid grey";
  }
  this.style.border = "3px solid gold";
  refresh(parseInt(this.innerHTML));
}

function refresh(x) {
  currentItem = x;
  document.getElementById("questionBody").innerHTML = contentAll[currentItem].qBody;
  if (doneList.includes(currentItem) || currentItem === 0) {
    document.getElementById("userInput").innerHTML = ">>> " + contentAll[currentItem].key;
    document.getElementById("blocks").innerHTML = "";
    return;
  }
  blocks = contentAll[currentItem].key.replace(contentAll[currentItem].hint, "").slice(0,-1).split(" ");
  // split part of the content into blocks for sentence building; "slice(0,-1)" to get rid of the final punctuation mark
  document.getElementById("userInput").innerHTML = ">>> " + contentAll[currentItem].hint;
  document.getElementById("blocks").innerHTML = showBlocks();
  for (var count = 0; count < document.getElementsByClassName("block").length; count ++) {
    document.getElementsByClassName("block")[count].addEventListener("click", handleClick);
  }
}
