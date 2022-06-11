var getText = new XMLHttpRequest(); // a new request
getText.open("GET","https://davidiclin.github.io/pub/json/sentdrill.json",false);
getText.send(null);
const contentAll = JSON.parse(getText.responseText);
var audio2 = new Audio("https://davidiclin.github.io/pub/audio/beep.mp3");
currentItem = 0;

for (var count = 0; count < 10; count ++) {
  document.getElementsByClassName("navBtn")[count].addEventListener("click", handleNav);
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
    blocksHTML += "<span class=\"block col-3 col-lg-2\">" + shuffled[count] + "</span>";
  }
  return blocksHTML;
}

function handleClick() {
  var element = this;
  if (element.innerHTML === blocks[0]) {
    document.getElementById("userInput").innerHTML += " " + element.innerHTML;
    element.style.backgroundColor = "yellow";
    blocks.shift();
    setTimeout(function(){
      element.remove();
    }, 500);
    if (blocks.length === 0) {
      document.getElementById("userInput").innerHTML = contentAll[currentItem].key;
      document.getElementById("userInput").style.backgroundColor = "yellow";
    }
  }
  else {
    audio2.play();
    element.style.color = "white";
    element.style.backgroundColor = "red";
    setTimeout(function(){
      element.style.color = "black";
      element.style.backgroundColor = "lightgrey";
    }, 500);
  }
}

function handleNav() {
  for (var count = 0; count < 10; count ++) {
    document.getElementsByClassName("navBtn")[count].style.border = "2px solid grey";
  }
  this.style.border = "3px solid gold";
  refresh(this.innerHTML);
}

function refresh(x) {
  currentItem = x;
  blocks = contentAll[currentItem].key.replace(contentAll[currentItem].hint, "").slice(0,-1).split(" ");
  // split part of the content into blocks for sentence building; "slice(0,-1)" to get rid of the final punctuation mark

  document.getElementById("questionBody").innerHTML = contentAll[currentItem].id + ". " + contentAll[currentItem].qBody;
  document.getElementById("userInput").innerHTML = contentAll[currentItem].hint;
  document.getElementById("blocks").innerHTML = showBlocks();
  for (var count = 0; count < document.getElementsByClassName("block").length; count ++) {
    document.getElementsByClassName("block")[count].addEventListener("click", handleClick);
  }
}
