var getPartOne = new XMLHttpRequest(); // a new request
getPartOne.open("GET","https://davidiclin.github.io/pub/json/toeicWarmupV.json",false);
getPartOne.send(null);
const partOneAll = JSON.parse(getPartOne.responseText);
var getPartTwo = new XMLHttpRequest(); // a new request
getPartTwo.open("GET","https://davidiclin.github.io/pub/json/toeicWarmupS.json",false);
getPartTwo.send(null);
const partTwoAll = JSON.parse(getPartTwo.responseText);
var translation = 0;
var currentPartOne = [];
var currentPartTwo = [];
var partTwoOptions = [];
var partOneAnswers = [0,0,0,0,0,0,0,0,0,0];
var partTwoAnswers = [0,0,0,0,0,0,0,0,0,0];
var partOneReport = [0,0,0,0,0,0,0,0,0,0];
var partTwoReport = [0,0,0,0,0,0,0,0,0,0];
var currentItem = 1;
var viewingPart = 1;

for (count = 1; count < 31; count ++) {
  document.getElementById("selectUnit").innerHTML += "<option value=\"" + count + "\">" + count + "</option>"
}
document.getElementById("partOneBtn").style.backgroundColor = "Yellow";
document.getElementById("partOneBtn").style.border = "3px inset LightGray";
document.getElementById("containerTwo").style.display = "none";
for (count = 0; count < document.getElementsByClassName("TC").length; count++) {
  document.getElementsByClassName("TC")[count].style.visibility = "hidden";
}
updateCurrentUnit(1);

function switchParts(x) {
  if (x === 1) {
    document.getElementById("partOneBtn").style.backgroundColor = "Yellow";
    document.getElementById("partOneBtn").style.border = "3px inset LightGray";
    document.getElementById("partTwoBtn").style.backgroundColor = "LightGray";
    document.getElementById("partTwoBtn").style.border = "3px outset White";
    document.getElementById("containerOne").style.display = "block";
    document.getElementById("containerTwo").style.display = "none";
    viewingPart = 1;
    navTo(1);
  }
  if (x === 2) {
    document.getElementById("partOneBtn").style.backgroundColor = "LightGray";
    document.getElementById("partOneBtn").style.border = "3px outset White";
    document.getElementById("partTwoBtn").style.backgroundColor = "Yellow";
    document.getElementById("partTwoBtn").style.border = "3px inset LightGray";
    document.getElementById("containerOne").style.display = "none";
    document.getElementById("containerTwo").style.display = "block";
    viewingPart = 2;
    navTo(1);
  }
}

function toggleTrans() {
  if (translation === 0) {
    translation = 1;
    for (count = 0; count < document.getElementsByClassName("TC").length; count++) {
      document.getElementsByClassName("TC")[count].style.visibility = "visible";
    }
  }
  else {
    translation = 0;
    for (count = 0; count < document.getElementsByClassName("TC").length; count++) {
      document.getElementsByClassName("TC")[count].style.visibility = "hidden";
    }
  }
}

function navTo(x) {
  if (x > 10) {
    if (x === 11) {
      currentItem -= 1
    }
    else {
      currentItem += 1
    }
  }
  else {
    currentItem = x;
  }
  if (currentItem <= 1) {
    currentItem = 1;
    document.getElementById("prevArrow").src = "toeicWarmupImg/prevStop.png"
    document.getElementById("prevArrow").alt = "This is the beginning of the exercise."
  }
  else {
    document.getElementById("prevArrow").src = "toeicWarmupImg/prev.png"
    document.getElementById("prevArrow").alt = "previous question"
  }
  if (currentItem >= 10) {
    currentItem = 10;
    document.getElementById("nextArrow").src = "toeicWarmupImg/nextStop.png"
    document.getElementById("nextArrow").alt = "This is the end of the exercise."
  }
  else {
    document.getElementById("nextArrow").src = "toeicWarmupImg/next.png"
    document.getElementById("nextArrow").alt = "next question"
  }
  updatePartOneItem(currentItem);
  updatePartTwoItem(currentItem);
  updateItemStatus();
  updateItemIndicators();
  // document.getElementById("selectWord").selectedIndex = 0;
}

