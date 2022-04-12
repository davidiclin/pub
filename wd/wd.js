var currentView = 1;
var autoPlay = true;
document.getElementById("slideCanvas").style.backgroundImage  = "url('../SampleAlbum/BW/1.jpg')";
var myInterval = setInterval(autoPlayOn, 4000);

function autoPlayOn() {
  currentView += 1;
  if (currentView > 8) {
    currentView = 1;
  }
  document.getElementById("slideCanvas").style.backgroundImage = "url('../SampleAlbum/BW/" + currentView + ".jpg')";
}

function slideShowControl() {
  if (autoPlay == true) {
    autoPlay = false;
    document.getElementById("slideCanvas").style.border = "3px ridge gold";
    document.getElementById("viewPrev").style.visibility = "visible";
    document.getElementById("viewNext").style.visibility = "visible";
    clearInterval(myInterval);
  }
  else {
    autoPlay = true;
    document.getElementById("slideCanvas").style.border = "3px solid darkgray";
    document.getElementById("viewPrev").style.visibility = "hidden";
    document.getElementById("viewNext").style.visibility = "hidden";
    myInterval = setInterval(autoPlayOn, 4000);
  }
}

function flip(x) {
  currentView += x;
  if (currentView > 8) {currentView = 1};
  if (currentView < 1) {currentView = 8};
  document.getElementById("slideCanvas").style.backgroundImage = "url('../SampleAlbum/BW/" + currentView + ".jpg')";
}
