var getText = new XMLHttpRequest(); // a new request
getText.open("GET","https://davidiclin.github.io/pub/json/sentdrill.json",false);
getText.send(null);
const contentAll = JSON.parse(getText.responseText);

document.getElementById("questionBody").innerHTML = contentAll[0].id + contentAll[0].qBody;
document.getElementById("key").innerHTML = contentAll[0].key;
