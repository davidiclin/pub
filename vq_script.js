var active_q = 1;
document.getElementById(1).style.display = "block";
document.getElementById(active_q+1000).style.border = "4px solid gold";
document.getElementById("prev").disabled = true;

var n1 = Math.floor(Math.random()*20) + 1
var bankname = "bank" + n1 + ".json"

// function get_data(x) {
  var GetData = new XMLHttpRequest(); // a new request
  GetData.open("GET","https://davidiclin.github.io/pub/sentence_bank/" + bankname,false);
  GetData.send(null);
  bank = JSON.parse(GetData.responseText);
// }
var n2 = Math.floor(Math.random() * 100);

for (var count = 1; count < 11; count++) {
  document.getElementById(count * 10 + 1).innerHTML = bank[n2][count-1].Opt_1;
  document.getElementById(count * 10 + 2).innerHTML = bank[n2][count-1].Opt_2;
  document.getElementById(count * 10 + 3).innerHTML = bank[n2][count-1].Opt_3;
  document.getElementById(count * 10 + 4).innerHTML = bank[n2][count-1].Opt_4;
  document.getElementById(count * 10 + 5).innerHTML = bank[n2][count-1].Stem;
}

function nav(x) {
  if (x === 999) {
    window.location.reload();
  }
  document.getElementById(active_q).style.display = "none";
  document.getElementById(active_q+1000).style.border = "4px solid lightgray";
  if (x > 1000) {
    active_q = x - 1000;
  }
  else {
    active_q = active_q + x
  }
  if (active_q <= 1) {
    active_q = 1;
    document.getElementById("prev").disabled = true;
  }
  else {
    document.getElementById("prev").disabled = false;
  }
  if (active_q >= 10) {
    active_q = 10;
    document.getElementById("next").disabled = true;
  }
  else {
    document.getElementById("next").disabled = false;
  }
  document.getElementById(active_q).style.display = "block";
  document.getElementById(active_q+1000).style.border = "4px solid gold";
}

function check(x) {
  document.getElementById(x).style.border = "4px inset lightgray";
  var question = Math.floor(x/10);
  for (count=1;count<5;count++) {
  document.getElementById(question*10+count).disabled = true;
  }
  if (document.getElementById(x).innerHTML === bank[n2][question-1].Answer) {
    document.getElementById(x).style.background = "rgb(141,255,107)";
    document.getElementById(question+1000).style.background = "rgb(141,255,107)";
  }
  else {
    document.getElementById(x).style.background = "rgb(255,163,163)";
    document.getElementById(question+1000).style.background = "rgb(255,163,163)";
  }
  document.getElementById(question*10+6).innerHTML="<hr>The correct answer is <span style='color:blue'><b>" + bank[n2][question-1].Answer + "</b>.</span><br>"
  + "<b>" + bank[n2][question-1].Opt_1 + "</b> : <i>" + bank[n2][question-1].Opt_1_def + "</i><br>"
  + "<b>" + bank[n2][question-1].Opt_2 + "</b> : <i>" + bank[n2][question-1].Opt_2_def + "</i><br>"
  + "<b>" + bank[n2][question-1].Opt_3 + "</b> : <i>" + bank[n2][question-1].Opt_3_def + "</i><br>"
  + "<b>" + bank[n2][question-1].Opt_4 + "</b> : <i>" + bank[n2][question-1].Opt_4_def + "</i>";
}
