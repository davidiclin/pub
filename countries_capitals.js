var Ctrs = new XMLHttpRequest(); // a new request
Ctrs.open("GET","https://davidiclin.github.io/pub/Countries.json",false);
Ctrs.send(null);
const bank = JSON.parse(Ctrs.responseText);
var colorlist = ["(240,128,128)","(255,105,180)","(255,218,185)","(218,165,32)","(240,230,140)","(221,160,221)","(152,251,152)","(154,205,50)","(175,238,238)","(100,149,237)"]
var ctry_deck = [];
var cptl_deck = [];  // While the country deck and the capital deck are exactly the same, they are to be shuffled separately and then combined to become the complete deck.
var deck = [];
var used = [];  // This array stores the numbers that have been generated during the random pick process.
var clicked = 0;
var l_clicked = false;
var r_clicked = false;
var eng = true;
var bpr_on = true;  // The beep and ring sounds are turned on by default.
var audio1 = new Audio("https://davidiclin.files.wordpress.com/2021/07/bingo.mp3");
var audio2 = new Audio("https://davidiclin.files.wordpress.com/2021/07/beep.mp3");
var current_show = "";

function get_ready() {
while (cptl_deck.length < 10) {var card = {};
    var n = Math.floor(Math.random()*(bank.length));
    if (used.includes(n)) {continue;}  // Avoid having duplicate items.
    used.push(n);
    card.known_as = bank[n].known_as;
    card.name_c = bank[n].name_C;
    card.capital_e = bank[n].capital_E;
    card.capital_c = bank[n].capital_C;
    card.known_as_c = bank[n].known_as_C;
    card.name_e = bank[n].name_E;
    card.region = bank[n].region;
    card.done = false;
    ctry_deck.push(card);  // Add exactly the same cards to each.
    cptl_deck.push(card);
  }

for (var count = 0; count < 20; count++) {  // Shuffling
  var n1 = Math.floor(Math.random() * 10);
  var n2 = Math.floor(Math.random() * 10);
  tmp = ctry_deck[n1];
  ctry_deck[n1] = ctry_deck[n2];
  ctry_deck[n2] = tmp;
}

for (var count = 0; count < 20; count++) {  // Shuffling
  var n1 = Math.floor(Math.random() * 10);
  var n2 = Math.floor(Math.random() * 10);
  tmp = cptl_deck[n1];
  cptl_deck[n1] = cptl_deck[n2];
  cptl_deck[n2] = tmp;
}

for (var count = 0; count < 10; count++) {  // Two decks combined to one
  deck.push(ctry_deck[count]);
  deck.push(cptl_deck[count])
}

  for (var count = 0; count < 20; count++) {
    if (count%2 === 0) {document.getElementById(count+1).innerHTML = deck[count].known_as;  // Cards with even ID numbers are assigned "Countries".
    document.getElementById(-(count+1)).innerHTML = deck[count].known_as;}
    else {document.getElementById(count+1).innerHTML = deck[count].capital_e;  // Cards with odd ID numbers are assigned "Capitals".
    document.getElementById(-(count+1)).innerHTML = deck[count].capital_e;}
}
}

function l_click(x) {
  if (deck[Math.abs(x)-1].done === true) {  // Check if the card has already been matched
    show(x);
    return;
  }
  if (l_clicked === true) {return;}  // Check if another Country card has been clicked
  l_clicked = true;
  click(x)
}

function r_click(x) {
  if (deck[Math.abs(x)-1].done === true) {
    show(x);
    return;
  }
  if (r_clicked === true) {return;}  // Check if another Capital card has been clicked
  r_clicked = true;
  click(x)
}

function click(x) {
  if (clicked === 2) {return;}  // Avoid a third card being clicked before the current match is resolved!
  document.getElementById(x).style = "background-color:rgb(155,155,155);";
  document.getElementById(-x).style = "background-color:rgb(155,155,155);";
  if (clicked === 0) {  // If this is the first click,
      y = x;            // the value will be stored as y.
      clicked += 1;
      return;
  };
  clicked += 1
  if (deck[Math.abs(y)-1].known_as === deck[Math.abs(x)-1].known_as) {  // BINGO!
      deck[Math.abs(x)-1].done = true;
      deck[Math.abs(y)-1].done = true;
    soundtrigger(audio1);
    newcolor = getcolor()
    document.getElementById(x).style = "background-color:rgb"+newcolor;
    document.getElementById(-x).style = "background-color:rgb"+newcolor;
    document.getElementById(y).style = "background-color:rgb"+newcolor;
    document.getElementById(-y).style = "background-color:rgb"+newcolor;
    show(x);
    setTimeout(function(){
    clicked = 0;
    l_clicked = false;
    r_clicked = false;
  }, 1000);
    }
  else {soundtrigger(audio2);  // NO MATCH!
    setTimeout(function(){
    document.getElementById(x).style = "background-color:rgb(255,255,255)";
    document.getElementById(-x).style = "background-color:rgb(255,255,255)";
    document.getElementById(y).style = "background-color:rgb(255,255,255)";
    document.getElementById(-y).style = "background-color:rgb(255,255,255)";
    clicked = 0;
    l_clicked = false;
    r_clicked = false;
}, 1000);
    };
}

