var getText = new XMLHttpRequest(); // a new request
getText.open("GET","https://davidiclin.github.io/pub/json/sentdrill.json",false);
getText.send(null);
const contentAll = JSON.parse(getText.responseText);

document.getElementById("questionBody").innerHTML = contentAll[1].id + ". " + contentAll[1].qBody;
document.getElementById("userInput").innerHTML = contentAll[1].hint;
document.getElementById("blocks").innerHTML = getBlocks();
document.getElementById("key").innerHTML = contentAll[1].key;

function getBlocks() {
    blocks = contentAll[1].qBody.replace(contentAll[1].hint, "").strip(".").split(" ");
    for (var count = 0; count < blocks.length; count++) {  // Shuffling
      var n1 = Math.floor(Math.random() * blocks.length);
      var n2 = Math.floor(Math.random() * blocks.length);
      tmp = blocks[n1];
      blocks[n1] = blocks[n2];
      blocks[n2] = tmp;
    }
    var blocksHTML = "";
    for (var count = 0; count < blocks.length; count++) {
      blocksHTML += "<span>" + blocks[count] + "</span> ";
    }
    return blocksHTML;
}
