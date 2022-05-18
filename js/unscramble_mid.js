var Sentences = new XMLHttpRequest(); // a new request
Sentences.open("GET","https://davidiclin.github.io/pub/json/unscramble_mid.json",false);
Sentences.send(null);
const bank = JSON.parse(Sentences.responseText);
var pick = Math.floor(Math.random() * 337) + 1;
var sentence = bank[pick].text;
var translation = bank[pick].trans;
var words = sentence.split(" ");
var head = words.shift();
var tail = words.pop();
var waiting = false;
var sel_id = 0;
var swap_text = "";
var current_text = "";
var comment = "";

for (var count = 0; count < 20; count++) {  // Shuffling
  var n1 = Math.floor(Math.random() * words.length);
  var n2 = Math.floor(Math.random() * words.length);
  tmp = words[n1];
  words[n1] = words[n2];
  words[n2] = tmp;
}

function create() {
  for (var count = 0; count < words.length; count++) {
    var new_button = "<button class=\"word\" id=\"" + String(count + 1) + "\" onclick=\"clicked(" + String(count + 1) + ")\">" + words[count] + "</button>";
    document.getElementById("pieces").innerHTML += new_button;
  }
  document.getElementById("head").innerHTML = head + " ";
  document.getElementById("tail").innerHTML = " " + tail;
  document.getElementById("trans").innerHTML = translation;
  document.getElementById("intButton").style.backgroundColor = "yellow";
  document.getElementById("intButton").style.border = "3px inset grey";
  check_it();
}

function clicked(x) {
  if (document.getElementById(x).style.border === "none") {
    return;
  }
  if (waiting === false) {
    waiting = true;
    sel_id = x;
    document.getElementById(x).style.backgroundColor = "black";
    document.getElementById(x).style.color = "white";
  }
  else {
    swap_text = document.getElementById(x).innerHTML;
    document.getElementById(x).innerHTML = document.getElementById(sel_id).innerHTML;
    document.getElementById(sel_id).innerHTML = swap_text;
    document.getElementById(x).style.backgroundColor = "black";
    document.getElementById(x).style.color = "white";
    setTimeout(function(){
      document.getElementById(x).style.backgroundColor = "white";
      document.getElementById(x).style.color = "black";
      document.getElementById(sel_id).style.backgroundColor = "white";
      document.getElementById(sel_id).style.color = "black";
      waiting = false;
      check_it();
    }, 200);
  }
}

function check_it() {
  for (var count = 0; count < words.length; count++) {
    if (document.getElementById(count + 1).innerHTML === sentence.split(" ")[count + 1]) {
      document.getElementById(count + 1).style.backgroundColor = "rgb(212,255,255)";
      document.getElementById(count + 1).style.cursor = "auto";
      document.getElementById(count + 1).style.border = "none";
    }
    current_text += document.getElementById(count + 1).innerHTML + " ";
  }
  if (head + " " + current_text + tail === sentence) {
    document.getElementById("pieces").innerHTML = "";
    document.getElementById("tail").innerHTML = "";
    document.getElementById("head").innerHTML = sentence;
    setTimeout(function(){
      var n = Math.floor(Math.random() * 5);
      switch(n) {
        case 0:
        comment = "WELL DONE!";
        break;
        case 1:
        comment = "GOOD JOB!";
        break;
        case 2:
        comment = "BINGO!"
        break;
        case 3:
        comment = "EXCELLENT!";
        break;
        case 4:
        comment = "YOU DID IT!";
        break;
      }
      document.getElementById("status").innerHTML = "<p id=\"comment\">" + comment + "</p><button id=\"next\" onclick=\"again()\">NEXT</button>";
    }, 200);

  }
  else {current_text = ""}
}
function again() {
  window.location.reload();
}
