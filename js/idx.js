function catHandler() {
  if (document.getElementById("catCon").innerHTML === "Hide All") {
    for (count = 0; count < document.getElementsByClassName("cat").length; count++) {
      document.getElementsByClassName("cat")[count].open = false;
    }
    document.getElementById("catCon").innerHTML = "Show All";
  }
  else {
    for (count = 0; count < document.getElementsByClassName("cat").length; count++) {
      document.getElementsByClassName("cat")[count].open = true;
    }
    document.getElementById("catCon").innerHTML = "Hide All";
  }
}
function checkDetails() {
  var openDetails = 0;
  var x = document.getElementsByClassName("cat").length;
  for (var count=0; count < x; count++) {
    if (document.getElementsByClassName("cat")[count].open == true) {
      openDetails += 1;
    }
  }
  if (openDetails == x) {
    document.getElementById("catCon").innerHTML = "Hide All";
  }
  if (openDetails == 0) {
    document.getElementById("catCon").innerHTML = "Show All";
  }
}
