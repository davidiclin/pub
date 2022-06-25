var getText = new XMLHttpRequest(); // a new request
getText.open("GET","https://davidiclin.github.io/pub/json/sentdrill.json",false);
getText.send(null);
const units = JSON.parse(getText.responseText)[0].units;
const contentAll = JSON.parse(getText.responseText)[1].questions;
var audio2 = new Audio("https://davidiclin.github.io/pub/audio/beep.mp3");
var currentContent = contentAll.slice(0,10)
var currentItem = 0;
var doneList = [];

// Set up the navigation buttons
for (var count = 0; count < 10; count ++) {
  document.getElementsByClassName("navBtn")[count].addEventListener("click", handleNav);
}

// Set up the unit menu
for (count = 0; count < units.length; count ++) {
  document.getElementById("unitList").innerHTML += "<option value=\"" + units[count].unitId + "\">" + units[count].title + "</option>"
}
document.getElementById("unitList").addEventListener("change", toUnit);
document.getElementById("unitList").selectedIndex = 0;
refresh(0);

// Shuffle the blocks!
function showBlocks() {
  var shuffled = currentContent[currentItem].key.replace(currentContent[currentItem].hint, "").slice(0,-1).split(" ");
  for (var count = 0; count < shuffled.length; count++) {  // Shuffling
    var n1 = Math.floor(Math.random() * shuffled.length);
    var n2 = Math.floor(Math.random() * shuffled.length);
    var tmp = shuffled[n1];
    shuffled[n1] = shuffled[n2];
    shuffled[n2] = tmp;
  }
  var blocksHTML = "";
  for (var count = 0; count < shuffled.length; count++) {
    blocksHTML += "<span class=\"block\">" + shuffled[count] + "</span>";
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
      document.getElementById("userInput").innerHTML = ">>> " + currentContent[currentItem].key;
      document.getElementsByClassName("navBtn")[currentItem].style.backgroundColor = "lime";
      document.getElementById("notes").open = true;
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
  document.getElementById("questionBody").innerHTML = currentContent[currentItem].qBody;
  if (doneList.includes(currentItem) || currentItem === 0) {
    document.getElementById("userInput").innerHTML = ">>> " + currentContent[currentItem].key;
    document.getElementById("blocks").innerHTML = "";
    document.getElementById("notes").innerHTML = "<summary>解說</summary>" + currentContent[currentItem].notes;
    document.getElementById("notes").open = true;
    return;
  }
  blocks = currentContent[currentItem].key.replace(currentContent[currentItem].hint, "").slice(0,-1).split(" ");
  // split part of the content into blocks for sentence building; "slice(0,-1)" to get rid of the final punctuation mark
  document.getElementById("userInput").innerHTML = ">>> " + currentContent[currentItem].hint;
  document.getElementById("notes").innerHTML = "<summary>解說</summary>" + currentContent[currentItem].notes;
  document.getElementById("notes").open = false;
  document.getElementById("blocks").innerHTML = showBlocks();
  for (var count = 0; count < document.getElementsByClassName("block").length; count ++) {
    document.getElementsByClassName("block")[count].addEventListener("click", handleClick);
  }
}

function toUnit() { // slice the unit off from the whole
  currentContent = contentAll.slice(document.getElementById("unitList").value * 10, (document.getElementById("unitList").value + 1) * 10);
  doneList = [];
  for (var count = 0; count < 10; count ++) {
    document.getElementsByClassName("navBtn")[count].style.border = "2px solid grey";
    document.getElementsByClassName("navBtn")[count].style.backgroundColor = "white";
  }
  document.getElementsByClassName("navBtn")[0].style.border = "3px solid gold";
  document.getElementsByClassName("navBtn")[0].style.backgroundColor = "lime";
  refresh(0);
}