function updateCurrentUnit(x) {
  currentPartOne = [];
  currentPartTwo = [];
  partOneAnswers = [0,0,0,0,0,0,0,0,0,0];
  partTwoAnswers = [0,0,0,0,0,0,0,0,0,0];
  partOneReport = [0,0,0,0,0,0,0,0,0,0];
  partTwoReport = [0,0,0,0,0,0,0,0,0,0];
  for (count = 0; count < 10; count ++) {
    currentPartOne.push(partOneAll[count + (x - 1) * 10].keyword + "#" + partOneAll[count + (x - 1) * 10].keywordC);
    currentPartOne.push(partOneAll[count + (x - 1) * 10].option1 + "#" + partOneAll[count + (x - 1) * 10].option1C);
    currentPartOne.push(partOneAll[count + (x - 1) * 10].option2 + "#" + partOneAll[count + (x - 1) * 10].option2C);
    currentPartOne.push(partOneAll[count + (x - 1) * 10].option3 + "#" + partOneAll[count + (x - 1) * 10].option3C);
    currentPartOne.push(partOneAll[count + (x - 1) * 10].synonym + "#" + partOneAll[count + (x - 1) * 10].synonymC);
    currentPartOne.push(partOneAll[count + (x - 1) * 10].synonym);
    //synonym itself also serves as an option, thus the repetition
    currentPartTwo.push(partTwoAll[count + (x - 1) * 10].stem);
    currentPartTwo.push(partTwoAll[count + (x - 1) * 10].chn);
    currentPartTwo.push(partTwoAll[count + (x - 1) * 10].key);
  }
  shufflePartOneOptions();
  shufflePartTwoOptions();
  switchParts(1);
  navTo(1);
}

function updatePartOneItem(x) {
  document.getElementById("keywordHolder").innerHTML = currentPartOne[6 * (x - 1)].split("#")[0];
  document.getElementById("keywordCHolder").innerHTML = currentPartOne[6 * (x - 1)].split("#")[1];
  document.getElementById("option1Holder").innerHTML = currentPartOne[6 * (x - 1) + 1].split("#")[0];
  document.getElementById("option1CHolder").innerHTML = currentPartOne[6 * (x - 1) + 1].split("#")[1];
  document.getElementById("option2Holder").innerHTML = currentPartOne[6 * (x - 1) + 2].split("#")[0];
  document.getElementById("option2CHolder").innerHTML = currentPartOne[6 * (x - 1) + 2].split("#")[1];
  document.getElementById("option3Holder").innerHTML = currentPartOne[6 * (x - 1) + 3].split("#")[0];
  document.getElementById("option3CHolder").innerHTML = currentPartOne[6 * (x - 1) + 3].split("#")[1];
  document.getElementById("option4Holder").innerHTML = currentPartOne[6 * (x - 1) + 4].split("#")[0];
  document.getElementById("option4CHolder").innerHTML = currentPartOne[6 * (x - 1) + 4].split("#")[1];
}

function updatePartTwoItem(x) {
  document.getElementById("firstHalfHolder").innerHTML = currentPartTwo[3 * (x - 1)].split("***")[0];
  document.getElementById("secondHalfHolder").innerHTML = currentPartTwo[3 * (x - 1)].split("***")[1];
  document.getElementById("sentenceCHolder").innerHTML = currentPartTwo[3 * (x - 1) + 1];
}

function shufflePartOneOptions() {
  for (count1 = 0; count1 < 10; count1 ++) {
    for (count2 = 0; count2 < 4; count2 ++) {
      var n1 = Math.floor(Math.random() * 4) + 1;
      var n2 = Math.floor(Math.random() * 4) + 1;
      temp = currentPartOne[count1 * 6 + n1];
      currentPartOne[count1 * 6 + n1] = currentPartOne[count1 * 6 + n2];
      currentPartOne[count1 * 6 + n2] = temp;
    }
  }
}

function shufflePartTwoOptions() {
  partTwoOptions = [];
  for (count1 = 0; count1 < 10; count1 ++) {
    partTwoOptions.push(currentPartTwo[count1 * 3 + 2]);
  }
  for (count2 = 0; count2 < 10; count2 ++) {
    var n1 = Math.floor(Math.random() * 10);
    var n2 = Math.floor(Math.random() * 10);
    temp = partTwoOptions[n1];
    partTwoOptions[n1] = partTwoOptions[n2];
    partTwoOptions[n2] = temp
  }
  document.getElementById("selectWord").innerHTML = "<option>請選擇</option>";
  for (count = 0; count < 10; count ++) {
    document.getElementById("selectWord").innerHTML += "<option value=\"" + partTwoOptions[count] + "\">" + partTwoOptions[count] + "</option>"
  }
}

