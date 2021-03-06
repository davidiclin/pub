const bank = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52]
var deck = [];
var used = [];
var flipped = 0;
var attempt = 0;
var streak = null;
var score = 0;
var audio1 = new Audio("https://davidiclin.files.wordpress.com/2021/07/bingo.mp3");
var audio2 = new Audio("https://davidiclin.files.wordpress.com/2021/07/beep.mp3");

while (deck.length < 20) {var card = {};
    var n = Math.floor(Math.random()*(bank.length / 2));
    if (used.includes(n)) {continue;}  // Avoid having duplicate items.
    used.push(n);
      card.name = bank[n * 2];
      card.match = bank[n * 2 + 1];
      card.shown = false;
      card.done = false;
      deck.push(card);
      card = {};
      card.name = bank[n * 2 + 1];
      card.match = bank[n * 2];
      card.shown = false;
      card.done = false;
      deck.push(card);
}

for (var count = 0; count < 20; count++) {  // Shuffling
  var n1 = Math.floor(Math.random() * 20);
  var n2 = Math.floor(Math.random() * 20);
  tmp = deck[n1];
  deck[n1] = deck[n2];
  deck[n2] = tmp;
}

function flip(x) {
  if (flipped === 2) {return;}
  if (deck[Math.abs(x)-1].done === true) {return;}
  if (deck[Math.abs(x)-1].shown === true) {return;}
  document.getElementById(x).innerHTML = "<img src=\"https://davidiclin.github.io/pub/PCards/" + deck[x-1].name + ".jpg\" style=\"width:90%\">"
  document.getElementById(-x).innerHTML = "<img src=\"https://davidiclin.github.io/pub/PCards/" + deck[x-1].name + ".jpg\" style=\"width:90%\">"
  deck[x-1].shown = true
  if (flipped === 0) {
      y = x-1;
      flipped += 1;
      return;
  };
  flipped += 1
  attempt += 1
  if (deck[y].name === deck[x-1].match) {  // Bingo!!
    deck[x-1].done = true;
    deck[y].done = true;
    audio1.play();
    gain_point();
    streak = true;
    show_meter();
    setTimeout(function(){
    flipped = 0;
    }, 1000);
    }
  else {  // No match...
    audio2.play()
    lose_point();
    streak = false;
    show_meter();
    setTimeout(function(){
    deck[x-1].shown = false;
    deck[y].shown = false;
    document.getElementById(x).innerHTML = "<img src=\"https://davidiclin.github.io/pub/PCards/0.jpg\" style=\"width:90%\">"
    document.getElementById(-x).innerHTML = "<img src=\"https://davidiclin.github.io/pub/PCards/0.jpg\" style=\"width:90%\">"
    document.getElementById(y+1).innerHTML = "<img src=\"https://davidiclin.github.io/pub/PCards/0.jpg\" style=\"width:90%\">"
    document.getElementById(-(y+1)).innerHTML = "<img src=\"https://davidiclin.github.io/pub/PCards/0.jpg\" style=\"width:90%\">"
    flipped = 0;
    }, 1000);
    };
}

function gain_point() {
  score += 1;
  if (streak === true) {
    score += 1;
  }
}

function lose_point() {
  score -= 1;
  if (streak === false) {
    score -= 1;
  }
}

function show_meter() {
  document.getElementById("meter_av1").style = "font-size:20px; color:yellow";
  document.getElementById("meter_av2").style = "font-size:20px; color:yellow";
  if (score === 0) {
    document.getElementById("meter_l1").innerHTML = "";
    document.getElementById("meter_r1").innerHTML = "";
    document.getElementById("meter_l2").innerHTML = "";
    document.getElementById("meter_r2").innerHTML = "";
    return;
    }
  var bar = "";
  var blocks = Math.abs(score);
  if (blocks > 12) {blocks = 12}
  for (var count = 0; count < blocks; count++) {
    bar += "&#9609;"
    }
  if (score > 0) {
    document.getElementById("meter_l1").innerHTML=bar;
    document.getElementById("meter_r1").innerHTML="";
    document.getElementById("meter_l2").innerHTML=bar;
    document.getElementById("meter_r2").innerHTML="";
    }
  if (score > 4) {document.getElementById("meter_g1").style = "font-size:20px; color:yellow";
                  document.getElementById("meter_av1").style = "font-size:20px; color:gray";
                  document.getElementById("meter_g2").style = "font-size:20px; color:yellow";
                  document.getElementById("meter_av2").style = "font-size:20px; color:gray";
    }
  else {document.getElementById("meter_g1").style = "font-size:20px; color:gray";
        document.getElementById("meter_g2").style = "font-size:20px; color:gray";}
  if (score > 9) {document.getElementById("meter_aw1").style = "font-size:20px; color:yellow";
                  document.getElementById("meter_g1").style = "font-size:20px; color:gray";
                  document.getElementById("meter_aw2").style = "font-size:20px; color:yellow";
                  document.getElementById("meter_g2").style = "font-size:20px; color:gray";
    }
  else {document.getElementById("meter_aw1").style = "font-size:20px; color:gray";
        document.getElementById("meter_aw2").style = "font-size:20px; color:gray";}
  if (score < 0) {
    document.getElementById("meter_r1").innerHTML=bar;
    document.getElementById("meter_l1").innerHTML="";
    document.getElementById("meter_r2").innerHTML=bar;
    document.getElementById("meter_l2").innerHTML="";
    }
  if (score < -4) {document.getElementById("meter_f1").style = "font-size:20px; color:yellow";
                   document.getElementById("meter_av1").style = "font-size:20px; color:gray";
                   document.getElementById("meter_f2").style = "font-size:20px; color:yellow";
                   document.getElementById("meter_av2").style = "font-size:20px; color:gray";
    }
  else {document.getElementById("meter_f1").style = "font-size:20px; color:gray";
        document.getElementById("meter_f2").style = "font-size:20px; color:gray";}
if (score < -9) {document.getElementById("meter_p1").style = "font-size:20px; color:yellow";
                 document.getElementById("meter_f1").style = "font-size:20px; color:gray";
                 document.getElementById("meter_p2").style = "font-size:20px; color:yellow";
                 document.getElementById("meter_f2").style = "font-size:20px; color:gray";
    }
  else {document.getElementById("meter_p1").style = "font-size:20px; color:gray";
        document.getElementById("meter_p2").style = "font-size:20px; color:gray";}
}

function instructions() {
  alert("(1) ????????????????????????????????????\n\
(2) ???????????????????????????????????????????????????????????????3?????????3?????????Q?????????Q???\n\
(3) ??????????????????????????????????????????????????????\n\
(4) ????????????????????????????????????????????????????????????")

}
