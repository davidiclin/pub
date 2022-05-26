var getText = new XMLHttpRequest(); // a new request
getText.open("GET","https://davidiclin.github.io/pub/json/sentdrill.json",false);
getText.send(null);
const contentAll = JSON.parse(getText.responseText);

document.getElementById("questionBody").innerHTML = contentAll[1].id + ". " + contentAll[1].qBody;
document.getElementById("answer").value = contentAll[1].hint;
document.getElementById("key").innerHTML = contentAll[1].key;
