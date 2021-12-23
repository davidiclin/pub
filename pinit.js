var getCities = new XMLHttpRequest(); // a new request
getCities.open("GET","https://davidiclin.github.io/pub/worldcities.json",false);
getCities.send(null);
const cities = JSON.parse(getCities.responseText);
var longZero = 810;
var scale = 4.5;
var pinList = [];
var cityCandidates;
var panelOn = 0;
var mapShift = 0;
var namesOn = 1;
document.getElementById("pinDropDownList").selectedIndex = 0;

function searchIt() {
  cityCandidates = [];
  document.getElementById("searchResult").innerHTML = "";
  for (count1 = 0; count1 < cities.length; count1++) {
    if (document.getElementById("searchCity").value.toLowerCase() === cities[count1].city_ascii.toLowerCase() ||
        document.getElementById("searchCity").value.toLowerCase().includes(cities[count1].city_ascii.toLowerCase()) ||
        cities[count1].city_ascii.toLowerCase().includes(document.getElementById("searchCity").value.toLowerCase())) {
      document.getElementById("searchResult").style.display = "block";
      document.getElementById("searchPanelLower").style.display = "block";
      document.getElementById("searchResult").innerHTML += "<option value=\"" + cities[count1].city_ascii + " (" + cities[count1].country + ")\">" + cities[count1].city_ascii + " (" + cities[count1].country + ")</option>";
      cityCandidates.push(cities[count1]);
    }
  if (cityCandidates.length === 0) {
    document.getElementById("showSearchResult").innerHTML = "City not found";
    document.getElementById("searchResult").style.display = "none";
    document.getElementById("searchPanelLower").style.display = "none";
  }
  else {
    document.getElementById("showSearchResult").innerHTML = cityCandidates.length + "match(es) found";
    document.getElementById("searchResult").selectedIndex = 0;
  }
  }
}

function pinIt() {
  if (pinList.includes(cityCandidates[document.getElementById("searchResult").selectedIndex])) {
    alert("Pin already exists.");
    return;
  }
  pinList.push(cityCandidates[document.getElementById("searchResult").selectedIndex]);
  pinList[pinList.length - 1].color = document.getElementById("pinColor").value;
  document.getElementById("searchCity").value = "Enter City Name";
  document.getElementById("showSearchResult").innerHTML = "";
  document.getElementById("searchResult").style.display = "none";
  document.getElementById("searchPanelLower").style.display = "none";
  refreshDropDownList(pinList);
  renderIt(pinList);
  focusOnPin(pinList[pinList.length - 1].city_ascii);
}

function renderIt(x) {
  if (mapShift === 1) {
    longZero = document.getElementById("myCanvas").width;
  }
  else {
    longZero = document.getElementById("myCanvas").width / 2;
  }
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, 360 * scale, 180 * scale);
  for (count2 = 0; count2 < x.length; count2++) {
    var mapX = scale * x[count2].lng + longZero;
    var mapY = 180 * scale / 2 - scale * x[count2].lat;
    if (mapX > document.getElementById("myCanvas").width) {
      mapX = mapX - document.getElementById("myCanvas").width;
    }
    ctx.beginPath();
    ctx.arc(mapX, mapY, 5, 0, 2 * Math.PI);
    ctx.fillStyle = x[count2].color;
    ctx.fill();
    if (namesOn === 1) {
      ctx.font = "15px Arial";
      ctx.fillText(x[count2].city_ascii, mapX + 10, mapY + 5);
    }
  }
}

function zoomMap(x) {
  switch (x) {
    case 0:
      scale = 4.5;
      document.getElementById("subject").style.width = "1620px";
      document.getElementById("subject").style.height = "810px";
      document.getElementById("myCanvas").width = "1620";
      document.getElementById("myCanvas").height = "810";
      document.getElementById("subject").style.backgroundImage = "url('pinit_img/Worldmap08a.png')";
      if (mapShift === 1) {
        document.getElementById("subject").style.backgroundPosition = document.getElementById("myCanvas").width / 2 + "px";
      }
      else {
        document.getElementById("subject").style.backgroundPosition = "0px";
      }
      document.getElementById("mapZoomS").style.backgroundColor = "Yellow";
      document.getElementById("mapZoomM").style.backgroundColor = "LightGray";
      document.getElementById("mapZoomL").style.backgroundColor = "LightGray";
      document.getElementById("mapZoomXL").style.backgroundColor = "LightGray";
      renderIt(pinList);
      locatePin();
      break;
    case 1:
      scale = 9;
      document.getElementById("subject").style.width = "3240px";
      document.getElementById("subject").style.height = "1620px";
      document.getElementById("myCanvas").width = "3240";
      document.getElementById("myCanvas").height = "1620";
      document.getElementById("subject").style.backgroundImage = "url('pinit_img/Worldmap09a.png')";
      if (mapShift === 1) {
        document.getElementById("subject").style.backgroundPosition = document.getElementById("myCanvas").width / 2 + "px";
      }
      else {
        document.getElementById("subject").style.backgroundPosition = "0px";
      }
      document.getElementById("mapZoomS").style.backgroundColor = "LightGray";
      document.getElementById("mapZoomM").style.backgroundColor = "Yellow";
      document.getElementById("mapZoomL").style.backgroundColor = "LightGray";
      document.getElementById("mapZoomXL").style.backgroundColor = "LightGray";
      renderIt(pinList);
      locatePin();
      break;
    case 2:
      scale = 18;
      document.getElementById("subject").style.width = "6480px";
      document.getElementById("subject").style.height = "3240px";
      document.getElementById("myCanvas").width = "6480";
      document.getElementById("myCanvas").height = "3240";
      document.getElementById("subject").style.backgroundImage = "url('pinit_img/Worldmap10a.png')";
      if (mapShift === 1) {
        document.getElementById("subject").style.backgroundPosition = document.getElementById("myCanvas").width / 2 + "px";
      }
      else {
        document.getElementById("subject").style.backgroundPosition = "0px";
      }
      document.getElementById("mapZoomS").style.backgroundColor = "LightGray";
      document.getElementById("mapZoomM").style.backgroundColor = "LightGray";
      document.getElementById("mapZoomL").style.backgroundColor = "Yellow";
      document.getElementById("mapZoomXL").style.backgroundColor = "LightGray";
      renderIt(pinList);
      locatePin();
      break;
      case 3:
        scale = 36;
        document.getElementById("subject").style.width = "12960px";
        document.getElementById("subject").style.height = "6480px";
        document.getElementById("myCanvas").width = "12960";
        document.getElementById("myCanvas").height = "6480";
        document.getElementById("subject").style.backgroundImage = "url('pinit_img/Worldmap11a.png')";
        if (mapShift === 1) {
          document.getElementById("subject").style.backgroundPosition = document.getElementById("myCanvas").width / 2 + "px";
        }
        else {
          document.getElementById("subject").style.backgroundPosition = "0px";
        }
        document.getElementById("mapZoomS").style.backgroundColor = "LightGray";
        document.getElementById("mapZoomM").style.backgroundColor = "LightGray";
        document.getElementById("mapZoomL").style.backgroundColor = "LightGray";
        document.getElementById("mapZoomXL").style.backgroundColor = "Yellow";
        renderIt(pinList);
        locatePin();
        break;
  }
}

