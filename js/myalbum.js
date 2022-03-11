var currentView = 0;
var autoPlay = true;
document.getElementById("mainCanvas").style.backgroundImage  = "url('album/Image0.jpg')";
setTimeout(function(){
document.getElementById("instruction").style.visibility = "hidden";
}, 5000);
for (count = 0; count < 96; count++) {
  document.getElementById("thumbnails").innerHTML += "<img id=\"" + count + "\" src=\"album/Image" + count + ".jpg\" onclick=\"thumbnailClicked(" + count + ")\">";
}
document.getElementById("0").style.border = "2px solid yellow";
var myInterval = setInterval(autoPlayOn, 6000);

function autoPlayOn() {
  x = currentView + 1;
  if (x > 95) {
    x = 0;
  }
  refreshView(x);
}

function thumbnailClicked(x) {
  if (autoPlay == false) {
    refreshView(x);
  }
}

function refreshView(x) {
  currentView = x;
  if (autoPlay == true) {
    document.getElementsByTagName("header")[0].style.visibility = "hidden";
    document.getElementById("viewPrev").style.visibility = "hidden";
    document.getElementById("viewNext").style.visibility = "hidden";
  }
  else {
    document.getElementsByTagName("header")[0].style.visibility = "visible";
    document.getElementById("viewPrev").style.visibility = "visible";
    document.getElementById("viewNext").style.visibility = "visible";
  }
  if (currentView == 0) {
    document.getElementById("viewPrev").style.visibility = "hidden";
  }
  if (currentView == 95) {
    document.getElementById("viewNext").style.visibility = "hidden";
  }
  for (count = 0; count < 96; count++) {
    document.getElementById(count).style.border = "none";
  }
  document.getElementById(x).style.border = "2px solid yellow";
  document.getElementById(x).scrollIntoView();
  document.getElementById("mainCanvas").style.backgroundImage = "url('album/Image" + currentView + ".jpg')";
}

function flip(x) {
  if (-1 < currentView + x && currentView + x < 96) {
    refreshView(currentView + x);
  }
}

function autoPlayControl() {
  if (autoPlay == true) {
    autoPlay = false;
    clearInterval(myInterval);
  }
  else {
    autoPlay = true;
    myInterval = setInterval(autoPlayOn, 6000);
  }
  refreshView(currentView);
}
