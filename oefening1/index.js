"use strict";
async function loadAsync() {
  const emojiResponse = await fetch('https://api.myjson.com/bins/1edx4o');
  const emojiJSON = await emojiResponse.json();
  const emojiList = emojiJSON.map(({ symbol, name }) => `<li>${symbol} ${name}</li>`).join("");
  document.getElementById("list").innerHTML = emojiList;
}

loadAsync();