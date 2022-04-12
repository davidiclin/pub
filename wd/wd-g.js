function enlarge(x) {
  document.getElementById("bigPic").src = x.src;
  var imgList = document.getElementsByTagName("img");
  for (var count = 0; count < imgList.length; count++) {
    imgList[count].style.opacity = "100%";
  }
  x.style.opacity = "30%";
}
