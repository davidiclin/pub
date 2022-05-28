var getText = new XMLHttpRequest(); // a new request
getText.open("GET","https://davidiclin.github.io/pub/json/sentdrill.json",false);
getText.send(null);
const contentAll = JSON.parse(getText.responseText);
var audio1 = new Audio("https://davidiclin.github.io/pub/audio/bingo.mp3");
var audio2 = new Audio("https://davidiclin.github.io/pub/audio/beep.mp3");

blocks = contentAll[1].key.replace(contentAll[1].hint, "").slice(0,-1).split(" ");

document.getElementById("questionBody").innerHTML = contentAll[1].id + ". " + contentAll[1].qBody;
document.getElementById("userInput").innerHTML = contentAll[1].hint;
document.getElementById("blocks").innerHTML = showBlocks();
for (var count = 0; count < document.getElementsByClassName("block").length; count ++) {
  document.getElementsByClassName("block")[count].addEventListener("click", handleClick);
}
document.getElementById("key").innerHTML = contentAll[1].key;

function showBlocks() {
  shuffled = contentAll[1].key.replace(contentAll[1].hint, "").slice(0,-1).split(" ");
  for (var count = 0; count < shuffled.length; count++) {  // Shuffling
    var n1 = Math.floor(Math.random() * shuffled.length);
    var n2 = Math.floor(Math.random() * shuffled.length);
    tmp = shuffled[n1];
    shuffled[n1] = shuffled[n2];
    shuffled[n2] = tmp;
  }
  var blocksHTML = "";
  for (var count = 0; count < shuffled.length; count++) {
    blocksHTML += "<span class=\"block col-3 col-md-2 col-lg-1\">" + shuffled[count] + "</span>";
  }
  return blocksHTML;
}

function handleClick() {
  var element = this;
  if (element.innerHTML === blocks[0]) {
    document.getElementById("userInput").innerHTML += " " + element.innerHTML;
    audio1.play();
    element.style.backgroundColor = "yellow";
    blocks.shift();
    setTimeout(function(){
      element.remove();
    }, 500);
    if (blocks.length === 0) {
      document.getElementById("userInput").innerHTML = contentAll[1].key;
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