function focusOnPin(x) {
  for (count3 = 0; count3 < pinList.length; count3++) {
    if (pinList[count3].city_ascii === x) {
      if (Math.abs(pinList[count3].lng) > 90) {
        shiftMap(1);
        longZero = document.getElementById("myCanvas").width;
        var toX = scale * pinList[count3].lng + longZero - window.innerWidth / 2;
        var toY = 180 * scale / 2 - scale * pinList[count3].lat - window.innerHeight / 2;
        if (toX > document.getElementById("myCanvas").width) {
          toX -= document.getElementById("myCanvas").width;
        }
        window.scrollTo(toX, toY);
      }
      else {
        shiftMap(0);
        longZero = document.getElementById("myCanvas").width / 2;
        var toX = scale * pinList[count3].lng + longZero - window.innerWidth / 2;
        var toY = 180 * scale / 2 - scale * pinList[count3].lat - window.innerHeight / 2;
        window.scrollTo(toX, toY);
      }
      renderIt(pinList);
      break;
    }
  }
}

function locatePin() {
  var target = document.getElementById("pinDropDownList").value.split("(")[0].trim();
  focusOnPin(target);
}

function getWiki() {
  if (document.getElementById("pinDropDownList").selectedIndex === 0) {
    return;
  }
  var target = document.getElementById("pinDropDownList").value.split("(")[0].trim();
  var url_text="https://zh.wikipedia.org/wiki/" + target;
  window.open(url_text);
}

function getGoogle() {
  if (document.getElementById("pinDropDownList").selectedIndex === 0) {
    return;
  }
  var target = document.getElementById("pinDropDownList").value;
  var url_text="https://www.google.com/maps/place/" + target;
  window.open(url_text);
}

function removePin() {
  if (document.getElementById("pinDropDownList").selectedIndex === 0) {
    return;
  }
  if (pinList.length === 0) {
    return;
  }
  pinList.splice(document.getElementById("pinDropDownList").selectedIndex - 1, 1);
  refreshDropDownList(pinList);
  renderIt(pinList);
  document.getElementById("pinDropDownList").selectedIndex = 0;
}

function refreshDropDownList(x) {
  document.getElementById("pinDropDownList").innerHTML = "<option value=\"\">(Find pins here)</option>"
  for (count4 = 0; count4 < x.length; count4++) {
    document.getElementById("pinDropDownList").innerHTML += "<option value=\"" + x[count4].city_ascii + " (" + x[count4].country + ")\">" + x[count4].city_ascii + " (" + x[count4].country + ")</option>";
  }
  document.getElementById("pinDropDownList").selectedIndex = 0;
}

function shiftMap(x) {
  if (x === 0) {
    mapShift = 0;
    document.getElementById("subject").style.backgroundPosition = "0px";
    document.getElementById("PMBtn").style.backgroundColor = "Yellow";
    document.getElementById("AMBtn").style.backgroundColor = "LightGray";
    renderIt(pinList);
  }
  else {
    mapShift = 1;
    document.getElementById("subject").style.backgroundPosition = document.getElementById("myCanvas").width / 2 + "px";
    document.getElementById("AMBtn").style.backgroundColor = "Yellow";
    document.getElementById("PMBtn").style.backgroundColor = "LightGray";
    renderIt(pinList);
  }
}

function switchName() {
  if (namesOn === 1) {
    namesOn = 0;
    document.getElementById("nameSwitchBtn").innerHTML = "Show Names";
    renderIt(pinList);
  }
  else {
    namesOn = 1;
    document.getElementById("nameSwitchBtn").innerHTML = "Hide Names";
    renderIt(pinList);
  }
}

function switchPanel() {
  if (panelOn === 0) {
    document.getElementById("searchPanelUpper").style.display = "block";
    document.getElementById("panelSwitch").innerHTML = "-";
    panelOn = 1;
  }
  else {
    document.getElementById("showSearchResult").innerHTML = "";
    document.getElementById("searchResult").style.display = "none";
    document.getElementById("searchPanelUpper").style.display = "none";
    document.getElementById("searchPanelLower").style.display = "none";
    document.getElementById("panelSwitch").innerHTML = "+";
    panelOn = 0;
  }
}