function changeUnit() {
  var newUnit = document.getElementById("selectUnit").value;
  updateCurrentUnit(newUnit);
}

function checkPartOne(x) {
  partOneAnswers[currentItem - 1] = x;
  updateItemStatus();
  updateItemIndicators();
}

function checkPartTwo() {
  partTwoAnswers[currentItem - 1] = document.getElementById("selectWord").selectedIndex + 1;
  updateItemStatus();
  updateItemIndicators();
}

function updateItemStatus() {
  for (count = 1; count < 5; count ++) {
    document.getElementById("option" + count + "Holder").style.backgroundColor = "LightGray";
  }
  var currentAnswer = partOneAnswers[currentItem - 1];
  if ( currentAnswer > 0 ) {
    document.getElementById("option" + currentAnswer + "Holder").style.backgroundColor = "Yellow";
  }
  document.getElementById("selectWord").selectedIndex = partTwoAnswers[currentItem - 1] - 1;
  // Below: code to update the 'result' element
  document.getElementById("result").src = "toeicWarmupImg/thinking.png";
  document.getElementById("result").alt = "You have not answered the question yet.";
  if (viewingPart === 1) {
    if (currentAnswer > 0) {
      if (document.getElementById("option" + currentAnswer + "Holder").innerHTML === currentPartOne[currentItem * 6 - 1]) {
        document.getElementById("result").src = "toeicWarmupImg/correct.png";
        document.getElementById("result").alt = "Your answer is correct.";
        partOneReport[currentItem - 1] = 1;
      }
      else {
        document.getElementById("result").src = "toeicWarmupImg/incorrect.png";
        document.getElementById("result").alt = "Your answer is incorrect.";
        partOneReport[currentItem - 1] = 2;
      }
    }
  }
  else {
    if (document.getElementById("selectWord").selectedIndex >= 0) {
      if (document.getElementById("selectWord").value === currentPartTwo[currentItem * 3 - 1]) {
        document.getElementById("result").src = "toeicWarmupImg/correct.png";
        document.getElementById("result").alt = "Your answer is correct.";
        partTwoReport[currentItem - 1] = 1;
      }
      else {
        document.getElementById("result").src = "toeicWarmupImg/incorrect.png";
        document.getElementById("result").alt = "Your answer is incorrect.";
        partTwoReport[currentItem - 1] = 2;
      }
    }
  }
}

function updateItemIndicators() {
  for (count = 1; count < 11; count ++) {
    document.getElementById(count).style.border = "5px solid LightSteelBlue";
    document.getElementById(count).style.backgroundColor = "White";
    if (viewingPart === 1) {
      if (partOneReport[count - 1] === 1) {
        document.getElementById(count).style.backgroundColor = "LightGreen";
      }
      if (partOneReport[count - 1] === 2) {
        document.getElementById(count).style.backgroundColor = "LightPink";
      }
    }
    else {
      if (partTwoReport[count - 1] === 1) {
        document.getElementById(count).style.backgroundColor = "LightGreen";
      }
      if (partTwoReport[count - 1] === 2) {
        document.getElementById(count).style.backgroundColor = "LightPink";
      }
    }
  }
  document.getElementById(currentItem).style.border = "5px solid Black";
}

function showHelp() {
  alert("多益測驗 TOEIC 字彙練習\n\
(1) 本練習共30回，每回有「同義字」與「選字填空」各10題。\n\
(2) 按左上角選單可選擇回數；按「同義字」與「選字填空」鍵可切換題型。\n\
(3) 勾選或取消「中譯」方塊可切換顯示中文翻譯。\n\
(4) 按上方的1-10數字標籤或下方的「上一題」、「下一題」進行瀏覽。\n\
(5) 答題完成立即回饋，答對者該題數字標籤呈綠色，答錯者呈紅色；未答者呈白色。\n\
(6) 若選擇新的回數，目前的答題進度會全部清除，選項的順序也會重新排列。\n\
Contact : davidichunlin@gmail.com")
}
