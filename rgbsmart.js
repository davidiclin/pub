var color_file = new XMLHttpRequest(); // a new request
color_file.open("GET","https://davidiclin.github.io/pub/colors.json",false);
color_file.send(null);
const color_bank = JSON.parse(color_file.responseText);

var mix_r = 0;
var mix_g = 0;
var mix_b = 0;
var basket = [];

function get_ready() {
  var n1 = Math.floor(Math.random()*color_bank.length);
  var n2 = Math.floor(Math.random()*color_bank.length);
  mix_r = Math.floor((color_bank[n1].rgb.r+color_bank[n2].rgb.r)/2);
  mix_g = Math.floor((color_bank[n1].rgb.g+color_bank[n2].rgb.g)/2);
  mix_b = Math.floor((color_bank[n1].rgb.b+color_bank[n2].rgb.b)/2);
  basket = [];
  basket.push({"r":mix_r,"g":mix_g,"b":mix_b});

  document.getElementById("left").style="border-radius:50px; height:200px; width:200px; background-color:rgb("+color_bank[n1].rgb.r+","+color_bank[n1].rgb.g+","+color_bank[n1].rgb.b+")";
  document.getElementById("right").style="border-radius:50px; height:200px; width:200px; background-color:rgb("+color_bank[n2].rgb.r+","+color_bank[n2].rgb.g+","+color_bank[n2].rgb.b+")";

  while (basket.length < 9) {  // Fill up the slots
    var n = Math.floor(Math.random()*color_bank.length);
    var add = {"r":color_bank[n].rgb.r,"g":color_bank[n].rgb.g,"b":color_bank[n].rgb.b};
    if (basket.includes(add)) {continue;}
    basket.push(add)
  }

  for (var count = 0; count < 18; count++) {  // Shuffling
    var p1 = Math.floor(Math.random() * 9);
    var p2 = Math.floor(Math.random() * 9);
    tmp = basket[p1];
    basket[p1] = basket[p2];
    basket[p2] = tmp;
  }
  for (var count=0; count<9; count++) {
    document.getElementById(count+1).style="border:8px outset; border-radius:36px; height:144px; width:144px; background-color:rgb("+basket[count].r+","+basket[count].g+","+basket[count].b+")";
  }
  }

function check_it(x) {
  for (var count=1; count<10; count++) {
    document.getElementById(count).style="border:8px outset; border-radius:36px; height:144px; width:144px; background-color:rgb("+basket[count-1].r+","+basket[count-1].g+","+basket[count-1].b+")";

  }
  if (basket[x-1].r === mix_r & basket[x-1].g === mix_g & basket[x-1].b === mix_b) {
    document.getElementById(x).style="border:8px solid gold; border-radius:36px; height:144px; width:144px; background-color:rgb("+basket[x-1].r+","+basket[x-1].g+","+basket[x-1].b+")";
    document.getElementById("result").innerHTML = "BINGO!"
    for (var count1=1; count1<10; count1++) {document.getElementById(count1).disabled=true}
    color_info(mix_r,mix_g,mix_b);
  }
  else {document.getElementById(x).style="border:8px solid gold; border-radius:36px; height:144px; width:144px; background-color:rgb("+basket[x-1].r+","+basket[x-1].g+","+basket[x-1].b+")";
        document.getElementById("result").innerHTML = "X"}
  }

function color_info(r,g,b) {
  var dis = 442;
  var closest = 0;
  for (var count=0; count<256; count++) { // Calculate how far the color is from the 256 standard colors respectively
    var n_dis = Math.sqrt((color_bank[count].rgb.r-r)**2+(color_bank[count].rgb.g-g)**2+(color_bank[count].rgb.b-b)**2);
    if (n_dis > dis) {continue;}
    else {dis = n_dis;
      closest = count}
  }
  document.getElementById("closest").style="border:none; width:90px; height:80px; background-color:rgb("+color_bank[closest].rgb.r+","+color_bank[closest].rgb.g+","+color_bank[closest].rgb.b+")"
  document.getElementById("info1").innerHTML="Close to: "+color_bank[closest].name;
  document.getElementById("info2").innerHTML="HEX "+color_bank[closest].hexString;
  document.getElementById("info3").innerHTML="RGB ("+color_bank[closest].rgb.r+","+color_bank[closest].rgb.g+","+color_bank[closest].rgb.b+")"
  document.getElementById("refresh").disabled=false;
  document.getElementById("refresh").style="width:40%; border-radius:20px; background-color:gray; font-size:48px";
  }