function show(x) {
  if (deck[Math.abs(x)-1].done === true) {document.getElementById("note1").innerHTML = "國名： "+deck[Math.abs(x)-1].name_e+" "+deck[Math.abs(x)-1].name_c;
  document.getElementById("note11").innerHTML = "國名： "+deck[Math.abs(x)-1].name_e+" "+deck[Math.abs(x)-1].name_c;
  document.getElementById("note2").innerHTML = "首都： "+deck[Math.abs(x)-1].capital_e+" "+deck[Math.abs(x)-1].capital_c+" / ";
  document.getElementById("note12").innerHTML = "首都： "+deck[Math.abs(x)-1].capital_e+" "+deck[Math.abs(x)-1].capital_c;
  document.getElementById("note3").innerHTML = "所在： "+deck[Math.abs(x)-1].region;
  document.getElementById("note13").innerHTML = "所在： "+deck[Math.abs(x)-1].region;
current = x;
document.getElementById("gmap1").disabled = false;  // The map button and the wiki button are disabled until the first match is made.
document.getElementById("gmap11").disabled = false;
document.getElementById("wik1").disabled = false;
document.getElementById("wik11").disabled = false;
}
}

function getcolor() {  // Each matched pair gets a color.
  return colorlist.pop();
}

function ch_eng() {  // Switch between Chinese and English
  if (eng === true) {
  for (var count = 0; count < 20; count++) {
    if (count%2 === 0) {document.getElementById(count+1).innerHTML=deck[count].known_as_c;
    document.getElementById(-(count+1)).innerHTML=deck[count].known_as_c;}
    else {document.getElementById(count+1).innerHTML=deck[count].capital_c;
    document.getElementById(-(count+1)).innerHTML=deck[count].capital_c;}
  }
    eng = false;
  }
    else {
      for (var count = 0; count < 20; count++) {
        if (count%2 === 0) {document.getElementById(count+1).innerHTML=deck[count].known_as;
        document.getElementById(-(count+1)).innerHTML=deck[count].known_as;}
        else {document.getElementById(count+1).innerHTML=deck[count].capital_e;
        document.getElementById(-(count+1)).innerHTML=deck[count].capital_e;}
      }
      eng = true;
  }
}

function lets_go() {  // Open the map!
    url_text="https://www.google.com/maps/place/"+deck[Math.abs(current)-1].known_as_c;
    window.open(url_text);
}

function learn_more() {  // Open the book!
    url_text="https://zh.wikipedia.org/wiki/"+deck[Math.abs(current)-1].known_as_c;
    window.open(url_text);
}

function intro() {
  alert("(1) 每回隨機選出10個國家，左右欄各依任意順序列出其國名和首都。\n\
(2) 分別按下任一國名和首都進行配對。若配對正確，下方會顯示該國正式名稱與所在區域等資訊。\n\
(3) 可隨時按下已配對完成的國名或首都以顯示對應資訊。\n\
(4) 按下「中/ENG」可切換中英文顯示。\n\
(5) 按下「Google地圖」可打開新視窗，前往目前顯示國家的地圖頁面(若行動裝置已開啟定位功能，則地\
圖畫面會停留在目前所在位置)。\n\
(6) 按下「維基百科」可打開新視窗，前往目前顯示國家的百科頁面。")
}

function bpr() {  // Switch the sounds on or off
  if (bpr_on === true) {bpr_on = false;
  document.getElementById("bpr1").innerHTML="開啟聲音";
  document.getElementById("bpr1").style="width:100%; height:70px; font-size:14px; background-color:rgb(200,200,200)";
  document.getElementById("bpr2").innerHTML="開啟聲音";
  document.getElementById("bpr2").style="width:100%; height:84px; font-size:30px; background-color:rgb(200,200,200)";
}
  else {bpr_on = true;
    document.getElementById("bpr1").innerHTML="關閉聲音";
    document.getElementById("bpr1").style="width:100%; height:70px; font-size:14px; background-color:white";
    document.getElementById("bpr2").innerHTML="關閉聲音";
    document.getElementById("bpr2").style="width:100%; height:84px; font-size:30px; background-color:white";
  }
}

function soundtrigger(x) {  // Plays the sounds accordingly
  if (bpr_on === true) {
    x.play();
  }
}
function again() {
  colorlist = ["(255,170,204)","(102,209,33)","(226,191,138)","(191,158,244)","(163,196,244)","(162,242,231)","(196,182,56)","(224,157,76)","(234,106,200)","(240,255,147)"]
  ctry_deck = [];
  cptl_deck = [];  // While the country deck and the capital deck are exactly the same, they are to be shuffled separately and then combined to become the complete deck.
  deck = [];
  clicked = 0;
  l_clicked = false;
  r_clicked = false;
  current_show = "";
  for (count = 0; count < 20; count++) {
    document.getElementById(count+1).style = "background-color:rgb(255,255,255)";
    document.getElementById(-(count+1)).style = "background-color:rgb(255,255,255)";
  }
  document.getElementById("note1").innerHTML = "";
  document.getElementById("note11").innerHTML = "";
  document.getElementById("note2").innerHTML = "";
  document.getElementById("note12").innerHTML = "";
  document.getElementById("note3").innerHTML = "";
  document.getElementById("note13").innerHTML = "";
  document.getElementById("gmap1").disabled = true;  // The map button and the wiki button are disabled until the first match is made.
  document.getElementById("gmap11").disabled = true;
  document.getElementById("wik1").disabled = true;
  document.getElementById("wik11").disabled = true;
  get_ready()
}
